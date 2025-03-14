import { Route,Routes,BrowserRouter ,Navigate} from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import ConfirmAccount from "./pages/ConfirmAccount"
import NewPassword from "./pages/NewPassword"
import { AuthProvider } from "./context/AuthProvider"
function App() {

  return (
    <BrowserRouter>
    {/* context */}
     <AuthProvider>
      {/* all this routes will have access to global state */}
     <Routes>
      {/* area public */}
        <Route element={<AuthLayout/>}>
        <Route path="/" element={<Login />} index />

          <Route path="/register" element={<Register/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/forgot-password/:token" element={<NewPassword/>}/>
          <Route path="/confirm/:id" element={<ConfirmAccount/>}/>
        </Route>
      </Routes>
     </AuthProvider>
    </BrowserRouter>
  )
}

export default App
