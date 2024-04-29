import { useCallback, useEffect, useState } from "react";
import { getList } from "../../api/productApi";
import useCustomMove from "../../hooks/useCustomMove";

import { API_SERVER_HOST } from "../../api/rootApi";
import PageComponent from "../common/PageComponent";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const host = API_SERVER_HOST;

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totoalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ProductListComponent = () => {
  const { exceptionHandle } = useCustomLogin();
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const navigate = useNavigate();

  //serverData는 나중에 사용
  const [serverData, setServerData] = useState(initState);
  const { isLogin } = useCustomLogin();
  const loginInfo = useSelector((state) => state.loginSlice);
  const isAdmin =
    isLogin &&
    (loginInfo.roleNames.includes("MANAGER") ||
      loginInfo.roleNames.includes("ADMIN"));

  const handleClickAdd = useCallback(() => {
    navigate({ pathname: "../add" });
  });

  useEffect(() => {
    getList({ page, size })
      .then((data) => {
        console.log(data);
        setServerData(data);
      })
      .catch((err) => exceptionHandle(err));
  }, [page, size, refresh]);

  return (
    <div className="border-2 border-gray-300">
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
      <PageComponent serverData={serverData} movePage={moveToList} />
      {/* <div
        // className="m-1 p-2 w-30 font-extrabold text-center underline"
        className="block w-1/3 py-2 text-white text-center mt-4 transition duration-200 ease-in-out mx-auto bg-emerald-500 hover:bg-emerald-700 cursor-pointer"
        onClick={handleClickAdd}
      >
        <button>상품 추가</button>
      </div> */}
      {isAdmin && (
        <div className="flex justify-center">
          <button
            type="button"
            className="inline-block rounded p-4 m-2 bg-red-500 hover:bg-red-700 text-white"
            onClick={handleClickAdd}
          >
            상품 추가
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductListComponent;
