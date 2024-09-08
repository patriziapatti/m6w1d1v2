import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import BlogAuthor from "../blog-author/BlogAuthor";
import "./styles.css";
import { AuthorContext } from "../../../context/AuthorContextProvider";
import { deletePost } from '../../../data/fetch'


const BlogItem = (props) => {
  const {token, setToken, authorInfo} = useContext(AuthorContext)
  const { title, cover, author, _id , setAggiornaBlogList, aggiornaBlogList} = props;
  const navigate = useNavigate();

const handleDelete = async () =>{
  try {
    await deletePost(_id)
    alert('Post deleted!')
    setAggiornaBlogList(!aggiornaBlogList)
    // navigate ('/')
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
        </Card.Footer>
      </Card>
    
  );
};

export default BlogItem;
