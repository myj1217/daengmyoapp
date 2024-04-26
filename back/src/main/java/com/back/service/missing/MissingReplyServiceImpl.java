package com.back.service.missing;

import com.back.domain.missing.Missing;
import com.back.domain.missing.MissingReply;
import com.back.dto.PageRequestDTO;
import com.back.dto.PageResponseDTO;
import com.back.dto.missing.MissingReplyDTO;
import com.back.repository.missing.MissingReplyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class MissingReplyServiceImpl implements MissingReplyService {
    private final MissingReplyRepository missingReplyRepository;
    private final ModelMapper modelMapper;

    @Override
    public Long register(MissingReplyDTO missingReplyDTO){
        MissingReply missingReply = MissingReply.builder()
                .missing(Missing.builder().mno(missingReplyDTO.getMno()).build()) // mno 설정
                .missingReplyer(missingReplyDTO.getMissingReplyer())
                .missingReplyText(missingReplyDTO.getMissingReplyText())
                .star(missingReplyDTO.getStar())
                .email(missingReplyDTO.getEmail())
                .build();

        MissingReply result = missingReplyRepository.save(missingReply);

        return result.getMrno();
    }

    @Override
    public MissingReplyDTO read(Long mrno){
        Optional<MissingReply> missingReplyOptional = missingReplyRepository.findById(mrno);
        MissingReply missingReply = missingReplyOptional.orElseThrow();
        return modelMapper.map(missingReply, MissingReplyDTO.class);
    }

    @Override
    public void modify(MissingReplyDTO missingReplyDTO){
        Optional<MissingReply> replyOptional = missingReplyRepository.findById(missingReplyDTO.getMrno());
        MissingReply missingReply = replyOptional.orElseThrow();
        missingReply.changeText(missingReplyDTO.getMissingReplyText()); // 내용 수정
        missingReply.changeStar(missingReplyDTO.getStar()); // 별점 수정
        missingReplyRepository.save(missingReply);
    }

    @Override
    public void remove(Long mrno){
        missingReplyRepository.deleteById(mrno);
    }

    @Override
    public PageResponseDTO<MissingReplyDTO> getListOfMissing(Long mno, PageRequestDTO pageRequestDTO){
        Pageable pageable = PageRequest.of(pageRequestDTO.getPage() <=0?
                        0: pageRequestDTO.getPage() -1,
                pageRequestDTO.getSize(),
                Sort.by("mrno").descending());
        Page<MissingReply> result = missingReplyRepository.listOfMissing(mno, pageable);
        List<MissingReplyDTO> dtoList = result.getContent().stream()
                .map(missingReply -> modelMapper.map(missingReply, MissingReplyDTO.class))
                .collect(Collectors.toList());
        return PageResponseDTO.<MissingReplyDTO>withAll()
                .pageRequestDTO(pageRequestDTO)
                .dtoList(dtoList)
                .totalCount((int)result.getTotalElements())
                .build();
    }
}
