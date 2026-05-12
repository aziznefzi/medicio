import express from "express";
import multer from "multer";
import Doctor from "../models/DoctorSchema.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = file.originalname.split('.').pop()
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
  }
})

const upload = multer({ storage: storage })


router.post("/Adddoctors", upload.single('image'),  async (req, res) => {
    try{
    const { name, specialty,  description, experienceYears} = req.body;
    const image = req.file ? req.file.path : null;
    // Validate doctor input
    if (!name || !specialty || !image || !description || !experienceYears) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Create new doctor
    const newDoctor = await Doctor.create({
        name,
        specialty,
        description,
        experienceYears,
        image: req.file?.filename 
    });

    const SaveDoctors = await newDoctor.save();
    res.status(201).json(SaveDoctors);
    }catch(error){
        console.error("Error creating doctor:", error);
        res.status(500).json({ message: error });
    }
})

// Get all doctors
router.get("/Alldoctors", async (req, res) => {
    const doctors = await Doctor.find();
    res.json(doctors);
})

// doctor count
router.get("/count", async (req, res) => {
  try{
    const count = await Doctor.countDocuments()
    res.json({count})
  }catch(error){
    res.status(500).json({message: "Error fetching doctors count"})
  }
})

//doctor specialty
router.get("/doctors/BySpecialty/:specialty", async (req, res) => {
  try {
    const {specialty} = req.params;
    console.log("Searching for Specialty", specialty);
    const doctors = await Doctor.find({specialty : {$regex: new RegExp(specialty, "i")}})
    console.log("found doctors:", doctors.length)
    res.json(doctors)
  } catch (error) {
    console.error("Error fetching doctors by specialty:", error);
    res.status(500).json({message: "Error fetching doctors by specialty"})
  }
})

// Get doctor Deteils
router.get("/:id", async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
})
export default router;