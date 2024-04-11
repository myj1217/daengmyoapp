import { useEffect, useState } from "react";
import { getList } from "../../api/productApi";
import useCustomMove from "../../hooks/useCustomMove";

import { API_SERVER_HOST } from "../../api/rootApi";
import PageComponent from "../common/PageComponent";
import useCustomLogin from "../../hooks/useCustomLogin";

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

  //serverData는 나중에 사용
  const [serverData, setServerData] = useState(initState);

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
      <PageComponent
        serverData={serverData}
        movePage={moveToList}
      ></PageComponent>
    </div>
  );
};

export default ProductListComponent;
