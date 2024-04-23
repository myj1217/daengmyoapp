import { useParams } from "react-router-dom";
import ReadCommunityComponent from "../../components/community/ReadCommunityComponent";
import BasicMenu from "../../components/menus/BasicMenu";
import ReplyListComponent from "../../components/community/ReplyListComponent";

const ReadCommunityPage = () => {
  const { communityBno } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <BasicMenu />
      <ReadCommunityComponent communityBno={communityBno} />
      {/* <ReplyListComponent communityBno={communityBno} /> */}
    </div>
  );
};

export default ReadCommunityPage;
