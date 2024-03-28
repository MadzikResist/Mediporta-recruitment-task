import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Dispatch, FC, SetStateAction, useState, MouseEvent } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Content from "../content/Content";
import EnhancedTableHead from "../enhancedTableHead/EnhancedTableHead";
import { Order, OrderBy, Tag } from "../../types/types";
import { CircularProgress } from "@mui/material";

export interface DataTableProps {
  data: Tag[] | undefined;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  hasMore: boolean;
  isLoading: boolean;
  rowsPerPageSelect: string | null;
  setRowsPerPageSelect: Dispatch<SetStateAction<string | null>>;
  order: Order;
  setOrder: Dispatch<SetStateAction<Order>>;
  orderBy: OrderBy;
  setOrderBy: Dispatch<SetStateAction<OrderBy>>;
  error: Error | null;
}

const DataTable: FC<DataTableProps> = ({
  data,
  page,
  setPage,
  hasMore,
  isLoading,
  rowsPerPageSelect,
  setRowsPerPageSelect,
  order,
  setOrder,
  orderBy,
  setOrderBy,
  error,
}) => {
  const options = ["5", "25", "50", "100"];

  const [inputValue, setInputValue] = useState<string>("");
  const handleRequestSort = (event: MouseEvent<unknown>, property: OrderBy) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "40px",
      }}
    >
      <Paper sx={{ width: "100%", mb: 2, maxWidth: "1000px" }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            backgroundColor: "#edf5f7",
            justifyContent: "center",
            display: "block",
            paddingTop: "16px",
          }}
        >
          <Typography
            variant="h6"
            id="tableTitle"
            component="div"
            sx={{ width: "100%" }}
          >
            Tags with the number of related posts
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
              maxWidth: "1000px",
              padding: "8px 0",
              marginTop: "16px",
            }}
          >
            <Autocomplete
              value={rowsPerPageSelect}
              onChange={(event: any, newValue: string | null) => {
                setRowsPerPageSelect(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                let value = Number(newInputValue);
                if (
                  newInputValue === "" ||
                  (!isNaN(value) && value >= 1 && value <= 100)
                ) {
                  setInputValue(newInputValue);
                  setRowsPerPageSelect(newInputValue);
                }
              }}
              options={options}
              freeSolo={true}
              renderInput={(params) => (
                <TextField
                  sx={{ width: 110 }}
                  {...params}
                  label="Rows per page"
                  InputProps={{ sx: { fontSize: "14px" } }}
                />
              )}
            />
            <Content page={page} setPage={setPage} hasMore={hasMore} />
          </Box>
        </Toolbar>
        <TableContainer style={{ height: 500 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ padding: "0" }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            {isLoading ? (
              <TableBody>
                <TableRow>
                  <TableCell
                    scope="row"
                    padding="normal"
                    align="center"
                    sx={{
                      width: "100%",
                      border: "none",
                    }}
                  >
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <>
                {data ? (
                  <>
                    <EnhancedTableHead
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={Number(rowsPerPageSelect)}
                    />
                    <TableBody>
                      {data.map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            key={row.name}
                            hover
                            tabIndex={-1}
                            sx={{ cursor: "pointer" }}
                          >
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="normal"
                              align="left"
                              sx={{
                                borderBottom: "1px solid #d8e5e9",
                                borderLeft: "1px solid #d8e5e9",
                                width: "70%",
                              }}
                            >
                              {row.name}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                border: "1px solid #d8e5e9",
                                borderTop: "none",
                                width: "30%",
                              }}
                            >
                              {row.count}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </>
                ) : (
                  <TableBody>
                    <TableRow>
                      <TableCell
                        scope="row"
                        padding="normal"
                        align="center"
                        sx={{
                          width: "100%",
                          border: "none",
                        }}
                      >
                        {error ? error.message : "Not found data"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </>
            )}
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default DataTable;
