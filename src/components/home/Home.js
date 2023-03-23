import './Home.scss';
import {useEffect, useState} from "react";
import {Filters} from "./Filters";
import {getWeatherForCity} from "../../data-calls/weather";
import LineChart from "./LineChart";
import {useParams} from "react-router-dom";

export default function Home() {
    const [chartsData, setChartsData] = useState([]);
    const [filter, setFilter] = useState(null);

    const {reportId} = useParams();
    useEffect(() => {
        if (reportId) {
            const {latitude, longitude, startDate, endDate} = JSON.parse(localStorage.getItem(reportId));
            setFilter({
                id: 0,
                latitude,
                longitude,
                startDate,
                endDate,
            })
        }
    }, [reportId]);


    const handleSubmit = (filters, temperature, humidity) => {
        const promises = []
        Object.keys(filters).map(async id => {
            const {latitude, longitude, startDate, endDate} = filters[id];
            if(latitude && longitude){
                promises.push(getWeatherForCity({latitude, longitude, startDate, endDate, temperature, humidity}));
            }
        });
        Promise.all(promises).then((values) => {
            setChartsData(values);
        }).catch((e) => {
            console.log("Failed to load data");
        });
    }

    return (
        <div className="home">
            <div className="filters">
                <Filters initialFilter={filter} onSubmitFilters={handleSubmit}/>
            </div>
            <div className="charts">
                {chartsData.map((dataItem, index) => <div className="chart-wrapper">
                    <h3> {`${dataItem.latitude}°N ${dataItem.longitude}°E ${dataItem.elevation}m above sea level`} </h3>
                    <LineChart chartData={dataItem} key={`chart-${index}`}/>
                </div>)}
            </div>

        </div>
    );
}