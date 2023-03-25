export type City = {
    name?: string;
    latitude: number;
    longitude: number;
}


export type CityFilter = {
    id: number;
    name?: string;
    latitude?: number;
    longitude?: number;

    startDate: string | null;
    endDate: string | null;
}

export type CityReportItem = {
    
}