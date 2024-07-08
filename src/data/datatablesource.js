export const userColumns = [
  { field: "jid", headerName: "ID", width: 70 },

  {
    field: "avatar_url",
    headerName: "Avatar",
    width: 110,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.avatar_url} alt="avatar" />
        </div>
      );
    },
  },
  {
    field: "user.user_name",
    headerName: "User Name",
    width: 150,
    valueGetter: (params) => params.row.user.user_name,
  },
  {
    field: "user.email",
    headerName: "Email",
    width: 230,
    valueGetter: (params) => params.row.user.email,
  },
  {
    field: "user.created_at",
    headerName: "Registration Date",
    width: 180,
    valueGetter: (params) => new Date(params.row.user.created_at).toLocaleDateString(),
  },
  {
    field: "user.roleType.roleTypeName",
    headerName: "Occupation",
    width: 130,
    valueGetter: (params) => params.row.user.roleType.roleTypeName,
  },
  {
    field: "user.isActive",
    headerName: "Status",
    width: 160,
    valueGetter: (params) => (params.row.user.isActive ? 'Active' : 'Inactive'),
  },
];
