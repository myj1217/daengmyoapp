import React, { useRef, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import { useSelector } from "react-redux";
import { regCommunity } from "../../api/communityApi";

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

  return (
    <div className="max-w-4xl mx-auto my-10 border rounded-lg shadow-lg overflow-hidden">
      {fetching && <FetchingModal />}
      {result && (
        <ResultModal
          title="게시글 등록 결과"
          content="성공적으로 게시글이 등록되었습니다."
          callbackFn={closeModal}
        />
      )}
      <form className="space-y-6 bg-white p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <label className="md:col-span-1 flex items-center justify-end text-lg font-medium text-gray-700">
            작성자
          </label>
          <input
            className="md:col-span-2 form-input rounded-md border-gray-300 shadow-sm"
            name="communitydWriter"
            type={"text"}
            value={loginState.nickname}
            onChange={handleChangeCommunity}
            readOnly
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <label className="md:col-span-1 flex items-center justify-end text-lg font-medium text-gray-700">
            제목
          </label>
          <textarea
            className="md:col-span-2 form-textarea rounded-md border-gray-300 shadow-sm resize-none"
            name="communityTitle"
            type={"text"}
            value={community.communityTitle}
            onChange={handleChangeCommunity}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <label className="md:col-span-1 flex items-center justify-end text-lg font-medium text-gray-700">
            내용
          </label>
          <input
            className="md:col-span-2 form-input rounded-md border-gray-300 shadow-sm"
            name="communityContent"
            // type={"text"}
            rows="4"
            value={community.communityContent}
            onChange={handleChangeCommunity}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <label className="md:col-span-1 flex items-center justify-end text-lg font-medium text-gray-700">
            파일
          </label>
          <input
            ref={uploadRef}
            className="md:col-span-2 form-input rounded-md border-gray-300 shadow-sm"
            type={"file"}
            multiple={true}
            onChange={updatePreviewImages}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            className="btn bg-gray-600 hover:bg-black-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleClickReg}
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegCommunityComponent;
