import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import { loadPosts } from "../../data/fetch";


const Home = props => {
  const [posts, setPosts] = useState("")
  useEffect(()=>{
    loadPosts().then(data => setPosts(data.dati))
  },[])
  console.log(posts)
  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
      <BlogList posts={posts}/>
    </Container>
  );
};

export default Home;
