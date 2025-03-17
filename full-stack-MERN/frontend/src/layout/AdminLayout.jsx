import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"
import Footer from "../components/Footer"
export default function AdminLayout() {
    const { auth, load } = useAuth()//context
    if (load) return 'loading'

    return (
        <div>
            <Header />
            {auth?._id ?
                (
                    <main className="container mx-auto mt-10">
                        <Outlet />
                    </main>
                )
                : <Navigate to="/" />}
            <Footer />

        </div>
    )
}
