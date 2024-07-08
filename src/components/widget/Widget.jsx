import "./widget.scss";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ExtensionIcon from '@mui/icons-material/Extension';
import WorkIcon from '@mui/icons-material/Work';

const Widget = ({ type }) => {
  let data;

  // State to store the total number of users
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (type === "user") {
      axios.get("http://localhost:8080/totalUsers")
        .then(response => {
          setTotalUsers(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error("There was an error fetching the total users!", error);
          setError(error);
          setIsLoading(false);
        });
    }
  }, [type]);

  //temporary
  const amount = type === "user" ? totalUsers : 100; // Use totalUsers for user widget
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "postjob":
      data = {
        title: "All Job Posts",
        link: "View all job posts",
        icon: (
          <WorkIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "Package Services",
        link: "View all package service ",
        icon: (
          <ExtensionIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;

    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {isLoading ? "Loading..." : amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
      {error && <div className="error">Error: {error.message}</div>}
    </div>
  );
};

export default Widget;
