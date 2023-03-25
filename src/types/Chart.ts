export type WeatherData = {
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
        time:number[],
        temperature_2m?: number[],
        relativehumidity_2m?: number[],
    }
}

export type FormattedChartData = {
    time: number[],
    temperature: number[],
    humidity: number[],
}

export type ChartData = {
    primary: number,
    secondary: number,
}

export type AxesData = {
    label: string,
    data: ChartData[],
}