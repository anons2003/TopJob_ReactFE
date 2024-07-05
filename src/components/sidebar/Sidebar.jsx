import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import ExtensionIcon from '@mui/icons-material/Extension';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [manageUsersOpen, setManageUsersOpen] = useState(false);
  const [manageJobPostsOpen, setManageJobPostsOpen] = useState(false);

  const handleManageUsersClick = () => {
    setManageUsersOpen(!manageUsersOpen);
    setManageJobPostsOpen(false); // Close Manage Job Posts menu
  };

  const handleManageJobPostsClick = () => {
    setManageJobPostsOpen(!manageJobPostsOpen);
    setManageUsersOpen(false); // Close Manage Users menu
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Welcome Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <ul class ="dashboard">
            <Link to="/" style={{ textDecoration: "none" }}>
              <DashboardIcon className="icon" />
              <span> Dashboard</span>
            </Link>
          </ul>

          <p className="title">LISTS</p>

          <ul onClick={handleManageUsersClick}>
            <ManageAccountsIcon className="icon" />
            <span>   Manage Users   </span>
            {manageUsersOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ul>

          {manageUsersOpen && (
            <ul className="sub-menu">
              <li>
                <Link to="/users/job-seekers" style={{ textDecoration: "none" }}>
                  <PersonSearchIcon className="icon" />  
                    <span>  Job Seeker</span>
                </Link>
              </li>

              <li>
                <Link to="/users/enterprise" style={{ textDecoration: "none" }}>
                  <GroupIcon className="icon" />
                  <span>   Enterprise</span>
                </Link>
              </li>

              <li>
                <Link to="/users/admin" style={{ textDecoration: "none" }}>
                  <AdminPanelSettingsIcon className="icon" />
                  <span>   Admin</span>
                </Link>
              </li>
            </ul>
          )}

          <ul onClick={handleManageJobPostsClick}>
            <StoreIcon className="icon" />
            <span>  Manage Job Posts</span>
            {manageJobPostsOpen ?        <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ul>

          {manageJobPostsOpen && (
            <ul className="sub-menu">
              <li>
                <Link to="/jobPosts" style={{ textDecoration: "none" }}>
                  <StoreIcon className="icon" />
                  <span>   List Job Posts</span>
                </Link>
              </li>
              <li>
                <Link to="/jobPosts/jobPostsModeration" style={{ textDecoration: "none" }}>
                  <StoreIcon className="icon" />
                  <span>   Approval Job Posts</span>
                </Link>
              </li>
            </ul>
          )}

          <Link to="/packageServices" style={{ textDecoration: "none" }}>
            <ul>
              <ExtensionIcon className="icon" />
              <span>   Package Services</span>
            </ul>
          </Link>

          <Link to="/statistic" style={{ textDecoration: "none" }}>
            <ul>
              <AnalyticsIcon className="icon" />
              <span>   Statistic</span>
            </ul>
          </Link>

          <p className="title">USER</p>
          <Link to="/profileAdmin" style={{ textDecoration: "none" }}>
            <ul>
              <AccountBoxIcon className="icon" />
              <span>   Profile</span>
            </ul>
          </Link>

          <Link to="/logout" style={{ textDecoration: "none" }}>
            <li>
              <ExitToAppIcon className="icon" />
              <span>Log out</span>
            </li>
          </Link>
        </ul>
      </div>

      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
