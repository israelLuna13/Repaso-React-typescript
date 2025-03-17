import { useState, useEffect, createContext } from 'react'
import clientAxios from '../config/axios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [load,setLoad]=useState(true)//show spinner
    const [auth, setAuth] = useState({})// state will shared with all other components

    //when the component be fine will check if there is user on sesion
    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                setLoad(false)// replace by spinner
                return
            }
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
            setLoad(false)// here is false because all operations end
        }
        authenticateUser()

    }, [])

    const logout = ()=>{
        localStorage.removeItem('token')
        setAuth({})
    }

    return (
        //put the value tha all components will have access
        <AuthContext.Provider value={{ auth, setAuth,load ,logout}}>
            {/* all routes that be inside provide */}
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}

export default AuthContext