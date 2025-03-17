import React from 'react'
import usePatients from '../hooks/usePatients'
export default function Patient({ patient }) {
    const { setEdit, deletePatient } = usePatients()//context
    
    const { email, owner, date, name, symptoms, _id } = patient


    const formatDate = () => {
        const newDate = new Date(date)
        return new Intl.DateTimeFormat('es-MX', { dateStyle: 'long' }).format(newDate)
    }


    return (
        <>
            <div className='mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl'>
                <p className='font-bold uppercase text-blue-800 mt-5'>Name: {''}
                    <span className='font-normal normal-case text-black'>{name}</span>
                </p>
                <p className='font-bold uppercase text-blue-800 mt-5'>Owner: {''}
                    <span className='font-normal normal-case text-black'>{owner}</span>
                </p>
                <p className='font-bold uppercase text-blue-800 mt-5'>Email: {''}
                    <span className='font-normal normal-case text-black'>{email}</span>
                </p>
                <p className='font-bold uppercase text-blue-800 mt-5'>Date: {''}
                    <span className='font-normal normal-case text-black'>{formatDate(date)}</span>
                </p>
                <p className='font-bold uppercase text-blue-800 mt-5'>Symptoms: {''}
                    <span className='font-normal normal-case text-black'>{symptoms}</span>
                </p>

                <div className='flex justify-between my-5'>
                    <button onClick={() => setEdit(patient)} className='py-2 px-10 bg-blue-600 hover:bg-blue-700 text-white uppercase font-bold rounded-lg'>Edit</button>
                    <button onClick={() => deletePatient(_id)} className='py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg'>Delete</button>
                </div>

            </div>
        </>
    )
}
