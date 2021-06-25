import React, { Component } from 'react'
import { connect } from "react-redux";
import EditBiljkaSkladiste from './EditBiljkaSkladiste';
import { getBiljkeSkladisteDetails } from '../../redux/actions/skladiste'
import Image from 'next/image'
import styles from '../../styles/Biljke.module.css'
import Title from '../../containers/Title'
import Head from 'next/head'

class SkladisteDetails extends Component {

    componentDidMount() {
        let id = window.location.pathname.split("/")

        this.props.getBiljkeSkladisteDetails(id[id.length - 1])


    }
    render() {
        const { skladisteDetails } = this.props
        return (
            <div className={styles.biljkaDetailsContainer}>
                <Head>
                    <script src="https://kit.fontawesome.com/3e3f615792.js" crossOrigin="anonymous"></script>
                </Head>
                <Title title={skladisteDetails.nazivBiljke} />
                <div className={styles.skladisteDetailss}>
                    <div className={styles.imgFrameDetails}>
                        <img
                            src={(skladisteDetails.slikaBiljke && skladisteDetails.slikaBiljke !== "") ? skladisteDetails.slikaBiljke : "/images/logo-bg.png"}
                            alt=""
                            objectFit="contain"
                            layout="fill"
                        />
                    </div>
                    <div className={styles.skladisteRight}>
                        <div className={styles.detailsTitle}>
                            <span>Naziv</span>
                            <p>{skladisteDetails.nazivBiljke}</p>
                        </div>
                        <div className={styles.detailsTitle}>
                            <span>Datum sadnje</span>
                            <p>{skladisteDetails.datumSadnje}</p>
                        </div>
                        <div className={styles.detailsTitle}>
                            <span>Datum branja</span>
                            <p>{skladisteDetails.datumBranja}</p>
                        </div>
                        <div className={styles.detailsTitle}>
                            <span>Naziv imanja</span>
                            <p>{skladisteDetails.nazivImanja}</p>
                        </div>
                        <div className={styles.detailsTitle}>
                            <span>Posađena količina</span>
                            <p>{skladisteDetails.posadjenaKolicina}</p>
                        </div>
                        <div className={styles.detailsTitle}>
                            <span>Obrana količina</span>
                            <p>{skladisteDetails.obranaKolicina}</p>
                        </div>
                        <div className={styles.detailsTitle}>
                            <span>Cijena</span>
                            <p>{skladisteDetails.cijena}/{skladisteDetails.mjernaJedinica}</p>
                        </div>
                    </div>
                    <div className={styles.biljnaPutovnicaSkladiste}>
                        <h3>Biljna putovnica</h3>
                        <div className={styles.biljnaPutovnicaDetails}>
                            <span>Država</span>
                            <p>{skladisteDetails.drzava}</p>
                        </div>
                        <div className={styles.biljnaPutovnicaDetails}>
                            <span>Proizvođač</span>
                            <p>{skladisteDetails.proizvodjac}</p>
                        </div>
                    </div>
                    <EditBiljkaSkladiste skladisteDetails={skladisteDetails} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        skladisteDetails: state.skladiste.skladisteDetails
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBiljkeSkladisteDetails: (id) => dispatch(getBiljkeSkladisteDetails(id)),


    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SkladisteDetails);

