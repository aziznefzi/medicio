import express from "express";
import Appointment from "../models/appoitmentSheme.js";
import auth from "../auth/MiddleWare.js"

const router = express.Router();    


//create new appointment
router.post("/createAppointment", auth(), async (req, res) => {
  const { doctor, date, reason } = req.body;
  if (!req.user || !doctor || !date || !reason) 
    return res.status(400).json({ message: "Please fill all the fields" });

  const appointment = await Appointment.create({
    user: req.user.id,
    doctor,
    date,
    reason,
  });

  res.status(201).json(appointment);
})

//get All appointments
router.get("/myappointments", auth(), async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id }).populate("doctor");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
})

//delete appointment
router.delete("/:id", auth(), async (req, res) => {
  try {
    const {id} = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment deleted successfully" });
  }catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ message: error });
  }
});

export default router;