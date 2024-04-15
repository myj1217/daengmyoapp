import RegisterComponent from "../../components/member/RegisterComponent";
import BasicMenu from "../../components/menus/BasicMenu";

const LoginPage = () => {
  return (
    <div className=" top-0 left-0 z-[1055] flex flex-col h-full w-full">
      <BasicMenu />

      <div className="w-full flex flex-wrap  h-full justify-center  items-center border-2">
        <RegisterComponent />
      </div>
    </div>
  );
};

export default LoginPage;
