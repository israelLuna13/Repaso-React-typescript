import { createContext, useEffect, useState, type ReactNode } from "react";
import { getUsersAuth } from "../server";
import type { User } from "../schema";

interface AuthProviderProps {
  children: ReactNode
}

//Context type
interface AuthContextType {
  auth: User[]
  setAuth: React.Dispatch<React.SetStateAction<User[]>>
  load: boolean
  setLoad: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextType>({
  auth: [],
  setAuth: () => {},
  load: true,
  setLoad: () => {}
})

const AuthProvider=({children}:AuthProviderProps)=>{
     const [load, setLoad] = useState(true)//show spinner
    const [auth, setAuth] = useState<User[] >([])// state will shared with all other components

        useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('token')
            
            if (!token) {
                setLoad(false)// replace by spinner
                setAuth([])                
                return
            }
            //Get data of user on session and put the data in the global state
            try {
                const response = await getUsersAuth(token)
                
                if(response?.data){
                        setAuth(response.data);
                }      

            } catch (error) {
                console.log(error);
                setAuth([])
            }
            setLoad(false)// here is false because all operations end
        }
        authenticateUser()

    }, [])

   return (
    <AuthContext.Provider value={{ auth, setAuth, load, setLoad }}>
      {children}
    </AuthContext.Provider>
  )
}
export{
    AuthProvider
}
export default AuthContext