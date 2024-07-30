import './UserCard.css';

const UserDetails = ({ userDetail }) => {
  return (
    <div className="card">
      <div className="header">
        <h2>{userDetail.name}</h2>
        <p className="subHeader">@{userDetail.username}</p>
      </div>
      <div className="body">
        <p><strong>ID:</strong> {userDetail.id}</p>
        <p><strong>Last Login:</strong> {new Date(userDetail.lastLogin).toLocaleString()}</p>
      </div>
    </div>
  )
}

export default UserDetails