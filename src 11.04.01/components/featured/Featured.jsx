import React, { useState, useEffect } from "react";
import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Featured = () => {
  const [dailyRevenue, setDailyRevenue] = useState(0);
  const [weeklyRevenue, setWeeklyRevenue] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);

  // Mock target value for demonstration
  const targetAmount = 10000;

  useEffect(() => {
    fetch("http://localhost:8080/transactions/daily-revenue")
      .then((response) => response.json())
      .then((data) => setDailyRevenue(data))
      .catch((error) => console.error("Error fetching daily revenue:", error));

    fetch("http://localhost:8080/transactions/weekly-revenue")
      .then((response) => response.json())
      .then((data) => setWeeklyRevenue(data))
      .catch((error) => console.error("Error fetching weekly revenue:", error));

    fetch("http://localhost:8080/transactions/monthly-revenue")
      .then((response) => response.json())
      .then((data) => setMonthlyRevenue(data))
      .catch((error) => console.error("Error fetching monthly revenue:", error));
  }, []);

  // Calculate percentage of daily revenue compared to target
  const dailyRevenuePercentage = Math.min((dailyRevenue / targetAmount) * 100, 100);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
       
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={dailyRevenuePercentage}
            text={`${dailyRevenuePercentage.toFixed(2)}%`}
            strokeWidth={5}
          />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">${dailyRevenue.toFixed(2)}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="resultAmount">10.0 k $</div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="resultAmount">${weeklyRevenue.toFixed(2)}</div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="resultAmount">${monthlyRevenue.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
