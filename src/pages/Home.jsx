import React, { useState, useEffect } from 'react';
import { useBlock } from '../hooks/useBlock';
import { useUsersContext } from "../hooks/useUsersContext";
import { useAuthContext } from "../hooks/useAuthContext";
import '../style/userDetails.css'
import '../style/userPopUp.css'
import '../style/home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { users, dispatch } = useUsersContext();
  const { user } = useAuthContext();
  const [showCard, setShowCard] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { block } = useBlock();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsLoading(true);
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
    setIsLoading(false);
  }, [dispatch, user]);

  const fetchUserDetails = async (userId) => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const blockUser = async () => {
    if (selectedUser) {
      setIsLoading(true); // Start loading
      await block(selectedUser._id);
      setIsLoading(false); // End loading
      setShowCard(false);
    }
  };

  const handleClick = (userDetail) => {
    fetchUserDetails(userDetail._id);
    setUserData(userDetail);
  };

  const handleCloseCard = () => {
    setShowCard(false);
    setError(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/users/update/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(userData),
      });

      const json = await response.json()
      if (response.ok) {
        console.log('User data updated successfully');
        navigate(0)
      } else {
        setError(json.error)
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>


      {showCard && selectedUser && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p className='closeButton' onClick={handleCloseCard}>X</p>
            <div>
              <div>
                <div className="user-details-container">
                  <img className="profile-image" src={userData.image} alt="profile" />
                  <h2 className="user-details-title">User Details</h2>
                </div>
                <form className="grid-form">
                  <div className="partEdit">
                    <div>
                      <label>ID:</label>
                      <input
                        type="text"
                        name="_id"
                        value={userData._id}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label>Name:</label>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label>Username:</label>
                      <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label>Orders (0-10):</label>
                      <input
                        type="number"
                        name="orders"
                        value={userData.orders}
                        onChange={handleChange}
                        min="0"
                        max="10"
                        step="1"
                      />
                    </div>
                  </div>

                  <div className="partEdit">
                    <div>
                      <label>Last Login:</label>
                      <input
                        type="date"
                        name="lastlog"
                        value={userData.lastlog ? new Date(userData.lastlog).toISOString().split('T')[0] : ''}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label>Date of Birth:</label>
                      <input
                        type="date"
                        name="birthdate"
                        value={userData.birthdate ? new Date(userData.birthdate).toISOString().split('T')[0] : ''}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label>Image URL:</label>
                      <input
                        type="text"
                        name="image"
                        value={userData.image}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label>Status:</label>
                      <input
                        type="text"
                        name="status"
                        value={userData.status}
                        readOnly
                      />
                    </div>
                  </div>
                </form>
                <div className="buttonWrapper">
                  <button className="blockButton" onClick={blockUser}>{userData.status === 'active' ? 'Block' : 'Unblock'} the User</button>
                  <button className='saveButton' onClick={handleSave} type="button">Save</button>
                </div>
                {error && <div className="error-save">{error}</div>}
                {isLoading && (
                  <div className="spinner-overlay">
                    <div className="spinner"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="home-container">
        <div className="role-admin">
          <h2 className='roles'>ADMINS</h2>
          <div className='users'>
            {users && users.filter(userDetail => userDetail.role === 'Admin').map(userDetail => (
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

        <div className="role-employee">
          <h2 className='roles'>EMPLOYEES</h2>
          <div className='users'>
            {users && users.filter(userDetail => userDetail.role === 'Employee').map(userDetail => (
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

    </div>
  );
};

export default Home;