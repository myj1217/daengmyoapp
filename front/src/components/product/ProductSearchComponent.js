import React, { useEffect, useState } from "react";
import { searchProducts } from "../api/productApi";
import { API_SERVER_HOST } from "../api/rootApi";
import PageComponent from "./common/PageComponent";
import { useLocation } from "react-router-dom";
import useCustomMove from "../hooks/useCustomMove";
import noResultImage from "../../asset/images/noResult.jpg";

const host = API_SERVER_HOST;

const ProductSearchComponent = () => {
  const { moveToRead, moveToSearchList, page, size } = useCustomMove();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearchTerm = searchParams.get("pname") || "";
  const [serverData, setServerData] = useState({
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0,
  });

  useEffect(() => {
    if (initialSearchTerm.trim() !== "") {
      search(initialSearchTerm);
    }
  }, [initialSearchTerm]);

  const search = (initialSearchTerm) => {
    if (initialSearchTerm.trim() === "") return;

    searchProducts(initialSearchTerm, page, size)
      .then((data) => {
        console.log(data);
        setServerData(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className=" border-gray-300">
      {serverData.dtoList.length === 0 ? (
        <div className="text-center p-4">
          <img src={noResultImage} alt="No results found" className="mx-auto" />
          <p className="mt-4">검색결과가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-1">
          {serverData.dtoList.map((product) => (
            <div
              key={product.pno}
              className="border rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out cursor-pointer"
              onClick={() => moveToRead(product.pno)}
            >
              <img
                alt="product"
                className="w-full h-64 object-cover transform transition duration-300 ease-in-out hover:scale-110"
                src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}
              />

              <div className="bottom-0 bg-white text-lg p-4">
                <div className="text-center p-1">{product.pname}</div>

                <div className="text-center p-1 font-extrabold">
                  {product.price.toLocaleString("ko-KR")}원
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <PageComponent serverData={serverData} movePage={moveToSearchList} />
    </div>
  );
};

export default ProductSearchComponent;
