import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const { user } = useSelector((state) => state.userDetails);

  let loc = location.pathname.split('/');
  const currentPath = loc[loc.length - 1];

  return (
    <div className='side-bar bg-dark'>
      <div className='mx-3 mt-3'>
        {user.userTypeId == 1 && (
          <div className='col side-bar-item mb-3'>
            <Link to={'/dashboard'} className={currentPath === 'dashboard' ? 'active' : ''}>
              Dashboard
            </Link>
          </div>
        )}
        <div className='col side-bar-item mb-3'>
          <Link to={'/manage-preferences'} className={currentPath === 'manage-preferences' ? 'active' : ''}>
            Manage Topics / Preferences
          </Link>
        </div>
        <div className='col side-bar-item mb-3'>
          <Link to={'/manage-profile'} className={currentPath === 'manage-profile' ? 'active' : ''}>
            Manage Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
