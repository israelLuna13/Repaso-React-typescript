// import { createContext, useEffect, useState } from "react";
// import { getUsersAuth } from "../server";

// const AuthContext =createContext()

// const AuthProvider=({children})=>{
//      const [load, setLoad] = useState(true)//show spinner
//     const [auth, setAuth] = useState({})// state will shared with all other components

//         useEffect(() => {
//         const authenticateUser = async () => {
//             const token = localStorage.getItem('token')
//             if (!token) {
//                 setLoad(false)// replace by spinner
//                 return
//             }
//             //configuration to add bearer token to have acces other routes
//             // const config = {
//             //     headers: {
//             //         "Content-Type": "application/json",
//             //         Authorization: `Bearer ${token}`
//             //     }
//             // }
//             //Get data of user on session and put the data in the global state
//             try {
//                 // const { data } = await clientAxios.get('/veterinarios/profile', config)
//                 // const { data } = await clientAxios.get('/veterinarios/profile')
//                 const response = await getUsersAuth(token)

//                 console.log(response);
                

//                // setAuth(response?.data);
//             } catch (error) {
//                 console.log(error);
//                 setAuth({})
//             }
//             setLoad(false)// here is false because all operations end
//         }
//         authenticateUser()

//     }, [])

//     return(
//         <AuthContext.Provider  value={{auth,setAuth,load,setLoad}} >
//         {children}
//         </AuthContext.Provider>
//     )
// }
// export{
//     AuthProvider
// }

// export default AuthContext