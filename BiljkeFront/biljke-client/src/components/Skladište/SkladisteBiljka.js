import React, { Component } from 'react'
import styles from '../../styles/Skladiste.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { connect } from "react-redux";
import { deleteBiljkaStanje, getBiljkeSkladiste } from '../../redux/actions/skladiste'
import Head from 'next/head'

import Fab from '@material-ui/core/Fab';

class SkladisteBiljka extends Component {

    deleteSkladisteBiljka = (idBiljkaMikrolokacija) => {
        this.props.deleteBiljkaStanje(idBiljkaMikrolokacija, this.getAllBiljke)
    }

    getAllBiljke = () => {
        this.props.getBiljkeSkladiste()
    }

    render() {
        const { biljkaSkladiste } = this.props;
        return (
            <div>
                <Head>
                    <script src="https://kit.fontawesome.com/3e3f615792.js" crossOrigin="anonymous"></script>
                </Head>
                <div className={styles.skladisteBiljka}>
                    <Link href={{
                        pathname: '/skladisteDetails/[id]',
                        query: { id: `${biljkaSkladiste.idBiljkaMikrolokacija}` },
                    }}>
                        <div className={styles.imgFrame}>
                            <img
                                src={(biljkaSkladiste.slikaBiljke && biljkaSkladiste.slikaBiljke !== "") ? biljkaSkladiste.slikaBiljke : "/images/logo-bg.png"}
                                alt=""
                            />
                        </div>
                    </Link>
                    <div className={styles.skladisteBiljkaInfo}>
                        <div className={styles.skladisteBiljkaInfoHeader}>
                            <p>{biljkaSkladiste.nazivBiljke}</p>
                            <p className={styles.biljkaVrsta}>{biljkaSkladiste.vrstaBiljke}</p>
                        </div>
                        <table className={styles.infoTable} border="1">
                            <tbody>
                                <tr><td className={styles.infoLeft}>Imanje: </td><td className={styles.infoRight}>{biljkaSkladiste.nazivImanja}</td></tr>
                                <tr><td className={styles.infoLeft}>Cijena: </td><td className={styles.infoRight}>{biljkaSkladiste.cijena} KM / {biljkaSkladiste.mjernaJedinica}</td></tr>
                                <tr><td className={styles.infoLeft}>Posađena količina: </td><td className={styles.infoRight}>{biljkaSkladiste.posadjenaKolicina} Sadnica</td></tr>
                                <tr><td className={styles.infoLeft}>Obrana količina: </td><td className={styles.infoRight}>{biljkaSkladiste.datumBranja !== null ? biljkaSkladiste.obranaKolicina + " " + biljkaSkladiste.mjernaJedinica : 'nema na stanju'}</td></tr>
                                <tr><td className={styles.infoLeft}>Datum sadnje: </td><td className={styles.infoRight}>{biljkaSkladiste.datumSadnje}</td></tr>
                                <tr><td className={styles.infoLeft}>Datum branja: </td><td className={styles.infoRight}>{biljkaSkladiste.datumBranja !== null ? biljkaSkladiste.datumBranja : 'neobrano'}</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.biljkaBtnContainer}>
                        <Fab className={styles.biljkaBtn} variant="round" size='small' onClick={() => this.deleteSkladisteBiljka(biljkaSkladiste.idBiljkaMikrolokacija)}>
                            <i aria-hidden className="fas fa-trash fa-lg"></i>
                        </Fab>
                    </div>
                </div>


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteBiljkaStanje: (id, getAllBiljke) => dispatch(deleteBiljkaStanje(id, getAllBiljke)),
        getBiljkeSkladiste: () => dispatch(getBiljkeSkladiste())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SkladisteBiljka);
