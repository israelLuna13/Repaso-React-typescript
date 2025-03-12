import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import clientAxios from '../config/axios'
import Alert from '../components/Alert'
export default function ConfirmAccount() {
  const [accounrConfirmed, setAccounrConfirmed] = useState(false)
  const [load, setLoad] = useState(true)
  const [alert, setAlert] = useState({})

  const params = useParams()
  const { id } = params

  useEffect(() => {

    const confirmAccount = async () => {

      try {
        const url = `/veterinarios/confirmation/${id}`
        const { data } = await clientAxios.get(url)
        setAccounrConfirmed(true)
        setAlert({
          msg: data, error: false
        })
      } catch (error) {
        console.log(error);
        setAlert({ msg: error.response.data.msg, error: true })
      }
      setLoad(false)
    }
    confirmAccount()

  }, [])

  return (
    <>
      <div>
        <h1
          className='text-blue-600 font-black text-6xl'>
          Confirm your account and administra yours <span className='text-black'>Pacientes</span></h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        {!load && <Alert alert={alert} />}
        
        {accounrConfirmed &&
          (
            <Link className='block text-center my-5 text-gray-500' to="/"> Login</Link>
          )}

      </div>


    </>
  )
}
