import GoogleStrategy from 'passport-google-oauth20'
import { callBackGoogle } from '../controllers/authentication.controller'


const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callBackUrl:process.env.GOOGLE_CALLBACK
},

function(accessToken, refreshToken, profile, passportNext) {
  // oggetto profile: {json:{
  //   given_name:Pinco ,
  //   family_name: Pallino,
  //   email: email@email,
  //   sub: 12345678
  // }}
  console.log(profile)
    //nel db cherchiamo l'utente
    
    //se non c'è lo creiamo

    //chiamiamo il prossimo middlewere

}
)

export default googleStrategy