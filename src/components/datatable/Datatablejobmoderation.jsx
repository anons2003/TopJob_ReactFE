import "./datatablejobmodaration.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../data/datatablesourcejobmoderation";
import { Link } from "react-router-dom";
import { useState } from "react";
const Datatablejobmoderation = () => {
  const [data, setData] = useState(userRows);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/jobpostsmoderation/view" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];
  
  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[9]}
       
      />
    </div>
  );
};

export default Datatablejobmoderation;
