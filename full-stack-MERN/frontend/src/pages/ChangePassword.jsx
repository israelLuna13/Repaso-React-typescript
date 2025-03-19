import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alert from '../components/Alert'
import useAuth from "../hooks/useAuth";
export default function ChangePassword() {

  const { savePassword } = useAuth()//context
  const [password, setPassword] = useState({
    new_password: '',
    current_password: ''
  })
  const [alert, setAlert] = useState({})
  const { msg } = alert

  const handleSubmit = async (e) => {
    e.preventDefault()
    // if([password,newpassword].includes(''))

    //check all atributes of state password with some
    if (Object.values(password).some(input => input === '')) {
      setAlert({ msg: 'All inputs are required', error: true })
      return
    }
    setAlert({})

    if (password.new_password.length < 6) {
      setAlert({
        msg: 'The password most has minium  6 characters',
        error: true
      })
      return
    }
    const response = await savePassword(password)
    setAlert(response)
  }

  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">Change password</h2>
      <p className="text-xl mt-5 mb-10 text-center">Turn your <span className="text-blue-600 font-bold">password here</span></p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

          {msg && <Alert alert={alert} />}
          
          <form action="" onSubmit={handleSubmit}>
            <div className="my-3">
              <label htmlFor="" className="uppercase font-bold text-gray-600">
                Current password
              </label>
              <input
                name="current_password"
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Write your current password"
                value={password.current_password}
                onChange={e => setPassword(
                  {
                    ...password,
                    [e.target.name]: e.target.value
                  })}

              />
            </div>

            <div className="my-3">
              <label htmlFor="" className="uppercase font-bold text-gray-600">
                New password
              </label>
              <input
                name="new_password"
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Write your new password"
                value={password.new_password}
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}

              />
            </div>

            <input type="submit" className="bg-blue-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5" value="Update password" />
          </form>
        </div>
      </div>
    </>
  )
}
