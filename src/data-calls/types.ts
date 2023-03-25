// get citites

export type CityResponse = {
    id: number
    name: string,
    latitude: number
    longitude: number
    elevation: number
    feature_code: string,
    country_code: string,
    admin1_id: number
    timezone: string,
    country_id: number
    country: string,
    admin1: string,
}

export type getCitiesRequestParams = {
    name: string,
}

export type getCitiesResponse = {
    generationtime_ms: 0.10108948
    results: CityResponse[],
}

//get weather for city

export type getWeatherForCityResponse = {
    latitude: number,
    longitude: number,
    generationtime_ms: number,
    utc_offset_seconds: number,
    timezone: string,
    timezone_abbreviation: string,
    elevation: number,
    hourly_units: {
        time: string,
        temperature_2m?: string,
        relativehumidity_2m?: string,
    },
    hourly: {
        time: number[],
        temperature_2m?: number[],
        relativehumidity_2m?: number[],
    }
}

export type getWeatherForCityRequestParams = {
    latitude: number,
    longitude: number,
    startDate: string | null,
    endDate: string | null,
    temperature: boolean,
    humidity: boolean,
}
