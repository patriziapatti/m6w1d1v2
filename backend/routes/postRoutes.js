import express, {json} from 'express';
import Post from '../models/postSchema.js'


const router = express.Router()

// get per richiamare tutti i post
router.get("/", async (req,res)=>{
    const page = req.query.page || 1
    const perPage = req.query.perPage || 3
    try {
        const allPosts = await Post.find({})
        .sort({category:1, title:1})
        .skip((page-1)*perPage)
        .limit(perPage)

        const totalResults = await Post.countDocuments()// mi da il numero totale di documenti
        const totalPages = Math.ceil(totalResults / perPage ) 
        res.send({
            dati: allPosts,
            page,
            totalPages,
            totalResults,
        })
        
    } catch (error) {
        res.status(404).send({message: 'Not Found'})
    }
    
})
//questa è la get per richiamare un singolo post tramite id
router.get("/:id", async (req,res)=>{
        const {id} =req.params
        try {
            const post = await Post.findById(id)
            res.send(post) 
        } catch (error) {
            res.status(404).send({message: 'Not Found'})
        }
    
})

router.post("/", async (req,res)=>{
    //crea un nuova istanza del modello autore con i dati definiti nella parentesi tonde (prendendoli dal body)
    // console.log(req.body)
    const post = new Post (req.body)
    //res.send("sono la post che crea un nuovo post")
    try {
        //salva i dati prendendoli nel db , prendendoli dall'istanza
        const newPost = await post.save()
        //invia i dati al database
        res.send(newPost)
    } catch (error) {
        res.status(400).send(error)
    }
    

})

router.put("/:id", async (req,res)=>{
    const {id} =req.params
    try {
        const post = await Post.findByIdAndUpdate(id, req.body, {new:true}) //new serve per restituire in author l'oggetto appena inserito, altrimenti non lo restituisce
        await post.save();
        // res.send(`sono la put e modifico il post con id ${id}`)
        res.status(200).send(post)
        
    } catch (error) {
        res.status(400).send(error)
    }
    
})

router.delete("/:id", async (req,res)=>{
    const {id} =req.params
    try {
        await Post.findByIdAndDelete(id)
        res.status(200).send(`ho eliminato il post con id: ${id}`)
    } catch (error) {
        res.status(404).send({message: `ID ${id} not found`})
    }
    
})
export default router