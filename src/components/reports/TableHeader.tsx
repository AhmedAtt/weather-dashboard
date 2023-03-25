import TableRow from "@mui/material/TableRow";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import * as React from "react";
import {styled} from "@mui/material/styles";
import {TableHead} from "@mui/material";

type TableHeaderProps = {
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    numSelected: number;
    rowCount: number;
}

const CustomTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#1976d2',
        color: theme.palette.common.white,
    },
}));


const columns = [
    'Cities',
    'Included Data',
    'Longitude and Latitude',
    'Date Range',
    'Creation Date'
];


export function TableHeader({onSelectAllClick, numSelected, rowCount}: TableHeaderProps) {

    return (
        <TableHead>
            <TableRow>
                <CustomTableCell padding="checkbox">
                    <Checkbox
                        style={{color: 'white'}}
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </CustomTableCell>
                {columns.map((name, index) => (
                    <CustomTableCell
                        key={`table-header-${index}`}
                        align={'left'}
                    >
                        {name}
                    </CustomTableCell>
                ))}
                <CustomTableCell/>
            </TableRow>
        </TableHead>
    );
}