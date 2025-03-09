import { Link } from 'react-router-dom'
export default function Login() {
    return (
        <>
            <div>
                <h1
                    className='text-blue-600 font-black text-6xl'>
                    Login y Administra Tus <span className='text-black'>Pacientes</span></h1>
            </div>
            <div>
                <form action="">
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl text-bold' htmlFor="">Email</label>
                        <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="email" placeholder='Email register' />
                    </div>
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl text-bold' htmlFor="">Password</label>
                        <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="password" placeholder='Your password' />
                    </div>

                    <input type="submit" value="Login" className='bg-blue-700 w-full rounded-xl p-3 text-white uppercase px-10 font-bold mt-5 hover:cursor-pointer hover:bg-blue-900 md:w-auto' />
                </form>

                <div>
                    <nav className='mt-10 lg:flex lg:justify-between'>
                        <Link className='block text-center my-5 text-gray-500' to="/register">Do not have a account? Create one</Link>
                        <Link className='block text-center my-5 text-gray-500' to="/forgot-password">Forgot password</Link>
                    </nav>
                </div>
            </div>
        </>
    )
}
