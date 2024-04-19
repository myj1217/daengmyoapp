import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpninner";

const ReplyList = lazy(() =>
  import("../components/community/ReplyListComponent")
);

const communityReplyRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <ReplyList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/community/list" />,
    },
  ];
};
export default communityReplyRouter;
