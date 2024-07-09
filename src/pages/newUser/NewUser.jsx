import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";

const NewUser = ({ inputs, title }) => {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("User");
  const [formData, setFormData] = useState({});

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const user = {
      ...formData,
      role: role,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/users/signup", user);
      console.log("User saved successfully:", response.data);
    } catch (error) {
      console.error("There was an error saving the user!", error);
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
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Role:</label>
                <select value={role} onChange={handleRoleChange}>
                  <option value="User">User</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
              <div className="formInput">
                <label htmlFor="fileInput">Upload Image:</label>
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
