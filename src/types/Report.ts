export type ReportTableRow = {
    id: string,
    name: string,
    includedData: string,
    latAndLong: string,
    dateRange: string,
    dateCreated: string,
}

export type LoadedReport = {
    name: string,
    latitude: number,
    longitude: number,
    startDate: string | null,
    endDate: string | null,
    temperature: boolean,
    humidity:boolean,
    createdAt:string,
}