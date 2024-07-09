import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("User");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", file, role, inputs);
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

export default New;
