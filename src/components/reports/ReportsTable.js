import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableButton from "./TableButton";
import {Delete, VisibilityOutlined} from "@mui/icons-material";
import Box from "@mui/material/Box";
import * as React from "react";
import {format} from "date-fns";
import {TableHeader} from "./TableHeader";
import {useNavigate} from "react-router-dom";

function createData(name, city, temp, humidity, latitude, longitude, startDate, endDate, createdAt) {

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    const parsedCreatedAt = new Date(createdAt);

    const dateRange = `${format(parsedStartDate, 'dd/MM/yyyy')} - ${format(parsedEndDate, 'dd/MM/yyyy')}`;
    const dateCreated = format(parsedCreatedAt, 'dd/MM/yyyy');
    const latAndLong = `${latitude.toFixed(2)} , ${longitude.toFixed(2)}`;
    let includedData = "";

    if (temp && humidity) {
        includedData = "Temperature & Relative Humidity";
    } else if (temp) {
        includedData = "Temperature Only";
    } else {
        includedData = "Relative Humidity Only";
    }

    return {
        name,
        city,
        includedData,
        latAndLong,
        dateRange,
        dateCreated,
    };
}


export default function ReportsTable({setSelectedReports}) {
    const [selected, setSelected] = React.useState([]);
    const [rows, setRows] = React.useState([]);

    const navigate = useNavigate();

    React.useEffect(() => {
        // get reports from local storage with key starting with "Report-"
        const reportsKeys = Object.keys(localStorage).filter(key => key.startsWith("Report-"));
        const rows = reportsKeys.map(key => {
            const {
                temperature,
                humidity,
                latitude,
                longitude,
                startDate,
                endDate,
                createdAt
            } = JSON.parse(localStorage.getItem(key));
            return createData(key, '-', temperature, humidity, latitude, longitude, startDate, endDate, createdAt);
        });
        setRows(rows);
    }, [Object.keys(localStorage)]);

    const setSelectedCombined = (items) => {
        setSelectedReports(items);
        setSelected(items);
    }


    // delete single report
    const handleDeleteSingle = (key) => {
        console.log(key);
        localStorage.removeItem(key);
        setSelectedCombined([]);
    }

    // view single report by navigating to Home with report name
    const handleViewSingle = (key) => {
        navigate(`/home/${key}`);
    }


    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelectedCombined(newSelected);
            return;
        }
        setSelectedCombined([]);
    };
    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelectedCombined(newSelected);
    };
    const isSelected = (name) => selected.indexOf(name) !== -1;


    return <Box sx={{width: '100%'}}>
        <Paper sx={{width: '100%', mb: 2}}>
            <TableContainer>
                <Table
                    sx={{minWidth: 750}}
                    aria-labelledby="tableTitle"
                >
                    <TableHeader numSelected={selected.length} onSelectAllClick={handleSelectAllClick}
                                 rowCount={rows.length}/>

                    <TableBody>
                        {rows.map((row, index) => {
                            const isItemSelected = isSelected(row.name);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.name}
                                    selected={isItemSelected}
                                    sx={{cursor: 'pointer'}}
                                >
                                    <TableCell padding="checkbox" onClick={(event) => handleClick(event, row.name)}>
                                        <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        padding="none"
                                    >
                                        {row.city}
                                    </TableCell>
                                    <TableCell align="left">{row.includedData}</TableCell>
                                    <TableCell align="left">{row.latAndLong}</TableCell>
                                    <TableCell align="left">{row.dateRange}</TableCell>
                                    <TableCell align="left">{row.dateCreated}</TableCell>
                                    <TableCell align="left">
                                        <TableButton icon={<VisibilityOutlined/>} title="View Report" handleClick={()=> handleViewSingle(row.name)}/>
                                        <TableButton icon={<Delete/>} title="Delete Report" handleClick={()=>handleDeleteSingle(row.name)} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </Box>
}