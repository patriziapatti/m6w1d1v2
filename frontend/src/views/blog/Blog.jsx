import React, { useContext, useEffect, useState } from "react";
import { Container, Image, Col, Row , Form ,Button, Modal} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import posts from "../../data/posts.json";
import "./styles.css";
import { loadSinglePost, loadComments, newComment,updateComment,deleteComment } from "../../data/fetch";
import { AuthorContext } from "../../context/AuthorContextProvider";
import {jwtDecode} from 'jwt-decode'



const Blog = props => {
  const {token, setToken, authotInfo, setAuthorInfo} = useContext(AuthorContext)
  const decodedToken = jwtDecode(token)
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([])
  const params = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const {id} = params
  const [editMode, setEditMode] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);



  const handleClose = () => {
    setShow(false);
    setEditMode(false)
    setFormValue(initialFormState)
  }
  const handleShow = () => setShow(true);

  const initialFormState = {

      content: "",
      post: id,
      author: decodedToken.authorId

    };
  
    const [formValue, setFormValue] = useState(initialFormState)

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormValue({
        ...formValue,
        [name]: value,
      });
    };

    const handleSaveComment = async () =>{
      try {
        if(editMode){
          await updateComment (id, editCommentId, formValue)
        }else{
          await newComment(id,formValue)
        }
        const commentsRes = await loadComments(id)
        setComments(commentsRes.dati)
        setFormValue(initialFormState)
        handleClose()
      } catch (error) {
        console.error("Errore durante il salvataggio del commento:", error);
      }
    }

    const handleEditComment = comment => {
      setEditMode(true);
      setEditCommentId(comment._id);
      setFormValue({...formValue, content: comment.content})
      handleShow();
    }

    const handleShowConfirmModal = commentId =>{
      setCommentToDelete(commentId)
      setShowConfirmModal(true)
    }

    const handleCloseConfirmModal = () => {
      setCommentToDelete(null);
      setShowConfirmModal(false);
    };

    const confirmDeleteComment = async () => {
            await deleteComment(id, commentToDelete);
          const commentsRes = await loadComments(id);
          setComments(commentsRes.dati);  // Aggiorna i commenti dopo l'eliminazione
          handleCloseConfirmModal();
      };

  useEffect(() => {
    const blogPostDetails = async () =>{
      try {
        const res = await loadSinglePost(id);
        const commentsRes = await loadComments(id)
        if (res){
          setBlog(res)
          setComments(commentsRes.dati)
          console.log(blog.author)
          setLoading(false)
        }else { 
          console.log('non ho trovato')
          navigate("/404");

        }
      }catch (error) {
        console.log(error);
          setLoading(false)
      }
    }

  blogPostDetails()

  }, [id, navigate]);
    if (loading) {
      return <div>loading</div>
    } else { 
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover}  />
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              <div>{`lettura da ${blog.readTime.value} ${blog.readTime.unit}`}</div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
          <div className="mt-5">Post comments:</div>
          <Row>
          {comments.map((comment, i) => (
          <Col
          key={`item-${i}`}
          md={8} className="mb-3"
          style={{
                marginBottom: 20,
              }}
            >
              <div className="mt-2 border rounded bg-light">{comment.content}{comment.author._id === decodedToken.authorId && (
                <><svg xmlns="http://www.w3.org/2000/svg" className="ms-3 me-3 bi bi-pencil " width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ cursor: "pointer" }} onClick={() => handleEditComment(comment)}>
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="ms-2 bi bi-trash" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ cursor: "pointer" }} onClick={() => handleShowConfirmModal(comment._id)}>
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                    </>
                  )}</div> 
          <div className="mt-2 border rounded bg-secondary text-white w-25" >{comment.author.name}</div>
        </Col>
      ))}
    </Row>
    <Button variant="primary" onClick={handleShow}>
      Add Comment
    </Button>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editMode ? "Edit Comment" : "New Comment"}</Modal.Title>
      </Modal.Header>
      <Form.Control size="sm" type="text" placeholder="Max 100 characters" name="content" value={formValue.content} onChange={handleChange} />
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveComment}>
        {editMode ? "Save Changes" : "Save Comment"}
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
            <Modal.Header closeButton>
              <Modal.Title>Conferma Eliminazione</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Sei sicuro di voler eliminare questo commento? Questa azione è irreversibile.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseConfirmModal}>
                Annulla
              </Button>
              <Button variant="danger" onClick={confirmDeleteComment}>
                Elimina
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    );
  }
};

export default Blog;
