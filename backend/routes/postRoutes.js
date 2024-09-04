import express, {json} from 'express';
import Post from '../models/postSchema.js'
import uploadCloudinary from '../middleware/uploadCloudinary.js';
import {addPost, deletePost, editPost, getPost, getSinglePost, patchPost } from '../controllers/post.controller.js';
import { createComment, deleteComment, editComment, getComments, getSingleComment } from '../controllers/comment.controller.js';
// import authorization from '../middleware/authorization.js';


const router = express.Router()
//rotte per i post
router.get('/',getPost)
router.get('/:id' ,getSinglePost)
router.post ('/',  uploadCloudinary.single('cover'), addPost )
router.put ('/:id', editPost)
router.delete ('/:id', deletePost)
router.patch('/:blogPostId/cover', uploadCloudinary.single('cover'), patchPost)

//rotte per i commenti
router.post('/:postId/comments',createComment)
router.get('/:postId/comments', getComments)
router.get('/:postId/comments/:commentId', getSingleComment)
router.put('/:postId/comment/:commentId', editComment)
router.delete('/:postId/comment/:commentId', deleteComment)


export default router
