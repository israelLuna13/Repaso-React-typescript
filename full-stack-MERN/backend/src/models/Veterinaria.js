import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import generateId from "../helpers/generateId.js";
//structure of data
const veterinarioSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    phone:{
        type:String,
        default:null,
        trim:true
    },
    web:{
        type:String,
        default:null
    },
    token:{
        type:String,
        default:generateId()

    },
    confirmed:{
        type:Boolean,
        default:false
    }
})

//before save user , we going to hash password
veterinarioSchema.pre("save",async function(next){

    //if password is hashed don't hash again
    if(!this.isModified("password"))
    {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password =  await bcrypt.hash(this.password,salt)    
})
//function check password / will use to login
veterinarioSchema.methods.checkPassword = async function(formPassword){
    return await bcrypt.compare(formPassword,this.password)
}

//register model in mongoose
const Veterinario = mongoose.model('Veterinario',veterinarioSchema)

export default Veterinario