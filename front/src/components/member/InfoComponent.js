import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModifyComponent from "./ModifyComponent";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getMember, deleteId } from "../../api/memberApi";

const InfoComponent = () => {
  const [member, setMember] = useState({
    email: "",
    name: "",
    nickname: "",
    addressCode: "",
    streetAddress: "",
    detailAddress: "",
    number: "",
  });
  const [isModify, setIsModify] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const loginInfo = useSelector((state) => state.loginSlice);
  const navigate = useNavigate();

  useEffect(() => {
    setMember({ ...loginInfo });
  }, []);

  const goModify = () => {
    setIsModify(true);
  };

  const { doLogout } = useCustomLogin();

  const remove = async () => {
    setShowModal(true);
  };

  const handleWithdrawal = async () => {
    const isConfirmed = window.confirm(
      "탈퇴 하시겠습니까? 이 작업은 되돌릴 수 없습니다."
    );

    if (isConfirmed) {
      try {
        const data = {
          email: loginInfo.email,
          pw: password // 사용자가 입력한 비밀번호
        };

        await deleteId(data);
        alert("정상적으로 회원탈퇴 되었습니다.");
        doLogout();
        navigate({ pathname: "/" }, { replace: true });
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-124px)]">
      {isModify ? (
        <ModifyComponent setIsModify={setIsModify} />
      ) : (
        <div className="w-full max-w-4xl mb-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
          <div className="grid grid-cols-2 gap-8">
            {/* Left column */}
            <div className="pl-8 text-center">
              <p className="text-lg font-semibold mb-8 bg-gray-100 rounded-lg pt-2 pb-2">개인 정보</p>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
                <div className="text-lg border-b border-gray-300 py-2">{member.email}</div>
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">이름(실제 이름)</label>
                <div className="text-lg border-b border-gray-300 py-2">{member.name}</div>
              </div>
              <div className="mb-4">
                <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">닉네임</label>
                <div className="text-lg border-b border-gray-300 py-2">{member.nickname}</div>
              </div>
              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-700">휴대폰 번호</label>
                <div className="text-lg border-b border-gray-300 py-2">{member.number}</div>
              </div>
            </div>
            {/* Right column */}
            <div className="pl-8 text-center border-l">
            <p className="text-lg font-semibold mb-8 bg-gray-100 rounded-lg pt-2 pb-2">주소지</p>
              <div className="mb-4">
                <label htmlFor="addressCode" className="block text-sm font-medium text-gray-700">우편번호</label>
                <div className="text-lg border-b border-gray-300 py-2">{member.addressCode || "저장된 우편번호가 없습니다."}</div>
              </div>
              <div className="mb-4">
                <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">주소</label>
                <div className="text-lg border-b border-gray-300 py-2">{member.streetAddress || "저장된 주소가 없습니다."}</div>
              </div>
              <div>
                <label htmlFor="detailAddress" className="block text-sm font-medium text-gray-700">상세 주소</label>
                <div className="text-lg border-b border-gray-300 py-2">{member.detailAddress || "저장된 상세 주소가 없습니다."}</div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button
              className="w-full bg-emerald-400 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-md transition duration-200"
              onClick={goModify}
            >
              내 정보 수정하기
            </button>
            <button
              className="w-full bg-red-400 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-md mt-2 transition duration-200"
              onClick={remove}
            >
              회원탈퇴
            </button>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-headline"
                      >
                        비밀번호 확인
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          회원탈퇴를 진행하려면 비밀번호를 입력하세요.
                        </p>
                        <input
                          type="password"
                          className="mt-2 p-2 w-full border border-gray-300"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleWithdrawal}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    확인
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoComponent;
