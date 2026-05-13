import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*path', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
    })
}

startServer();