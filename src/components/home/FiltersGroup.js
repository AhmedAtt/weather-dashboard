import {TextField} from "@mui/material";
import FiltersCityPicker from "./FiltersCityPicker";
import FiltersDatePicker from "./FiltersDatePicker";
import WeIconButton from "../commons/WeIconButtons";
import {Clear} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {format} from "date-fns";

export default function FiltersGroup({cityId, onGroupFilterChanged, onRemoveCity, initialFilter}) {
    const [filter, setFilter] = useState(initialFilter? initialFilter: {latitude: 0, longitude: 0, startDate: null, endDate: null});
    const [rangeError, setRangeError] = useState(null);
    //date range must not exceed 7 days
    useEffect(() => {
        setRangeError(null);

        if (filter.startDate && !filter.endDate) {
            let endDate = new Date(Date.parse(filter.startDate) + 7 * 24 * 60 * 60 * 1000);
            endDate = format(endDate, 'yyyy-MM-dd');
            onFilterChanged('endDate', endDate);
        } else if (filter.endDate && !filter.startDate) {
            let startDate = new Date(Date.parse(filter.endDate) - 7 * 24 * 60 * 60 * 1000);
            startDate = format(startDate, 'yyyy-MM-dd');
            setFilter({...filter, startDate: startDate});
            onFilterChanged('startDate', startDate);
        } else if (filter.startDate && filter.endDate) {
            const diff = Date.parse(filter.endDate) - Date.parse(filter.startDate);
            if (diff > 7 * 24 * 60 * 60 * 1000) {
                const newEndDate = new Date(Date.parse(filter.startDate) + 7 * 24 * 60 * 60 * 1000);
                setRangeError("Date range must not exceed 7 days");
                onFilterChanged('endDate', format(newEndDate, 'yyyy-MM-dd'));
            }else if (diff < 0){
                const newEndDate = new Date(Date.parse(filter.startDate) + 7 * 24 * 60 * 60 * 1000);
                setRangeError("End date must be after start date");
                onFilterChanged('endDate', format(newEndDate, 'yyyy-MM-dd'));
            }
        }
    }, [filter.startDate, filter.endDate]);

    const onFilterChanged = (key, value) => {
        setFilter({...filter, [key]: value});
        onGroupFilterChanged(cityId, {...filter, [key]: value});
    }

    const handleSelectCity = (city) => {
        if (city) {
            setFilter({...filter, latitude: city.latitude, longitude: city.longitude});
            onGroupFilterChanged(cityId, {...filter, latitude: city.latitude, longitude: city.longitude});
        }

    }

    return <div className="group">
        <TextField
            label="Latitude"
            variant="outlined"
            onChange={(e) => onFilterChanged('latitude', e.target.value)}
            value={filter.latitude}
            type="number"/>
        <TextField label="Longitude"
                   variant="outlined"
                   value={filter.longitude}
                   onChange={(e) => onFilterChanged('longitude', e.target.value)}
                   type="number"/>
        <FiltersCityPicker onSelectCity={handleSelectCity}/>
        <FiltersDatePicker
            label="Start Date"
            onDateChanged={(date) => onFilterChanged('startDate', date)}
            dateValue={filter.startDate}/>
        <FiltersDatePicker
            label="End Date"
            onDateChanged={(date) => onFilterChanged('endDate', date)}
            dateValue={filter.endDate}
            dateRangeError={rangeError}
        />
        <WeIconButton
            icon={<Clear fontSize="medium"/>}
            hint={"Remove Filters"}
            onClick={() => onRemoveCity(cityId)}
        />

    </div>

}