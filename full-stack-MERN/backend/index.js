import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import cors from 'cors'
import connectionDB from './src/config/db.js'
import veterinarioRoutes from "./src/routes/veterinarioRoutes.js"
import pacienteRoutes from "./src/routes/pacientesRoutes.js"
import { corsOptios } from './src/config/cors.js'
const app = express()

dotenv.config()

connectionDB()

app.use(cors(corsOptios))

//enable to read form
app.use(express.json())

//
app.use('/api/veterinarios',veterinarioRoutes)
app.use('/api/pacientes',pacienteRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(colors.bgBlack.bgCyan(`Server's working on ${PORT}`));
    
})