import { useState } from "react"
import '../style/userPopUp.css'
import { useSignup } from "../hooks/useSignup"


const SignupForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [orders, setOrders] = useState(0)
    const [image, setImage] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(username, password, name, orders, image, birthdate)
    }

    return (
        <div>
            <h3>Register a User</h3>
            <form className="grid-form" onSubmit={handleSubmit}>
                <div className="partEdit">
                    <label>Username:</label>
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />

                    <label>Name:</label>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                </div>
                <div className="partEdit">
                    <label>Orders:</label>
                    <input
                        type="number"
                        min="0"
                        max="10"
                        onChange={(e) => setOrders(e.target.value)}
                        value={orders}
                        required
                    />

                    <label>Image:</label>
                    <input
                        type="text"
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                        required
                    />

                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        onChange={(e) => setBirthdate(e.target.value)}
                        value={birthdate}
                        required
                    />
                </div>
            </form>
            <div className="signupWrapper">
                <button disabled={isLoading} onClick={handleSubmit}>Sign up</button>
                {error && <div className="error">{error}</div>}
            </div>
        </div>
    )
}

export default SignupForm
