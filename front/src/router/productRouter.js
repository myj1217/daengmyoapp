import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpninner";

// const Loading = <div>Loading....</div>;
const ProductList = lazy(() => import("../pages/product/ProductListPage"));
const ProductAdd = lazy(() => import("../pages/product/ProductAddPage"));
const ProductRead = lazy(() => import("../pages/product/ProductReadPage"));
const ProductModify = lazy(() => import("../pages/product/ProductModifyPage"));
const ProductSearch = lazy(() => import("../pages/product/ProductSearchPage"));

const productRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <ProductList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/products/list" />,
    },
    {
      path: "add",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <ProductAdd />
        </Suspense>
      ),
    },
    {
      path: "read/:pno",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <ProductRead />
        </Suspense>
      ),
    },
    {
      path: "modify/:pno",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <ProductModify />
        </Suspense>
      ),
    },
    {
      path: "search",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <ProductSearch />
        </Suspense>
      ),
    },
  ];
};

export default productRouter;
