import React, { useRef, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import { useSelector } from "react-redux";
import { regCommunity } from "../../api/communityApi";
import { Navigate } from "react-router-dom";

const initState = {
  communityTitle: "",
  communityContent: "",
  communityWriter: "",
  files: [],
  imagesPreview: [], // 업로드한 이미지 미리보기 배열
};

const RegCommunityComponent = () => {
  const loginState = useSelector((state) => state.loginSlice);

  const [community, setCommunity] = useState({ ...initState });
  const uploadRef = useRef();

  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);
  const { moveToList } = useCustomMove();

  const handleChangeCommunity = (e) => {
    community[e.target.name] = e.target.value;
    setCommunity({ ...community });
  };

  // 이미지 미리보기 업데이트 함수
  const updatePreviewImages = () => {
    const previewImages = [];
    const files = uploadRef.current.files;

    for (let i = 0; i < files.length; i++) {
      previewImages.push(URL.createObjectURL(files[i]));
    }
    setCommunity({ ...community, imagesPreview: previewImages });
  };

  const handleClickReg = async (e) => {
    const files = uploadRef.current.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    formData.append("communityTitle", community.communityTitle);
    formData.append("communityContent", community.communityContent);
    formData.append("communityWriter", loginState.nickname);
    formData.append("communityWriterEmail", loginState.email);

    // 이미지를 첨부한 경우에만 FormData에 이미지 추가
    // if (uploadRef.current.files.length > 0) {
    //   const files = uploadRef.current.files;
    //   for (let i = 0; i < files.length; i++) {
    //     formData.append("files", files[i]);
    //   }
    // }

    setFetching(true);

    regCommunity(formData).then((data) => {
      setFetching(false);
      setResult(data.result);
    });
  };

  const closeModal = () => {
    setResult(null);
    moveToList();
  };

  const handleClickList = () => {
    Navigate({ pathname: "../" });
  };

  return (
    <div className="border-2 border-gray-300 mt-10 m-2 p-4">
      {fetching && <FetchingModal />}
      {result && (
        <ResultModal
          title="게시글 등록 결과"
          content="성공적으로 게시글이 등록되었습니다."
          callbackFn={closeModal}
        />
      )}
      <div className="flex flex-col">
        <div className="mb-4 flex items-center">
          <label className="w-1/5 p-6 text-right font-bold">작성자</label>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="communitydWriter"
            type="text"
            value={loginState.nickname}
            onChange={handleChangeCommunity}
            readOnly
          />
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-1/5 p-6 text-right font-bold">제목</label>
          <textarea
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="communityTitle"
            value={community.communityTitle}
            onChange={handleChangeCommunity}
          />
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-1/5 p-6 text-right font-bold">내용</label>
          <textarea
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="communityContent"
            value={community.communityContent}
            onChange={handleChangeCommunity}
            style={{ height: "100px" }}
          />
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-1/5 p-6 text-right font-bold">파일</label>
          <input
            ref={uploadRef}
            className="md:col-span-2 form-input rounded-md border-gray-300 shadow-sm bg-gray-50"
            type="file"
            multiple
            onChange={updatePreviewImages}
          />
        </div>

        <div className="flex justify-end">
          <div className="md:col-span-1"></div>
          <div className="md:col-span-2 grid grid-cols-3 gap-2">
            {community.imagesPreview.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index}`}
                className="rounded-md"
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="rounded mx-2 p-4 w-36 bg-emerald-500 hover:bg-emerald-600 text-xl text-white shadow-md"
            onClick={handleClickReg}
          >
            등록하기
          </button>
          <button
            type="button"
            className="rounded mx-2 p-4 w-36 bg-emerald-500 hover:bg-emerald-600  text-xl text-white shadow-md"
            onClick={handleClickList}
          >
            목록으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegCommunityComponent;
