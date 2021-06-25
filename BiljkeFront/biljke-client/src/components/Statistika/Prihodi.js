import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import styles from "../../styles/Statistika.module.css"

const Prihodi = () => {
  const [chartData, setChartData] = useState({});
  const [godina, setGodina] = useState(2021);
  const [valutaIndex, setValutaIndex] = useState(0);
  const mjeseci = ["Sijecanj", "Veljaca", "Ozujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac", "Ostalo"];
  const valute = [
    {
      oznaka: "KM",
      konverzija: 1
    },
    {
      oznaka: "EUR",
      konverzija: 0.51
    },
    {
      oznaka: "HRK",
      konverzija: 3.83
    },
    {
      oznaka: "USD",
      konverzija: 0.62
    }
  ]

  const getPrihodi = () => {
    let iznos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let colors = Array(13).fill("");
    axios
      .get("http://localhost:5000/api/statistika/prihodi/" + godina)
      .then(res => {
        console.log(res);
        for (const dataObj of res.data) {
          iznos[mjeseci.indexOf(dataObj.mjesec)] = parseFloat(dataObj.narudzbaIznos * valute[valutaIndex].konverzija).toFixed(2);
        }
        for (let i = 0; i < iznos.length; i++) {
          colors[i] = "rgba(43, 224, 91, " + (iznos[i] / Math.max(...iznos)) + ")";
          console.log(colors[i]);
        }
        setChartData({
          labels: mjeseci,
          datasets: [
            {
              label: "Prihod (" + valute[valutaIndex].oznaka + ")",
              data: iznos,
              backgroundColor: colors,
              borderColor: "rgba(0, 0, 0, 0.3)",
              borderWidth: 2
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(iznos);
  }

  const godinaNext = () => {
    setGodina(godina + 1);
  }
  const godinaPrev = () => {
    setGodina(godina - 1);
  }

  const valutaNext = () => {
    setValutaIndex((valutaIndex + 1) % valute.length);
  }
  const valutaPrev = () => {
    setValutaIndex(valutaIndex > 0 ? valutaIndex - 1 : valute.length - 1);
  }

  useEffect(() => {
    getPrihodi();
  }, []);
  useEffect(() => {
    getPrihodi();
  }, [godina, setGodina, valutaIndex, setValutaIndex]);
  return (
    <div>
      <h1 className={styles.chartHeader}>Prihodi
        <div className={styles.godineContainer}>
          <button onClick={valutaPrev} className={styles.decrementButton} > <i className="fas fa-chevron-left"></i> </button>
          {valute[valutaIndex].oznaka}
          <button onClick={valutaNext} className={styles.incrementButton} > <i className="fas fa-chevron-right"></i> </button>
        </div>
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
            legend: {
              display: false,
              labels: {
                fontSize: 0,
                boxHeight: 0,
                bowWidth: 0
              }
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
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

export default Prihodi;