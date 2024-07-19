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
  { field: 'isActive', headerName: 'Active Status', width: 150 },
  {
    field: 'action',
    headerName: 'Action',
    width: 150,
    renderCell: (params) => (
      <div className="cellAction">
        <Link to={`/jobs/jobPostsModerations/view/${params.row.id}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" className="viewButton">
            View
          </Button>
        </Link>
      </div>
    ),
  },
];

const DatatablejobModeration = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/jobs/inactive-list');
        const transformedData = transformData(response.data);
        setJobs(transformedData);
        setFilteredJobs(transformedData); // Initialize filteredJobs
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  const transformData = (data) => {
    return data.map((job) => ({
      id: job.id,
      title: job.title,
      skills: job.skills,
      experience: job.experience,
      salaryType: job.salaryType,
      minSalary: job.minSalary,
      maxSalary: job.maxSalary,
      isActive: job.isActive ? 'Active' : 'Inactive',
    }));
  };

  return (
    <div className="datatable">
      <div className="search">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <DataGrid
          className="datagrid"
          rows={filteredJobs}
          columns={jobColumns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      )}
    </div>
  );
};

export default DatatablejobModeration;
