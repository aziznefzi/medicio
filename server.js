import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import user from "./routes/user.js"
import doctor from "./routes/doctor.js"
import appointment from "./routes/appointment.js"
import departments from "./routes/Departments.js"

const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use("/user", user);
app.use("/doctors", doctor);
app.use("/appointments", appointment);
app.use("/departments", departments);
app.use("/files", express.static("uploads"));

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
    })
}

startServer();