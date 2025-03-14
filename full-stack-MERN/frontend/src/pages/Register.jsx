import { Link } from 'react-router-dom'
import { useState } from 'react'
import Alert from '../components/Alert'
import clientAxios from '../config/axios.js'
export default function Register() {
  //-------------------------------------
  //each input has one state
  const [name,setName]= useState('')
  const [email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[repitPassword,setRepitPassword] = useState('')
  const [alert,setAlert]= useState({})
  const {msg} = alert

  //-------------------------------------  
  const handleSubmit = async e => {
    e.preventDefault()

    if ([name, email, password, repitPassword].includes('')) {
      setAlert({ msg: 'There are empty inputs', error: true })
      return
    }
    if (password != repitPassword) {
      setAlert({ msg: 'Password are not same', error: true })
      return
    }

    if (password.length < 6) {
      setAlert({ msg: 'The password is very short, add 6 characters', error: true })
      return
    }
    // setAlert({})

    //create user
    try {
      const url = `/veterinarios/register`

      await clientAxios.post(url, {
        name,
        email,
        password
      })
      setAlert({ msg: 'User created', error: false })

    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true })
    }

  }
  
  return (
    <>
      <div>
        <h1
          className='text-blue-600 font-black text-6xl'>
          Create account and manage your <span className='text-black'>Pacientes</span></h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        {/* if there is message error */}
        {msg && <Alert alert={alert} />}

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
            <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="email" placeholder='Email register' value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl text-bold' htmlFor="">Password</label>
            <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="password" placeholder='Your password' value={password}
              onChange={e => setPassword(e.target.value)} />
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl text-bold' htmlFor="">Password again</label>
            <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="password" placeholder='Your password' value={repitPassword}
              onChange={e => setRepitPassword(e.target.value)} />
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
