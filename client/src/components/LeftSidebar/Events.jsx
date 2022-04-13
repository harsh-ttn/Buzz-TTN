import React, { useState } from "react";
import { Paper, Divider } from "@material-ui/core";
import {
  SettingsInputAntenna,
  ExpandMore,
  ExpandLess,
  EventAvailable,
  People,
} from "@material-ui/icons";
import "./leftSidebar.css";

const Events = () => {
  const [showMoreRecent, setShowMoreRecent] = useState(false);
  const [showMoreGroups, setShowMoreGroups] = useState(false);
  const [showMoreSubs, setShowMoreSubs] = useState(false);

  const toggleShowMore = (event) => {
    if (event === "recent") {
      setShowMoreRecent((prev) => !prev);
    }
    if (event === "groups") {
      setShowMoreGroups((prev) => !prev);
    }
    if (event === "subs") {
      setShowMoreSubs((prev) => !prev);
    }
  };

  return (
    <div>
      <Paper style={{ padding: "0 10%" }}>
        <div className="events-container">
          <h4>Recent</h4>
          <ul>
            <li>
              <SettingsInputAntenna style={{ fontSize: "1.2rem" }} />{" "}
              #javascript
            </li>
            <li>
              <EventAvailable style={{ fontSize: "1.2rem" }} /> Mobile
              conference 2022
            </li>
            <li>
              <People style={{ fontSize: "1.2rem" }} /> Freelance developers
            </li>
            {showMoreRecent ? (
              <>
                <li>
                  <SettingsInputAntenna style={{ fontSize: "1.2rem" }} /> Harsh
                  Tanwar
                </li>
                <li>
                  <EventAvailable style={{ fontSize: "1.2rem" }} /> Garv Tomar
                </li>
                <li>
                  <People style={{ fontSize: "1.2rem" }} /> Diptamon chakrabarty
                </li>
                <li
                  style={{ color: "#2b7fd3", cursor: "pointer" }}
                  onClick={() => toggleShowMore("recent")}
                >
                  <ExpandLess />
                  Show less
                </li>
              </>
            ) : (
              <li
                style={{ color: "#2b7fd3", cursor: "pointer" }}
                onClick={() => toggleShowMore("recent")}
              >
                <ExpandMore />
                Show more
              </li>
            )}
          </ul>
        </div>
        <Divider />
        <div className="events-container">
          <h4>Groups</h4>
          <ul
            style={{
              listStyle: "none",
              marginTop: 20,
            }}
          >
            <li>
              <SettingsInputAntenna style={{ fontSize: "1.2rem" }} />{" "}
              #javascript
            </li>
            <li>
              <EventAvailable style={{ fontSize: "1.2rem" }} /> Mobile
              conference 2022
            </li>
            <li>
              <People style={{ fontSize: "1.2rem" }} /> Freelance developers
            </li>
            {showMoreGroups ? (
              <>
                <li>
                  <SettingsInputAntenna style={{ fontSize: "1.2rem" }} /> Harsh
                  Tanwar
                </li>
                <li>
                  <EventAvailable style={{ fontSize: "1.2rem" }} /> Garv Tomar
                </li>
                <li>
                  <People style={{ fontSize: "1.2rem" }} /> Diptamon chakrabarty
                </li>
                <li
                  style={{ color: "#2b7fd3", cursor: "pointer" }}
                  onClick={() => toggleShowMore("groups")}
                >
                  <ExpandLess />
                  Show less
                </li>
              </>
            ) : (
              <li
                style={{ color: "#2b7fd3", cursor: "pointer" }}
                onClick={() => toggleShowMore("groups")}
              >
                <ExpandMore />
                Show more
              </li>
            )}
          </ul>
        </div>
        <Divider />
        <div className="events-container">
          <h4>Subscriptions</h4>
          <ul
            style={{
              listStyle: "none",
              marginTop: 20,
            }}
          >
            <li>
              <SettingsInputAntenna style={{ fontSize: "1.2rem" }} />{" "}
              #javascript
            </li>
            <li>
              <EventAvailable style={{ fontSize: "1.2rem" }} /> Mobile
              conference 2022
            </li>
            <li>
              <People style={{ fontSize: "1.2rem" }} /> Freelance developers
            </li>
            {showMoreSubs ? (
              <>
                <li>
                  <SettingsInputAntenna style={{ fontSize: "1.2rem" }} /> Harsh
                  Tanwar
                </li>
                <li>
                  <EventAvailable style={{ fontSize: "1.2rem" }} /> Garv Tomar
                </li>
                <li>
                  <People style={{ fontSize: "1.2rem" }} /> Diptamon chakrabarty
                </li>
                <li
                  style={{ color: "#2b7fd3", cursor: "pointer" }}
                  onClick={() => toggleShowMore("subs")}
                >
                  <ExpandLess />
                  Show less
                </li>
              </>
            ) : (
              <li
                style={{ color: "#2b7fd3", cursor: "pointer" }}
                onClick={() => toggleShowMore("subs")}
              >
                <ExpandMore />
                Show more
              </li>
            )}
          </ul>
        </div>
      </Paper>
    </div>
  );
};

export default Events;
