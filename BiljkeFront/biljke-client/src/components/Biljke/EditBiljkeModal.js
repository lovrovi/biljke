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
import { updateBiljka, getBiljke, getBiljkaDetails } from '../../redux/actions/biljke'
import styles from '../../styles/Modals.module.css'


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
        margin: "10px 40px 10px 0px",
        width: "42%",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
        },

    },
    Button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    TextArea: {
        display: "flex",
        flexDirection: "column",
        "margin-top": "10px",
        width: "100%"
    },
    FormControlElementUpotrebe: {
        margin: 10,
        "margin-left": 0,
        width: "42%",
        display: "flex",
        flexDirection: "column"
    },

    addUpotreba: {
        margin: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },

    addUpotrebaButton: {
        width: "40px",
        height: "40px",
        "border-radius": "50%",
        "margin-left": "15px",
        "box-shadow": "2px 2px 10px 0px grey",
        border: "2px solid #aaa"
    },

    ImageContainer: {
        margin: 10,
        "margin-left": 0,
        minWidth: "220px",
        width: "220px",
        height: "220px",
        border: "1px solid #888"
    },

    Image: {
        margin: 10,
        "max-height": "200px",
        "max-width": "200px"
    },

})

class Form extends Component {

    constructor() {
        super()
        this.state = {
            naziv: "",
            vrsta: "",
            vrijemeSadnje: "",
            vrijemeBranja: "",
            opisUpute: "",
            image: "",
            url: "",
            listaUpotreba: [],
            open: false,


        }
    }



    handleToggleOpen = () => {
        let biljkaUpotreba = []
        this.props.biljkaDetailsArr.forEach((biljka) => {
            let biljkaUpObj = {
                vrstaUpotrebe: biljka.vrstaUpotrebe,
                opisUpotrebe: biljka.opisUpotrebe
            }
            biljkaUpotreba.push(biljkaUpObj)


        })
        //console.log("aaaaaaaa",biljkaUpotreba);
        //this.isMount = true

        this.setState({
            open: !this.state.open,
            naziv: this.props.biljkaDetails.Naziv,
            vrsta: this.props.biljkaDetails.Vrsta,
            vrijemeSadnje: this.props.biljkaDetails.vrijemeSadnje,
            vrijemeBranja: this.props.biljkaDetails.vrijemeBranja,
            opisUpute: this.props.biljkaDetails.opisUpute,
            image: this.props.biljkaDetails.image,
            url: this.props.biljkaDetails.slika,
            listaUpotreba: biljkaUpotreba
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
    handleChangeUpotreba = ({ target: { name, value } }, index) => {
        const { listaUpotreba } = this.state
        //let upotrebaObjCopy = {...upotrebaObj}
        let listaUpotrebaCopy = [...listaUpotreba]
        console.log(index)
        //console.log(upotrebaItem.id)

        listaUpotrebaCopy[index] = {
            ...listaUpotrebaCopy[index],
            [name]: value

        }


        console.log(value);
        this.setState({
            listaUpotreba: listaUpotrebaCopy
        })
    }
    updateBiljka = (e) => {
        e.preventDefault()
        const { naziv, vrsta, vrijemeBranja, vrijemeSadnje, opisUpute, url, listaUpotreba } = this.state
        this.props.updateBiljka(naziv, vrsta, vrijemeBranja, vrijemeSadnje, opisUpute, url, listaUpotreba, this.props.biljkaDetails.idBiljka, this.onCloseModal)
    }

    onCloseModal = () => {
        this.handleToggleOpen()
        this.props.getBiljkaDetails(this.props.biljkaDetails.idBiljka)


    }

    uploadImage = () => {
        const data = new FormData()
        data.append("file", this.state.image)
        data.append("upload_preset", "biljke")
        data.append("cloud_name", "rt-foto-editor")
        fetch("https://api.cloudinary.com/v1_1/rt-foto-editor/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    url: data.url
                })
                console.log(data)
            })
            .catch(err => console.log(err))
    }


    render() {
        const { naziv, vrsta, vrijemeSadnje, vrijemeBranja, opisUpute, url, listaUpotreba, open } = this.state
        const upotrebe = ["Hrana", "Lijekovi", "Goriva", "Otrov", "Materijali"]
        return (
            <Modal
                isOpen={open}
                handleOpen={this.handleToggleOpen}
                //handleClose={this.handleToggleClose}
                title="Uredi biljku"
                icon={<i aria-hidden className="fas fa-edit fa-lg"></i>}
                modalClass={styles.EditButton}
            >
                <div className="dialog-form">
                    <form className={this.props.classes.FormControl} onSubmit={this.updateBiljka}>
                        <TextField
                            label="naziv"
                            value={naziv}
                            name='naziv'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            id="naziv"
                            required

                        />

                        <br />
                        <TextField
                            label="vrsta"
                            value={vrsta}
                            name='vrsta'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            required
                        />
                        <br />

                        <TextField
                            label="vrijeme sadnje"
                            value={vrijemeSadnje}
                            name='vrijemeSadnje'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            required
                        />
                        <br />

                        <TextField
                            label="vrijeme branja"
                            value={vrijemeBranja}
                            name='vrijemeBranja'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            required
                        />
                        <br />

                        <div className={styles.uploadContainer}>
                            <div className={this.props.classes.ImageContainer}>
                                <img src={url} alt="" className={this.props.classes.Image} />
                            </div>
                            <div className={styles.uploadButtonContainer}>
                                <InputLabel id="slika">Slika biljke</InputLabel>
                                <input className={styles.uploadInput} type="file" onChange={(e) => this.setState({ image: e.target.files[0] })}></input>
                                <button className={styles.uploadButton} onClick={(e) => { e.preventDefault(); this.uploadImage(); }}>Upload</button>
                            </div>
                        </div>
                        <br />

                        <div className={this.props.classes.TextArea}>
                            <InputLabel id="desc">Informacije o uputama</InputLabel>
                            <TextareaAutosize
                                name="opisUpute"
                                value={opisUpute}
                                onChange={this.handleChange}
                                aria-label="minimum height"
                                rowsMin={5}
                                placeholder=""
                                required
                                className={this.props.classes.TextArea}
                            />

                        </div>
                        {
                            listaUpotreba.map((upotrebaItem, index) => {
                                return (
                                    <div key={index} className={this.props.classes.addUpotreba}>
                                        <div className={this.props.classes.FormControlElementUpotrebe}>
                                            <InputLabel id="input">Upotrebe</InputLabel>
                                            <Select
                                                value={upotrebaItem.vrstaUpotrebe}
                                                name="vrstaUpotrebe"
                                                onChange={(e) => this.handleChangeUpotreba(e, index)}
                                                required

                                            >
                                                {
                                                    upotrebe.map((upotreba, i) =>
                                                        <MenuItem key={i} name="upotreba" value={upotreba}>{upotreba}</MenuItem>
                                                    )


                                                }
                                            </Select>
                                        </div>
                                        <div className={this.props.classes.TextArea}>
                                            <InputLabel id="desc">Informacije o upotrebi</InputLabel>
                                            <TextareaAutosize
                                                name="opisUpotrebe"
                                                value={upotrebaItem.opisUpotrebe}
                                                onChange={(e) => this.handleChangeUpotreba(e, index)}
                                                aria-label="minimum height"
                                                rowsMin={5}
                                                placeholder=""
                                                required
                                                className={this.props.classes.TextArea}
                                            />
                                            <br />
                                        </div>
                                    </div>
                                )
                            })
                        }



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
        updateBiljka: (naziv, vrsta, vrijemeBranja, vrijemeSadnje, opisUpute, url, listaUpotreba, id, onCloseModal) => dispatch(updateBiljka(naziv, vrsta, vrijemeBranja, vrijemeSadnje, opisUpute, url, listaUpotreba, id, onCloseModal)),
        getBiljke: () => dispatch(getBiljke()),
        getBiljkaDetails: (idBiljka) =>
            dispatch(getBiljkaDetails(idBiljka)),
    }
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(Form));