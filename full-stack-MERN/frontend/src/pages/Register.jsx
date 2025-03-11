import { Link } from 'react-router-dom'
import { useState } from 'react'
import Alert from '../components/Alert'
export default function Register() {
  const [name,setName]= useState('')
  const [email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[repitPassword,setRepitPassword] = useState('')

  const [alert,setAlert]= useState({})
  const {msg} = alert
  const handleSubmit = e => {
    e.preventDefault()
    if ([name, email, password, repitPassword].includes('')) {
      setAlert({msg:'There are empty inputs',error:true})
      return
    }
    if (password != repitPassword) {
      setAlert({msg:'password are not same',error:true})
      return
    }

    if (password.length < 6) {
      setAlert({msg:'The password is short, add 6 characters',error:true})
      return
    }
    setAlert({})

    //create user

  }
  
  return (
    <>
      <div>
        <h1
          className='text-blue-600 font-black text-6xl'>
          Create account and manage your <span className='text-black'>Pacientes</span></h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        { msg &&  <Alert alert={alert}/>}
        <form action="" onSubmit={handleSubmit}>
       
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl text-bold' htmlFor="">Name</label>
            <input 
            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
             type="text" 
             placeholder='Your name' 
             value={name}
             onChange={e => setName(e.target.value)} />

            
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl text-bold' htmlFor="">Email</label>
            <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="email" placeholder='Email register'value={email} onChange={e=>setEmail(e.target.value)}/>
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl text-bold' htmlFor="">Password</label>
            <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="password" placeholder='Your password' value={password}
            onChange={ e => setPassword(e.target.value)}/>
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl text-bold' htmlFor="">Password again</label>
            <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="password" placeholder='Your password' value={repitPassword} 
            onChange={e => setRepitPassword(e.target.value)}/>
          </div>

          <input type="submit" value="Create account" className='bg-blue-700 w-full rounded-xl p-3 text-white uppercase px-10 font-bold mt-5 hover:cursor-pointer hover:bg-blue-900 md:w-auto' />
        </form>

        <div>
          <nav className='mt-10 lg:flex lg:justify-between'>
            <Link className='block text-center my-5 text-gray-500' to="/">Do you have a account? Login</Link>
            <Link className='block text-center my-5 text-gray-500' to="/forgot-password">Forgot password</Link>
          </nav>
        </div>
      </div>

    </>
  )
}
