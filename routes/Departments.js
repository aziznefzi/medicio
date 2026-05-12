import express from "express";
import Departments from "../models/DepatmentsShema.js";
import auth from "../auth/MiddleWare.js"
import multer from "multer";

const router = express.Router();    

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })


router.post("/Adddepartments", auth(), upload.single("image"), async (req, res) => {
    // if (req.user.role !== "admin") {
    //     return res.status(400).json({ message: "not authorized" });
    // }

   try {
       const { name, description } = req.body;
       const image = req.file ? req.file.filename : null;
       if (!name) {
           return res.status(400).json({ message: "name is required" });
       }
       const departments = await Departments.create({
           name,
           description,
           image,
       });
       res.status(201).json(departments);
   } catch (error) {
       console.error(error);
       res.status(500).json({ message: "Error creating department" });
   }
})

// View all departments
router.get("/Alldepartments", async (req, res) => {
   try {
    const departments = await Departments.find({});
    res.json(departments);
  }catch(error){
    res.status(500).json({ message: "Error fetching departments" });
   }
})

// department count
router.get("/count", async (req, res) => {
  try{
    const count = await Departments.countDocuments()
    res.json({count})
  }catch(error){
    res.status(500).json({message: "Error fetching departments count"})
  }
})

export default router;