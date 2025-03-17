import { useState } from "react";
import Form from "../components/Form";
import ListPatients from "../components/ListPatients";

export default function AdminPatients() {
  const [showForm,setShowForm] = useState(false)
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <button className="bg-blue-600 font-bold uppercase mx-5 mb-5 p-3 text-white rounded-md md:hidden" type="button" 
         onClick={() =>setShowForm(!showForm) }>{showForm ? 'Hidden form' : 'Show form'}</button>
        <div className={`${showForm ? 'block' : 'hidden' } md:block md:w-1/2 lg:w-2/5`}>
          <Form />

        </div>
        <div className="md:w-1/2 lg:w-3/5">

          <ListPatients />
        </div>


      </div>
    </>
  )
}
