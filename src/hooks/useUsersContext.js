import { UserContext } from '../context/usersContext'
import { useContext } from 'react'

export const useUsersContext = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw Error('useUsersContext must be used inside an UsersContextProvider')
  }

  return context
}