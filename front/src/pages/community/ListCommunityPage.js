// import { useSearchParams } from "react-router-dom";
import ListCommunityComponent from "../../components/community/ListCommunityComponent";
import BasicMenu from "../../components/menus/BasicMenu";
import { FaComment } from "react-icons/fa";

const ListCommunityPage = () => {
  return (
    <div className="flex flex-col w-full">
      <BasicMenu />
      <div className="h-11 bg-emerald-500 text-white flex items-center pl-8 sticky top-0 z-55">
        <FaComment className="w-6 h-6 mr-2" /> 커뮤니티
      </div>
      <div className="w-full h-full">
        <ListCommunityComponent />
      </div>
    </div>
  );
};

export default ListCommunityPage;
