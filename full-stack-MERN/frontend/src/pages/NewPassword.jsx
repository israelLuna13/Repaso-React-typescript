import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Alert from '../components/Alert'
import clientAxios from '../config/axios'
export default function NewPassword() {
  const params = useParams()
  const { token } = params

  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({})
  const [tokenCorrect, setTokenCorrect] = useState(false)
  const [passwordChanged, setPasswordChanged] = useState(false)
  const { msg } = alert

  //when the component be fine will check token
  useEffect(() => {
    //check token
    const checkToken = async () => {
      try {
        await clientAxios.get(`/veterinarios/forgot-password/${token}`)
        setAlert({ msg: 'Write your new password' })

        setTokenCorrect(true)

      } catch (error) {
        setAlert({ msg: 'There is error with link', error: true })
      }
    }
    checkToken()

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password.length < 6) {
      setAlert({ msg: 'The password must have a minimum of 6 characters.', error: true })
      return
    }

    try {
      const url = `/veterinarios/forgot-password/${token}`
      const { data } = await clientAxios.post(url, { password })
      setPasswordChanged(true)
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
          Change your password and do not lost your <span className='text-black'>information</span></h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        {msg && <Alert alert={alert} />}

        {tokenCorrect && (
          <>
            <form action="" onSubmit={handleSubmit}>

              <div className='my-5'>
                <label className='uppercase text-gray-600 block text-xl text-bold' htmlFor="">New Password</label>
                <input className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' type="password" placeholder='Your password' value={password}
                  onChange={e => setPassword(e.target.value)} />
              </div>
              <input type="submit" value="Confirm password" className='bg-blue-700 w-full rounded-xl p-3 text-white uppercase px-10 font-bold mt-5 hover:cursor-pointer hover:bg-blue-900 md:w-auto' />

            </form>

            {passwordChanged && <Link className='block text-center my-5 text-gray-500' to="/"> Login</Link>}
          </>
        )}
      </div>


    </>
  )
}
