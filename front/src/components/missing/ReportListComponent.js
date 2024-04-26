import React, { useEffect, useState } from "react";
import { replyList } from "../../api/missingReplyApi";
import ReportItemComponent from "./ReportItemComponent";
import { useNavigate } from "react-router-dom";

const ReportListComponent = ({ mno }) => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    replyList(mno)
      .then((data) => {
        setReports(data.dtoList || []);
      })
      .catch((error) => {
        console.error("Failed to load reports:", error);
        alert("제보를 불러오는데 실패했습니다.");
      });
  }, [mno]);

  return (
    <div className="w-full bg-white shadow-md rounded-lg mt-4 p-4">
      <div className="text-lg font-semibold mb-4">
        {reports.length > 0
          ? `목격제보 (${reports.length})`
          : "아직 목격제보가 없습니다"}
      </div>
      <ul>
        {reports.map((report) => (
          <ReportItemComponent key={report.mrno} {...report} />
        ))}
      </ul>
    </div>
  );
};

export default ReportListComponent;
