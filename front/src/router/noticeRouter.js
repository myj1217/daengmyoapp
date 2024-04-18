import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpninner";

const NoticeList = lazy(() => import("../pages/notice/ListNoticePage"));
const ReadNotice = lazy(() => import("../pages/notice/ReadNoticePage"));
const ModNotice = lazy(() => import("../pages/notice/ModNoticePage"));
const RegNotice = lazy(() => import("../pages/notice/RegNoticePage"));

const noticeRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <NoticeList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/notice/list" />,
    },

    {
      path: "register",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <RegNotice />
        </Suspense>
      ),
    },
    {
      path: "read/:noticeBno",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <ReadNotice />
        </Suspense>
      ),
    },
    {
      path: "modify/:noticeBno",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <ModNotice />
        </Suspense>
      ),
    },
  ];
};
export default noticeRouter;
