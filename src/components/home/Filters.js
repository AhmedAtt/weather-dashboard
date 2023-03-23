import {useEffect, useState} from "react";
import {AddBoxRounded} from "@mui/icons-material";
import WeIconButton from "../commons/WeIconButtons";
import FiltersGroup from "./FiltersGroup";
import {Button, Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {format} from "date-fns";

export const Filters = ({onSubmitFilters, initialFilter}) => {

    const [filters, setFilters] = useState([initialFilter ? initialFilter : {id: 0}]);
    const [temperature, setTemperature] = useState(true);
    const [humidity, setHumidity] = useState(false);


    useEffect(() => {
        onSubmitFilters(filters, temperature, humidity);
    }, [filters, temperature, humidity]);
    const handleAddCity = () => {
        setFilters([...filters, {id: filters.length}]);
    }

    const handleRemoveCity = (id) => {
        setFilters(filters.filter(city => city.id !== id));
    }

    const handleGroupFilterChanged = (id, filter) => {
        const newFilters = [...filters];
        newFilters[id] = filter;
        setFilters(newFilters);
    }

    const handleTemperatureChange = (event) => {
        setTemperature(event.target.checked);
    }

    const handleHumidityChange = (event) => {
        setHumidity(event.target.checked);
    }

    const handleSaveReport = () => {
        const reports = filters.map(filter => {
            const {latitude, longitude, startDate, endDate} = filter;
            return {
                latitude,
                longitude,
                startDate: startDate,
                endDate: endDate,
                temperature,
                humidity,
                createdAt: format(new Date(), 'yyyy-MM-dd'),
            }
        });
        //get max report number
        const reportKeys = Object.keys(localStorage).filter(key => key.startsWith("Report-"));
        const numbers = reportKeys.map(key => parseInt(key.split("-")[1]));
        const lastReportNumber = reportKeys.length > 0 ? Math.max(...numbers) : 0;
        console.log(lastReportNumber);
        //save report to local storage
        reports.map((report, index) => localStorage.setItem(`Report-${lastReportNumber + index + 1}`, JSON.stringify(report)))
    }


    return <div className="filters">
        <h1>Select Coordinates or City</h1>
        {Object.keys(filters).map((id, index) =>
            <FiltersGroup cityId={id}
                          onGroupFilterChanged={handleGroupFilterChanged}
                          onRemoveCity={handleRemoveCity}
                          initialFilter={index === 0 && initialFilter}
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