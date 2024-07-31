import '../style/userDetails.css'
import React, { useState } from 'react';
import UserPopUp from './userPopUp'

const UserDetails = ({ userDetail }) => {
  const [showCard, setShowCard] = useState(false);
  const handleClick = () => {
    setShowCard(true);
  }

  const handleCloseCard = () => {
    setShowCard(false);
  };

  return (
    <div>
      <div className="card" onClick={handleClick}>
        <div className="header">
          <h2>{userDetail.name}</h2>
          <p className="subHeader">@{userDetail.username}</p>
        </div>
        <div className="body">
          <p><strong>ID:</strong> {userDetail._id}</p>
          <p><strong>Last Login:</strong> {new Date(userDetail.lastlog).toDateString()}</p>
        </div>
      </div>
      {showCard && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p className='closeButton' onClick={handleCloseCard}>X</p>
            <UserPopUp key={userDetail._id} userDetail={userDetail} />
          </div>
        </div>
      )}
    </div>

  )
}

export default UserDetails