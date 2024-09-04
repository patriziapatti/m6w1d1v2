import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import authorRoutes from './routes/authorRoutes.js'
import postRoutes from './routes/postRoutes.js'
import cors from 'cors'
import morgan from 'morgan';
import helmet from 'helmet'
import authenticationRouter from './routes/authenticationRoutes.js';
import passport from 'passport';
import googleStrategy from './config/passport.config.js';
import authorization from './middleware/authorization.js';
// import GoogleStrategy from './config/passport.config.js';

const port = process.env.PORT || 5000;

//creo il server
const server = express()

passport.use('google', googleStrategy)//non è un middleware ma serve per dire a passport di usare la strategia

//collegamento al db
await mongoose.connect(process.env.MONGODB_CONNECTION_URI).then(()=>{
    console.log('connessione al db ok')
}).catch((err)=> {console.log(err)})

server.use(express.json())// è un middleware che ci dice tutti i body che invieremo saranno in json
server.use(cors()) // è un middleware che consente la connessione tra backend e frontend
server.use(morgan("dev"))// è un middleware che mi mostra tutti i log delle richieste
server.use(helmet ())//middleware che ci da la sicurezza per il backend
server.use("/authors",authorization, authorRoutes)
server.use("/blogPosts",authorization, postRoutes)
server.use("/auth",authenticationRouter)


server.listen(port, ()=>{
    console.log('Server is running')
})
