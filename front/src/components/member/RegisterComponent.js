import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkNickname, checkEmail, registerMember } from "../../api/memberApi";
import { Link } from "react-router-dom";
import image from "../../images/logo.png";

const RegisterComponent = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    pw: "",
    confirmPassword: "",
    name: "",
    nickname: "",
    zipCode: "",
    streetAddress: "",
    detailAddress: "",
    number: "",
    profileImage: "",
  });



  const [errors, setErrors] = useState({});

  const [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();

  //비밀번호 확인에 대한 처리
  useEffect(() => {
    if (formValues.pw !== formValues.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
      }));
      setPasswordMatch(false);
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "",
      }));
      setPasswordMatch(true);
    }

    // 비밀번호 길이 확인
    if (
      (formValues.pw !== "" && formValues.pw.length < 4) ||
      formValues.pw.length > 16
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        valid_pw: "비밀번호는 4자 이상 16자 이하로 입력해주세요.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        valid_pw: "",
      }));
    }
  }, [formValues.pw, formValues.confirmPassword]);

  // 이름 길이 확인
  useEffect(() => {
    if (formValues.name !== "") {
      if (formValues.name.length < 2 || formValues.name.length > 16) {
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
  }, [formValues.name]);

  // 전화번호 확인
  useEffect(() => {
    const phoneNumberPattern = /^\d+$/;
    if (formValues.number !== "") {
      if (
        formValues.number !== "" &&
        !phoneNumberPattern.test(formValues.number)
      ) {
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
  }, [formValues.number]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));
  };



  // 닉네임,이메일 실시간 중복 체크 부분
  useEffect(() => {
    const checkNicknameAndEmail = async () => {
      if (formValues.nickname !== "") {
        // 닉네임이 사용 가능한 경우에만 길이 확인을 수행합니다.
        const nicknameAvailable = await checkNickname(formValues.nickname);
        if (!nicknameAvailable) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            valid_nickname: "이미 사용 중인 닉네임입니다.",
          }));
        } else {
          if (
            formValues.nickname.length < 2 ||
            formValues.nickname.length > 16
          ) {
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

      if (formValues.email) {
        const emailAvailable = await checkEmail(formValues.email);
        if (!emailAvailable) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            valid_email: "이미 사용 중인 이메일입니다.",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            valid_email: "",
          }));
        }
      }
    };

    checkNicknameAndEmail();
  }, [formValues.email, formValues.nickname]);

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

        setFormValues({
          ...formValues,
          streetAddress: fullAddress,
          zipCode: code,
        });
      },
    }).open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 'confirmPassword'는 백엔드로 전송할 필요가 없으므로 제외
    const { confirmPassword, ...registrationData } = formValues;

    try {
      if (!passwordMatch) {
        return;
      }
      // API 호출을 통해 회원가입 요청
      const data = await registerMember(registrationData);
      console.log("회원가입 성공:", data);
      alert("정상적으로 회원가입 되었습니다.");
      navigate("/member/login", { replace: true }); // 성공 후 로그인으로, 이전기록남기지않음
    } catch (error) {
      console.error("회원가입 실패:", error);
      // 실패한 필드에 대한 에러 메시지를 설정
      if (error) {
        setErrors(error);
      } else {
        alert("회원가입에 실패하였습니다.");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center  bg-green-50 flex-col w-full">
      <div className="w-full h-24 flex justify-center items-center">
      <Link to="/" className="text-lg font-bold">
          <img src={image} alt="logo" className="w-44 h-auto"></img>
        </Link>
        </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-green-50 rounded-lg mb-16"
      >
        {/* 이메일 입력 필드 */}
        <label htmlFor="email">이메일</label>
        {errors.valid_email && (
          <p className="text-red-500">*{errors.valid_email}</p>
        )}
        <input
          className="w-full p-3 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
          type="text"
          name="email"
          id="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="이메일"
        />
        {/* 비밀번호 입력 필드 */}
      
        <label htmlFor="pw">비밀번호</label>
        {errors.valid_pw && <p className="text-red-500">*{errors.valid_pw}</p>}
        <input
          className="w-full p-3 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
          type="password"
          name="pw"
          id="pw"
          value={formValues.pw}
          onChange={handleChange}
          placeholder="비밀번호"
        />

        {/* 비밀번호 확인 입력 필드 */}
        <label htmlFor="confirmPassword">비밀번호 확인</label>
        {errors.confirmPassword && (
          <p className="text-red-500">*{errors.confirmPassword}</p>
        )}
        <input
          className="w-full p-3 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formValues.confirmPassword}
          onChange={handleChange}
          placeholder="비밀번호 확인"
        />
        {/* 사용자 이름 입력 필드 */}
        <label htmlFor="name">이름</label>
        {errors.valid_name && (
          <p className="text-red-500">*{errors.valid_name}</p>
        )}
        <input
          className="w-full p-3 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
          type="text"
          name="name"
          id="name"
          value={formValues.name}
          onChange={handleChange}
          placeholder="이름"
        />
        {/* 닉네임 입력 필드 */}
        <label htmlFor="nickname">닉네임</label>
        {errors.valid_nickname && (
          <p className="text-red-500">*{errors.valid_nickname}</p>
        )}
        <input
          className="w-full p-3 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
          type="text"
          name="nickname"
          id="nickname"
          value={formValues.nickname}
          onChange={handleChange}
          placeholder="닉네임"
        />
        {/* 주소 입력 필드 */}
        <label htmlFor="zipCode">우편번호 (선택)</label>
        {errors.valid_zipCode && (
          <p className="text-red-500">*{errors.valid_zipCode}</p>
        )}
        <div className="flex mb-4">
          <input
            className="w-full p-3 text-lg rounded-md border border-gray-300 focus:border-orange-500"
            type="text"
            name="zipCode"
            value={formValues.zipCode}
            placeholder="우편번호"
            onChange={handleChange}
            readOnly
          />

          <button
            type="button"
            onClick={openPostcode}
            className="ml-2 bg-green-500 hover:bg-green-600 text-white font-bold p-3 rounded-md"
            style={{ width: "150px" }}
          >
            주소 찾기
          </button>
        </div>
        <label htmlFor="streetAddress">주소 (선택)</label>
        {errors.valid_streetAddress && (
          <p className="text-red-500">*{errors.valid_streetAddress}</p>
        )}
        <div className="flex mb-4">
          <input
            className="w-full p-3 text-lg rounded-md border border-gray-300 focus:border-orange-500"
            type="text"
            name="streetAddress"
            value={formValues.streetAddress}
            placeholder="주소"
            onChange={handleChange}
            readOnly
          />
        </div>
        {/* 상세 주소 입력 필드 */}
        <label htmlFor="detailAddress">상세 주소 (선택)</label>
        <input
          className="w-full p-3 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
          type="text"
          name="detailAddress"
          id="detailAddress"
          value={formValues.detailAddress}
          onChange={handleChange}
          placeholder="상세 주소"
        />
        {/* 전화번호 입력 필드 */}
        <label htmlFor="number">휴대폰 번호</label>
        {errors.valid_number && (
          <p className="text-red-500">*{errors.valid_number}</p>
        )}
        <input
          className="w-full p-3 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
          type="text"
          name="number"
          id="number"
          value={formValues.number}
          onChange={handleChange}
          placeholder="휴대폰 번호"
        />
        {/* 회원가입 버튼 */}
        {Object.values(errors).some((error) => error !== "") && (
          <p className="text-red-500 mb-4">
            가입 정보를 양식에 맞게 수정해주세요!
          </p>
        )}
        <button
          className="w-full bg-black hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-md transition duration-200"
          type="submit"
        >
          가입하기
        </button>
      </form>
    </div>
  );
};

export default RegisterComponent;
