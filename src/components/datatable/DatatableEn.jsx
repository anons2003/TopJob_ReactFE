// Import statements
import { DataGrid } from '@mui/x-data-grid';
import { userColumns } from '../../data/datatablesourceEn';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./datatable.scss";


const DatatableEn = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/enterprises/enterprise');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeactivate = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_active: false }),
      });

      if (!response.ok) {
        throw new Error('Failed to deactivate user');
      }

      // Update user's is_active status
      setUsers(users.map((user) => (user.id === id ? { ...user, is_active: false } : user)));
    } catch (error) {
      console.error('Error deactivating user:', error.message);
    }
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        User
        <Link to="/users/add" className="link">
          Add New
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <DataGrid
          className="datagrid"
          rows={users}
          columns={[
            ...userColumns,
            {
              field: 'action',
              headerName: 'Action',
              width: 200,
              renderCell: (params) => (
                <div className="cellAction">
                  <Link to={`/users/view/${params.row.eid}`} className="viewButton">
                    View
                  </Link>
                  <button className="lockButton" onClick={() => handleDeactivate(params.row.jid)}>
                  Lock 
                  </button>
                </div>
              ),
            },
          ]}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.eid} // Sử dụng jid làm id
        />
      )}
    </div>
  );
};

export default DatatableEn;
