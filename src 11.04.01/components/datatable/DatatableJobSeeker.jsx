import { DataGrid } from '@mui/x-data-grid';
import { userColumns } from '../../data/datatablesourcejobseeker';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./datatable.scss";

const DatatableJobSeeker = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/job-seekers/list');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        const transformedData = transformData(data);
        setUsers(transformedData);
        setFilteredUsers(transformedData); // Cập nhật danh sách người dùng đã lọc
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const transformData = (data) => {
    return data.map(item => ({
      id: item.jid,
      user_name: item.user.user_name,
      email: item.user.email,
      created_at: new Date(item.user.created_at).toLocaleDateString(),
      role: item.user.roleType ? item.user.roleType.roleTypeName : 'Unknown Role',
      is_active: item.user.isActive === 1 ? "Active" : "Inactive",
      avatarUrl: `https://avatars.dicebear.com/api/initials/${item.user.user_name}.svg`
    }));
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    
    const filtered = users.filter(user =>
      user.user_name.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  const handleToggleActive = async (id, currentIsActive) => {
    try {
      const response = await fetch(`http://localhost:8080/job-seekers/toggle-active/${id}`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Failed to toggle active status');
      }

      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === id ? { ...user, is_active: currentIsActive ? "Inactive" : "Active" } : user
        )
      );
      setFilteredUsers(prevUsers => 
        prevUsers.map(user =>
          user.id === id ? { ...user, is_active: currentIsActive ? "Inactive" : "Active" } : user
        )
      );
    } catch (error) {
      console.error('Error toggling active status:', error.message);
    }
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/job-seekers/add" className="link">
          Add New
        </Link>
      </div>
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search by username..."
          value={searchTerm}
          onChange={handleSearch}
          className="searchInput"
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <DataGrid
          className="datagrid"
          rows={filteredUsers} // Sử dụng danh sách đã lọc
          columns={[
            ...userColumns,
            {
              field: 'action',
              headerName: 'Action',
              width: 200,
              renderCell: (params) => (
                <div className="cellAction">
                  <Link to={`/users/job-seekers/view/${params.row.id}`} className="viewButton">
                    View
                  </Link>
                  <button 
                    className="lockButton" 
                    style={{ color: 'black' }}
                    onClick={() => handleToggleActive(params.row.id, params.row.is_active === "Active")}
                  >
                    {params.row.is_active === "Active" ? "Lock" : "Unlock"}
                  </button>
                </div>
              ),
            },
          ]}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      )}
    </div>
  );
};

export default DatatableJobSeeker;
