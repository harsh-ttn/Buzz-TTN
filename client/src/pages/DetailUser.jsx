import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { paper } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const DetailUser = () => {
  const [user, setUser] = useState({});
  let { id } = useParams();
  

  useEffect(() => {
    const getUser = async () => {
      try {
        /* const res = await axios.get(`http://localhost:8080/api/user/${id}`); */
        console.log(id);
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setUser(res.data);
      } catch (error) {
        console.log(`Error ${error}`);
      }
    };
    getUser();
  }, []);

  return (
    <div>
      Name : {user.name}
      Email : {user.email}
      Website : {user.website}
    </div>
  );
};

export default DetailUser;
