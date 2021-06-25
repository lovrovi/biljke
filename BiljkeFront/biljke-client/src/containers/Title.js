import React from 'react'
import styles from '../styles/Title.module.css'

export default function Title({title}) {
    return (
        <div className={styles.title}>
        <div className={styles.leftDiv}></div>
            <h2>{title}</h2>
        </div>
    )
}
