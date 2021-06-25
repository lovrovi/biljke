import React from 'react'
import styles from '../../styles/Narudzbe.module.css'
import { getNarudzbe, updateStatus, getListaProizvoda } from '../../redux/actions/naruzdbe'
import Fab from '@material-ui/core/Fab';
import { connect } from "react-redux";
import ListaProizvodaModal from './ListaProizvodaModal';
import Head from 'next/head'


class Narudzba extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }


    setStatus = (id, status) => {
        this.props.updateStatus(id, status, this.getAllNarudzbe)

    }

    getAllNarudzbe = () => {
        this.props.getNarudzbe()
    }

    render() {
        const { narudzba } = this.props
        return (
            <div className={styles.narudzba}>
                <Head>
                    <script src="https://kit.fontawesome.com/3e3f615792.js" crossOrigin="anonymous"></script>
                </Head>
                <ListaProizvodaModal id={narudzba.idNarudzba} />
                <div className={styles.vrstaNarudzbaa} title="Vrsta narudžbe">
                    <p>{narudzba.vrstaNarudzba}</p>
                </div>
                <div className={styles.nazivKupcaa} title="Naziv kupca">
                    <p>{narudzba.nazivKupca}</p>
                </div>
                <div className={styles.narudzbaIznoss} title="Iznos narudžbe">
                    <p>{narudzba.narudzbaIznos}</p>
                </div>
                <div className={styles.datumPocetkaa} title="Datum početka">
                    <p>{narudzba.datumPocetka}</p>
                </div>
                <div className={styles.datumKrajaa} title="Datum kraja">
                    <p>{narudzba.datumKraja}</p>
                </div>
                <div className={styles.mogucnosti}>
                    <Fab variant="round" size='small' title="Završena" onClick={() => this.setStatus(narudzba.idNarudzba, "zavrsena")}>
                        <i aria-hidden className="fas fa-check fa-lg"></i>
                    </Fab>
                    <Fab variant="round" size='small' title="Propala" onClick={() => this.setStatus(narudzba.idNarudzba, "propala")}>
                        <i aria-hidden className="fas fa-times fa-lg"></i>
                    </Fab>
                    <Fab variant="round" size='small' title="U tijeku" onClick={() => this.setStatus(narudzba.idNarudzba, "u tijeku")}>
                        <i aria-hidden className="fas fa-hourglass-half fa-lg"></i>
                    </Fab>
                    <Fab variant="round" size='small' title="Greška" onClick={() => this.setStatus(narudzba.idNarudzba, "greska")}>
                        <i aria-hidden className="fas fa-trash fa-lg"></i>
                    </Fab>
                </div>
                <div
                    className=
                    {
                        narudzba.status == "zavrsena" ? styles.statusZavrseno :
                            narudzba.status == "u tijeku" ? styles.statusUtijeku :
                                narudzba.status == "propala" ? styles.statusPropala :
                                    narudzba.status == "greska" ? styles.statusGreska :
                                        null
                    }
                >
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
        getNarudzbe: () => dispatch(getNarudzbe()),
        updateStatus: (narudzbaId, narudzbaStatus, getAllNarudzbe) => dispatch(updateStatus(narudzbaId, narudzbaStatus, getAllNarudzbe)),


    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Narudzba);

