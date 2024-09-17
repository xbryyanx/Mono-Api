import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    age: { 
        type: Number,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now, 
    },
    isEmailSent: {
        type: Boolean,
        default: false
    },
});

export const MonoCase = mongoose.model("MonoCase", caseSchema)