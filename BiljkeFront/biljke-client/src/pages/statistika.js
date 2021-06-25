import React from 'react'
import Prihodi from '../components/Statistika/Prihodi'
import BrojNarudzbi from '../components/Statistika/BrojNarudzbi'
import Title from '../containers/Title'
import styles from '../styles/Statistika.module.css'

export default function statistika() {
    return (
        <div className={styles.statistikaPage}>
            <Title title="Statistika" />
            <Prihodi />
            <BrojNarudzbi />
        </div>
    )
}
