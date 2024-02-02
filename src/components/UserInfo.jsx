import React from 'react'
import { useLocation } from 'react-router-dom';

function UserInfo() {
  const location = useLocation();
  const { user } = location.state || {};

  if (!user) {
    return <div>User data not available</div>;
  }

  return (
    <div className='user-info-container d-flex justify-content-center align-items-center'>
        <div className="user-card">
        <div className="user-details">
          <p><span className='text-dark fw-bold'>Name:</span> {user.name}</p>
        </div>
        <div className="user-details">
          <p><span className='text-dark fw-bold'>Username:</span> {user.username}</p>
        </div>
        <div className="user-details">
          <p><span className='text-dark fw-bold'>Email:</span> {user.email}</p>
        </div>
        </div>
    </div>
  )
}

export default UserInfo