import { Col, Row, Form , Button} from "react-bootstrap";
// import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";
import { loadPosts } from "../../../data/fetch";
import React, { useContext, useEffect, useState } from "react";
import { AuthorContext } from "../../../context/AuthorContextProvider";
// import SingleBlogPost from "../SingleBlogPost";

const BlogList = () => {
  const {token,setToken} = useContext(AuthorContext)
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState("")
  const [aggiornaBlogList, setAggiornaBlogList] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handleSearch = (event) =>{
   setSearch(event.target.value ?event.target.value: "" )
   
  }
  useEffect(()=>{
    loadPosts(search, currentPage).then((data) => {
      setPosts(data.dati);
      setTotalPages(data.totalPages)
    })
  },[search,currentPage,aggiornaBlogList])

  const goToNextPage = () =>{
    if(currentPage < totalPages){
      setCurrentPage(currentPage +1)
    }
  }

  const goToPreviousPage = () =>{
    if(currentPage > 1){
      setCurrentPage(currentPage -1);
    }
  }
  
  return (
    <>
    {token && <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search post"
              className="me-2 mb-2 w-25"
              aria-label="Search"
              name="search"
            onChange={handleSearch}
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
          <BlogItem key={post.title} {...post} setAggiornaBlogList={setAggiornaBlogList} aggiornaBlogList={aggiornaBlogList} />
        </Col>
      ))}
    </Row>
    <div className="d-flex justify-content-end align-items-center">
        <Button className="me-2" onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button className="ms-2" onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </>
  );
};

export default BlogList;
