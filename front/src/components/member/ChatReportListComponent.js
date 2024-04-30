import React, { useEffect, useState } from 'react';
import jwtAxios from '../../utils/jwtUtil';
import { API_SERVER_HOST } from '../../api/rootApi';

const ChatReportListComponent = () => {
    const [reportList, setReportList] = useState([]);
    const [sortOrder, setSortOrder] = useState('ASC'); // 처리 여부 정렬 방향 상태

    useEffect(() => {
        fetchReportList();
    }, []);

    const fetchReportList = () => {
        jwtAxios.get(`${API_SERVER_HOST}/api/chat/report`)
            .then(response => {
                const fetchedReportList = response.data.map(report => ({
                    ...report,
                    sendTime: new Date(report.sendTime).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }) // 한국 표준 시간대로 변환
                }));
                setReportList(fetchedReportList);
            })
            .catch(error => {
                console.error('Failed to fetch report list:', error);
            });
    };

    const handleStatusChange = (reportId, completed) => {
        jwtAxios.put(`${API_SERVER_HOST}/api/chat/report/${reportId}?completed=${completed}`)
            .then(response => {
                fetchReportList();
                console.log('Report status updated successfully:', response.data);
            })
            .catch(error => {
                console.error('Failed to update report status:', error);
            });
    };

    const handleSortToggle = () => {
        // 정렬 방향을 토글하여 반대로 설정
        setSortOrder(prevOrder => (prevOrder === 'ASC' ? 'DESC' : 'ASC'));
    };

    // 정렬된 신고 목록
    const sortedReportList = [...reportList].sort((a, b) => {
        if (sortOrder === 'ASC') {
            return a.completed - b.completed;
        } else {
            return b.completed - a.completed;
        }
    });

    return (
        <div>
            <h2 className="text-center my-4">채팅 신고 목록</h2>
            <table className="w-full ">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border  px-4 py-2">신고자</th>
                        <th className="border  px-4 py-2 ">보낸 사람</th>
                        <th className="border  px-4 py-2 w-[150px]">보낸 시간</th>
                        <th className="border  px-4 py-2">메세지</th>
                        <th className="border  px-4 py-2 w-[150px] cursor-pointer" onClick={handleSortToggle}>
                            처리 여부
                            {sortOrder === 'ASC' ? ' ▲' : ' ▼'}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedReportList.map(report => (
                        <tr key={report.id}>
                            <td className="border  px-4 py-2">{report.reporter}</td>
                            <td className="border  px-4 py-2">{report.sender}</td>
                            <td className="border  px-4 py-2">{report.sendTime}</td>
                            <td className="border  px-4 py-2 break-all">{report.message}</td>
                            <td className="border  px-4 py-2">
                                <select onChange={e => handleStatusChange(report.id, e.target.value)} defaultValue={report.completed ? true : false} className="px-2 py-1">
                                    <option value={true}>처리 완료</option>
                                    <option value={false}>처리 미완료</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ChatReportListComponent;
