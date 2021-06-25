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
import styles from '../../styles/Modals.module.css'
import SelectBiljkeMikrolokacije from './SelectBiljkeMikrolokacije';
import { createBiljkaSkladiste, getBiljkeSkladiste, getMikrolokacije, isStanjeExist, loadModal } from '../../redux/actions/skladiste'


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
    label: {
        width: "100%",
        "margin-left": 20,
        color: "rgb(43, 85, 43)",
        fontWeight: "bold",
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
            kolicina: 0,
            kordinate: "",
            datumSadnje: "",
            datumBranja: "",
            open: false,
            allMikrolokacije:
            {
                nazivMikrolokacije: "",
                tip: "",
                nazivImanja: "",
                vrstaTla: "",
                idMikrolokacija: ""
            },
            kolicinaStanje: "",
            mjernaJedinica: "",
            cijena: "",
            proizvodjac: "",
            drzava: ""

        }
    }

    handleToggle = () => {

        this.props.getMikrolokacije()

        this.setState({
            open: !this.state.open,
            kolicina: 0,
            kordinate: "",
            datumSadnje: "",
            datumBranja: "",
            nazivBiljkeMikrolokacija: "",
            vrstaBiljkeMikrolokacija: "",
            idBiljkaMikrolokacija: "",
            allMikrolokacije:
            {
                nazivMikrolokacije: "",
                tip: "",
                nazivImanja: "",
                vrstaTla: "",
                idMikrolokacija: ""
            },
            proizvodjac: "",
            drzava: ""

        })

        this.props.loadModal()

    }

    handleChange = ({ target: { value, name } }) => {
        this.setState({
            [name]: value
        })

    }

    handleChangeMikrolokacija = ({ target: { value, name } }, mikrolokacije) => {


        let mikrolokacijaObj = mikrolokacije.find(el => el.idMikrolokacija == value)

        this.setState({
            ...this.state,
            allMikrolokacije: mikrolokacijaObj

        })

        this.props.isStanjeExist(this.state.idBiljkaMikrolokacija, mikrolokacijaObj.idMikrolokacija)

    }

    onCloseModal = () => {
        this.handleToggle()
    }

    fillData = (biljka, handleClose) => {

        let biljkaNaziv = biljka.Naziv
        let biljkaVrsta = biljka.Vrsta
        let biljkaId = biljka.idBiljka


        this.setState({
            nazivBiljkeMikrolokacija: biljkaNaziv,
            vrstaBiljkeMikrolokacija: biljkaVrsta,
            idBiljkaMikrolokacija: biljkaId
            //allMikrolokacije: [...this.props.mikrolokacijeArr]
        })

        handleClose()
    }

    getAllBiljkeSkladiste = () => {
        this.props.getBiljkeSkladiste()
    }

    createBiljkaMikrolokacija = (e) => {
        e.preventDefault()
        
        const { kordinate, kolicina, datumBranja, datumSadnje, idBiljkaMikrolokacija, allMikrolokacije, kolicinaStanje, mjernaJedinica, cijena, proizvodjac, drzava} = this.state
        let kolicinaStanjeSend = kolicinaStanje !== "" ? kolicinaStanje : this.props.isExistObj.kolicina
        let cijenaSend = cijena !== "" ? cijena : this.props.isExistObj.cijena
        let mjernaJedinicaSend = mjernaJedinica !== "" ? mjernaJedinica : this.props.isExistObj.mjernaJedinica
        this.props.createBiljkaSkladiste(kordinate, datumSadnje, datumBranja, kolicina, idBiljkaMikrolokacija, allMikrolokacije.idMikrolokacija, kolicinaStanjeSend, cijenaSend, mjernaJedinicaSend, proizvodjac, drzava, this.getAllBiljkeSkladiste)

        this.onCloseModal()
    }


    render() {
        const { open, kolicina, kordinate, datumBranja, datumSadnje, nazivBiljkeMikrolokacija, vrstaBiljkeMikrolokacija, allMikrolokacije, kolicinaStanje, mjernaJedinica, cijena, proizvodjac, drzava } = this.state

        return (
            <Modal
                isOpen={open}
                handleOpen={this.handleToggle}
                title="Dodaj novu biljku na stanje"
                icon={<AddIcon />}
                modalClass={styles.createNarudzba}
            >
                <div className="dialog-form">
                    <form className={this.props.classes.FormControl} onSubmit={this.createBiljkaMikrolokacija}>
                        <TextField
                            label="kolicina posadjeno"
                            value={kolicina}
                            name='kolicina'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            id="kolicina"
                            required

                        />

                        <br />
                        <TextField
                            label="kordinate"
                            value={kordinate}
                            name='kordinate'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            id="kordinate"
                            required

                        />

                        <br />
                        <TextField
                            label="datumSadnje"
                            value={datumSadnje}
                            name='datumSadnje'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            id="datumSadnje"
                            required

                        />

                        <br />
                        <TextField
                            label="datumBranja"
                            value={datumBranja}
                            name='datumBranja'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            id="datumBranja"
                            required

                        />

                        <br />
                        <label id="input" className={this.props.classes.label}>Biljna putovnica</label>
                        <TextField
                            label="proizvodjac"
                            value={proizvodjac}
                            name='proizvodjac'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            id="proizvodjac"
                            required

                        />

                        <br /><TextField
                            label="drzava"
                            value={drzava}
                            name='drzava'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            id="drzava"
                            required

                        />

                        <br />

                        {
                            nazivBiljkeMikrolokacija && vrstaBiljkeMikrolokacija ?
                                "" :
                                <SelectBiljkeMikrolokacije
                                    fillData={(biljka, handleClose) => this.fillData(biljka, handleClose)}
                                />
                        }
                        <br />

                        <span className={styles.createSkladisteInfo}>{nazivBiljkeMikrolokacija && vrstaBiljkeMikrolokacija ? "Naziv: " : ""}{nazivBiljkeMikrolokacija}</span>
                        <br />
                        <span className={styles.createSkladisteInfo}>{nazivBiljkeMikrolokacija && vrstaBiljkeMikrolokacija ? "Vrsta: " : ""}{vrstaBiljkeMikrolokacija}</span>
                        <br />
                        {
                            nazivBiljkeMikrolokacija && vrstaBiljkeMikrolokacija ?
                                <>
                                    <InputLabel className={styles.skladisteMikrolokacijeLabel} id="input">Mikrolokacije</InputLabel>

                                    <Select
                                        value={allMikrolokacije.idMikrolokacija}
                                        name="idMikrolokacija"
                                        onChange={(e) => this.handleChangeMikrolokacija(e, this.props.mikrolokacijeArr)}
                                        required
                                        displayEmpty
                                        className={styles.skladisteMikrolokacijeSelect}
                                    >
                                        {
                                            this.props.mikrolokacijeArr.map((mikrolokacija, i) =>
                                                <MenuItem key={i} name="mikrolokacija" value={mikrolokacija.idMikrolokacija}>{mikrolokacija.tip + "" + mikrolokacija.nazivMikrolokacije + "," + mikrolokacija.nazivImanja}</MenuItem>
                                            )


                                        }
                                    </Select>
                                </> : ""


                        }
                        <br />
                        {
                            this.props.isExistObj.isExist === 0 && allMikrolokacije.nazivImanja !== "" ?
                                <>
                                    <TextField
                                        label="kolicina obrano"
                                        value={kolicinaStanje}
                                        name='kolicinaStanje'
                                        onChange={this.handleChange}
                                        margin="normal"
                                        className={styles.skladisteObranoInput}
                                        id="kolicina"
                                        required

                                    />

                                    <br />
                                    <TextField
                                        label="mjernaJedinica"
                                        value={mjernaJedinica}
                                        name='mjernaJedinica'
                                        onChange={this.handleChange}
                                        margin="normal"
                                        className={styles.skladisteObranoInput}
                                        id="mjernaJedinica"
                                        required

                                    />

                                    <br />
                                    <TextField
                                        label="cijena"
                                        value={cijena}
                                        name='cijena'
                                        onChange={this.handleChange}
                                        margin="normal"
                                        className={styles.skladisteObranoInput + " " + styles.marginBottom30}
                                        id="cijena"
                                        required

                                    />

                                    <br />
                                </> :
                                <>
                                    <p className={styles.existsSkladisteInfo}>{this.props.isExistObj.isExist !== 0 && allMikrolokacije.nazivImanja !== "" ? `Kolicina: ${this.props.isExistObj.kolicina}` : ""}</p>
                                    <p className={styles.existsSkladisteInfo + " " + styles.marginBottom30}>{this.props.isExistObj.isExist !== 0 && allMikrolokacije.nazivImanja !== "" ? `Cijena: ${this.props.isExistObj.cijena}/${this.props.isExistObj.mjernaJedinica}` : ""}</p>
                                </>

                        }

                        <div className={this.props.classes.Button}>
                            <button
                                className={styles.createBiljkaButton}
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
        mikrolokacijeArr: state.skladiste.mikrolokacijeArr,
        isExistObj: state.skladiste.isExistObj

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMikrolokacije: () => dispatch(getMikrolokacije()),
        isStanjeExist: (idB, idM) => dispatch(isStanjeExist(idB, idM)),
        loadModal: () => dispatch(loadModal()),
        createBiljkaSkladiste: (BMkordinate, BMdatumSadnje, BMdatumBranja, BMkolicina, BiljkaId, BMidMikrolokacije, StanjeKolicina, StanjeCijena, StanjeMjernaJedinica, proizvodjac, drzava, getAllBiljkeSkladiste) =>
            dispatch(createBiljkaSkladiste(BMkordinate, BMdatumSadnje, BMdatumBranja, BMkolicina, BiljkaId, BMidMikrolokacije, StanjeKolicina, StanjeCijena, StanjeMjernaJedinica,proizvodjac, drzava,getAllBiljkeSkladiste)),
        getBiljkeSkladiste: () => dispatch(getBiljkeSkladiste())
    }
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(Form));