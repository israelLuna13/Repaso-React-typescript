import { Route,Routes,BrowserRouter ,Navigate} from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import ConfirmAccount from "./pages/ConfirmAccount"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout/>}>
        <Route path="/" element={<Login />} index />

          <Route path="/register" element={<Register/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/confirm/:id" element={<ConfirmAccount/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
