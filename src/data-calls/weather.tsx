import {
    getCitiesRequestParams,
    getCitiesResponse,
    getWeatherForCityRequestParams,
    getWeatherForCityResponse
} from "./types";

export async function getCities({name}: getCitiesRequestParams): Promise<getCitiesResponse> {

    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}`);

    return await response.json();
}

export async function getWeatherForCity({
                                            latitude,
                                            longitude,
                                            startDate,
                                            endDate,
                                            temperature,
                                            humidity
                                        }: getWeatherForCityRequestParams): Promise<getWeatherForCityResponse> {
    const url = `https://api.open-meteo.com/v1/forecast?`;
    const params = new URLSearchParams();
    params.append('latitude', latitude.toString());
    params.append('longitude', longitude.toString());
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

    const response = await fetch(url + params);

    return await response.json();
}