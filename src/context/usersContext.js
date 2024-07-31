import { createContext, useReducer } from 'react'

export const UserContext = createContext()

export const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                users: action.payload
            }
        case 'REGISTER':
            return{
                users: [action.payload, ...state.users]
            }
        default:
            return state
    }
}

export const UsersContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, {
        users: null
    })

    return (
        <UserContext.Provider value={{ ...state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}