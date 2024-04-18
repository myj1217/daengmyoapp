import React, { useEffect, useState } from 'react';
import { getMemberList } from '../../api/memberApi';

const MemberListComponent = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const memberData = await getMemberList();
        setMembers(memberData);
      } catch (error) {
        console.error('Error fetching member list:', error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div>
      <h2>Member List</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Nickname</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {members && members.map((member) => (
            <tr key={member.email}>
              <td>{member.email}</td>
              <td>{member.name}</td>
              <td>{member.nickname}</td>
              <td>{member.number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberListComponent;
