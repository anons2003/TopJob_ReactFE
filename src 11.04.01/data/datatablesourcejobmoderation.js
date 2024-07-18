export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "enterprise",
    headerName: "Enterprise",
    width: 150,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.username}</div>;
    },
  },
  {
    field: "jobLocation",
    headerName: "Job Location",
    width: 170,
  },
  {
    field: "dateClose",
    headerName: "Date Close",
    width: 170,
  },

  {
    field: "dateOpen",
    headerName: "Date Open",
    width: 170,
  },
  {
    field: "workLocation",
    headerName: "Work Location",
    width: 160,
  },
  {
    field: "salary",
    headerName: "Salary",
    width: 160,
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    jobLocation: "New York",
    dateClose: "2024-07-01",
    dateOpen: "2024-01-01",
    workLocation: "New York",
    salary: "$120,000",
  },
  {
    id: 1,
    username: "Snow",
    jobLocation: "New York",
    dateClose: "2024-07-01",
    dateOpen: "2024-01-01",
    workLocation: "New York",
    salary: "$120,000",
  },
  {
    id: 1,
    username: "Snow",
    jobLocation: "New York",
    dateClose: "2024-07-01",
    dateOpen: "2024-01-01",
    workLocation: "New York",
    salary: "$120,000",
  },
  {
    id: 1,
    username: "Snow",
    jobLocation: "New York",
    dateClose: "2024-07-01",
    dateOpen: "2024-01-01",
    workLocation: "New York",
    salary: "$120,000",
  },
  {
    id: 1,
    username: "Snow",
    jobLocation: "New York",
    dateClose: "2024-07-01",
    dateOpen: "2024-01-01",
    workLocation: "New York",
    salary: "$120,000",
  },
  {
    id: 1,
    username: "Snow",
    jobLocation: "New York",
    dateClose: "2024-07-01",
    dateOpen: "2024-01-01",
    workLocation: "New York",
    salary: "$120,000",
  },
  {
    id: 1,
    username: "Snow",
    jobLocation: "New York",
    dateClose: "2024-07-01",
    dateOpen: "2024-01-01",
    workLocation: "New York",
    salary: "$120,000",
  },
  {
    id: 1,
    username: "Snow",
    jobLocation: "New York",
    dateClose: "2024-07-01",
    dateOpen: "2024-01-01",
    workLocation: "New York",
    salary: "$120,000",
  },
  {
    id: 1,
    username: "Snow",
    jobLocation: "New York",
    dateClose: "2024-07-01",
    dateOpen: "2024-01-01",
    workLocation: "New York",
    salary: "$120,000",
  },
  {
    id: 1,
    username: "Snow",
    jobLocation: "New York",
    dateClose: "2024-07-01",
    dateOpen: "2024-01-01",
    workLocation: "New York",
    salary: "$120,000",
  },
  {
    id: 1,
    username: "Snow",
    jobLocation: "New York",
    dateClose: "2024-07-01",
    dateOpen: "2024-01-01",
    workLocation: "New York",
    salary: "$120,000",
  },
  {
    id: 1,
    username: "Snow",
    jobLocation: "New York",
    dateClose: "2024-07-01",
    dateOpen: "2024-01-01",
    workLocation: "New York",
    salary: "$120,000",
  },
  {
    id: 1,
    username: "Snow",
    jobLocation: "New York",
    dateClose: "2024-07-01",
    dateOpen: "2024-01-01",
    workLocation: "New York",
    salary: "$120,000",
  },
];