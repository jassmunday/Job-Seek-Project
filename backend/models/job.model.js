import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Pelase fill it's Required"],
        minLength:[3,"Title atleast have 3 Characters"],
        maxLength:[50,"Title should not have more than 50 Characters"]
    },
    description:{
        type:String,
        required:[true,"Pelase fill it's Required"],
        minLength:[20,"Description Should have more than 20 Characters"],
        maxLength:[200,"Description Should not be more than 200 Words"]
    },
    category:{
        type:String,
        required:[true,"Category is Required"]
    },
    country:{
        type:String,
        required:[true,"Country is Required"]
    },
    city:{
        type:String,
        required:[true,"City is Required"]
    },
    location:{
        type:String,
        required:[true,"Location is must"],
        minLength:[20,"Location must have 50 Characters"]
    },
    fixedSalary: {
        type: Number,
        minLength: [4, "Salary must contain at least 4 digits"],
        maxLength: [9, "Salary cannot exceed 9 digits"],
    },
    salaryFrom: {
        type: Number,
        minLength: [4, "Salary must contain at least 4 digits"],
        maxLength: [9, "Salary cannot exceed 9 digits"],
    },
    salaryTo: {
        type: Number,
        minLength: [4, "Salary must contain at least 4 digits"],
        maxLength: [9, "Salary cannot exceed 9 digits"],
    },
    expired:{
        type:Boolean,
        default:false
    },
    postedOn:{
        type: Date,
        default: Date.now()
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    }
},{timestamps:true});

export const Job = mongoose.model('Job',jobSchema);