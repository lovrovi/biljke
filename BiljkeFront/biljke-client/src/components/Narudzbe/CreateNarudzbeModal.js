import React, { Component } from 'react'
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import Modal from '../Modal'
import { createNarudzbe, getNarudzbe } from '../../redux/actions/naruzdbe'
import styles from '../../styles/Modals.module.css'
import SelectBiljkaStanjeModal from './SelectBiljkaStanjeModal';

const style = theme => ({

    FormControl: {
        width: 500,
        display: "flex",
        flexWrap: "wrap",
        justifyContetn: "center",
        [theme.breakpoints.down('xs')]: {
            width: "98%",
            textAlign: "center",
            margin: "auto"
        },
    },

    FormControlElement: {
        margin: 20,
        width: "42%",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
        },

    },
    valutaLabel: {
        width: "100%",
        color: "rgb(43, 85, 43)",
        fontWeight: "bold",
    },
    Button: {
        display: "flex",
        justifyContent: "center",
        width: "100%"
    },
    TextArea: {
        display: "flex",
        flexDirection: "column",
        margin: 10,
        width: "100%"
    },
    FormControlElementUpotrebe: {
        margin: 10,
        width: "42%",
        display: "flex",
        flexDirection: "column"
    },

    addProizvod: {
        margin: 10,
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },

})

class Form extends Component {
    constructor() {
        super()
        this.state = {
            VrstaNarudzbe: "",
            nazivKupca: "",
            valuta: {
                oznaka: "KM",
                konverzija: 1
            },
            datumPocetka: "",
            datumKraja: "",
            narudzbaIznos: 0,

            listaBiljaka: [
                {
                    nazivBiljke: "",
                    nazivImanja: "",
                    cijena: 0,
                    mjernaJedinica: "",
                    kolicina: 0,
                }
            ],
            open: false

        }
    }

    handleToggle = () => {

        this.setState({
            open: !this.state.open,
            vrstaNarudzbe: "",
            nazivKupca: "",
            valuta: {
                oznaka: "KM",
                konverzija: 1
            },
            datumPocetka: "",
            datumKraja: "",
            narudzbaIznos: 0,
            listaBiljaka: [],

        })

    }

    handleChange = ({ target: { value, name } }) => {
        this.setState({
            [name]: value
        })

    }

    handleChangeValuta = ({ target: { value, name } }, valute) => {


        let valutaObj = valute.find(el => el.oznaka == value)

        this.setState({
            ...this.state,
            valuta: valutaObj

        })

    }

    handleChangeListaBiljaka = ({ target: { name, value } }, index) => {
        const { listaBiljaka, narudzbaIznos } = this.state
        //let upotrebaObjCopy = {...upotrebaObj}
        let listaBiljakaCopy = [...listaBiljaka]
        console.log(index)
        //console.log(upotrebaItem.id)

        listaBiljakaCopy[index] = {
            ...listaBiljakaCopy[index],
            [name]: value

        }

        let zbroj = 0

        listaBiljakaCopy.forEach(biljka => {
            if (biljka.kolicina < 0 || isNaN(biljka.kolicina)) {
                biljka.kolicina = 0
            }
            zbroj += biljka.cijena * biljka.kolicina
        })


        this.setState({
            listaBiljaka: listaBiljakaCopy,
            narudzbaIznos: zbroj

        })

    }


    createNarudzba = (e) => {
        e.preventDefault()

        const { vrstaNarudzbe, nazivKupca, valuta, datumPocetka, datumKraja, narudzbaIznos, listaBiljaka } = this.state

        this.props.createNarudzbe(vrstaNarudzbe, nazivKupca, valuta.oznaka, datumPocetka, datumKraja, narudzbaIznos, listaBiljaka, this.onCloseModal)

    }

    onCloseModal = () => {
        this.handleToggle()
        this.props.getNarudzbe()
    }

    /*addProizvod = () => {
        const {listaBiljaka} = this.state

        let biljkaObjCopy = {
            vrsta:"",
            kolicina: "",
            iznosBiljke: 0
        }

        let listaBiljakaCopy = [...listaBiljaka, biljkaObjCopy]
        //listaUpotrebaCopy = [...listaUpotreba, upotrebaObjCopy]

        this.setState({
            listaBiljaka: listaBiljakaCopy
        })

        console.log(listaBiljakaCopy)
    }*/

    fillData = (biljka, handleClose) => {
        const { listaBiljaka } = this.state

        let listaBiljakaCopy = [...listaBiljaka]

        let listaBiljakaObj = {
            nazivBiljke: biljka.nazivBiljke,
            nazivImanja: biljka.nazivImanja,
            cijena: biljka.cijena,
            mjernaJedinica: biljka.mjernaJedinica,
            kolicina: 0
        }

        listaBiljakaCopy.push(listaBiljakaObj)



        this.setState({
            listaBiljaka: listaBiljakaCopy
        })

        handleClose()
    }


    render() {
        const { vrstaNarudzbe, nazivKupca, valuta, datumPocetka, datumKraja, narudzbaIznos, listaBiljaka, open } = this.state
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
        //let ukupanIznos = 0
        return (
            <Modal
                isOpen={open}
                handleOpen={this.handleToggle}
                title="Dodaj novu narudžbu"
                icon={<AddIcon />}
                modalClass={styles.createNarudzba}
            >
                <div className="dialog-form">
                    <form className={this.props.classes.FormControl} onSubmit={this.createNarudzba}>
                        <TextField
                            label="vrsta narudzbe"
                            value={vrstaNarudzbe}
                            name='vrstaNarudzbe'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            id="naziv"
                            required

                        />

                        <br />
                        <TextField
                            label="naziv Kupca"
                            value={nazivKupca}
                            name='nazivKupca'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            required
                        />
                        <br />

                        <div className={styles.valutaContainer}>
                            <InputLabel  className={this.props.classes.valutaLabel} id="input">Valuta</InputLabel >
                            <Select
                                value={valuta.oznaka}
                                name="oznaka"
                                onChange={(e) => this.handleChangeValuta(e, valute)}
                                required
                                displayEmpty
                                className={styles.valutaSelect}
                            >
                                {
                                    valute.map((valuta, i) =>
                                        <MenuItem key={i} name="oznaka" value={valuta.oznaka}>{valuta.oznaka}</MenuItem>
                                    )


                                }
                            </Select> 
                        </div>
                        <div className={styles.valutaContainer}>
                            <InputLabel className={this.props.classes.valutaLabel} id="input">Iznos narudžbe</InputLabel>

                            <p className={styles.valutaSelect}>{parseFloat(narudzbaIznos * valuta.konverzija).toFixed(2) + " " + valuta.oznaka}</p>
                        </div>


                        <TextField
                            label="datum pocetka"
                            value={datumPocetka}
                            name='datumPocetka'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            required
                        />
                        <br />
                        <TextField
                            label="datum kraja"
                            value={datumKraja}
                            name='datumKraja'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            required
                        />
                        <br />
                        <div className={styles.valutaContainer}>
                            <InputLabel className={this.props.classes.valutaLabel} id="input">Lista proizvoda</InputLabel>
                            <SelectBiljkaStanjeModal fillData={(biljka, handleClose) => this.fillData(biljka, handleClose)} />

                        </div>
                        {
                            listaBiljaka.map((biljka, index) => {
                                return (
                                    <div key={index} className={styles.narudzbaItemContainer}>
                                        <div className={styles.narudzbaItemLeft}>
                                            <p className={styles.narudzbaItemNaziv}>{biljka.nazivBiljke}</p>

                                            <InputLabel className={styles.narudzbaItemLabel} id="input">naziv imanja: {biljka.nazivImanja}</InputLabel>
                                            <InputLabel className={styles.narudzbaItemLabel} id="input">cijena biljke: {biljka.cijena}KM/{biljka.mjernaJedinica}</InputLabel>
                                        </div>
                                        <div className={styles.narudzbaItemRight}>
                                            <TextField
                                                label={"kolicina (" + biljka.mjernaJedinica + ")"}
                                                value={biljka.kolicina}
                                                name='kolicina'
                                                onChange={(e) => this.handleChangeListaBiljaka(e, index)}
                                                margin="normal"
                                                className={styles.narudzbaItemTextArea}
                                                required
                                            />
                                            <InputLabel className={styles.narudzbaItemLabel} id="input">Ukupno: {biljka.cijena * biljka.kolicina} KM</InputLabel>
                                        </div>

                                    </div>
                                )
                            })
                        }
                        <br />



                        <div className={this.props.classes.Button}>
                            <button
                                className={styles.createBiljkaButton}
                                disabled={listaBiljaka.length === 0 ? true : false}
                            >
                                Dodaj
                            </button>
                        </div>

                    </form>


                </div>

            </Modal>

        )
    }
}

const mapStateToProps = (state) => {
    return {


    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNarudzbe: (vrstaNarudzbe, nazivKupca, oznaka, datumPocetka, datumKraja, narudzbaIznos, listaBiljaka, onCloseModal) =>
            dispatch(createNarudzbe(vrstaNarudzbe, nazivKupca, oznaka, datumPocetka, datumKraja, narudzbaIznos, listaBiljaka, onCloseModal)),
        getNarudzbe: () => dispatch(getNarudzbe()),

    }
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(Form));