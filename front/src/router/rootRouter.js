import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import productRouter from "./productRouter";
import memberRouter from "./memberRouter";
import cartRouter from "./cartRouter";
import LoadingSpinner from "./LoadingSpninner";
// import communityRouter from "./communityRouter";

const Main = lazy(() => import("../pages/etc/MainPage"));
const Product = lazy(() => import("../pages/product/ProductListPage"));
const Cart = lazy(() => import("../pages/cart/CartPage"));
// const FAQ = lazy(() => import("../pages/FAQ"));
// const InquiryForm = lazy(() => import("../components/InquiryForm"));
// const MonthArtistPage = lazy(() => import("../pages/MonthArtistPage"));
const Community = lazy(() => import("../pages/community/ListCommunityPage"));
const ErrorPage = lazy(() => import("../pages/etc/ErrorPage"));

const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "products",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Product />
      </Suspense>
    ),
    children: productRouter(),
  },
  {
    path: "member",
    children: memberRouter(),
  },
  {
    path: "cart",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Cart />
      </Suspense>
    ),
    children: cartRouter(),
  },
  // {
  //   path: "about",
  //   element: (
  //     <Suspense fallback={<LoadingSpinner />}>
  //       <FAQ />
  //       <InquiryForm />
  //     </Suspense>
  //   ),
  // },
  // {
  //   path: "month",
  //   element: (
  //     <Suspense fallback={<LoadingSpinner />}>
  //       <MonthArtistPage />
  //     </Suspense>
  //   ),
  // },
  {
    path: "community",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Community />
      </Suspense>
    ),
  },

  {
    path: "/*",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ErrorPage />
      </Suspense>
    ),
  },
]);

export default rootRouter;
