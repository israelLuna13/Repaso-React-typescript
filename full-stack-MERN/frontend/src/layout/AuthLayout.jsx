import {Outlet} from 'react-router-dom'

export default function AuthLayout() {
  return (
    <>
        
        <main className='container mx-auto md:grid grid-cols-2 mt-12 gap-12 p-5 items-center'>
        <Outlet/>

        </main>
       
    
    </>
  )
}
