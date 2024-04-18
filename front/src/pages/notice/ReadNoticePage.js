import { useParams } from "react-router-dom";
import ReadCommunityComponent from "../../components/community/ReadCommunityComponent";

const ReadNoticePage = () => {
  const { noticeBno } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">공지사항</div>

      <ReadCommunityComponent noticeBno={noticeBno} />
    </div>
  );
};

export default ReadNoticePage;
