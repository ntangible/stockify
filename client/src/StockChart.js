import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import axios from 'axios';
import { Paper, Divider } from "@mui/material";
import Button from "@mui/material/Button";

/* Adapted example that was provided here: https://codesandbox.io/p/sandbox/moxp4310l8 */
const StockChart = ({ stock, AddItem }) => {
    const [chartOptions, setChartOptions] = useState(null);
    const [metaData, SetMetaData] = useState(null);
    const [result, SetResult] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/daily/${stock}`);
                const { stockData, metaData } = response.data;
                SetMetaData(metaData)
                const ohlc = [], volume = [], dataLength = stockData.length, groupingUnits = [["week", [1]],["month", [1, 2, 3, 4, 6]]];

                for (let i = 0; i < dataLength; i += 1) {
                    ohlc.push([
                        stockData[i][0], // date
                        stockData[i][1], // open
                        stockData[i][2], // high
                        stockData[i][3], // low
                        stockData[i][4]  // close
                    ]);

                    volume.push([
                        stockData[i][0], // date
                        stockData[i][5]  // volume
                    ]);
                }
                const options = {
                    chart: {
                        height: '45%'
                    },
                    rangeSelector: {
                        selected: 0
                    },
                    yAxis: [{
                        labels: {
                            align: "right",
                            x: -3
                        },
                        title: {text: "OHLC"},
                        height: "60%",
                        lineWidth: 2,
                        resize: {enabled: true}
                    }, {
                        labels: {
                            align: "right",
                            x: -3
                        },
                        title: {text: "Volume"},
                        top: "65%",
                        height: "35%",
                        offset: 0,
                        lineWidth: 2
                    }],
                    tooltip: {split: true},
                    series: [{
                            type: "candlestick",
                            name: stock,
                            data: ohlc,
                            dataGrouping: {units: groupingUnits}
                        },
                        {
                            type: "column",
                            name: "Volume",
                            data: volume,
                            yAxis: 1,
                            dataGrouping: {units: groupingUnits}
                    }]
                };
                setChartOptions(options);
            } 
            catch (error) {
                if (error.response) {
                    console.error(`Error ${error.response.status}: ${error.response.data.error}`);
                    SetResult(error.response.data['error']);
                }
                else {
                    console.error("Error fetching stock data:", error);
                }
            }
        };
        
        fetchData();
        }, [stock]);

    return (
        <Paper sx={{width: 'calc(100%)'}}>
            <Button sx={{width: 'calc(100%)'}} onClick={() => AddItem(metaData['2. Symbol'])}>
                Add to follow list
            </Button>
            <Divider sx={{borderBottomWidth: 5 }}/>
        {result ? (
            <Paper sx={{ mt: 2, p: 2, backgroundColor: 'error.main', color: 'white' }}>
                {result}
            </Paper>
        ) : (
            <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={chartOptions}
            />
        )}
        </Paper>
    );
};

export default StockChart;
