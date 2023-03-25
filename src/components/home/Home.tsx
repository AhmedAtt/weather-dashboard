import './Home.scss';
import {useContext, useEffect, useState} from "react";
import {Filters} from "./Filters";
import {getWeatherForCity} from "../../data-calls/weather";
import LineChart from "./LineChart";
import {useParams} from "react-router-dom";
import NotificationContext from "../../contexts/NotificationContext";
import {CityFilter} from "../../types/City";
import {getWeatherForCityResponse} from "../../data-calls/types";

export default function Home() {
    const notificationContext = useContext(NotificationContext);
    const [chartsData, setChartsData] = useState<getWeatherForCityResponse[]>([]);
    const [initialFilter, setInitialFilter] = useState<CityFilter | null>(null);

    const {reportId} = useParams();
    useEffect(() => {
        if (reportId) {
            const report = localStorage.getItem(reportId);
            if (!report) {
                notificationContext.error('Report not found');
                return;
            }
            const {latitude, longitude, startDate, endDate, name} = JSON.parse(report);
            setInitialFilter({
                id: 0,
                name: name || '',
                latitude,
                longitude,
                startDate,
                endDate,
            })
        }
    }, [reportId]);


    const handleSubmit = (filters: Record<number, CityFilter>, temperature: boolean, humidity:boolean) => {
        const promises:Promise<getWeatherForCityResponse>[] = [];

        Object.keys(filters).map((id) => {
            const {latitude, longitude, startDate, endDate} = filters[parseInt(id)];
            if (latitude && longitude) {
                promises.push(getWeatherForCity({latitude, longitude, startDate, endDate, temperature, humidity}));
            }
        });
        Promise.all(promises).then((values) => {
            setChartsData(values);
        }).catch((e) => {
            notificationContext.error("Failed to fetch charts data");
        });
    }

    return (
        <div className="home">
            <div className="filters">
                <Filters initialFilter={initialFilter} onSubmitFilters={handleSubmit}/>
            </div>
            <div className="charts">
                {chartsData.map((dataItem, index) => <div className="chart-wrapper" key={`chart-wrapper-${index}`}>
                    <h3> {`${dataItem.latitude}°N ${dataItem.longitude}°E ${dataItem.elevation}m above sea level`} </h3>
                    <LineChart weatherData={dataItem} key={`chart-${index}`}/>
                </div>)}
            </div>

        </div>
    );
}