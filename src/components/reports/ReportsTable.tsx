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
import {ReportTableRow} from "../../types/Report";
import NotificationContext from "../../contexts/NotificationContext";

type ReportsTableProps = {
    setSelectedReports: (reports: string[]) => void,
}

function createData({
                        reportId,
                        cityName,
                        temp,
                        humidity,
                        latitude,
                        longitude,
                        startDate,
                        endDate,
                        createdAt
                    }: {
    reportId: string,
    cityName: string,
    temp: boolean,
    humidity: boolean,
    latitude: number,
    longitude: number,
    startDate: string,
    endDate: string,
    createdAt: string
}):ReportTableRow {

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    const parsedCreatedAt = new Date(createdAt);

    const dateRange = `${format(parsedStartDate, 'dd/MM/yyyy')} - ${format(parsedEndDate, 'dd/MM/yyyy')}`;
    const dateCreated = format(parsedCreatedAt, 'dd/MM/yyyy');
    const latAndLong = `${latitude} , ${longitude}`;
    let includedData = "";

    if (temp && humidity) {
        includedData = "Temperature & Relative Humidity";
    } else if (temp) {
        includedData = "Temperature Only";
    } else {
        includedData = "Relative Humidity Only";
    }

    return {
        id: reportId,
        name:cityName,
        includedData,
        latAndLong,
        dateRange,
        dateCreated,
    };
}


export default function ReportsTable({setSelectedReports}: ReportsTableProps) {
    const notificationContext = React.useContext(NotificationContext);

    const [selected, setSelected] = React.useState<string[]>([]);
    const [rows, setRows] = React.useState<ReportTableRow[]>([]);

    const navigate = useNavigate();

    React.useEffect(() => {
        // get reports from local storage with key starting with "Report-"
        const reportsKeys = Object.keys(localStorage).filter(key => key.startsWith("Report-"));
        const rows: ReportTableRow[] = [];
        reportsKeys.forEach(key => {
            const reportJson = localStorage.getItem(key);
            if (reportJson) {
                const report = JSON.parse(reportJson);
                const {
                    name,
                    temperature,
                    humidity,
                    latitude,
                    longitude,
                    startDate,
                    endDate,
                    createdAt
                } = report;
                rows.push(
                    createData({
                        reportId: key,
                        cityName: name,
                        temp: temperature,
                        humidity,
                        latitude,
                        longitude,
                        startDate,
                        endDate,
                        createdAt
                    })
                );
            }
            else{
                notificationContext.error("Failed to load report: " + key );
            }
        });
        setRows(rows);
    }, [Object.keys(localStorage).length]);

    const setSelectedCombined = (items:string[]) => {
        setSelectedReports(items);
        setSelected(items);
    }


    // delete single report
    const handleDeleteSingle = (key:string) => {
        localStorage.removeItem(key);
        setSelectedCombined([]);
    }

    // view single report by navigating to Home with report name
    const handleViewSingle = (key:string) => {
        navigate(`/home/${key}`);
    }


    const handleSelectAllClick = (event:  React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelectedCombined(newSelected);
            return;
        }
        setSelectedCombined([]);
    };
    const handleClick = (event:React.MouseEvent, reportId:string) => {
        const selectedIndex = selected.indexOf(reportId);
        let newSelected:string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, reportId);
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
    const isSelected = (reportId:string) => selected.indexOf(reportId) !== -1;


    return <Box sx={{width: '100%'}}>
        <Paper sx={{width: '100%', mb: 2}}>
            <TableContainer>
                <Table
                    sx={{minWidth: 750}}
                    aria-labelledby="tableTitle"
                >
                    <TableHeader numSelected={selected.length}
                                 onSelectAllClick={handleSelectAllClick}
                                 rowCount={rows.length}/>

                    <TableBody>
                        {rows.map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.id}
                                    selected={isItemSelected}
                                    sx={{cursor: 'pointer'}}
                                >
                                    <TableCell padding="checkbox" onClick={(event) => handleClick(event, row.id)}>
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
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="left">{row.includedData}</TableCell>
                                    <TableCell align="left">{row.latAndLong}</TableCell>
                                    <TableCell align="left">{row.dateRange}</TableCell>
                                    <TableCell align="left">{row.dateCreated}</TableCell>
                                    <TableCell align="left">
                                        <TableButton icon={<VisibilityOutlined/>} title="View Report"
                                                     handleClick={() => handleViewSingle(row.id)}/>
                                        <TableButton icon={<Delete/>} title="Delete Report"
                                                     handleClick={() => handleDeleteSingle(row.id)}/>
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