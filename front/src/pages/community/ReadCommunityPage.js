import { useParams } from "react-router-dom";
import ReadCommunityComponent from "../../components/community/ReadCommunityComponent";

const ReadCommunityPage = () => {
  const { communityBno } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">커뮤니티</div>

      <ReadCommunityComponent
        communityBno={communityBno}
      ></ReadCommunityComponent>
    </div>
  );
};

export default ReadCommunityPage;
