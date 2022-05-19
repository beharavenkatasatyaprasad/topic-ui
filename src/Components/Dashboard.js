import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getusersWithDissertation } from '../apis';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

export default function Dashboard() {
  const { user } = useSelector((state) => state.userDetails);
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetchUsersWithDissertation();
  }, []);

  const fetchUsersWithDissertation = () => {
    setloading(true);
    getusersWithDissertation(user.id)
      .then((res) => {
        if (res.success) {
          setusers(res.usersWithDissertation);
          setloading(false);
        } else {
          setloading(false);
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='d-flex'>
      <Sidebar />
      <div className='col'>
        <TopHeader title={'Students Matching With Dissertation Topics'} />
        <table className='table table-striped col-10 mx-auto'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Preferences/Topics</th>
            </tr>
          </thead>
          <tbody>
            {users.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.email}</td>
                <td>{a.phone}</td>
                <td>{a.gender}</td>
                <td>{a.preferenceDetails.map((x) => x.label).join(' , ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
