import '../index.css'
import { useLogout } from '../hooks/useLogout'
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useContext(AuthContext) // Use useContext to get the context values

    const handleClick = () => {
        if (user?.username) {
            console.log('Logging out user:', user.username);
            logout(user.username);
        } else {
            console.error('No username found for logout');
        }
    }

    return (
        <div>
            <header>
                <div>
                    <h1>MedicLab</h1>
                </div>
                <div>
                    <button onClick={handleClick}>Log out</button>
                </div>
            </header>
        </div>
    );
}

export default Navbar;
