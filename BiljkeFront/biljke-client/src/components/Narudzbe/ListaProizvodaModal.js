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
import {getListaProizvoda} from '../../redux/actions/naruzdbe'
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
    constructor(){
        super()
        this.state = {
            open: false

        }
    }
   
    handleToggle = () => {
       
        this.setState({
            open: !this.state.open,
            
      
        })

        this.props.getListaProizvoda(this.props.id)

        
    }

    

    
    render() {
        const {open} = this.state
        return (
            <Modal
                isOpen={open}
                handleOpen={this.handleToggle}
                title="Lista proizvoda"
                icon={<i aria-hidden className="fas fa-list fa-lg"></i>}
                //modalClass={styles.createNarudzba}
            >
                <div className="dialog-form">
                {
                    this.props.getListaLoading ?
                    "loading...":
                            this.props.listaProizvoda.map((proizvod,index)=> {
                                return(
                                    <div className={styles.narudzbaListItemContainer} key={index}>
                                    <p className={styles.narudzbaListItemNaziv}>Naziv: {proizvod.Naziv}</p>
                                    <p className={styles.narudzbaListItemLabel}>Količina: {proizvod.kolicina}{proizvod.mjernaJedinica}</p>
                                    <p className={styles.narudzbaListItemLabel}>Iznos: {proizvod.iznos}KM</p>
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
        listaProizvoda: state.narudzbe.listaProizvoda,
        getListaLoading: state.narudzbe.getListaLoading


    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getListaProizvoda: (id) => dispatch(getListaProizvoda(id))
      
    }
  };
  
  export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(Form));