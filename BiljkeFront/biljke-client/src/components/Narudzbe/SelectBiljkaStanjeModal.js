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
import { loadModal, searchBiljkaStanje } from '../../redux/actions/naruzdbe'
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
        margin: 20,
        width: "42%",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
        },

    },

})

class Form extends Component {
    constructor() {
        super()
        this.state = {
            biljkaSearch: "",
            open: false

        }
    }

    handleToggle = () => {

        this.setState({
            open: !this.state.open,
            biljkaSearch: ""


        })

        this.props.loadModal()

    }

    handleChange = ({ target: { value, name } }) => {
        this.setState({
            [name]: value
        })

    }

    getSearchString = (e) => {
        e.preventDefault()
        const { biljkaSearch } = this.state
        this.props.searchBiljkaStanje(biljkaSearch)
    }




    render() {
        const { biljkaSearch, open } = this.state
        return (
            <Modal
                isOpen={open}
                handleOpen={this.handleToggle}
                title="Pretraži biljku na stanju"
                icon={<AddIcon />}
            //modalClass={styles.createNarudzba}
            >
                <div className="dialog-form">
                    <form className={this.props.classes.FormControl}>
                        <TextField
                            label="Search:"
                            value={biljkaSearch}
                            name='biljkaSearch'
                            onChange={this.handleChange}
                            margin="normal"
                            className={this.props.classes.FormControlElement}
                            id="naziv"
                            required

                        />

                        <br />
                        <div onClick={this.getSearchString}><i className={"fas fa-search fa-lg " + styles.searchModal}></i></div>


                    </form>
                    {
                        this.props.biljkaSearch.map((biljka, i) => {
                            return (
                                <div className={styles.searchModalResult} key={i} onClick={() => this.props.fillData(biljka, this.handleToggle)}>
                                    <p>{biljka.nazivBiljke}</p>
                                    <p>{biljka.nazivImanja}</p>
                                    <p>{biljka.cijena} KM/{biljka.mjernaJedinica}</p>
                                    <p>--------------------------------------</p>
                                </div>
                            )
                        })
                    }



                </div>

            </Modal>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        biljkaSearch: state.narudzbe.biljkaSearch

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchBiljkaStanje: (searchString) => dispatch(searchBiljkaStanje(searchString)),
        loadModal: () => dispatch(loadModal())

    }
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(Form));