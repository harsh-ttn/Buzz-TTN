import React, { useState, useEffect, useContext } from "react";
import { Paper, Avatar, IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import UserContact from "./UserContact";
import axios from "../../service/axios";
import { DataContext } from "../../context/context";

const Contacts = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  var user = JSON.parse(localStorage.getItem("user-data"));
  const { friend, setFriend } = useContext(DataContext);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(
          `/api/friends?userId=${user._id}&status=friends`,
          {
            headers: {
              "x-auth-token": JSON.parse(localStorage.getItem("token")),
            },
          }
        );
        /* console.log("All users", res.data); */
        setUsers(res.data.data);
      } catch (error) {
        console.log(`Error ${error}`);
      }
    };
    getUsers();
  }, [friend]);

  const toggleSearch = () => {
    setOpenSearch((p) => !p);
    console.log(users);
  };

  const filteredUsers = users.filter((user1) =>
    user1.friendName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ marginBottom: 30 }}>
      <Paper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "center",
            padding: "10px 15px",
          }}
        >
          <p>Contacts</p>
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
                style={{
                  minWidth: "100px",
                  width: "60%",
                  backgroundColor: "lightgrey",
                  border: "none",
                  borderRadius: "10px",
                  outline: "none",
                  padding: 5,
                }}
              />
            </>
          ) : (
            <></>
          )}
        </div>
        <div style={{ height: "32vh", overflowX: "hidden", overflowY: "auto" }}>
          {filteredUsers.map((user) => (
            <UserContact
              key={user._id}
              id={user.friendId}
              name={user.friendName}
              userImage={user.friendImage}
            />
          ))}
        </div>
      </Paper>
    </div>
  );
};

export default Contacts;
