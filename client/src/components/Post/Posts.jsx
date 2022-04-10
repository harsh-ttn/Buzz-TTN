import React, { useState, useEffect, useContext } from "react";
import axios from "../../service/axios";
import Post from "./Post";
import { DataContext } from "../../context/context";

const Posts = ({ sortType }) => {
  const [posts, setPosts] = useState([]);
  const { postCreated, setPostCreated } = useContext(DataContext);

  useEffect(() => {
    const getPosts = async () => {
      try {
        let res;
        if (sortType === "") {
          res = await axios.get("/api/posts");
        } else {
          res = await axios.get(`/api/posts?sortType=${sortType}`);
        }
        console.log(res.data);
        setPosts(res.data.data);
      } catch (error) {
        console.log(`Error ${error}`);
      }
    };
    getPosts();
  }, [postCreated]);

  return (
    <>
      {posts.length === 0 ? (
        <h6>No posts found</h6>
      ) : (
        <>
          {posts.map((post) => (
            <Post
              key={post._id}
              id={post._id}
              content={post.content}
              image={post.image}
              author={post.author}
              authorId={post.authorId}
              authorImage={post.authorImage}
              likes={post.likes}
              dislikes={post.dislikes}
              comments={post.comments}
              createdAt={post.createdAt}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Posts;
