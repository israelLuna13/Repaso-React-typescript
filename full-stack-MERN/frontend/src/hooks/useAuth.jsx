import {useContext} from 'react'
import AuthContext from '../context/AuthProvider'
// create state that will return the context
const useAuth= () =>{
    return useContext(AuthContext)
}

export default useAuth