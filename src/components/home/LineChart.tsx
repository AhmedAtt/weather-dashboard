import React, {useMemo} from "react";
import {AxisOptions, Chart} from "react-charts";
import ResizableBox from "./ResizableBox";
import {WeatherData, FormattedChartData, AxesData, ChartData} from "../../types/Chart";

type LineChartProps = {
    weatherData: WeatherData;
}

const formatData = (data: WeatherData) => {
    const formattedData: FormattedChartData = {
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

export default function LineChart({weatherData}: LineChartProps) {

    const formattedData = useMemo(() => formatData(weatherData), [weatherData]);
    let temperatureData:ChartData[] = [];
    let humidityData:ChartData[] = [];

    const axesData:AxesData[] = [];

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
        ():AxisOptions<ChartData> => ({
                getValue: datum => new Date(datum.primary),
        }),
        []
    );


    const secondaryAxes = React.useMemo(
        ():AxisOptions<ChartData>[]  => [
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