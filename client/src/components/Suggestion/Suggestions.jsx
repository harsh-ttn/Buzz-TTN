import React, { useState, useEffect, useContext } from "react";
import { Paper, Avatar, IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import UserSuggestion from "./UserSuggestion";
import axios from "../../service/axios";
import { DataContext } from "../../context/context";
import "./suggestions.css";

const Suggestions = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  var user = JSON.parse(localStorage.getItem("user-data"));
  const { friend, setFriend } = useContext(DataContext);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`/api/users?userId=${user._id}`);
        /* console.log("All users", res.data); */
        setUsers(res.data);
      } catch (error) {
        console.log(`Error ${error}`);
      }
    };
    getUsers();
  }, [friend]);

  const toggleSearch = () => {
    setOpenSearch((p) => !p);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Paper>
        <div className="sugg-header">
          <p>Suggestions</p>
          <IconButton onClick={() => toggleSearch()}>
            <Avatar style={{ height: 35, width: 35 }}>
              <Search style={{ color: "black", width: 20 }} />
            </Avatar>
          </IconButton>
          {openSearch ? (
            <>
              <input
                type="text"
                name="search"
                placeholder="Search"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="sugg-input"
              />
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="sugg-users">
          {filteredUsers.map((user) => (
            <UserSuggestion
              key={user._id}
              id={user._id}
              name={user.name}
              userImage={user.userImage}
            />
          ))}
        </div>
      </Paper>
    </div>
  );
};

export default Suggestions;
