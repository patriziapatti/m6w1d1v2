import React, { useContext, useEffect, useState } from "react";
import { Container, Image, Col, Row , Form ,Button, Modal} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import posts from "../../data/posts.json";
import "./styles.css";
import { loadSinglePost, loadComments, newComment, commentAuthor } from "../../data/fetch";
import { AuthorContext } from "../../context/AuthorContextProvider";
// import {jwtDecode} from 'jwt-decode'



const Blog = props => {
  const {token, setToken, authotInfo, setAuthorInfo} = useContext(AuthorContext)
  // const decodedToken = jwtDecode(token)
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([])
  const params = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  // const [authorComment, setAuthorComment] = useState([])
  const {id} = params
  // const authorR = decodedToken.authorId


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialFormState = {

      content: "",
      post: id,

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
        await newComment(id,formValue)
        const commentsRes = await loadComments(id)
        setComments(commentsRes.dati)
        setFormValue(initialFormState)
        handleClose()
      } catch (error) {
        console.error("Errore durante il salvataggio del commento:", error);
      }
    }

  useEffect(() => {
    // commentAuthor(authorR).then(data=>{setAuthorComment(data.name)})

    // const { id } = params;
    console.log(id)
    // const blog = posts.find(post => post._id.toString() === id);
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

  }, [params, navigate]);
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
          <div className="mt-2 border rounded bg-light">{comment.content}</div> 
          {/* <div className="mt-2 border rounded bg-light" >{authorComment}</div>  */}
        </Col>
      ))}
    </Row>
    <Button variant="primary" onClick={handleShow}>
      Add Comment
    </Button>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New comment</Modal.Title>
      </Modal.Header>
      <Form.Control size="sm" type="text" placeholder="Max 100 characters" name="content" value={formValue.content} onChange={handleChange} />
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveComment}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
        </Container>
      </div>
    );
  }
};

export default Blog;
