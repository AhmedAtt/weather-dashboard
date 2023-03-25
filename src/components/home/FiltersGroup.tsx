import {TextField} from "@mui/material";
import FiltersCityPicker from "./FiltersCityPicker";
import FiltersDatePicker from "./FiltersDatePicker";
import WeIconButton from "../commons/WeIconButtons";
import {Clear} from "@mui/icons-material";
import {useContext, useEffect, useState} from "react";
import {format} from "date-fns";
import {City, CityFilter} from "../../types/City";
import NotificationContext from "../../contexts/NotificationContext";

type FiltersGroupProps = {
    cityId: number,
    onGroupFilterChanged: (id: number, filter: CityFilter) => void,
    onRemoveCity: (id: number) => void,
    initialFilter: CityFilter | null
}
export default function FiltersGroup({cityId, onGroupFilterChanged, onRemoveCity, initialFilter}: FiltersGroupProps) {
    const notificationContext = useContext(NotificationContext);
    const [filter, setFilter] = useState<CityFilter>(initialFilter ? initialFilter : {
        id: cityId,
        name: '',
        latitude: 0,
        longitude: 0,
        startDate: null,
        endDate: null
    });
    //date range must not exceed 7 days
    useEffect(() => {
        if (filter.startDate && !filter.endDate) {
            const endDate = new Date(Date.parse(filter.startDate) + 7 * 24 * 60 * 60 * 1000);
            const endDateString = format(endDate, 'yyyy-MM-dd');
            onFilterChanged('endDate', endDateString);
            notificationContext.info("End date was set to 7 days after start date");
        } else if (filter.endDate && !filter.startDate) {
            const startDate = new Date(Date.parse(filter.endDate) - 7 * 24 * 60 * 60 * 1000);
            const startDateString = format(startDate, 'yyyy-MM-dd');
            setFilter({...filter, startDate: startDateString});
            onFilterChanged('startDate', startDateString);
            notificationContext.info("Start date was set to 7 days before end date");
        } else if (filter.startDate && filter.endDate) {
            const diff = Date.parse(filter.endDate) - Date.parse(filter.startDate);
            if (diff > 7 * 24 * 60 * 60 * 1000) {
                const newEndDate = new Date(Date.parse(filter.startDate) + 7 * 24 * 60 * 60 * 1000);
                notificationContext.error("Date range must not exceed 7 days");
                onFilterChanged('endDate', format(newEndDate, 'yyyy-MM-dd'));

            } else if (diff < 0) {
                const newEndDate = new Date(Date.parse(filter.startDate) + 7 * 24 * 60 * 60 * 1000);
                notificationContext.error("End date must be after start date");
                onFilterChanged('endDate', format(newEndDate, 'yyyy-MM-dd'));
            }
        }
    }, [filter.startDate, filter.endDate]);

    useEffect(() => {
        const bothDates = filter.startDate && filter.endDate;
        const neitherDates = !filter.startDate && !filter.endDate;

        const validFilter = filter.latitude && filter.longitude && (bothDates || neitherDates);
        if (validFilter) {
            onGroupFilterChanged(cityId, filter);
        }
    }, [filter]);
    const onFilterChanged = (key: string, value: string) => {
        setFilter({...filter, [key]: value});
    }


    const handleSelectCity = (city: City) => {
        if (city) {
            setFilter({...filter, latitude: city.latitude, longitude: city.longitude});
            onGroupFilterChanged(cityId, {
                ...filter,
                name: city.name,
                latitude: city.latitude,
                longitude: city.longitude
            });
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
            onDateChanged={(date) => onFilterChanged('startDate', date)}
            dateValue={filter.startDate}/>
        <FiltersDatePicker
            onDateChanged={(date) => onFilterChanged('endDate', date)}
            dateValue={filter.endDate}
        />
        <WeIconButton
            icon={<Clear fontSize="medium"/>}
            hint={"Remove Filters"}
            onClick={() => onRemoveCity(cityId)}
        />

    </div>

}