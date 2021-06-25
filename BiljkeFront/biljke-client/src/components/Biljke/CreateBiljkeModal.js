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
import { createBiljke, getBiljke, loadModal } from '../../redux/actions/biljke'
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
        justifyContent: "space-between",
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
            listaUpotreba: [
                {
                    vrstaUpotrebe: "",
                    opisUpotrebe: "",
                }

            ],
            open: false

        }
    }

    handleToggle = () => {

        this.setState({
            open: !this.state.open,
            naziv: "",
            vrsta: "",
            vrijemeSadnje: "",
            vrijemeBranja: "",
            opisUpute: "",
            image: "",
            url: "",
            listaUpotreba: [
                {
                    vrstaUpotrebe: "",
                    opisUpotrebe: "",
                }
            ],

        })

    }

    handleChange = ({ target: { value, name } }) => {
        this.setState({
            [name]: value
        })

    }

    handleChangeUpotreba = ({ target: { name, value } }, index) => {
        const { upotrebaObj, listaUpotreba } = this.state
        //let upotrebaObjCopy = {...upotrebaObj}
        let listaUpotrebaCopy = [...listaUpotreba]
        console.log(index)
        //console.log(upotrebaItem.id)

        listaUpotrebaCopy[index] = {
            ...listaUpotrebaCopy[index],
            [name]: value

        }


        this.setState({
            listaUpotreba: listaUpotrebaCopy,


        })

    }


    createBiljka = (e) => {
        e.preventDefault()

        const { naziv, vrsta, vrijemeSadnje, vrijemeBranja, opisUpute, url, listaUpotreba } = this.state

        this.props.createBiljke(naziv, vrsta, vrijemeSadnje, vrijemeBranja, opisUpute, url, listaUpotreba, this.onCloseModal)

    }

    onCloseModal = () => {
        this.handleToggle()
        this.props.getBiljke()
    }

    addUpotreba = () => {
        const { listaUpotreba } = this.state

        let upotrebaObjCopy = {
            vrstaUpotrebe: "",
            opisUpotrebe: "",
        }

        let listaUpotrebaCopy = [...listaUpotreba, upotrebaObjCopy]
        //listaUpotrebaCopy = [...listaUpotreba, upotrebaObjCopy]

        this.setState({
            listaUpotreba: listaUpotrebaCopy
        })

        console.log(listaUpotrebaCopy)
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
        const upotrebe = ["Hrana", "Lijekovi", "Goriva", "Dodaci hrani", "Materijali"]
        return (
            <Modal
                isOpen={open}
                handleOpen={this.handleToggle}
                title="Dodaj novu biljku"
                icon={<AddIcon />}
                modalClass={styles.createButton}
            >
                <div className="dialog-form">
                    <form className={this.props.classes.FormControl} onSubmit={this.createBiljka}>
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
                                onClick={() => this.addUpotreba()}
                                type="button"
                                className={this.props.classes.addUpotrebaButton + " " + styles.addUpotrebaButton}
                            >
                                <i aria-hidden className="fas fa-plus"></i>
                            </button>
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


    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createBiljke: (naziv, vrsta, vrijemeSadnje, vrijemeBranja, opisUpute, url, listaUpotreba, onCloseModal) =>
            dispatch(createBiljke(naziv, vrsta, vrijemeSadnje, vrijemeBranja, opisUpute, url, listaUpotreba, onCloseModal)),
        getBiljke: () => dispatch(getBiljke()),
        loadModal: () => dispatch(loadModal())
    }
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(Form));