import React from "react";
import { Paper, Avatar } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import UserSuggestion from "./UserSuggestion";

const Suggestions = () => {
  return (
    <div>
      <Paper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 15px",
          }}
        >
          <p>Suggestions</p>
          <Avatar style={{ height: 25, width: 25 }}>
            <Search style={{ color: "black", width: 20 }} />
          </Avatar>
        </div>
        <div style={{ height: "32vh", overflowX: "hidden", overflowY: "auto" }}>
          <UserSuggestion />
          <UserSuggestion />
          <UserSuggestion />
          <UserSuggestion />
          <UserSuggestion />
          <UserSuggestion />
          <UserSuggestion />
          <UserSuggestion />
        </div>
      </Paper>
    </div>
  );
};

export default Suggestions;
