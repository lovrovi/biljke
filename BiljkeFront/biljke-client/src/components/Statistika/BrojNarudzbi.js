import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import styles from "../../styles/Statistika.module.css"

const BrojNarudzbi = () => {
    const [chartData, setChartData] = useState({});
    const [godina, setGodina] = useState(2021);
    const mjeseci = ["Sijecanj", "Veljaca", "Ozujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac", "Ostalo"];
    const statusi = ["Zavrsene", "U tijeku", "Propale", "Greske", "Ostali statusi"];


    const getBrojNarudzbi = () => {
        let brojNarudzbiList = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        let colors = ["Green", "Yellow", "Red", "Black", "Grey"];
        axios
            .get("http://localhost:5000/api/statistika/broj-narudzbi/" + godina)
            .then(res => {
                console.log(res);
                for (const dataObj of res.data) {
                    brojNarudzbiList[statusi.indexOf(dataObj.status)][mjeseci.indexOf(dataObj.mjesec)] = parseInt(dataObj.brojNarudzbi);
                }
                setChartData({
                    labels: mjeseci,
                    datasets: [
                        {
                            label: "zavrsene",
                            stack: "stack1",
                            data: brojNarudzbiList[0],
                            backgroundColor: colors[0],
                            borderColor: "rgba(0, 0, 0, 0.3)",
                            borderWidth: 2
                        },
                        {
                            label: "u tijeku",
                            stack: "stack1",
                            data: brojNarudzbiList[1],
                            backgroundColor: colors[1],
                            borderColor: "rgba(0, 0, 0, 0.3)",
                            borderWidth: 2
                        },
                        {
                            label: "propale",
                            stack: "stack1",
                            data: brojNarudzbiList[2],
                            backgroundColor: colors[2],
                            borderColor: "rgba(0, 0, 0, 0.3)",
                            borderWidth: 2
                        },
                        {
                            label: "greske",
                            stack: "stack1",
                            data: brojNarudzbiList[3],
                            backgroundColor: colors[3],
                            borderColor: "rgba(0, 0, 0, 0.3)",
                            borderWidth: 2
                        },
                        {
                            label: "ostalo",
                            stack: "stack1",
                            data: brojNarudzbiList[4],
                            backgroundColor: colors[4],
                            borderColor: "rgba(0, 0, 0, 0.3)",
                            borderWidth: 2
                        },
                    ]
                });
            })
            .catch(err => {
                console.log(err);
            });
        console.log(brojNarudzbiList);
    }

    const godinaNext = () => {
        setGodina(godina + 1);
    }
    const godinaPrev = () => {
        setGodina(godina - 1);
    }

    useEffect(() => {
        getBrojNarudzbi();
    }, []);
    useEffect(() => {
        getBrojNarudzbi();
    }, [godina, setGodina]);
    return (
        <div>
            <h1 className={styles.chartHeader}>Broj Narudzbi
                <div className={styles.godineContainer}>
                    <button onClick={godinaPrev} className={styles.decrementButton} > <i className="fas fa-chevron-left"></i> </button>
                    {godina}
                    <button onClick={godinaNext} className={styles.incrementButton} > <i className="fas fa-chevron-right"></i> </button>
                </div>
            </h1>
            <div className={styles.chartContainer}>
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        title: { text: "Prihodi", display: true },
                        scales: {
                            yAxes: [
                                {
                                    stacked: true,
                                    ticks: {
                                        autoSkip: true,
                                        maxTicksLimit: 10,
                                        precision: 0,
                                        stepSize: 1,
                                        beginAtZero: true
                                    },
                                    gridLines: {
                                        display: false
                                    }
                                }
                            ],
                            xAxes: [
                                {
                                    stacked: true,
                                    gridLines: {
                                        display: false
                                    }
                                }
                            ]
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default BrojNarudzbi;