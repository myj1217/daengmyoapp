// import { useSearchParams } from "react-router-dom";
import ListCommunityComponent from "../../components/community/ListCommunityComponent";
import BasicMenu from "../../components/menus/BasicMenu";
import { FaComment } from "react-icons/fa";
// import { FaComment } from "react-icons/fa";

const ListPage = () => {
  // const [queryParams] = useSearchParams();

  // const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  // const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;

  return (
    <div className="flex flex-col w-full">
      <BasicMenu />
      <div className="h-11 bg-gray-700 text-white flex items-center pl-8 sticky top-0 z-55">
        <FaComment className="w-6 h-6 mr-2" /> 커뮤니티
      </div>
      <div className="w-full h-full">
        <ListCommunityComponent />
      </div>
    </div>
  );
};

export default ListPage;
