import React, { useState, useEffect } from 'react'
import { fetchDailyData } from '../../API';
import { Line, Bar } from 'react-chartjs-2';   
import styles from './Chart.module.css'
import { red } from '@material-ui/core/colors';
import { DialogTitle } from '@material-ui/core';


function Chart({ data: { confirmed, recovered, deaths }, country }) {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());    
        }
        
        console.log(dailyData);
        fetchAPI();
        
    }, [])

    const lineChart = (    
        dailyData.length   
            ? (
            <Line
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [
                        {
                            data: dailyData.map(({ confirmed }) => confirmed),
                            label: "Confirmed",
                            borderColor: "#3333ff",
                            fill: true,
                        }, 
                        {
                            data: dailyData.map(({ deaths }) => deaths),
                            label: "Confirmed",
                            borderColor: "red",
                            backgroundColor: "red",
                            fill: true,
                        }
                    ],
                    
                }}     
            />) : null
    ); 

    console.log(confirmed, recovered, deaths);

    const barChart = (
        confirmed
            ? (
                <Bar 
                    data={{
                        labels: ["Confirmed", "Recovered", "Deaths"],
                        datasets: [{
                            label:"People",
                            backgroundColor: [
                                "blue",
                                "green",
                                "red",
                            ],
                            data:[confirmed.value, recovered.value, deaths.value]
                            
                        }]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text:`Current state in ${country}`},
                    }}
                />
            ): null
    );

    return (
        <div>
            <div className={styles.container}>
                {
                    country ? barChart: lineChart
                }
            </div>
        </div>
    )
}

export default Chart
