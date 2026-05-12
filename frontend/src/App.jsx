import Home from "./pages/home"
import "./App.css"
import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/register"
import AddApoitment from "./pages/AddApoitment"
import AddDoctor from "./pages/AddDoctor"
import AllDoctors from "./components/Alldoctors"
import DoctorDetels from "./pages/DoctorDetels"
import MyAppointments from "./pages/MyAppointments"
import Footer from "./components/Footer"
import {ToastContainer} from "react-toastify"
import "react-toastify/ReactToastify.css"
function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/addappointment" element={<AddApoitment/>} />
      <Route path="adddoctor" element={<AddDoctor/>} />
      <Route path="/alldoctors" element={<AllDoctors/>} />
      <Route path="/doctor/:id" element={<DoctorDetels/>} />
      <Route path="/myappointments" element={<MyAppointments/>} />
    </Routes>

    <Footer />

    <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  )
}

export default App
