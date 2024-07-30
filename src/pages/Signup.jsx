import { useState } from "react"
import '../index.css'
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
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Register a User</h3>

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

            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}

export default SignupForm
