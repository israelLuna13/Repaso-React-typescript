import mongoose from "mongoose";

const pacienteSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    owner:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    symptoms:{
        type:String,
        required:true
    },

    date:{
        type:Date,
        required:true,
        default:Date.now()
    },
    veterinario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Veterinario'
    }
},{
    timestamps:true
})

const Paciente = mongoose.model('Paciente',pacienteSchema)
export default Paciente