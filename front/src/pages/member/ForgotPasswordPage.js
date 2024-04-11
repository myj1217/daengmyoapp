import ForgotPasswordComponent from "../../components/member/ForgotPasswordComponent";
import BasicMenu from "../../components/menus/Basicmenu.js";

const ForgotPasswordPage = () => {
  return (
    <div className=" top-0 left-0 z-[1055] flex flex-col h-full w-full">
      <BasicMenu />

      <div className="w-full flex flex-wrap  h-full justify-center  items-center">
      <ForgotPasswordComponent />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
