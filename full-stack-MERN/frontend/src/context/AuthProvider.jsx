import { useState, useEffect, createContext } from 'react'
import clientAxios from '../config/axios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})// state will shared with all other components
    useEffect(() => {

        const authenticateUser = async () => {
            const token = localStorage.getItem('token')
            if (!token) return

            //configuration to add bearer token to have acces other routes
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            //Get data of user on session and put the data in the global state
            try {
                const { data } = await clientAxios.get('/veterinarios/profile', config)
                setAuth(data.profile);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({})
            }
        }
        authenticateUser()

    }, [])

    return (
        //put the value tha all components will have access
        <AuthContext.Provider value={{ auth, setAuth }}>
            {/* all routes that be inside provide */}
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}

export default AuthContext