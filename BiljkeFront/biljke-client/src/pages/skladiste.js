
import SkladisteBiljke from '../components/Skladište/SkladisteBiljke'
import React, { Component } from 'react'
//import Sidebar from '../components/Sidebar/Sidebar';
import SkladisteSidebar from '../components/Skladište/SkladisteSidebar';
import CreateSkladistebiljka from '../components/Skladište/CreateSkladistebiljka';
import styles from '../styles/Skladiste.module.css'

class skladiste extends Component {
    render() {
        return (
            <div id="pageId" className={styles.skladistePage}>
                <SkladisteBiljke />
                <CreateSkladistebiljka />
            </div>
        )
    }
}



export default skladiste;

