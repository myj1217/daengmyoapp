import { useParams } from "react-router-dom";
import ReadCommunityComponent from "../../components/community/ReadCommunity";

const ReadCommunityPage = () => {
  const { communityBno } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      {/* <div className="text-3xl font-extrabold">상품 정보</div> */}

      <ReadCommunityComponent
        communityBno={communityBno}
      ></ReadCommunityComponent>
    </div>
  );
};

export default ReadCommunityPage;
