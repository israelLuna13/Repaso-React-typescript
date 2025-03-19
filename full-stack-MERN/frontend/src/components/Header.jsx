import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
export default function Header() {
    const { logout } = useAuth()//from context
    return (
        <>
            <header className="py-10 bg-blue-600">
                <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center text-center">
                    <h1 className="font-bold text-2xl text-blue-200">Manage Patients {''} <span className="text-white">Veterinaria</span></h1>


                    <nav className="flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0">
                        <Link to="/admin" className="text-white text-xl lg:text-sm uppercase font-bold "> Patients
                        </Link>
                        <Link to="/admin/profile" className="text-white text-xl lg:text-sm uppercase font-bold"> Profile
                        </Link>

                        <button onClick={logout} className="text-white text-xl lg:text-sm uppercase font-bold" type="button">Logout</button>
                    </nav>

                </div>

            </header>

        </>
    )
}
