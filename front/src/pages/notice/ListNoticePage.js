import BasicMenu from "../../components/menus/BasicMenu";
import { FaComment } from "react-icons/fa";
import ListNoticeComponent from "../../components/notice/ListNoticeComponent";

const ListNoticePage = () => {
  return (
    <div className="flex flex-col w-full">
      <BasicMenu />
      <div className="h-11 bg-gray-700 text-white flex items-center pl-8 sticky top-0 z-55">
        <FaComment className="w-6 h-6 mr-2" /> 공지사항
      </div>
      <div className="w-full h-full">
        <ListNoticeComponent />
      </div>
    </div>
  );
};

export default ListNoticePage;
