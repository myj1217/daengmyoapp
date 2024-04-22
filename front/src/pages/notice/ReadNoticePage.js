import { useParams } from "react-router-dom";
import BasicMenu from "../../components/menus/BasicMenu";
import ReadNoticeComponent from "../../components/notice/ReadNoticeComponent";

const ReadNoticePage = () => {
  const { noticeBno } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <BasicMenu />
      <div className="text-3xl font-extrabold">공지사항</div>

      <ReadNoticeComponent noticeBno={noticeBno} />
    </div>
  );
};

export default ReadNoticePage;
