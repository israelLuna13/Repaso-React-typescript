import { createContext, useState, useEffect } from "react";

import clientAxios from "../config/axios";


const PatientsContext = createContext()

export const PacientsProvider = ({ children }) => {

    const [patients, setPatients] = useState([])//all patients of a doctor
    const [patient, setPatient] = useState({})// one patient

    //when the component be fine, will get all patients of a doctor
    useEffect(() => {
        const getPatients = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clientAxios.get('/pacientes', config)
                setPatients(data)
            } catch (error) {
                console.log(error.reponse.data.msg);
            }
        }
        getPatients()

    }, [])

    const savePatient = async (patient) => {

        const token = localStorage.getItem('token')

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        //if there is an id, this means that gonna edit the patient
        //edit
        if (patient.id) {
            try {

                const { data } = await clientAxios.put(`/pacientes/${patient.id}`, patient, config)

                const patientsUpdate = patients.map(patientState =>
                    patientState._id === data._id ? data : patientState)

                setPatients(patientsUpdate)

            } catch (error) {
                console.log(error.reponse.data.msg);
            }

        } else {
            //new patient
            try {
                const { data } = await clientAxios.post('/pacientes', patient, config)

                //we create new object whitout elements createdAt,updatedAt,__v
                const { createdAt, updatedAt, __v, ...patienteSaved } = data
                //add new patients + old patients
                setPatients([patienteSaved, ...patients]);
            } catch (error) {
                console.log(error.reponse.data.msg);

            }
        }
    }

    //put data patient that we want to edit in the state 
    const setEdit = (patient) => {
        setPatient(patient)
    }

    const deletePatient = async (id) => {
        const confirmation = confirm('Do you want delete it?')

        if (confirmation) {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await clientAxios.delete(`/pacientes/${id}`, config)

                //get patients do not delet
                const patientUpdated = patients.filter(patientsState => patientsState._id != id)
                setPatients(patientUpdated)
            } catch (error) {
                console.log(error.reponse.data.msg);
            }
        }
    }

    return (
        <PatientsContext.Provider value={{ patients, setPatients, savePatient, setEdit, patient, deletePatient }}>
            {children}

        </PatientsContext.Provider>
    )
}

export default PatientsContext