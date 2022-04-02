import React, { useState } from "react";
import { Paper, Divider } from "@material-ui/core";
import {
  SettingsInputAntenna,
  ExpandMore,
  ExpandLess,
  EventAvailable,
  People,
} from "@material-ui/icons";

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
      <Paper style={{ padding: "0 30px" }}>
        <div style={{ textAlign: "left", padding: "20px 0" }}>
          <h4>Recent</h4>
          <ul
            style={{
              listStyle: "none",
              marginTop: 20,
            }}
          >
            <li>
              <SettingsInputAntenna style={{ fontSize: 20 }} /> #javascript
            </li>
            <li>
              <EventAvailable style={{ fontSize: 20 }} /> Mobile conference 2022
            </li>
            <li>
              <People style={{ fontSize: 20 }} /> Freelance developers
            </li>
            {showMoreRecent ? (
              <>
                <li>
                  <SettingsInputAntenna style={{ fontSize: 20 }} /> #javascript
                </li>
                <li>
                  <SettingsInputAntenna style={{ fontSize: 20 }} /> #javascript
                </li>
                <li>
                  <SettingsInputAntenna style={{ fontSize: 20 }} /> #javascript
                </li>
                <li
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => toggleShowMore("recent")}
                >
                  <ExpandLess />
                  Show less
                </li>
              </>
            ) : (
              <li
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => toggleShowMore("recent")}
              >
                <ExpandMore />
                Show more
              </li>
            )}
          </ul>
        </div>
        <Divider />
        <div style={{ textAlign: "left", padding: "20px 0" }}>
          <h4>Groups</h4>
          <ul
            style={{
              listStyle: "none",
              marginTop: 20,
            }}
          >
            <li>
              <SettingsInputAntenna style={{ fontSize: 20 }} /> #javascript
            </li>
            <li>
              <EventAvailable style={{ fontSize: 20 }} /> Mobile conference 2022
            </li>
            <li>
              <People style={{ fontSize: 20 }} /> Freelance developers
            </li>
            {showMoreGroups ? (
              <>
                <li>
                  <SettingsInputAntenna style={{ fontSize: 20 }} /> #javascript
                </li>
                <li>
                  <SettingsInputAntenna style={{ fontSize: 20 }} /> #javascript
                </li>
                <li>
                  <SettingsInputAntenna style={{ fontSize: 20 }} /> #javascript
                </li>
                <li
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => toggleShowMore("groups")}
                >
                  <ExpandLess />
                  Show less
                </li>
              </>
            ) : (
              <li
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => toggleShowMore("groups")}
              >
                <ExpandMore />
                Show more
              </li>
            )}
          </ul>
        </div>
        <Divider />
        <div style={{ textAlign: "left", padding: "20px 0" }}>
          <h4>Subscriptions</h4>
          <ul
            style={{
              listStyle: "none",
              marginTop: 20,
            }}
          >
            <li>
              <SettingsInputAntenna style={{ fontSize: 20 }} /> #javascript
            </li>
            <li>
              <SettingsInputAntenna style={{ fontSize: 20 }} /> #javascript
            </li>
            <li>
              <SettingsInputAntenna style={{ fontSize: 20 }} /> #javascript
            </li>
            {showMoreSubs ? (
              <>
                <li>
                  <SettingsInputAntenna style={{ fontSize: 20 }} /> #javascript
                </li>
                <li>
                  <SettingsInputAntenna style={{ fontSize: 20 }} /> #javascript
                </li>
                <li>
                  <SettingsInputAntenna style={{ fontSize: 20 }} /> #javascript
                </li>
                <li
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => toggleShowMore("subs")}
                >
                  <ExpandLess />
                  Show less
                </li>
              </>
            ) : (
              <li
                style={{ color: "blue", cursor: "pointer" }}
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
