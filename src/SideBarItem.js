import {ListItem} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import {useNavigate} from "react-router-dom";

export default function DrawerItem({name, icon, route, drawerOpen}) {

    const navigate = useNavigate();

    const handleNavigation= ()=>{
        navigate(route);
    }


    return (
        <ListItem key={name} disablePadding sx={{display: 'block'}} onClick={handleNavigation}>
            <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: drawerOpen ? 'initial' : 'center',
                    px: 2.5,
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: drawerOpen ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    {icon}
                </ListItemIcon>
                <ListItemText primary={name} sx={{opacity: drawerOpen ? 1 : 0}}/>
            </ListItemButton>
        </ListItem>

    );

}