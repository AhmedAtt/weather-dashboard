import {NotificationContext} from "../context/Notification";
import {useState} from "react";
import {Alert, Snackbar} from "@mui/material";

export default function NotificationProvider({children, type, message}) {
    const [notification, setNotification] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <NotificationContext.Provider value={{notification, setNotification}}>
            {notification &&
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={type} sx={{width: '100%'}}>
                        {message}
                    </Alert>
                </Snackbar>}
            {children}
        </NotificationContext.Provider>
    );
}