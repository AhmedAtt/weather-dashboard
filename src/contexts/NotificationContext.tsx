import React, {useState} from 'react';
import {Notification} from "../types/Notification";

type NotificationProviderProps = {
    children: React.ReactNode
}

type NotificationContextType = {
    notification: Notification | null,
    success: (message: string) => void,
    error: (message: string) => void,
    warning: (message: string) => void,
    info: (message: string) => void,
    clear: () => void,

}

const NotificationContext = React.createContext<NotificationContextType>({
    notification: null,
    success: () => {
    },
    error: () => {
    },
    warning: () => {
    },
    info: () => {
    },
    clear: () => {
    },
});

const NotificationProvider = ({children}: NotificationProviderProps) => {
    const [notification, setNotification] = useState<Notification | null>(null);
    const success = (message: string) => {
        window.scroll(0, 0);
        setNotification({message, type: 'success'});
    };
    const error = (message: string) => {
        window.scroll(0, 0);
        setNotification({message, type: 'error'});
    };
    const warning = (message: string) => {
        window.scroll(0, 0);
        setNotification({message, type: 'warning'});
    }
    const info = (message: string) => {
        window.scroll(0, 0);
        setNotification({message, type: 'info'});
    }
    const clear = () => {
        setNotification(null);
    };
    return (
        <NotificationContext.Provider
            value={{
                success, error, clear, notification, warning, info
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export {NotificationProvider};
export default NotificationContext;