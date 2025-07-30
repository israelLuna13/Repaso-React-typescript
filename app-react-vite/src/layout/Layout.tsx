import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MenuSideBar from "../components/MenuSideBar";

export default function Layout(){
    return(
        <>
            <div className="md:flex">
                <aside className="md:w-72 md:h-screen bg-white">
                    <MenuSideBar/>
                </aside>
                <main className="md:flex-1 md:h-screen md:overflow-y-scroll bg-gray-100 p-5">
                    <Outlet/>
                </main>
            </div>
            <ToastContainer/>
            
        </>
    )
}