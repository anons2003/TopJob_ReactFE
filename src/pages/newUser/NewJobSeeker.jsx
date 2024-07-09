import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";

const NewUser = ({ title }) => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
    userRoleId: 1, // Default user role ID for Job Seeker
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/job-seekers/create", formData);
      console.log("User saved successfully:", response.data);
      setSuccessMessage("User saved successfully!");
      setError(null);
    } catch (error) {
      console.error("There was an error saving the user!", error);
      setSuccessMessage("");
      setError("Failed to create user oke");
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>User Role</label>
                <select
                  name="userRoleId"
                  value={formData.userRoleId}
                  onChange={handleChange}
                >
                  <option value={1}>Job Seeker</option>
                  <option value={2}>Enterprise</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <button type="submit">Send</button>
            </form>
            {successMessage && <p>{successMessage}</p>}
            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
