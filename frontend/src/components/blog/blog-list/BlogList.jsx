import { Col, Row, Form } from "react-bootstrap";
// import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";
import { loadPosts } from "../../../data/fetch";
import React, { useContext, useEffect, useState } from "react";
import { AuthorContext } from "../../../context/AuthorContextProvider";
// import SingleBlogPost from "../SingleBlogPost";

const BlogList = () => {
  const {token,setToken} = useContext(AuthorContext)
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    loadPosts('').then(data => setPosts(data.dati))
  },[])
  return (
    <>
    {token && <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search post"
              className="me-2 mb-2 w-25"
              aria-label="Search"
            // onChange={handleSearch}
            />
          </Form>}
    <Row>
      {posts.map((post, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />
          {/* <SingleBlogPost key={post.title} {...post}/> */}
        </Col>
      ))}
    </Row>
    </>
  );
};

export default BlogList;
