import React, { Component } from 'react'
import { connect } from "react-redux";
import {getNarudzbe} from '../../redux/actions/naruzdbe'
import Narudzba from './Narudzba';
import styles from '../../styles/Narudzbe.module.css'
import Title from '../../containers/Title';

class Narudzbe extends Component {
    componentDidMount(){
        this.props.getNarudzbe()
    }
    render() {
        const {narudzbe} = this.props
        let narudzbeRender = narudzbe.map((narudzba, index) => {
            return(
                <div key={index}>
                    <Narudzba 
                        narudzba={narudzba}
                        position={index}
                    />
                </div>
                
            )
        })
        return (
            <>
                <Title title="Narudžbe" />
                <div className={styles.narudzbe}>
                    {narudzbeRender}
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        narudzbe: state.narudzbe.narudzbe
        
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getNarudzbe: () => dispatch(getNarudzbe()),
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Narudzbe);