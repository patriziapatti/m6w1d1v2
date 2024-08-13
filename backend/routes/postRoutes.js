import express, {json} from 'express';
import Post from '../models/postSchema.js'

const router = express.Router()

// get per richiamare tutti i post
router.get("/", async (req,res)=>{
    const allPosts = await Post.find({})
    res.send(allPosts)
})
//questa è la get per richiamare un singolo post tramite id
router.get("/:id", async (req,res)=>{
    const {id} =req.params
    const post = await Post.findById(id)
    res.send(post) 
})

router.post("/", async (req,res)=>{
    //crea un nuova istanza del modello autore con i dati definiti nella parentesi tonde (prendendoli dal body)
    // console.log(req.body)
    const post = new Post (req.body)
    //res.send("sono la post che crea un nuovo post")

    //salva i dati prendendoli nel db , prendendoli dall'istanza
    const newPost = await post.save()
     //invia i dati al database
    res.send(newPost)

})

router.put("/:id", async (req,res)=>{
    const {id} =req.params
    const post = await Post.findByIdAndUpdate(id, req.body, {new:true}) //new serve per restituire in author l'oggetto appena inserito, altrimenti non lo restituisce
    await post.save();
    // res.send(`sono la put e modifico il post con id ${id}`)
    res.send(post)
})

router.delete("/:id", async (req,res)=>{
    const {id} =req.params
    await Post.findByIdAndDelete(id)
    res.send(`ho eliminato il post con id: ${id}`)
})
export default router