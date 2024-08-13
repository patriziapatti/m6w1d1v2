import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import authorRoutes from './routes/authorRoutes.js'
import cors from 'cors'

const port = process.env.PORT || 5000;

//creo il server
const server = express()

//collegamento al db
await mongoose.connect(process.env.MONGODB_CONNECTION_URI).then(()=>{
    console.log('connessione al db ok')
}).catch((err)=> {console.log(err)})

server.use(express.json())// tutti i body che invieremo saranno in json
server.use(cors()) 
server.use("/authors", authorRoutes)


server.listen(port, ()=>{
    console.log('Server is running')
})
