import React, {useMemo} from "react";
import {Chart} from "react-charts";
import ResizableBox from "./ResizableBox";


const formatData = (data) => {
    const formattedData = {
        time: [],
        temperature: [],
        humidity: [],
    };
    if (data.hourly.time) {
        for (let i = 0; i < data.hourly.time.length; i++) {
            formattedData.time.push(data.hourly.time[i]);
            if (data.hourly.temperature_2m) {
                formattedData.temperature.push(data.hourly.temperature_2m[i]);
            }
            if (data.hourly.relativehumidity_2m) {
                formattedData.humidity.push(data.hourly.relativehumidity_2m[i]);
            }

        }
    }

    return formattedData;
}

export default function LineChart({chartData}) {

    const formattedData = useMemo(() => formatData(chartData), [chartData]);
    let temperatureData = null;
    let humidityData = null;

    const axesData = [];

    if (formattedData.temperature.length) {
        temperatureData = formattedData.time.map((time, index) => {
                return {
                    primary: time,
                    secondary: formattedData.temperature[index],
                };
            }
        );
        axesData.push({
            label: "Temperature",
            data: temperatureData,
        });

    }

    if (formattedData.humidity.length) {
        humidityData = formattedData.time.map((time, index) => {
                return {
                    primary: time,
                    secondary: formattedData.humidity[index],
                };
            }
        );
        axesData.push({
            label: "Humidity",
            data: humidityData,
        });
    }


    const primaryAxis = React.useMemo(
        () => ({
            getValue: datum => new Date(datum.primary),
        }),
        []
    );


    const secondaryAxes = React.useMemo(
        () => [
            {
                getValue: (datum) => datum.secondary,
                elementType: "line",
            },
            {
                id: 2,
                getValue: (datum) => datum.secondary,
                elementType: "line",
            }
        ],
        []
    );

    return (

        <ResizableBox>
            <Chart
                options={{
                    data: axesData,
                    primaryAxis,
                    secondaryAxes,
                    tooltip: {
                        show: false,
                    }
                }}
            />
        </ResizableBox>
    );
}