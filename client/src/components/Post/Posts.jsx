import React, { useState, useEffect, useContext } from "react";
import axios from "../../service/axios";
import Post from "./Post";
import { DataContext } from "../../context/context";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { postCreated, setPostCreated } = useContext(DataContext);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("/api/posts");
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
              authorImage={post.authorImage}
              likes={post.likes}
              dislikes={post.dislikes}
              comments={post.comments}
              createAt={post.createdAt}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Posts;
