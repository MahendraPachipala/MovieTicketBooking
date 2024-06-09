import mongoose from "mongoose";

const forgotschema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    code:{
        type:String,
        required:true,
    }
});

export default mongoose.model("Verify",forgotschema);