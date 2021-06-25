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
//import {updateBiljka, getBiljke, getBiljkaDetails} from '../../redux/actions/biljke'
import styles from '../../styles/Modals.module.css'
import { updateSkladisteBiljka, getBiljkeSkladisteDetails } from '../../redux/actions/skladiste'


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

    label: {
        width: "100%",
        "margin-left": 20,
        color: "rgb(43, 85, 43)",
        fontWeight: "bold",
    },

    FormControlElement: {
        margin: 20,
        width: "42%",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
        },

    },
    TextArea: {
        display: "flex",
        flexDirection: "column",
        margin: 10,
        width: "100%"
    },
    Button: {
        display: "flex",
        justifyContent: "center",
        width: "100%"
    },
    FormControlElementUpotrebe: {
        margin: 10,
        width: "42%",
        display: "flex",
        flexDirection: "column"
    },

    addUpotreba: {
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
            datumBranja: "",
            kolicinaPosadjeno: "",
            kolicinaStanje: "",
            cijena: "",
            open: false,
            proizvodjac: "",
            drzava: ""


        }
    }



    handleToggleOpen = () => {

        this.setState({
            open: !this.state.open,
            datumBranja: this.props.skladisteDetails.datumBranja,
            kolicinaPosadjeno: this.props.skladisteDetails.posadjenaKolicina,
            kolicinaStanje: this.props.skladisteDetails.obranaKolicina,
            cijena: this.props.skladisteDetails.cijena,
            proizvodjac: this.props.skladisteDetails.proizvodjac,
            drzava: this.props.skladisteDetails.drzava

        })

    }

    /*handleToggleClose = () => {
        this.setState({
            open: false
        })
    }*/


    handleChange = ({ target: { value, name } }) => {
        this.setState({
            [name]: value
        })

    }

    updateBiljkaSkladiste = (e) => {
        e.preventDefault()
        const { datumBranja, kolicinaPosadjeno, kolicinaStanje, cijena, proizvodjac, drzava } = this.state
        const { idBiljkaMikrolokacija, idStanje } = this.props.skladisteDetails
        this.props.updateSkladisteBiljka(datumBranja, kolicinaPosadjeno, kolicinaStanje, idBiljkaMikrolokacija, idStanje, cijena, proizvodjac, drzava, this.onCloseModal)
    }

    onCloseModal = () => {
        this.handleToggleOpen()
        this.props.getBiljkeSkladisteDetails(this.props.skladisteDetails.idBiljkaMikrolokacija)


    }


    render() {
        const { open, datumBranja, kolicinaPosadjeno, kolicinaStanje, cijena, proizvodjac, drzava } = this.state
        //const upotrebe = ["Hrana","Lijekovi","Goriva","Otrov","Materijali"]
        return (
            <Modal
                isOpen={open}
                handleOpen={this.handleToggleOpen}
                //handleClose={this.handleToggleClose}
                title="Uredi biljku na stanju"
                icon={<i aria-hidden className="fas fa-edit fa-lg"></i>}
                modalClass={styles.EditButton}
            >
                <div className="dialog-form">
                    <form className={this.props.classes.FormControl} onSubmit={this.updateBiljkaSkladiste}>
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
                        <TextField
                            label="kolicinaPosadjeno"
                            value={kolicinaPosadjeno}
                            name='kolicinaPosadjeno'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            id="kolicinaPosadjeno"
                            required

                        />

                        <br />
                        <TextField
                            label="kolicinaStanje"
                            value={kolicinaStanje}
                            name='kolicinaStanje'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            id="kolicinaStanje"
                            required

                        />

                        <br />
                        <TextField
                            label="cijena"
                            value={cijena}
                            name='cijena'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            id="cijena"
                            required

                        />

                        <br />
                        <InputLabel className={this.props.classes.label} id="input">Biljna putovnica</InputLabel>
                        <TextField
                            label="prizvodjac"
                            value={proizvodjac}
                            name='proizvodjac'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement + " " + styles.marginBottom30}
                            id="proizvodjac"
                            required

                        />

                        <br />
                        <TextField
                            label="drzava"
                            value={drzava}
                            name='drzava'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement + " " + styles.marginBottom30}
                            id="drzava"
                            required
                        />
                        <br />


                        <div className={this.props.classes.Button}>
                            <button
                                className={styles.createBiljkaButton}
                            >
                                Uredi
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
        updateSkladisteBiljka: (datumBranja, kolicinaPosadjeno, kolicinaStanje, idBiljkaMikrolokacija, idStanje, cijena, proizvodjac, drzava, onCloseModal) =>
            dispatch(updateSkladisteBiljka(datumBranja, kolicinaPosadjeno, kolicinaStanje, idBiljkaMikrolokacija, idStanje, cijena, proizvodjac, drzava, onCloseModal)),
        getBiljkeSkladisteDetails: (id) => dispatch(getBiljkeSkladisteDetails(id))
    }
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(Form));