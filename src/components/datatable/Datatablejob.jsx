import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './datatablejobmodaration.scss';

// Cấu hình cột cho bảng công việc
export const jobColumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'skills', headerName: 'Skills', width: 300 },
  { field: 'experience', headerName: 'Experience', width: 150 },
  { field: 'salaryType', headerName: 'Salary Type', width: 150 },
  { field: 'minSalary', headerName: 'Min Salary', width: 150 },
  { field: 'maxSalary', headerName: 'Max Salary', width: 150 },
  {
    field: 'action',
    headerName: 'Action',
    width: 200,
    renderCell: (params) => (
      <div className="cellAction">
        <Link to={`/jobPosts/view/${params.row.id}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" className="viewButton">
            View
          </Button>
        </Link>
        <Button
          variant="contained"
          color="error"
          className="deleteButton"
          // onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      </div>
    ),
  },
];

const Datatablejob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/jobs/list');
        setJobs(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/jobs/delete/${id}`);
      // Remove the deleted job from the local state
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error('Error deleting job:', error.message);
      // Optionally, handle error state here
    }
  };

  return (
    <div className="datatable">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <DataGrid
          className="datagrid"
          rows={jobs}
          columns={jobColumns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      )}
    </div>
  );
};

export default Datatablejob;
