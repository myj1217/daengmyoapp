import BasicMenu from "../../components/menus/BasicMenu";
import { FaComment } from "react-icons/fa";
import ListNoticeComponent from "../../components/notice/ListNoticeComponent";

const ListNoticePage = () => {
  return (
    <div className="flex flex-col w-full">
      <BasicMenu />
      <div className="h-11 bg-emerald-400 bg-gradient-to-b from-emerald-300 via-emerald-400 text-white flex items-center pl-8 sticky top-0 z-50 shadow-md">
        <FaComment className="w-6 h-6 mr-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]" />
        <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">공지사항</p>
      </div>
      <div className="w-full h-full">
        <ListNoticeComponent />
      </div>
    </div>
  );
};

export default ListNoticePage;
