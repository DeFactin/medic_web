import React, { useState, useEffect } from 'react';
import { useBlock } from '../hooks/useBlock';
import { useUsersContext } from "../hooks/useUsersContext";
import { useAuthContext } from "../hooks/useAuthContext";
import '../style/userDetails.css'
import '../style/userPopUp.css'
import '../style/home.css'
const Home = () => {
  const { users, dispatch } = useUsersContext();
  const { user } = useAuthContext();
  const [showCard, setShowCard] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { block, error } = useBlock();

  useEffect(() => {
    const fetchUsers = async () => {
      if (user) {
        const response = await fetch('/api/users/', {
          headers: { 'Authorization': `Bearer ${user.token}` },
        });
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: 'SET_USERS', payload: json });
        }
      }
    };
    fetchUsers();
  }, [dispatch, user]);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`/api/users/details/${userId}`, {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();
      if (response.ok) {
        setSelectedUser(json); 
        setShowCard(true);
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const blockUser = () => {
    if (selectedUser) {
      block(selectedUser._id);
      setShowCard(false);
    }
  };

  const handleClick = (userDetail) => {
    fetchUserDetails(userDetail._id);
  };

  const handleCloseCard = () => {
    setShowCard(false);
  };

  return (
    <div>
      {showCard && selectedUser && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p className='closeButton' onClick={handleCloseCard}>X</p>
            <div>
              <div>
                <h2>Edit User</h2>
                <form className="grid-form">
                  <div className="partEdit">
                    <div>
                      <label>ID:</label>
                      <input
                        type="text"
                        name="id"
                        value={selectedUser._id}

                      />
                    </div>

                    <div>

                      <label>Name:</label>
                      <input
                        type="text"
                        name="name"
                        value={selectedUser.name}

                      />
                    </div>

                    <div>
                      <label>Username:</label>
                      <input
                        type="text"
                        name="username"
                        value={selectedUser.username}

                      />
                    </div>

                    <div>
                      <label>Orders (0-10):</label>
                      <input
                        type="number"
                        name="orders"
                        value={selectedUser.orders}

                        min="0"
                        max="10"
                      />
                    </div>
                  </div>


                  <div className="partEdit">
                    <div>
                      <label>Last Login:</label>
                      <input
                        type="date"
                        name="lastlog"
                        value={selectedUser.lastlog.split('T')[0]}

                      />
                    </div>

                    <div>
                      <label>Date of Birth:</label>
                      <input
                        type="date"
                        name="dob"
                        value={selectedUser.birthdate.split('T')[0]}

                      />
                    </div>

                    <div>
                      <label>Image URL:</label>
                      <input
                        type="text"
                        name="image"
                        value={selectedUser.image}

                      />
                    </div>

                    <div>
                      <label>Status:</label>
                      <input
                        type="text"
                        name="status"
                        value={selectedUser.status}
                        readOnly
                      />
                    </div>
                  </div>
                </form>
                <div className="buttonWrapper">
                  <button className="blockButton" onClick={blockUser}>Block the User</button>
                  <button type="button">Save</button>
                </div>
                {error && <div className='error'>{error}</div>}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="home-container">
        <div className='users'>
          {users && users.map(userDetail => (
            <div className="card" key={userDetail._id} onClick={() => handleClick(userDetail)}>
              <div className="header">
                <h2>{userDetail.name}</h2>
                <p className="subHeader">@{userDetail.username}</p>
              </div>
              <div className="body">
                <p><strong>ID:</strong> {userDetail._id}</p>
                <p><strong>Last Login:</strong> {userDetail.lastlog ? new Date(userDetail.lastlog).toLocaleDateString() : 'N/A'} </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;