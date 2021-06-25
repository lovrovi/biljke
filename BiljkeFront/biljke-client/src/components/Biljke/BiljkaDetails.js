import React, { Component } from 'react'
import { connect } from "react-redux";
import { getBiljkaDetails } from '../../redux/actions/biljke'
import EditBiljkeModal from '../Biljke/EditBiljkeModal'
import styles from '../../styles/BiljkaDetails.module.css'
import Image from 'next/image'
import Fab from '@material-ui/core/Fab';
import Title from '../../containers/Title';
import Head from 'next/head'


class BiljkaDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        //this.isMount = true
        //console.log(window.location.pathname)
        let id = window.location.pathname.split("/")
        //console.log(id)
        //console.log(id[id.length-1])
        //this.setBiljkaUpotreba()
        this.props.getBiljkaDetails(id[id.length - 1])
        //console.log(this.props.biljkaDetailsArr)

    }


    render() {
        const { biljkaDetailsArr, biljkaDetails, loadingBiljkaDetails } = this.props
        //console.log(biljkaDetailsArr[0])

        let biljkaUpotrebeRender = biljkaDetailsArr.map((biljka, index) => {

            return (
                <div key={index}>
                    {
                        loadingBiljkaDetails ? "loading..." :
                            <div>
                                <div className={styles.detailsTitle}>
                                    <span>Vrsta upotrebe</span>
                                    <p>{biljka.vrstaUpotrebe}</p>
                                </div>
                                <div className={styles.detailsTitle}>
                                    <span>Opis upotrebe</span>
                                    <p>{biljka.opisUpotrebe}</p>
                                </div>
                            </div>
                    }
                </div>
            )
        })
        return (
            <div>
                <Head>
                    <script src="https://kit.fontawesome.com/3e3f615792.js" crossOrigin="anonymous"></script>
                </Head>
                <Title title={biljkaDetails.Naziv} />
                <div className={styles.details}>
                    <div className={styles.detailsTop}>
                        <div className={styles.detailsTopLeft}>
                            <img
                                src={(biljkaDetails.slika && biljkaDetails.slika !== "") ? biljkaDetails.slika : "/images/logo-bg.png"}
                                alt=""
                            />
                            <div className={styles.detailsRight}>
                                <div className={styles.detailsTitle}>
                                    <span>Naziv</span>
                                    <p>{biljkaDetails.Naziv}</p>
                                </div>
                                <div className={styles.detailsTitle}>
                                    <span>Vrsta</span>
                                    <p>{biljkaDetails.Vrsta}</p>
                                </div>
                                <div className={styles.detailsTitle}>
                                    <span>Vrijeme sadnje</span>
                                    <p>{biljkaDetails.vrijemeSadnje}</p>
                                </div>
                                <div className={styles.detailsTitle}>
                                    <span>Vrijeme branja</span>
                                    <p>{biljkaDetails.vrijemeBranja}</p>
                                </div>
                                {biljkaUpotrebeRender}
                            </div>
                        </div>
                        <EditBiljkeModal
                            biljkaDetails={biljkaDetails}
                            biljkaDetailsArr={biljkaDetailsArr}
                        />
                    </div>
                    <div className={styles.detailsUpute}>
                        <span>Opis upute</span>
                        <p>{biljkaDetails.opisUpute}</p>
                    </div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        biljkaDetailsArr: state.biljke.biljkaDetailsArr,
        biljkaDetails: state.biljke.biljkaDetails,
        biljkaUpotreba: state.biljke.biljkaUpotreba,
        loadingBiljkaDetails: state.biljke.loadingBiljkaDetails,
        loadingUpdate: state.biljke.loadingUpdate



    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBiljkaDetails: (idBiljka) =>
            dispatch(getBiljkaDetails(idBiljka)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BiljkaDetails);
