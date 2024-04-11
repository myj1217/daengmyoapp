import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
// import productsRouter from "./productsRouter";
import memberRouter from "./memberRouter";
// import cartRouter from "./cartRouter";
import LoadingSpinner from "./LoadingSpninner";
// import communityRouter from "./communityRouter";

const Main = lazy(() => import("../pages/etc/MainPage"));
// const ProductsRouter = lazy(() => import("../pages/products/IndexPage"));
// const Cart = lazy(() => import("../pages/CartPage"));
// const FAQ = lazy(() => import("../pages/FAQ"));
// const Community = lazy(() => import("../pages/CommunityPage"));
const ErrorPage = lazy(() => import("../pages/etc/ErrorPage"));

const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Main />
      </Suspense>
    ),
  },
  // {
  //   path: "products",
  //   element: (
  //     <Suspense fallback={<LoadingSpinner />}>
  //       <ProductsRouter />
  //     </Suspense>
  //   ),
  //   children: productsRouter(),
  // },
  {
    path: "member",
    children: memberRouter(),
  },
  // {
  //   path: "cart",
  //   element: (
  //     <Suspense fallback={<LoadingSpinner />}>
  //       <Cart />
  //     </Suspense>
  //   ),
  //   children: cartRouter(),
  // },
  // {
  //   path: "community",
  //   element: (
  //     <Suspense fallback={<LoadingSpinner />}>
  //       <Community />
  //     </Suspense>
  //   ),
  // },
  // {
  //   path: "comboard",
  //   element: (
  //     <Suspense fallback={<LoadingSpinner />}>
  //       <Community />
  //     </Suspense>
  //   ),
  //   children: communityRouter(),
  // },
  {
    path: "/*",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ErrorPage />
      </Suspense>
    ),
  },
]);

export default root;
