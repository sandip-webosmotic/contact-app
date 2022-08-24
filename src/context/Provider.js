import React, { useState } from 'react'
import { fakeAuthProvider } from '../service/Auth'
import { Navigate, useLocation } from 'react-router-dom'

let AuthContext = React.createContext(null)
const userData = localStorage.getItem('appToken')
  ? JSON.parse(localStorage.getItem('appToken'))
  : null

const AuthProvider = props => {
    const { children } = props
    let [user, setUser] = useState(userData)
  
    let signin = (newUser, callback) => {
      return fakeAuthProvider.signin(() => {
        setUser(newUser)
  
        localStorage.setItem('appToken', JSON.stringify(newUser))
        callback()
      })
    }
  
    let signout = callback => {
      return fakeAuthProvider.signout(() => {
        setUser(null)
        localStorage.removeItem('appToken')
        localStorage.removeItem('loginDetails')
        callback()
      })
    }
  
    let value = { user, signin, signout }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
    return React.useContext(AuthContext)
}  

function RequireAuth({ children, isAuthenticatedPage = true }) {
    let auth = useAuth()
    let location = useLocation()

    if (!auth.user && isAuthenticatedPage) {
      return <Navigate to={'/login'} state={location} replace />
    }

    if (auth.user && !isAuthenticatedPage) {
      return <Navigate to={'/home'} state={location} replace />
    }
    return children
  }

  export default AuthProvider
  export { useAuth, RequireAuth }