import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from "../../components/sidebar/SidebarA";
import Navbar from "../../components/navbar/Navbar";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from 'axios';
import "./single.scss";
import "./chart.scss";

const SingleJobSeeker = () => {
    const { id } = useParams();
    const [jobSeeker, setJobSeeker] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const fetchJobSeeker = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/job-seekers/view/${id}`);
                setJobSeeker(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchMonthlyIncome = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/transactions/monthly-income-jobseeker?userId=3&year=2024`);

                const transformedData = transformChartData(response.data);
                setChartData(transformedData);
            } catch (error) {
                console.error('Error fetching monthly income:', error);
            }
        };

        fetchJobSeeker();
        fetchMonthlyIncome();
    }, [id, year]);
    const transformChartData = (data) => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return data.map(item => ({
            name: months[item.month - 1],  // Adjust month indexing if necessary
            Total: item.totalIncome
        }));
    };
    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <h1 className="title">Job Seeker Information</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">{jobSeeker.first_name} {jobSeeker.last_name}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">User Name:</span>
                                    <span className="itemValue">{jobSeeker.user.user_name}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">{jobSeeker.user.email}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">{jobSeeker.phone}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Occupation:</span>
                                    <span className="itemValue">{jobSeeker.occupation}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Date of Birth:</span>
                                    <span className="itemValue">{new Date(jobSeeker.dob).toLocaleDateString()}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Gender:</span>
                                    <span className="itemValue">{jobSeeker.gender === 1 ? 'Male' : 'Female'}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">City:</span>
                                    <span className="itemValue">{jobSeeker.city}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">State:</span>
                                    <span className="itemValue">{jobSeeker.state}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Website:</span>
                                    <span className="itemValue"><a href={jobSeeker.web_url} target="_blank" rel="noopener noreferrer">{jobSeeker.web_url}</a></span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Resume:</span>
                                    <span className="itemValue"><a href={jobSeeker.resume_url} target="_blank" rel="noopener noreferrer">View Resume</a></span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Introduction:</span>
                                    <span className="itemValue">{jobSeeker.intro}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Active Status:</span>
                                    <span className="itemValue">{jobSeeker.user.isActive ? 'Active' : 'Inactive'}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Account Balance:</span>
                                    <span className="itemValue">${jobSeeker.user.account_balance}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Role Type:</span>
                                    <span className="itemValue">{jobSeeker.user.roleType.roleTypeName}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Registration Date:</span>
                                    <span className="itemValue">{new Date(jobSeeker.user.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="chart">
                        <div className="title">
                            User Spending (Last 12 Months)
                            <select value={year} onChange={handleYearChange}>
                                {Array.from({ length: 10 }, (_, i) => (
                                    <option key={i} value={new Date().getFullYear() - i}>
                                        {new Date().getFullYear() - i}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <ResponsiveContainer width="100%" aspect={3 / 1}>
                            <AreaChart
                                width={730}
                                height={250}
                                data={chartData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="gray" />
                                <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="Total"
                                    stroke="#8884d8"
                                    fillOpacity={1}
                                    fill="url(#total)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleJobSeeker;
