import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpninner";

const AnimalList = lazy(() => import("../pages/animal/AnimalListPage"));
const AnimalAdd = lazy(() => import("../pages/animal/AnimalAddPage"));
const AnimalRead = lazy(() => import("../pages/animal/AnimalReadPage"));
const AnimalModify = lazy(() => import("../pages/animal/AnimalModifyPage"));

const animalRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <AnimalList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/animal/list" />,
    },
    {
      path: "add",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <AnimalAdd />
        </Suspense>
      ),
    },
    {
      path: "read/:ano",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <AnimalRead />
        </Suspense>
      ),
    },
    {
      path: "modify/:ano",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <AnimalModify />
        </Suspense>
      ),
    },
  ];
};

export default animalRouter;
