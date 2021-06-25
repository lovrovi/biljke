import { StylesProvider } from '@material-ui/core'
import React, { Component } from 'react'
import CreateNarudzbeModal from '../components/Narudzbe/CreateNarudzbeModal'
import Narudzbe from '../components/Narudzbe/Narudzbe'
import styles from '../styles/Narudzbe.module.css'

export default class narudzbe extends Component {
    render() {
        return (
            <div className={styles.narudzbePage}>
                <Narudzbe />
                <CreateNarudzbeModal />
            </div>
        )
    }
}

