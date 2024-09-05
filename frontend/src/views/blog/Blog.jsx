import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import posts from "../../data/posts.json";
import "./styles.css";
import { loadSinglePost } from "../../data/fetch";


const Blog = props => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const { id } = params;
    console.log(id)
    // const blog = posts.find(post => post._id.toString() === id);
    const blogPostDetails = async () =>{
      try {
        const res = await loadSinglePost(id);
        if (res){
          setBlog(res)
          setLoading(false)
        }else { 
          console.log('non ho trovato')
          // navigate("/404");

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
          <div className="mt-5">Commenti: qui sotto</div>
        </Container>
      </div>
    );
  }
};

export default Blog;
