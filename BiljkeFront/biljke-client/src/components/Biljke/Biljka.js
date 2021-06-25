
import styles from '../../styles/Biljka.module.css'
import Image from 'next/image'
import Link from "next/link"
import { connect } from "react-redux";

import React, { Component } from 'react'

import { deleteBiljka, getBiljke } from '../../redux/actions/biljke'
import EditBiljkeModal from './EditBiljkeModal';
import Head from 'next/head'

import Fab from '@material-ui/core/Fab';

class Biljka extends Component {


    deleteBiljka = (idBiljka, idUpute) => {
        this.props.deleteBiljka(idBiljka, idUpute, this.getAllBiljke)
    }
    getAllBiljke = () => {
        this.props.getBiljke()
    }
    render() {
        const { biljka, biljkaDetails, biljkaDetailsArr } = this.props
        return (
            <div>
                <Head>
                    <script src="https://kit.fontawesome.com/3e3f615792.js" crossOrigin="anonymous"></script>
                </Head>

                <div className={styles.biljka}>
                    <Link href={{
                        pathname: '/biljka/[id]',
                        query: { id: `${biljka.idBiljka}` },
                    }}>
                        <div className={styles.imgFrame}>
                            <Image
                                src={(biljka.slika && biljka.slika !== "") ? biljka.slika : "/images/logo-bg.png"}
                                alt=""
                                objectFit="cover"
                                layout="fill"
                            />
                        </div>
                    </Link>
                    <div className={styles.biljkaInfo}>
                        <div className={styles.biljkaInfoHeader}>
                            <div className={styles.nazivVrsta}>
                                <p className={styles.biljkaNaziv}>{biljka.Naziv}</p>
                                <p className={styles.biljkaVrsta}>{biljka.Vrsta}</p>
                            </div>
                            <div className={styles.biljkaBtnContainer}>
                                {/* <div className={styles.biljkaBtn} onClick={() => this.deleteBiljka(biljka.idBiljka, biljka.idUpute)}>
                                    <Fab variant="round" size='small'>
                                        <i aria-hidden className="fas fa-trash fa-lg"></i>
                                    </Fab>

                                </div> */}
                            </div>
                        </div>
                        <div className={styles.biljkaDescription}>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                It has survived not only five centuries, but also the leap into electronic typesetting,
                                remaining essentially unchanged. It was popularised in the 1960s with the release
                                of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                                publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        biljkaDetails: state.biljke.biljkaDetails,
        biljkaDetailsArr: state.biljke.biljkaDetailsArr,
        biljkaUpotreba: state.biljke.biljkaUpotreba

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteBiljka: (idBiljka, idUpute, getAllBiljke) =>
            dispatch(deleteBiljka(idBiljka, idUpute, getAllBiljke)),
        getBiljke: () => dispatch(getBiljke()),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Biljka);

