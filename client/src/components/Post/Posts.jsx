import React, { useState, useEffect, useContext } from "react";
import axios from "../../service/axios";
import Post from "./Post";
import { DataContext } from "../../context/context";
import LazyLoad from "react-lazyload";
import { LinearProgress } from "@material-ui/core";

const Posts = ({ sortType, moderator }) => {
  const [posts, setPosts] = useState([]);
  const { postCreated, setPostCreated } = useContext(DataContext);
  const [loader, setLoader] = useState(false);
  var user = JSON.parse(localStorage.getItem("user-data"));

  useEffect(() => {
    setLoader(true);
    const getPosts = async () => {
      try {
        let res;
        if (!moderator) {
          if (sortType === "") {
            res = await axios.get(`/api/posts?userId=${user._id}`, {
              headers: {
                "x-auth-token": JSON.parse(localStorage.getItem("token")),
              },
            });
          } else {
            res = await axios.get(
              `/api/posts?sortType=${sortType}&userId=${user._id}`,
              {
                headers: {
                  "x-auth-token": JSON.parse(localStorage.getItem("token")),
                },
              }
            );
          }
        } else {
          if (sortType === "") {
            res = await axios.get(`/api/posts`, {
              headers: {
                "x-auth-token": JSON.parse(localStorage.getItem("token")),
              },
            });
          } else {
            res = await axios.get(`/api/posts?sortType=${sortType}`, {
              headers: {
                "x-auth-token": JSON.parse(localStorage.getItem("token")),
              },
            });
          }
        }

        setPosts(res.data.data);
        setLoader(false);
      } catch (error) {
        console.log(`Error ${error}`);
      }
    };
    getPosts();
  }, [postCreated, moderator]);

  return (
    <>
      {loader ? (
        <>
          <LinearProgress />
          <LinearProgress color="secondary" />
        </>
      ) : (
        <> </>
      )}
      {!loader && posts.length === 0 ? (
        <h6>No posts found</h6>
      ) : (
        <>
          {posts.map((post) => (
            <LazyLoad
              key={post._id}
              placeholder={"Loading ..."}
              height={100}
              once={true}
              offset={[-100, 100]}
            >
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
                moderator={moderator}
              />
            </LazyLoad>
          ))}
        </>
      )}
    </>
  );
};

export default Posts;
