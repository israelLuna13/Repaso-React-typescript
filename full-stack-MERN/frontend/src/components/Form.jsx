import { useState, useEffect } from "react"
import Alert from './Alert'
import usePatients from "../hooks/usePatients"

export default function Form() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [owner, setOwner] = useState('')
    const [date, setDate] = useState('')
    const [symptoms, setSymptoms] = useState('')
    const [id, setId] = useState(null)

    const [alert, setAlert] = useState({})

    const { patient, savePatient } = usePatients()//context


    useEffect(() => {

        //check if there is information in state for put them in the form
        if (patient?.name) {
            setName(patient.name)
            setOwner(patient.owner)
            setEmail(patient.email)
            setDate(patient.date)
            setSymptoms(patient.symptoms)
            setId(patient._id)
        }
    }, [patient])


    const { msg } = alert

    const handleSubmit = (e) => {
        e.preventDefault()
        if ([name, owner, date, symptoms, email].includes('')) {
            setAlert({ msg: 'All inputs are required', error: true })
            return
        }

        savePatient({ name, owner, date, symptoms, email, id })
        setAlert({ msg: 'Saved sucessfully', error: false })
        //clear form
        setName('')
        setOwner('')
        setEmail('')
        setDate('')
        setSymptoms('')
        setId('')
    }
    return (
        <>
            <h2 className='font-black text-3xl text-center'>Manage patients</h2>

            <p className='text-center mt-5 text-xl mb-5'>Add your patients and {''} <span className='text-blue-600 font-bold'>Manage thems</span></p>




            <form onSubmit={handleSubmit} action="" className="bg-white py-10 px-5 mt-10 mb-10 lg:mb-5 shadow-md rounded-lg">
                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="name">Pet</label>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" id="name" placeholder="Name pet"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
                </div>

                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="owner">owner</label>
                    <input value={owner} onChange={e => setOwner(e.target.value)} type="text" id="onwer" placeholder="Name owner"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
                </div>

                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="email">Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="text" id="email" placeholder="Email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
                </div>

                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="date">Date</label>
                    <input value={date} onChange={e => setDate(e.target.value)} type="date" id="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
                </div>


                <div className="mb-5">
                    <label className="text-gray-700 uppercase font-bold" htmlFor="symptoms">Symptoms</label>
                    <textarea value={symptoms} onChange={e => setSymptoms(e.target.value)} id="symptoms" placeholder="Write symptoms"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" />
                </div>

                <input type="submit" value={id ? 'Edit patient' : 'Add patient'} className="bg-blue-600 p-3 w-full text-white uppercase font-bold hover:bg-blue-800 cursor-pointer transition-colors" />
            </form>
            {msg && <Alert alert={alert} />}


        </>
    )
}
