import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {format} from "date-fns";
import {useEffect} from "react";
export default function FiltersDatePicker({onDateChanged,dateValue, dateRangeError}) {
    const [value, setValue] = React.useState(null);

    useEffect(() => {
        setValue(Date.parse(dateValue));
    }, [dateValue]);
    const handleDateChange = (newValue) => {
        const date = format(newValue,'yyyy-MM-dd');
        setValue(newValue);
        onDateChanged(date);
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker value={value} onChange={handleDateChange} />
            </DemoContainer>
        </LocalizationProvider>
    );
}