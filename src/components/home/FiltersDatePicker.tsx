import * as React from 'react';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {format} from "date-fns";
import {useContext, useEffect} from "react";
import NotificationContext from "../../contexts/NotificationContext";

type FiltersDatePickerProps = {
    onDateChanged: (date: string) => void,
    dateValue: string | null
}

export default function FiltersDatePicker({onDateChanged, dateValue}: FiltersDatePickerProps) {
    const notificationContext = useContext(NotificationContext);

    const [value, setValue] = React.useState<Date | null>(null);


    useEffect(() => {
        if (!dateValue) return;
        const newDate = new Date(Date.parse(dateValue));
        setValue(newDate);
    }, [dateValue]);
    const handleDateChange = (newValue: Date | null) => {
        if (newValue) {
            const date = format(newValue, 'yyyy-MM-dd');
            setValue(newValue);
            onDateChanged(date);
        } else notificationContext.error('Invalid date');
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker value={value} onChange={(newValue) => handleDateChange(newValue)}/>
            </DemoContainer>
        </LocalizationProvider>
    );
}