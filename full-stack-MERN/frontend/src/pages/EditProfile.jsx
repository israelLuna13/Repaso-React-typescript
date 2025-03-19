import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from '../hooks/useAuth'
import Alert from '../components/Alert'

export default function EditProfile() {
    const [alert, setAlert] = useState({})
    const { msg } = alert
    const [profile, setProfile] = useState({})//context
    const { auth, updateProfile } = useAuth()//context

   //we can't modify auth yet, first put the data of user in the state profile
   //the use effect will work when the user in session change or when the profile is modified
    useEffect(() => {
        
        setProfile(auth)
    }, [auth])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, name } = profile

        if ([name, email].includes('')) {
            setAlert({
                msg: 'Name and email are required',
                error: true
            })
            return
        }
        //the function in the context return object
        const result = await updateProfile(profile)
        setAlert(result)
    }
    return (
        <>
            <AdminNav />
            <h2 className="font-black text-3xl text-center mt-10">Edit Profile </h2>
            <p className="text-xl mt-5 mb-10 text-center">Change your <span className="text-blue-600 font-bold">inoformation here</span></p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                    {msg && <Alert alert={alert} />}
                    <form action="" onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label htmlFor="" className="uppercase font-bold text-gray-600">
                                Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                value={profile.name || ''}
                                onChange={e => setProfile({
                                    ...profile,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="" className="uppercase font-bold text-gray-600">
                                Web
                            </label>
                            <input
                                name="web"
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                value={profile.web || ''}
                                onChange={e => setProfile({
                                    ...profile,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="" className="uppercase font-bold text-gray-600">
                                Phone
                            </label>
                            <input
                                name="phone"
                                type="number"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                value={profile.phone || ''}
                                onChange={e => setProfile({
                                    ...profile,
                                    [e.target.name]: e.target.value
                                })} />
                        </div>

                        <div className="my-3">
                            <label htmlFor="" className="uppercase font-bold text-gray-600">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                value={profile.email || ''}
                                onChange={e => setProfile({
                                    ...profile,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>
                        <input type="submit" className="bg-blue-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5" value="Save changes" />
                    </form>
                </div>
            </div>
        </>
    )
}