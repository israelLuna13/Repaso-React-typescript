import React from 'react'
import usePatients from '../hooks/usePatients'
import Patient from './Patient';
export default function ListPatients() {

  const {patients} = usePatients()//context
  
  return (
    <>
      {patients.length ? (
        <>
          <h2 className='font-black text-3xl text-center'>List patients</h2>
          <p className='text-center mt-5 text-xl mb-5'>Manage yours {''} <span className='text-blue-600 font-bold'>Patients and Citas</span></p>

          {patients.map(patient =>(
            
             <Patient key={patient._id} patient={patient}
             />
 
          ))}

        </>
      ) :
        (
          <>
            <h2 className='font-black text-3xl text-center'>There are not patients</h2>
            <p className='text-center mt-5 text-xl mb-5'>Start by to add patients {''} <span className='text-blue-600 font-bold'>and show them here</span></p>
          </>
        )}
    </>
  )
}
