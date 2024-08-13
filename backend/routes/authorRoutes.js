import express, {json} from 'express';
import Author from '../models/authorSchema.js'

const router = express.Router()

// get per richiamare tutti gli autori
router.get("/", async (req,res)=>{
    const allAuthors = await Author.find({})
    res.send(allAuthors)
})
//questa è la get per richiamare un singolo autore tramite id
router.get("/:id", async (req,res)=>{
    const {id} =req.params
    const author = await Author.findById(id)
    res.send(author) 
})

router.post("/", async (req,res)=>{
    //crea un nuova istanza del modello autore con i dati definiti nella parentesi tonde (prendendoli dal body)
    console.log(req.body)
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
    const newAuthor = await author.save()
     //invia i dati al database
    res.send(newAuthor)

})

router.put("/:id", async (req,res)=>{
    const {id} =req.params
    const author = await Author.findByIdAndUpdate(id, req.body, {new:true}) //new serve per restituire in author l'oggetto appena inserito, altrimenti non lo restituisce
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