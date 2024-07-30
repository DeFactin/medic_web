import '../index.css'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const handleClick = () => {
        if (user?.username) {
            console.log('Logging out user:', user.username);
            logout(user.username);
        } else {
            console.error('No username found for logout');
        }
        navigate('/')
    }

    return (
        <div>
            <header>
                <div>
                    <h1>MedicLab</h1>
                </div>
                <br></br>
                <div>
                    {user && (
                        <div>
                            <h1>Welcome User:</h1>
                            <h3>{user.username}</h3>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}

                </div>
            </header>
        </div>
    );
}

export default Navbar;
