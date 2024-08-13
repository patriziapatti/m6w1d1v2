import express from 'express';
import Author from '../models/authorSchema.js'

const router = express.Router()

router.get("/", (req,res)=>{
    const author = [
    {
        id: 123,
        nome: "ppp",
        cognome: "qqq",
        email: "ppp@qqq.com",
        birthDate:  "16-11-1988",
        avatar: "pppqqq"
    }
]
    res.send(author)
})

// router.get("/:id", (req,res)=>{
//     const {id} =req.params
//     res.send(`sono la get dell'autore con id ${id}`)
// })

router.post("/", async (req,res)=>{
    //crea un nuova istanza del modello autore con i dati definiti nella parentesi tonde (prendendoli dal body)
    const author = new Author (req.body)
      //res.send("sono la post che crea un nuovo autore")

    //procedura estesa con campi statici:
    // const author = new Author ({
    //     name: req.body.name,
    //     surname: req.body.surname,
    //     email: req.body.email,
    //     avatar: req.body.avatar
    // })

    //salva i dati prendendoli nel db , prendendoli dall'istanza
    await author.save()
     //invia i dati al database
    res.send(author)
})

router.put("/:id", async (req,res)=>{
    const {id} =req.params
    const author = await Author.findByIdAndUpdate(id, req.body)
    await author.save();
    // res.send(`sono la put e modifico l'autore con id ${id}`)
    res.send(author)
})

router.delete("/:id", async (req,res)=>{
    const {id} =req.params
    await Author.findByIdAndDelete(id)
    res.send(`ho eliminato l'autore con id: ${id}`)
})
export default router