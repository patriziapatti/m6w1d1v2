import React, { useContext, useState } from "react";
import { Button, Card, Modal,Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import BlogAuthor from "../blog-author/BlogAuthor";
import "./styles.css";
import { AuthorContext } from "../../../context/AuthorContextProvider";
import { deletePost } from '../../../data/fetch'
import {jwtDecode} from 'jwt-decode'


const BlogItem = (props) => {
  const {token, setToken, authorInfo} = useContext(AuthorContext)
  const { title, cover, author, _id , category, content, setAggiornaBlogList, aggiornaBlogList} = props;
  const navigate = useNavigate();
  const decodedToken = jwtDecode(token);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [formValue, setFormValue] = useState({
    title: "",
    category: "",
    content: ""
  });

  const handleEditPost = () => {
    setFormValue({
      title: title,
      category: category,
      content: content,
    });
    handleShow();
  };

  const handleChangeFormValue = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:5000/blogPosts/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formValue), 
      });

      if (response.ok) {
        const updatedPost = await response.json();
        console.log('Post updated successfully:', updatedPost);
        handleClose();
        setAggiornaBlogList(!aggiornaBlogList);
      } else {
        console.error('Error updating the post:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
     
const handleDelete = async () =>{
  try {
    await deletePost(_id)
    alert('Post deleted!')
    setAggiornaBlogList(!aggiornaBlogList)
  } catch (error) {
    console.error("Errore durante l'eliminazione del post:", error);
    alert ('Unable to delete the post')
  }
}

  return (
    
      <Card className="blog-card">
        <Link to={`/blog/${_id}`} className="blog-link">
        <Card.Img variant="top" src={cover} className="blog-cover" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
        </Link>
        <Card.Footer>
          <BlogAuthor {...author} />
          <Button variant="dark" as={Link} to={`/blog/${_id}`}>Read</Button>
          {authorInfo._id === author._id ? <Button variant="danger"className="ms-2"onClick={handleDelete} >Delete</Button> : ""}
          {authorInfo._id === author._id ? <Button variant="success"className="ms-2" onClick={handleEditPost} >Edit</Button> : ""}
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form className="mt-5" >
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          {/* l'onChange cattura l'evento e lo passa alla funzione */}
          <Form.Control size="lg" placeholder="Title" name="title" value={formValue.title} onChange={handleChangeFormValue}/>
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control size="lg" as="select" name="category" value={formValue.category} onChange={handleChangeFormValue}>
            <option>Categoria 1</option>
            <option>Categoria 2</option>
            <option>Categoria 3</option>
            <option>Categoria 4</option>
            <option>Categoria 5</option>

          </Form.Control>
        </Form.Group>
        {/* <Form.Group controlId="cover" className="mt-3 mb-3" >
        <Form.Label>Cover</Form.Label>
        <Form.Control type="file" name="cover"  />
      </Form.Group> */}
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>

          <Form.Control size="lg" placeholder="content" name="content" value={formValue.content} onChange={handleChangeFormValue}>
          </Form.Control>
        </Form.Group>
        {/* <Form.Group className="d-flex mt-3 justify-content-end"> */}
          {/* <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }} 
          >
            Invia
          </Button> */}
        {/* </Form.Group> */}
      </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </Card.Footer>
      </Card>
    
  );
};

export default BlogItem;
