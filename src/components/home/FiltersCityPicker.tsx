import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {debounce} from 'lodash';
import {getCities} from "../../data-calls/weather";
import NotificationContext from "../../contexts/NotificationContext";
import {useContext} from "react";
import {CityResponse, getCitiesResponse} from "../../data-calls/types";
import {City} from "../../types/City";

type FiltersCityPickerProps = {
    onSelectCity: (city: City) => void;
}

export default function FiltersCityPicker({onSelectCity}: FiltersCityPickerProps) {
    const notificationContext = useContext(NotificationContext);

    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState<CityResponse[]>([]);


    React.useEffect(() => {
            let active = true;

            if (inputValue === '') {
                setOptions(value ? [value] : []);
                return undefined;
            }

            const fetch = async () => {
                try {
                    const {results}:getCitiesResponse = await getCities({name: inputValue});
                    if (active) {
                        let newOptions : CityResponse[] = [];

                        if (value) {
                            newOptions = [value];
                        }

                        if (results) {
                            newOptions = [...newOptions, ...results];
                        }

                        setOptions(newOptions);
                    }


                } catch (error) {
                    notificationContext.error("Failed to fetch cities");
                }
            }

            fetch();
            return () => {
                active = false;
            };
        },
        [value, inputValue]);


    // @ts-ignore
    const handleChange = (event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        onSelectCity(newValue);
    }

    // @ts-ignore
    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
    }

    const debouncedChangeHandler = React.useCallback(debounce(handleInputChange, 500), []);


    // @ts-ignore
    const renderInput = (params) => (
        <TextField {...params} label="Add a location" fullWidth/>
    );

    // @ts-ignore
    const renderOption = (props, option) => {
        const {name, country} = option;

        return (
            <li {...props}>{`${name}, ${country}`}</li>
        );
    }

    return (
        <Autocomplete
            sx={{width: 300}}
            filterOptions={(x) => x}
            getOptionLabel={(option) => {
                if (typeof option === 'string') {
                    return option;
                } else return option.name + ', ' + option.country;
            }
            }
            options={options}
            includeInputInList
            filterSelectedOptions
            value={value}
            noOptionsText="No locations"
            onChange={handleChange}
            onInputChange={debouncedChangeHandler}
            renderInput={renderInput}
            renderOption={renderOption}
        />
    );
}