import React, { useState } from "react";
import { replyDel, replyPut } from "../../api/missingReplyApi";
import FetchingModal from "../common/FetchingModal";
import useCustomLogin from "../../hooks/useCustomLogin";
import { FaUserCircle } from "react-icons/fa";

const ReportItemComponent = ({
  mrno,
  missingReplyer,
  missingReplyText,
  regDate,
  reportRedirect,
  mno,
  email,
}) => {
  const [fetching, setFetching] = useState(false);
  const [modifyMode, setModifyMode] = useState(false);
  const [text, setText] = useState(missingReplyText);
  const { loginState } = useCustomLogin();

  const modifyClickHandler = (event) => {
    event.preventDefault();
    if (loginState.email !== email) {
      window.alert("수정 권한이 없습니다.");
      return;
    }
    setModifyMode(true);
  };

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const reportModifyHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("missingReplyText", text);

    if (!text) {
      window.alert("내용을 입력해주세요.");
      return;
    }

    setFetching(true);

    replyPut(mrno, formData)
      .then((data) => {
        reportRedirect();
      })
      .catch((error) => {
        console.error("제보 수정 중 오류 발생:", error);
      })
      .finally(() => {
        setFetching(false);
      });

    window.alert("해당 제보가 성공적으로 수정되었습니다.");
    setModifyMode(false);
  };

  const reportDeleteHandler = (event) => {
    event.preventDefault();
    if (!window.confirm("해당 제보를 정말로 삭제하시겠습니까?")) {
      return;
    }

    setFetching(true);

    replyDel(mrno)
      .then((data) => {
        reportRedirect();
      })
      .catch((error) => {
        console.error("제보 삭제 중 오류 발생:", error);
      })
      .finally(() => {
        setFetching(false);
      });

    window.alert("해당 제보가 성공적으로 삭제되었습니다.");
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-300">
      {fetching && <FetchingModal />}
      <div className="flex items-center w-full">
        <div className="flex items-center">
          <FaUserCircle className="text-2xl mr-2 text-gray-700" />
          <span className="font-medium text-gray-900">{missingReplyer}</span>
        </div>
        <div className="flex-grow ml-4">
          {modifyMode ? (
            <textarea
              className="w-full h-24 p-2 text-sm border rounded resize-none"
              onChange={handleChangeText}
              value={text}
            />
          ) : (
            <p className="text-gray-700">{missingReplyText}</p>
          )}
        </div>
        <div className="w-32 text-right text-sm text-gray-500">{regDate}</div>
      </div>
      {loginState.email === email && (
        <div className="ml-4 flex">
          {modifyMode ? (
            <>
              <a
                href="#"
                onClick={reportModifyHandler}
                className="text-blue-500 hover:text-blue-700 text-sm mr-2"
                style={{ whiteSpace: "nowrap" }}
              >
                수정완료
              </a>
              <a
                href="#"
                onClick={reportDeleteHandler}
                className="text-red-500 hover:text-red-700 text-sm"
                style={{ whiteSpace: "nowrap" }}
              >
                삭제
              </a>
            </>
          ) : (
            <a
              href="#"
              onClick={modifyClickHandler}
              className="text-blue-500 hover:text-blue-700 text-sm"
              style={{ whiteSpace: "nowrap" }}
            >
              수정
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportItemComponent;
