import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpninner";
import QnaForm from "../components/qna/QnAFormComponent";

const QnAForm = lazy(() => import("../pages/qna/QnAPage"));

const qnaRouter = () => {
  return [
    {
      path: "form",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <QnAForm />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/qna/form" />,
    },
  ];
};

export default qnaRouter;
