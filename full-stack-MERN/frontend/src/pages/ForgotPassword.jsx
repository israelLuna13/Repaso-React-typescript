import { Link } from "react-router-dom"
import Alert from "../components/Alert"
import { useState } from "react"
import clientAxios from "../config/axios"
export default function ForgotPassword() {

  const [email, setEmail] = useState('')
  const [alert, setAlert] = useState({})

  const { msg } = alert

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (email === '') {
      setAlert({ msg: 'Email is required', error: true })
      return
    }

    try {
      const { data } = await clientAxios.post('/veterinarios/forgot-password', { email })
      setAlert({ msg: data.msg })


    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true })
    }

  }
  return (
    <>
      <div>
        <h1
          className='text-blue-600 font-black text-6xl'>
          Recovery acces to your  <span className='text-black'>information</span></h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        {msg && <Alert alert={alert} />}

        <form action="" onSubmit={handleSubmit}>

          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl text-bold' htmlFor="">Email</label>
            <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="email" placeholder='Your email' value={email} onChange={e => setEmail(e.target.value)} />
          </div>


          <input type="submit" value="Send instructions" className='bg-blue-700 w-full rounded-xl p-3 text-white uppercase px-10 font-bold mt-5 hover:cursor-pointer hover:bg-blue-900 md:w-auto'

          />
        </form>

        <div>
          <nav className='mt-10 lg:flex lg:justify-between'>
            <Link className='block text-center my-5 text-gray-500' to="/register">Do not have a account? Create one</Link>
            <Link className='block text-center my-5 text-gray-500' to="/">Do you have a account? Login</Link>
          </nav>
        </div>

      </div>




    </>
  )
}
