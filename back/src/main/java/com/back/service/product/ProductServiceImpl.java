package com.back.service.product;

import java.util.*;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.back.domain.product.Product;
import com.back.domain.product.ProductImage;
import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.product.ProductDTO;
import com.back.repository.product.ProductRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.multipart.MultipartFile;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional

public class ProductServiceImpl implements ProductService{
  private final ProductRepository productRepository;
  private final ModelMapper modelMapper;
  @Override
  public PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO) {
    log.info("getList......");

    Pageable pageable = PageRequest.of(
            pageRequestDTO.getPage() - 1,
            pageRequestDTO.getSize(),
            Sort.by("pno").descending());

    Page<Object[]>  result = productRepository.selectList(pageable);

    List<ProductDTO> dtoList = result.get().map(arr -> {

      Product product = (Product) arr[0];
      ProductImage productImage = (ProductImage) arr[1];

      ProductDTO productDTO = ProductDTO.builder()
              .pno(product.getPno())
              .pname(product.getPname())
              .pdesc(product.getPdesc())
              .price(product.getPrice())
              .delFlag(product.isDelFlag())
              .artist(product.getArtist())
              .build();

      if (productImage != null) {
        String imageStr = productImage.getFileName();
        productDTO.setUploadFileNames(List.of(imageStr));
      }

      return productDTO;
    }).collect(Collectors.toList());

    long totalCount = result.getTotalElements();

    return PageResponseDTO.<ProductDTO>withAll()
            .dtoList(dtoList)
            .totalCount(totalCount)
            .pageRequestDTO(pageRequestDTO)
            .build();
  }

  @Override
  public Long register(ProductDTO productDTO) {
    Product product = dtoToEntity(productDTO);
    Product result = productRepository.save(product);

    return result.getPno();
  }

  private Product dtoToEntity(ProductDTO productDTO){
    Product product = Product.builder()
            .pno(productDTO.getPno())
            .pname(productDTO.getPname())
            .pdesc(productDTO.getPdesc())
            .price(productDTO.getPrice())
            .artist(productDTO.getArtist())
            .build();

    //업로드 처리가 끝난 파일들의 이름 리스트
    List<String> uploadFileNames = productDTO.getUploadFileNames();

    if(uploadFileNames == null){
      return product;
    }

    uploadFileNames.stream().forEach(uploadName -> {
      product.addImageString(uploadName);
    });

    return product;
  }

  @Override
  public ProductDTO get(Long pno) {
    Optional<Product> result = productRepository.selectOne(pno);
    Product product = result.orElseThrow();
    ProductDTO productDTO = entityToDTO(product);

    return productDTO;
  }

  private ProductDTO entityToDTO(Product product){

    ProductDTO productDTO = ProductDTO.builder()
            .pno(product.getPno())
            .pname(product.getPname())
            .pdesc(product.getPdesc())
            .price(product.getPrice())
            .artist(product.getArtist())
            .build();

    List<ProductImage> imageList = product.getImageList();

    if(imageList == null || imageList.size() == 0 ){
      return productDTO;
    }

    List<String> fileNameList = imageList.stream().map(productImage ->
            productImage.getFileName()).toList();

    productDTO.setUploadFileNames(fileNameList);

    return productDTO;
  }
  @Override
  public void modify(ProductDTO productDTO) {
    //step1 read
    Optional<Product> result = productRepository.findById(productDTO.getPno());

    Product product = result.orElseThrow();

    //2. change pname, pdesc, price
    product.changeName(productDTO.getPname());
    product.changeDesc(productDTO.getPdesc());
    product.changePrice(productDTO.getPrice());
    product.changeArtist(productDTO.getArtist());

    //3. upload File -- clear first
    product.clearList();

    List<String> uploadFileNames = productDTO.getUploadFileNames();

    if(uploadFileNames != null && uploadFileNames.size() > 0 ){
      uploadFileNames.stream().forEach(uploadName -> {
        product.addImageString(uploadName);
      });
    }
    productRepository.save(product);
  }
  @Override
  public void remove(Long pno) {
    productRepository.updateToDelete(pno, true);
  }

  @Override
  public PageResponseDTO<ProductDTO> productSearch(String artist, String pname, PageRequestDTO pageRequestDTO) {
    Pageable pageable = PageRequest.of(
            pageRequestDTO.getPage() - 1,
            pageRequestDTO.getSize(),
            Sort.by("pno").descending());

    Page<Object[]> result = productRepository.searchList(artist, pname, pageable);

    Map<Long, ProductDTO> productDTOMap = new HashMap<>();

    result.getContent().forEach(arr -> {
      Product product = (Product) arr[0];
      ProductImage productImage = (ProductImage) arr[1];

      Long pno = product.getPno();

      ProductDTO dto = productDTOMap.get(pno);
      if (dto == null) {
        dto = ProductDTO.builder()
                .pno(product.getPno())
                .pname(product.getPname())
                .artist(product.getArtist())
                .price(product.getPrice())
                .pdesc(product.getPdesc())
                .delFlag(product.isDelFlag())
                .build();
        productDTOMap.put(pno, dto);
      }

      List<String> uploadFileNames = dto.getUploadFileNames();
      if (uploadFileNames == null) {
        uploadFileNames = new ArrayList<>();
      }
      if (productImage != null) {
        uploadFileNames.add(productImage.getFileName());
        dto.setUploadFileNames(uploadFileNames);
      }
    });

    List<ProductDTO> dtoList = new ArrayList<>(productDTOMap.values());

    return PageResponseDTO.<ProductDTO>withAll()
            .pageRequestDTO(pageRequestDTO)
            .dtoList(dtoList)
            .totalCount((int) result.getTotalElements())
            .build();
  }

}