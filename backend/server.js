import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import authorRoutes from './routes/authorRoutes.js'
import postRoutes from './routes/postRoutes.js'
import cors from 'cors'
import morgan from 'morgan';
import helmet from 'helmet'
import authenticationRouter from './routes/authenticationRoutes.js';

const port = process.env.PORT || 5000;

//creo il server
const server = express()

//collegamento al db
await mongoose.connect(process.env.MONGODB_CONNECTION_URI).then(()=>{
    console.log('connessione al db ok')
}).catch((err)=> {console.log(err)})

server.use(express.json())// è un middleware che ci dice tutti i body che invieremo saranno in json
server.use(cors()) // è un middleware che consente la connessione tra backend e frontend
server.use(morgan("dev"))// è un middleware che mi mostra tutti i log delle richieste
server.use(helmet ())
server.use("/authors", authorRoutes)
server.use("/blogPosts", postRoutes)
server.use("/auth",authenticationRouter)


server.listen(port, ()=>{
    console.log('Server is running')
})
