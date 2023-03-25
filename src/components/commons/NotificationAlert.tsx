import {useContext, useEffect, useState} from "react";
import {Alert, Snackbar} from "@mui/material";
import NotificationContext from "../../contexts/NotificationContext";

export default function NotificationAlert() {
    const notificationContext = useContext(NotificationContext);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(notificationContext.notification !== null);
    }, [notificationContext.notification]);
    const handleClose = () => {
        setOpen(false);
    }

    return notificationContext.notification !== null ?
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}   anchorOrigin={{ vertical:"top", horizontal:"right" }}
        >
            <Alert onClose={handleClose} severity={notificationContext.notification.type} sx={{width: '100%'}}>
                {notificationContext.notification.message}
            </Alert>
        </Snackbar> : null;

}
