import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import {debounce} from 'lodash';
import {getCities} from "../../data-calls/weather";


export default function FiltersCityPicker({onSelectCity}) {
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);


    React.useEffect(() => {
            let active = true;

            if (inputValue === '') {
                setOptions(value ? [value] : []);
                return undefined;
            }

            const fetch = async () => {
                try {
                    const {results} = await getCities({name: inputValue});
                    if (active) {
                        let newOptions = [];

                        if (value) {
                            newOptions = [value];
                        }

                        if (results) {
                            newOptions = [...newOptions, ...results];
                        }

                        setOptions(newOptions);
                    }


                } catch (error) {
                    alert(error);
                }
            }

            fetch();
            return () => {
                active = false;
            };
        },
        [value, inputValue]);


    const handleChange = (event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        onSelectCity(newValue);
    }

    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
    }

    const debouncedChangeHandler = React.useCallback(debounce(handleInputChange, 500), []);


    const renderInput = (params) => (
        <TextField {...params} label="Add a location" fullWidth/>
    );

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