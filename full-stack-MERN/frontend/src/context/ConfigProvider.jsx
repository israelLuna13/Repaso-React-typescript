import { createContext, useState ,useEffect} from "react";
const ConfigContext = createContext()

const ConfigProvider=({children})=>{
    const [token,setToken] = useState(localStorage.getItem('token'))
    const [load,setLoad] = useState(true)

    useEffect(()=>{
        if(!token)
        {
            setLoad(false)
            return
        }
        setLoad(false)        
    },[token])

     //configuration to add bearer token to have acces other routes
     const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    return(
        <ConfigContext.Provider value={{token,setToken,config,load,setLoad}}>
            {children}
        </ConfigContext.Provider>
    )
}

export{
    ConfigProvider
}
export default ConfigContext