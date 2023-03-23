// get cities with lat and long

export function getCities({name}) {

    return fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}`)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

//get weather by lat and long
// https://api.open-meteo.com/v1/forecast

export function getWeatherForCity({latitude, longitude, startDate, endDate, temperature, humidity}) {
    const url = `https://api.open-meteo.com/v1/forecast?`;
    const params = new URLSearchParams();
    params.append('latitude', latitude);
    params.append('longitude', longitude);
    if (startDate) {
        params.append('start_date', startDate);
    }
    if (endDate) {
        params.append('end_date', endDate);
    }
    if (temperature && humidity) {
        params.append('hourly', 'temperature_2m,relativehumidity_2m');
    } else if (temperature) {
        params.append('hourly', 'temperature_2m');
    } else if (humidity) {
        params.append('hourly', 'relativehumidity_2m');
    }
    return fetch(url + params).then((response) => response.json()).then(data=> data).catch((error) => {
        console.error('Error:', error);
    });
}