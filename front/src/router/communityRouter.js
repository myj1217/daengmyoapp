import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const CommunityList = lazy(() =>
  import("../pages/community/ListCommunityPage")
);
const ReadCommunity = lazy(() =>
  import("../pages/community/ReadCommunityPage")
);
const ModCommunity = lazy(() => import("../pages/community/ModCommunityPage"));
const RegCommunity = lazy(() => import("../pages/community/RegCommunityPage"));

const communityRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <CommunityList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/community/list" />,
    },

    {
      path: "register",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <RegCommunity />
        </Suspense>
      ),
    },
    {
      path: "read/:communityBno",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <ReadCommunity />
        </Suspense>
      ),
    },
    {
      path: "modify/:communityBno",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <ModCommunity />
        </Suspense>
      ),
    },
  ];
};
export default communityRouter;
