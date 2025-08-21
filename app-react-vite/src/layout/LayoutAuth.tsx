import {Outlet} from 'react-router-dom'
import { ToastContainer } from "react-toastify";

export default function LayoutAuth() {
  return (
  <>
        
        <main className='container mx-auto md:grid grid-cols-2 mt-12 gap-12 p-5 items-center'>
        <Outlet/>

        </main>
        <ToastContainer/>
       
    
    </>
  )
}
