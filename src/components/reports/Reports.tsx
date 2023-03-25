import * as React from 'react';
import {Delete} from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ReportsTable from "./ReportsTable";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";




export default function Reports() {

    const [selectedReports, setSelectedReports] = React.useState<string[]>([]);
    const [contextMenu, setContextMenu] = React.useState<{mouseX:number, mouseY:number} | null>(null);
    const handleContextMenu = (event:React.MouseEvent) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.pageX + 2,
                    mouseY: event.pageY - 6,
                }
                :
                null,
        );
    };

    const handleClose = () => {
        handleDelete();
        setContextMenu(null);
    };

    const handleDelete = () => {
        selectedReports.forEach(report => {
            localStorage.removeItem(report);
        });
        setSelectedReports([]);
        setContextMenu(null);
    }


    return (
        <div onContextMenu={handleContextMenu} style={{cursor: 'context-menu'}}>
            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? {top: contextMenu.mouseY, left: contextMenu.mouseX}
                        : undefined
                }
            >
                <MenuItem onClick={handleClose}>

                    <ListItemIcon>
                        <Delete/>
                    </ListItemIcon>
                    <ListItemText>Delete Reports</ListItemText>

                </MenuItem>

            </Menu>

            <ReportsTable setSelectedReports={setSelectedReports} />
        </div>
    );
}