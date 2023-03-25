import * as React from 'react';
import {useEffect, useState} from "react";
import {AddBoxRounded} from "@mui/icons-material";
import WeIconButton from "../commons/WeIconButtons";
import FiltersGroup from "./FiltersGroup";
import {Button, Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {format} from "date-fns";
import {CityFilter} from "../../types/City";

type FilterProps = {
    onSubmitFilters: (filters: Record<number, CityFilter>, temperature: boolean, humidity: boolean) => void,
    initialFilter: CityFilter | null
}
export const Filters = ({onSubmitFilters, initialFilter}: FilterProps) => {

    const [filters, setFilters] = useState<Record<number, CityFilter>>({});
    const [temperature, setTemperature] = useState(true);
    const [humidity, setHumidity] = useState(false);


    useEffect(() => {
        onSubmitFilters(filters, temperature, humidity);
    }, [filters, temperature, humidity]);

    useEffect(() => {
        setFilters([initialFilter ? initialFilter : {
            id: 0,
            name: '',
            latitude: 0,
            longitude: 0,
            startDate: null,
            endDate: null
        }]);
    }, [initialFilter]);

    const handleAddCity = () => {
        const filtersCount = Object.keys(filters).length;
        setFilters({
            ...filters,
            [filtersCount]: {id: filtersCount, name: '', latitude: 0, longitude: 0, startDate: null, endDate: null}
        });
    }


    const handleRemoveCity = (id: number) => {
        const newFilters = {...filters};
        delete newFilters[id];
        setFilters(newFilters);
    }

    const handleGroupFilterChanged = (id: number, filter: CityFilter) => {
        const newFilters = {...filters};
        newFilters[id] = filter;
        setFilters(newFilters);
    }

    const handleTemperatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTemperature(event.target.checked);
    }

    const handleHumidityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHumidity(event.target.checked);
    }

    const handleSaveReport = () => {
        const reports = [];
        for (let i = 0; i < Object.keys(filters).length; i++) {
            const {latitude, longitude, startDate, endDate, name} = filters[i];
            if (latitude && longitude) {
                reports.push({
                    name,
                    latitude,
                    longitude,
                    startDate: startDate,
                    endDate: endDate,
                    temperature,
                    humidity,
                    createdAt: format(new Date(), 'yyyy-MM-dd'),
                })
            }
        }
        //get max report number
        const reportKeys = Object.keys(localStorage).filter(key => key.startsWith("Report-"));
        const numbers = reportKeys.map(key => parseInt(key.split("-")[1]));
        const lastReportNumber = reportKeys.length > 0 ? Math.max(...numbers) : 0;
        //save report to local storage
        reports.map((report, index) => localStorage.setItem(`Report-${lastReportNumber + index + 1}`, JSON.stringify(report)))
    }


    return <div className="filters">
        <h1>Select Coordinates or City</h1>
        {Object.keys(filters).map((id, index) =>
            <FiltersGroup
                key={`filter-group-${id}`}
                cityId={parseInt(id)}
                onGroupFilterChanged={handleGroupFilterChanged}
                onRemoveCity={handleRemoveCity}
                initialFilter={index === 0 ? initialFilter : null}
            />)
        }
        <div className="add-group">
            <WeIconButton
                icon={<AddBoxRounded fontSize="medium"/>}
                hint={"Add City filters"}
                onClick={handleAddCity}/>
        </div>
        <div className="checkboxes-wrapper">
            <FormGroup>
                <div className="checkboxes">
                    <FormControlLabel
                        control={
                            <Checkbox checked={temperature} onChange={handleTemperatureChange} name="temperature"/>
                        }
                        label="Temperature"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={humidity} onChange={handleHumidityChange} name="humidity"/>
                        }
                        label="Relative Humidity"
                    />
                </div>
            </FormGroup>
        </div>

        <div className="submit">
            <Button variant="contained" onClick={handleSaveReport}>Save</Button>
        </div>
    </div>
}