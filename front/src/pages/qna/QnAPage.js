import BasicMenu from "../../components/menus/BasicMenu";
import { FaComment } from "react-icons/fa";
import QnAFormComponent from "../../components/qna/QnAFormComponent";
import FAQComponent from "../../components/qna/FAQComponent";

const QnAPage = () => {
  return (
    <div className="flex flex-col w-full">
      <BasicMenu />
      <div className="h-11  bg-emerald-500 text-white flex items-center pl-8 sticky top-0 z-55">
        <FaComment className="w-6 h-6 mr-2" /> 문의하기
      </div>
      <div className="w-full h-full">
        <div className="mt-8">
          <FAQComponent />
        </div>
        <div className="mt-10">
          <QnAFormComponent />
        </div>
      </div>
    </div>
  );
};

export default QnAPage;
