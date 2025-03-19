import { useState, useEffect, createContext } from 'react'
import clientAxios from '../config/axios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [load, setLoad] = useState(true)//show spinner
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

    const logout = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    const updateProfile = async (profile) => {
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

        try {
            const url = `/veterinarios/profile/${profile._id}`
            const { data } = await clientAxios.put(url, profile, config)

            return {
                msg: 'Informacion updated'
                , error: false
            }

        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }

    }

    const savePassword = async (datas) => {
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
        try {
            const url = '/veterinarios/update-password'
            const { data } = await clientAxios.put(url, datas, config)


            return {
                msg: data.msg
                , error: false
            }

        } catch (error) {

            return {
                msg: error.response.data.msg,
                error: true
            }


        }

    }

    return (
        //put the value tha all components will have access
        <AuthContext.Provider value={{ auth, setAuth, load, logout, updateProfile, savePassword }}>
            {/* all routes that be inside provide */}
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}

export default AuthContext