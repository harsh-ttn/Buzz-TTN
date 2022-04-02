import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/posts");
        console.log(res.data);
        setPosts(res.data);
      } catch (error) {
        console.log(`Error ${error}`);
      }
    };
    getPosts();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <Post
          key={post._id}
          content={post.content}
          image={post.image}
          author={post.author}
          likes={post.likes}
          dislikes={post.dislikes}
          comments={post.comments}
          createAt={post.createdAt}
        />
      ))}
    </>
  );
};

export default Posts;
