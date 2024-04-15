import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;
const CartList = lazy(() => import("../pages/cart/CartPage"));

const cartRouter = () => {
  return [
    {
      path: "item",
      element: (
        <Suspense fallback={Loading}>
          <CartList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/cart/item" />,
    },
  ];
};

export default cartRouter;
