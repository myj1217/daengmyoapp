import React, { useEffect, useState } from 'react';
import { getMemberList,changeRole } from '../../api/memberApi';

const MemberListComponent = () => {
  const [members, setMembers] = useState([]);
  const [roleChanges, setRoleChanges] = useState({}); // 각 회원의 변경된 권한을 저장하는 상태
  const fetchMembers = async () => {
    try {
      const memberData = await getMemberList();
      setMembers(memberData);
    } catch (error) {
      console.error('Error fetching member list:', error);
    }
  };

  useEffect(() => {
  
    fetchMembers();
  }, []);

  const handleRoleChange = (email, newRole) => {
    setRoleChanges({
      ...roleChanges,
      [email]: newRole,
    });
  };
  

  const handleSubmit = async () => {
    try {
      // roleChanges 객체의 각 회원을 반복하고 권한 변경 요청을 하나씩 순차적으로 처리합니다.
      for (const [email, newRole] of Object.entries(roleChanges)) {
        await changeRole({ email, newRole });
      }
      console.log('Role changes:', roleChanges);
      // 모든 변경 내용이 저장되었으므로 roleChanges를 초기화합니다.
      setRoleChanges({});
      // 회원 정보가 수정되었으므로 회원 목록을 다시 가져옵니다.
      fetchMembers();
      alert("변경 사항이 저장 되었습니다.");
    } catch (error) {
      console.error('회원 권한 업데이트 중 오류 발생:', error);
    }
  };
  
  

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="p-2 border-b-2 w-full text-center">전체 회원 목록</div>
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">이메일</th>
              <th className="px-4 py-2">이름</th>
              <th className="px-4 py-2">닉네임</th>
              <th className="px-4 py-2">전화번호</th>
              <th className="px-4 py-2">권한</th>
              <th className="px-4 py-2">권한 변경</th>
            </tr>
          </thead>
          <tbody>
            {members && members.map((member) => (
              <tr key={member.email} className="border-b">
                <td className="px-4 py-2">{member.email}</td>
                <td className="px-4 py-2">{member.name}</td>
                <td className="px-4 py-2">{member.nickname}</td>
                <td className="px-4 py-2">{member.number}</td>
                <td className="px-4 py-2">{member.memberRoleList.join(', ')}</td>
                <td className="px-4 py-2">
                  <select
                    value={roleChanges[member.email] || ''}
                    onChange={(e) => handleRoleChange(member.email, e.target.value)}
                  >
                    <option value="">선택</option>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSubmit}>
        변경 사항 저장
      </button>
    </div>
  );
};

export default MemberListComponent;
