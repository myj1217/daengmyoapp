import React, { useEffect, useState } from 'react';
import { getMemberList, changeRole, deleteMembers } from '../../api/memberApi';

const MemberListComponent = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [roleChanges, setRoleChanges] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [searchBy, setSearchBy] = useState('email');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [selectedMembers, setSelectedMembers] = useState([]); // 선택된 회원들의 이메일을 추적하는 상태

  const fetchMembers = async () => {
    try {
      const memberData = await getMemberList();
      setMembers(memberData);
      setFilteredMembers(memberData);
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

  const handleCheckboxChange = (email) => {
    // 선택된 회원 목록에 이미 있는지 확인하여 추가 또는 제거
    setSelectedMembers(prevSelected => {
      if (prevSelected.includes(email)) {
        return prevSelected.filter(member => member !== email);
      } else {
        return [...prevSelected, email];
      }
    });
  };

  const handleDeleteMembers = async () => {
    try {
      // await deleteMembers(selectedMembers); // 선택된 회원들의 이메일을 백엔드로 전송하여 삭제
      fetchMembers(); // 회원 목록 다시 불러오기
      setSelectedMembers([]); // 선택된 회원 목록 초기화
      alert('선택된 회원이 삭제되었습니다.');
    } catch (error) {
      console.error('회원 삭제 중 오류 발생:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      for (const [email, newRole] of Object.entries(roleChanges)) {
        await changeRole({ email, newRole });
      }
      console.log('Role changes:', roleChanges);
      setRoleChanges({});
      fetchMembers();
      alert('변경 사항이 저장되었습니다.');
    } catch (error) {
      console.error('회원 권한 업데이트 중 오류 발생:', error);
    }
  };

  const handleSearch = () => {
    let filtered = [];
    if (searchInput.trim() === '') {
      filtered = members;
    } else {
      if (searchBy === 'email') {
        filtered = members.filter(member => member.email.includes(searchInput));
      } else if (searchBy === 'nickname') {
        filtered = members.filter(member => member.nickname.includes(searchInput));
      } else if (searchBy === 'name') {
        filtered = members.filter(member => member.name.includes(searchInput));
      } else if (searchBy === 'number') {
        filtered = members.filter(member => member.number.includes(searchInput));
      }
    }
    setFilteredMembers(filtered);
  };

  const sortByRole = () => {
    const order = sortOrder === 'ASC' ? 'DESC' : 'ASC';
    setSortOrder(order);
    const sortedMembers = [...filteredMembers].sort((a, b) => {
      if (order === 'ASC') {
        return a.memberRoleList.includes('ADMIN') ? -1 : 1;
      } else {
        return a.memberRoleList.includes('ADMIN') ? 1 : -1;
      }
    });
    setFilteredMembers(sortedMembers);
  };

  const getArrowDirection = () => {
    if (sortOrder === 'ASC') {
      return '▼';
    } else {
      return '▲';
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="p-2 border-b-2 w-full text-center">전체 회원 목록</div>
      <div className="flex justify-center items-center mt-4">
        <input
          type="text"
          placeholder={`검색할 ${searchBy === 'email' ? '이메일' : searchBy === 'nickname' ? '닉네임' : searchBy === 'name' ? '이름' : '전화번호'} 입력`}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="mr-2 px-2 py-1 border rounded"
        />
        <select
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          className="mr-2 px-2 py-1 border rounded"
        >
          <option value="email">이메일</option>
          <option value="nickname">닉네임</option>
          <option value="name">이름</option>
          <option value="number">전화번호</option>
        </select>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSearch}>
          검색하기
        </button>
      </div>
      <div className="w-full overflow-x-auto mt-4">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">이메일</th>
              <th className="px-4 py-2">이름</th>
              <th className="px-4 py-2">닉네임</th>
              <th className="px-4 py-2">전화번호</th>
              <th className="px-4 py-2 cursor-pointer" onClick={sortByRole}>
                권한 {getArrowDirection()}
              </th>
              <th className="px-4 py-2">권한 변경</th>
              <th className="px-4 py-2">삭제</th> {/* 삭제 버튼 열 */}
            </tr>
          </thead>
          <tbody>
            {filteredMembers && filteredMembers.map((member) => (
              <tr key={member.email} className="border-b">
                <td className="px-4 py-2 text-center">{member.email}</td>
                <td className="px-4 py-2 text-center">{member.name}</td>
                <td className="px-4 py-2 text-center">{member.nickname}</td>
                <td className="px-4 py-2 text-center">{member.number}</td>
                <td className="px-4 py-2 text-center">{member.memberRoleList.join(', ')}</td>
                <td className="px-4 py-2 text-center">
                  <select
                    value={roleChanges[member.email] || ''}
                    onChange={(e) => handleRoleChange(member.email, e.target.value)}
                  >
                    <option value="">선택</option>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
                <td className="px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(member.email)} // 해당 회원이 선택되었는지 확인
                    onChange={() => handleCheckboxChange(member.email)} // 체크박스 변경 이벤트
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end w-full mt-4">
        <button className="mr-4 px-4 py-2 bg-red-500 text-white rounded" onClick={handleDeleteMembers}>
          회원 삭제
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSubmit}>
          변경 사항 저장
        </button>
      </div>
    </div>
  );
};

export default MemberListComponent;
