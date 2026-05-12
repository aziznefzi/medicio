import mongoose, { Types } from "mongoose";
const DepartmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    image: String
})

const Departments = mongoose.model("Department", DepartmentSchema);
export default Departments;