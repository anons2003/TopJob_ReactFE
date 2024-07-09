import "./widget.scss";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ExtensionIcon from '@mui/icons-material/Extension';
import WorkIcon from '@mui/icons-material/Work';

const Widget = ({ type }) => {
  let data;

  // State to store the total number of users, jobs, and package services
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPackageServices, setTotalPackageServices] = useState(0); // New state for package services
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
    } else if (type === "postjob") {
      axios.get("http://localhost:8080/jobs/totalJob")
        .then(response => {
          setTotalJobs(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error("There was an error fetching the total jobs!", error);
          setError(error);
          setIsLoading(false);
        });
    } else if (type === "earning") {
      axios.get("http://localhost:8080/packageServices/totalPackageService")
        .then(response => {
          setTotalPackageServices(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error("There was an error fetching the total package services!", error);
          setError(error);
          setIsLoading(false);
        });
    }
  }, [type]);

  const amount = type === "user" ? totalUsers : (type === "postjob" ? totalJobs : totalPackageServices); // Adjusted to include totalPackageServices
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
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
      </div>
      <div className="right">
        {data.icon}
      </div>
      {error && <div className="error">Error: {error.message}</div>}
    </div>
  );
};

export default Widget;
