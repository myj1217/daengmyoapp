import { useState } from "react";
import FetchingModal from "../common/FetchingModal";
import { delReply, modReply } from "../../api/communityReplyApi";
import useCustomLogin from "../../hooks/useCustomLogin";

const ReplyModComponent = ({
  communityBno,
  replyRno,
  replyContent,
  replyWriter,
  listReplyRedirect,
  regDate,
  writerEmail,
  isModified,
}) => {
  const { loginState,isAdmin } = useCustomLogin();
  const [modifyMode, setModifyMode] = useState(false);
  const [content, setContent] = useState(replyContent);
  const [fetching, setFetching] = useState(false);
  const [modified, setModified] = useState(false); // 수정 여부 상태 추가

  // 수정버튼 클릭 시 수정 모드로 전환 핸들러
  const modReplyHandler = () => {
    setModifyMode(true); // 수정 모드로 전환
  };

  // 리뷰내용 수정 반응 핸들러
  const handleChangeContent = (e) => {
    setContent(e.target.value);
    setModified(true); // 내용이 수정되면 수정됨 상태를 true로 설정
  };

  // 수정 버튼 함수
  const handleClickModify = () => {
    const formData = new FormData();

    formData.append("communityBno", communityBno);
    formData.append("replyContent", content);
    formData.append("replyWriter", loginState.nickname);
    formData.append("writerEmail", loginState.email);
    // formData.append("regDate", regDate);

    if (!content) {
      window.alert("내용을 입력해주세요.");
      return;
    }

    setFetching(true);

    modReply(replyRno, formData)
      .then((data) => {
        listReplyRedirect();
      })
      .catch((error) => {
        console.error("수정 중 오류 발생:", error);
      })
      .finally(() => {
        setFetching(false);
      });
    window.alert("댓글이 성공적으로 수정되었습니다.");

    setModifyMode(false); // 읽기 모드로 전환
  };

  // 삭제 핸들러
  const handleClickDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?") === false) {
      return;
    }

    setFetching(true);

    delReply(replyRno)
      .then((data) => {
        listReplyRedirect();
      })
      .catch((error) => {
        console.error("삭제 중 오류 발생:", error);
      })
      .finally(() => {
        setFetching(false);
      });

    window.alert("댓글이 성공적으로 삭제되었습니다.");
  };

  return (
    <li
      key={replyRno}
      className={
        "rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out cursor-pointer mx-6"
      }
      style={{ listStyleType: "none" }}
    >
      {fetching ? <FetchingModal /> : <></>}
      <div className="flex text-sm p-4 justify-between items-center">
        {modifyMode ? (
          <textarea
            className="w-5/12 p-2 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="replyContent"
            rows="4"
            onChange={handleChangeContent}
            value={content}
          />
        ) : (
          <div className="w-5/12 text-center p-1">{replyContent}</div>
        )}
        <div className="w-2/12 text-center p-1">{replyWriter}</div>
        <div className="w-2/12 text-center p-1">{regDate} {isModified && "(수정됨)"}</div> {/* 수정됨 상태에 따라 수정됨 글자 추가 */}
        
        <div className="w-1/12 text-center p-1">
          {modifyMode ? (
            <>
              <button
                className="bg-green-700 hover:bg-green-900 m-1 p-1 text-white w-12 rounded-lg"
                onClick={handleClickModify}
                disabled={fetching}
              >
                수정완료
              </button>
              <button
                className="bg-red-700 hover:bg-red-900 m-1 p-1 text-white w-12 rounded-lg"
                onClick={handleClickDelete}
                disabled={fetching}
              >
                삭제하기
              </button>
            </>
          ) : (
            writerEmail === loginState.email || isAdmin ? (
              <button
                className="bg-green-700 hover:bg-green-900 m-1 p-1 text-white w-12 rounded-lg"
                onClick={modReplyHandler}
                disabled={fetching}
              >
                수정
              </button>
            ) : (
              <div className="w-12"></div> // 수정 버튼의 크기만큼 공백 추가
            )
          )}
        </div>
      </div>
    </li>
  );
};

export default ReplyModComponent;
