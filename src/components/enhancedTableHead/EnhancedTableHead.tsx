import {MouseEvent, FC} from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import {Order, OrderBy} from '../../types/types'

interface HeadCell {
    disablePadding: boolean;
    id: OrderBy;
    label: string;
    numeric: boolean;
}
const headCells: readonly HeadCell[] = [
    {
        id: "name",
        numeric: false,
        disablePadding: false,
        label: "Tag Name",
    },
    {
        id: "popular",
        numeric: true,
        disablePadding: false,
        label: "Count",
    },
];
interface EnhancedTableProps {
    onRequestSort: (event: MouseEvent<unknown>, property: OrderBy) => void;
    order: Order;
    orderBy: OrderBy;
    rowCount: number;
}

const EnhancedTableHead: FC<EnhancedTableProps> = ({onRequestSort, order, orderBy, rowCount}) => {
    const createSortHandler =
        (property: OrderBy) => (event: MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead
            sx={{
                position: "sticky",
                top: 0,
                padding: "0 16px",
            }}
        >
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={"center"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{ backgroundColor: "#e1ebee" }}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                            sx={{ fontWeight: "bold" }}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default EnhancedTableHead;