import { API_SERVER_HOST } from "../../api/rootApi";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const host = API_SERVER_HOST;

const CartItemComponent = ({
  cino,
  pname,
  price,
  pno,
  qty,
  imageFile,
  changeCart,
  email,
  changeSingleBox,
  checkList,
}) => {
  const handleClickQty = (amount) => {
    if (qty + amount < 1) {
      if (
        window.confirm("해당 상품을 장바구니에서 삭제하시겠습니까?") === false
      ) {
        return;
      }
    }
    changeCart({ email, cino, pno, qty: qty + amount });
  };

  return (
    <li
      key={cino}
      className={
        "w-full py-8 border-b border-gray-300 " +
        (checkList.includes(cino) ? "bg-green-100" : "")
      }
    >
      {/* <div className="w-full border-2"> */}
      <div>
        <div className="flex justify-evenly text-base text-center items-center">
          {/* <div className="w-1/12">{cino}</div> */}
          <div className="w-1/12">
            {/* 개별 체크박스 */}
            <input
              type="checkbox"
              className="w-4 h-4 accent-green-700"
              onChange={(event) => changeSingleBox(event.target.checked, cino)}
              checked={checkList.includes(cino) ? true : false}
            />
          </div>
          <div className="w-2/12 flex justify-center">
            <img
              alt="img"
              src={`${host}/api/products/view/s_${imageFile}`}
              className="w-24 h-24 object-cover transform transition duration-300 ease-in-out hover:scale-110"
            />
          </div>
          <div className="w-2/12">{pname}</div>
          <div className="w-2/12">{price.toLocaleString("ko-KR")}</div>
          <div className="w-2/12">
            {qty}
            <button
              className="bg-white rounded-lg mx-2"
              onClick={() => handleClickQty(1)}
            >
              <FaPlusCircle />
            </button>
            <button
              className="bg-white rounded-lg"
              onClick={() => handleClickQty(-1)}
            >
              <FaMinusCircle />
            </button>
          </div>
          <div className="w-2/12">{(qty * price).toLocaleString("ko-KR")}</div>
          <div className="w-1/12">
            {" "}
            <button
              className="bg-green-700 hover:bg-green-900 m-1 p-1 text-base text-white w-12 rounded-lg"
              onClick={() => handleClickQty(-1 * qty)}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItemComponent;
