import React, { useState } from 'react';
import '../style/userPopUp.css';

const UserPopUp = ({ userDetail, onSave, onClose }) => {
    const [user, setUser] = useState({ ...userDetail });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSave = () => {
        onSave(user);
        onClose();
    };

    return (
        <div>
            <div>
                <h2>Edit User</h2>
                <form className="grid-form">
                    <div className="partEdit">
                        <label>ID:</label>
                        <input
                            type="text"
                            name="id"
                            value={userDetail._id}
                            onChange={handleChange}
                        />

                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={userDetail.name}
                            onChange={handleChange}
                        />

                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={userDetail.username}
                            onChange={handleChange}
                        />

                        <label>Orders (0-10):</label>
                        <input
                            type="number"
                            name="orders"
                            value={userDetail.orders}
                            onChange={handleChange}
                            min="0"
                            max="10"
                        />
                    </div>
                    <div className="partEdit">
                        <label>Last Login:</label>
                        <input
                            type="date"
                            name="lastlog"
                            value={userDetail.lastlog.split('T')[0]}
                            onChange={handleChange}
                        />

                        <label>Date of Birth:</label>
                        <input
                            type="date"
                            name="dob"
                            value={userDetail.birthdate.split('T')[0]}
                            onChange={handleChange}
                        />

                        <label>Image URL:</label>
                        <input
                            type="text"
                            name="image"
                            value={userDetail.image}
                            onChange={handleChange}
                        />

                        <label>Status:</label>
                        <select
                            name="status"
                            value={userDetail.status}
                            onChange={handleChange}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </form>
                <div className="buttonWrapper">
                    <button type="button" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default UserPopUp;
