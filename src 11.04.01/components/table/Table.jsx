import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from '@mui/material/TablePagination';

const List = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetch("http://localhost:8080/transactions/listoneweek")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const formatDate = (dateArray) => {
    if (!dateArray || dateArray.length !== 5) return "Invalid Date";
    const [year, month, day, hour, minute] = dateArray;
    return new Date(year, month - 1, day, hour, minute).toLocaleDateString();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper className="table">
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Transaction ID</TableCell>
              <TableCell className="tableCell">User ID</TableCell>
              <TableCell className="tableCell">Package ID</TableCell>
              <TableCell className="tableCell">Transaction Date</TableCell>
              <TableCell className="tableCell">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : transactions
            ).map((transaction) => (
              <TableRow key={transaction.transactionId}>
                <TableCell className="tableCell">{transaction.transactionId}</TableCell>
                <TableCell className="tableCell">{transaction.userId}</TableCell>
                <TableCell className="tableCell">{transaction.packageId}</TableCell>
                <TableCell className="tableCell">{formatDate(transaction.transactionDate)}</TableCell>
                <TableCell className="tableCell">{transaction.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default List;
