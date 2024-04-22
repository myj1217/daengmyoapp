import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { modifyMember, checkNickname, getMember } from "../../api/memberApi";
import PasswordChangeComponent from "./PasswordChangeComponent";

const ModifyComponent = ({ setIsModify }) => {
  const [member, setMember] = useState({
    email: "",
    pw: "",
    confirmPassword: "",
    name: "",
    nickname: "",
    addressCode: "",
    streetAddress: "",
    detailAddress: "",
    number: "",
  });

  const loginInfo = useSelector((state) => state.loginSlice);

  const [originalNickname, setOriginalNickname] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
      setMember({ ...loginInfo });
      setOriginalNickname(loginInfo.nickname);
  }, []);

  //정보수정 전송
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (member.email !== loginInfo.email) {
      alert("이메일 변조 시도가 감지되어 차단되었습니다.");
      return;
    }
    if (
      Object.entries(errors).some(
        ([key, value]) => key.startsWith("valid_") && value !== ""
      )
    ) {
      return;
    }
    try {
      // API 호출을 통해 회원가입 요청

      const data = await modifyMember(member);
      console.log("정보수정 성공:", data);
      alert("회원 정보가 수정되었습니다.");
      setIsModify(false);
      window.location.reload();
    } catch (error) {
      console.error("정보수정 실패:", error);
      alert("입력하신 정보를 수정해주세요.");

      // 실패한 필드에 대한 에러 메시지를 설정
      if (error) {
        setErrors(error);
      } else {
        alert("정보수정에 실패하였습니다.");
      }
    }
  };

  // 주소불러오는기능
  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let code = data.zonecode;
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
          if (data.bname !== "") {
            extraAddress += data.bname;
          }
          if (data.buildingName !== "") {
            extraAddress +=
              extraAddress !== ""
                ? `, ${data.buildingName}`
                : data.buildingName;
          }
          fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }

        setMember({ ...member, streetAddress: fullAddress, addressCode: code });
      },
    }).open();
  };

  // 이름 길이 확인
  useEffect(() => {
    if (member.name !== "") {
      if (member.name.length < 2 || member.name.length > 16) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          valid_name: "이름은 2자 이상 16자 이하로 입력해주세요.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          valid_name: "",
        }));
      }
    }
  }, [member.name]);

  // 전화번호 확인
  useEffect(() => {
    const phoneNumberPattern = /^\d+$/;
    if (member.number !== "") {
      if (member.number !== "" && !phoneNumberPattern.test(member.number)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          valid_number: "휴대폰 번호는 숫자로만 입력해주세요.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          valid_number: "",
        }));
      }
    }
  }, [member.number]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMember((prev) => ({ ...prev, [name]: value }));
  };

  const goBack = (e) => {
    e.preventDefault();

    setIsModify(false);
  };

  //비밀번호 변경 모달 부분
  const [isOpen, setIsOpen] = useState(false); // 모달이 열려 있는지 여부를 나타내는 상태
  // 모달을 열기 위한 함수
  const openModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };
  // 모달을 닫기 위한 함수
  const closeModal = () => {
    setIsOpen(false);
  };

  // 닉네임,이메일 실시간 중복 체크 부분
  useEffect(() => {
    const check = async () => {
      if (member.nickname !== "" && member.nickname !== originalNickname) {
        // 닉네임이 사용 가능한 경우에만 길이 확인을 수행합니다.
        const nicknameAvailable = await checkNickname(member.nickname);
        if (!nicknameAvailable) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            valid_nickname: "이미 사용 중인 닉네임입니다.",
          }));
        } else {
          if (member.nickname.length < 2 || member.nickname.length > 16) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              valid_nickname: "닉네임은 2자 이상 16자 이하로 입력해주세요.",
            }));
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              valid_nickname: "",
            }));
          }
        }
      }
    };

    check();
  }, [member.nickname]);

  return (
    <div className="w-full h-full">
      {/* 비밀번호 변경 모달 */}
      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <PasswordChangeComponent closeModal={closeModal} />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 입력폼 부분 */}
      <div
        onSubmit={(e) => {
          e.preventDefault(); // 폼의 기본 동작 중지
        }}
        className="w-full p-8 bg-white"
      >
        {/* 이메일 입력 필드 */}
        <label>이메일</label>
        {errors.valid_email && (
          <p className="text-red-500">*{errors.valid_email}</p>
        )}
        <input
          className="appearance-none cursor-not-allowed w-full p-2 text-lg rounded-md border border-gray-300 focus:border-orange-500 bg-gray-200 mb-4"
          type="text"
          id="email"
          value={member.email}
          onChange={handleChange}
          placeholder="이메일"
          readOnly
        />
        <label>비밀번호</label>
        <button
          className="w-full bg-green-400 hover:bg-green-500 text-white font-bold py-2 rounded-md transition duration-200 mb-4"
          onClick={openModal}
        >
          비밀번호 변경하기
        </button>

        {/* 사용자 이름 입력 필드 */}
        <label htmlFor="name">이름(실제 이름)</label>
        {errors.valid_name && (
          <p className="text-red-500">*{errors.valid_name}</p>
        )}
        <input
          className="w-full p-2 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
          type="text"
          id="name"
          name="name"
          value={member.name}
          onChange={handleChange}
          placeholder="이름"
        />
        {/* 닉네임 입력 필드 */}
        <label htmlFor="nickname">닉네임</label>
        {errors.valid_nickname && (
          <p className="text-red-500">*{errors.valid_nickname}</p>
        )}
        <input
          className="w-full p-2 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
          type="text"
          id="nickname"
          name="nickname"
          value={member.nickname}
          onChange={handleChange}
          placeholder="닉네임"
        />
         <label htmlFor="number">휴대폰 번호</label>
        {errors.valid_number && (
          <p className="text-red-500">*{errors.valid_number}</p>
        )}
        <input
          className="w-full p-2 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
          type="text"
          id="number"
          name="number"
          value={member.number}
          onChange={handleChange}
          placeholder="휴대폰 번호"
        />

        {/* 주소 입력 필드 */}
        <label htmlFor="addressCode">우편번호</label>
        {errors.valid_addressCode && (
          <p className="text-red-500">*{errors.valid_addressCode}</p>
        )}
        <div className="flex mb-4">
          <input
            className="w-full p-2 text-lg rounded-md border border-gray-300 focus:border-orange-500"
            type="text"
            id="addressCode"
            name="addressCode"
            value={member.addressCode}
            onChange={handleChange}
            placeholder="우편번호"
            readOnly
          />

          <button
            type="button"
            onClick={openPostcode}
            className="ml-2 bg-orange-500 hover:bg-orange-600 text-white font-bold p-2 rounded-md"
            style={{ width: "150px" }}
          >
            주소 찾기
          </button>
        </div>
        <label htmlFor="streetAddress">주소</label>
        {errors.valid_streetAddress && (
          <p className="text-red-500">*{errors.valid_streetAddress}</p>
        )}
        <div className="flex mb-4">
          <input
            className="w-full p-2 text-lg rounded-md border border-gray-300 focus:border-orange-500"
            type="text"
            id="streetAddress"
            value={member.streetAddress}
            onChange={handleChange}
            placeholder="주소"
            readOnly
          />
        </div>
        {/* 상세 주소 입력 필드 */}
        <label htmlFor="detailAddress">상세 주소</label>
        <input
          className="w-full p-2 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
          type="text"
          id="detailAddress"
          name="detailAddress"
          value={member.detailAddress}
          onChange={handleChange}
          placeholder="상세 주소"
        />
        {/* 전화번호 입력 필드 */}
       
        

        <button
          className="w-full bg-green-400 hover:bg-green-500 text-white font-bold py-2 rounded-md transition duration-200"
          onClick={handleSubmit}
        >
          정보 수정 완료
        </button>
        <button
          className="w-full bg-red-400 hover:bg-red-500 text-white font-bold py-2 rounded-md transition duration-200 mt-1"
          onClick={goBack}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default ModifyComponent;