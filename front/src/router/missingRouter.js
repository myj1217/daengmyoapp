import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpninner";

const MissingList = lazy(() => import("../pages/missing/MissingListPage"));
const MissingPetReport = lazy(() =>
  import("../pages/missing/MissingPetReportPage")
);
const MissingRead = lazy(() => import("../pages/missing/MissingReadPage"));
const MissingModify = lazy(() => import("../pages/missing/MissingModifyPage"));

const missingRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <MissingList />
        </Suspense>
      ),
    },

    {
      path: "report",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <MissingPetReport />
        </Suspense>
      ),
    },
    {
      path: "read/:mno",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <MissingRead />
        </Suspense>
      ),
    },
    {
      path: "modify/:mno",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <MissingModify />
        </Suspense>
      ),
    },
  ];
};

export default missingRouter;
