import React, { Component } from 'react'
import styles from '../../styles/Sidebar.module.css'
import biljkeStyles from '../../styles/Biljke.module.css'
import skladisteStyles from '../../styles/Skladiste.module.css'
import { connect } from "react-redux";
import Sidebar from '../Sidebar/Sidebar'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

class SkladisteSidebar extends Component {

    componentDidUpdate() {
        console.log(this.props);
    }

    render() {

        return (
            <Sidebar>
                <div className={skladisteStyles.selectDiv}>
                    <InputLabel className={skladisteStyles.selectLabel} id="input">Lokacije</InputLabel>
                    <Select
                        value={this.props.lokacija}
                        name="lokacija"
                        onChange={this.props.handleChangeLokacija}
                        required
                        className={skladisteStyles.selectInput}
                    >
                        {
                            this.props.lokacije.map((lokacija, i) =>
                                <MenuItem key={i} name="lokacija" value={lokacija.Naziv}>{lokacija.Naziv}</MenuItem>
                            )


                        }
                    </Select>
                </div>
                {
                    this.props.imanja.length > 0 ?
                        <>
                            <div className={skladisteStyles.selectDiv}>
                                <InputLabel className={skladisteStyles.selectLabel} id="input">Imanja</InputLabel>
                                <Select
                                    value={this.props.imanje}
                                    name="imanje"
                                    onChange={this.props.handleChangeImanje}
                                    required
                                    className={skladisteStyles.selectInput}
                                >
                                    {
                                        this.props.imanja.map((imanje, i) =>
                                            <MenuItem key={i} name="imanje" value={imanje.naziv}>{imanje.naziv}</MenuItem>
                                        )


                                    }

                                </Select>
                            </div>
                        </> : null
                }
                {
                    this.props.mikrolokacije.length > 0 && this.props.imanje !== "" ?
                        <>
                            <div className={skladisteStyles.selectDiv}>
                                <InputLabel className={skladisteStyles.selectLabel} id="input">Mikrolokacije</InputLabel>
                                <Select
                                    value={this.props.mikrolokacija}
                                    name="mikrolokacija"
                                    onChange={this.props.handleChangeMikrolokacija}
                                    required
                                    className={skladisteStyles.selectInput}
                                >
                                    {
                                        this.props.mikrolokacije.map((mikrolokacija, i) =>
                                            <MenuItem key={i} name="mikrolokacija" value={mikrolokacija.idMikrolokacija}>{mikrolokacija.tip}{mikrolokacija.naziv}</MenuItem>
                                        )


                                    }

                                </Select>
                            </div>
                        </> : null
                }
                <div className={biljkeStyles.biljkeSidebarFilter}>
                    <p>Search by:</p>
                    <div className={biljkeStyles.biljkeSidebarRow}>
                        <div className={biljkeStyles.radioDiv}>
                            <input type="radio" name="searchNaziv" value="Naziv" checked={this.props.searchBy === 1} onChange={this.props.handleChangeSearchNaziv} />
                        </div>
                        <label htmlFor="searchNaziv">Naziv</label>
                    </div>
                    <div className={biljkeStyles.biljkeSidebarRow}>
                        <div className={biljkeStyles.radioDiv}>
                            <input type="radio" name="searchVrsta" value="Vrsta" checked={this.props.searchBy === 2} onChange={this.props.handleChangeSearchVrsta} />
                        </div>
                        <label htmlFor="searchVrsta">Vrsta</label>
                    </div>
                </div>
                <hr className={styles.hrSidebar}></hr>
                <div className={biljkeStyles.biljkeSidebarFilter}>
                    <p>Filter by:</p>
                    <div className={biljkeStyles.biljkeSidebarRow}>
                        <input type="checkbox" name="filterExact" value="Exact Match" checked={this.props.exactMatch} onChange={this.props.handleChangeFilterExact} />
                        <label htmlFor="filterExact">Exact Match</label>
                    </div>
                    <div className={biljkeStyles.biljkeSidebarRow}>
                        <input type="checkbox" name="filterCase" value="Case Sensitive" checked={this.props.caseSensitive} onChange={this.props.handleChangeFilterCase} />
                        <label htmlFor="filterCase">Case Sensitive</label>
                    </div>
                    <div className={biljkeStyles.biljkeSidebarRow}>
                        <input type="checkbox" name="filterFirst" value="First Word Only" checked={this.props.firstWord} onChange={this.props.handleChangeFilterFirst} />
                        <label htmlFor="filterFirst">First Word Only</label>
                    </div>
                </div>
                <hr className={styles.hrSidebar}></hr>
                <div className={biljkeStyles.biljkeSidebarFilter}>
                    <p>Sort by:</p>
                    <div className={biljkeStyles.biljkeSidebarRow}>
                        <div className={biljkeStyles.radioDiv}>
                            <input type="radio" name="sortNone" value="None" checked={this.props.sortBy === 0} onChange={this.props.handleChangeSortNone} />
                        </div>
                        <label htmlFor="sortNone">None</label>
                    </div>
                    <div className={biljkeStyles.biljkeSidebarRow}>
                        <div className={biljkeStyles.radioDiv}>
                            <input type="radio" name="sortMatch" value="Match" checked={this.props.sortBy === 1} onChange={this.props.handleChangeSortMatch} />
                        </div>
                        <label htmlFor="sortMatch">Match</label>
                    </div>
                    <div className={biljkeStyles.biljkeSidebarRow}>
                        <div className={biljkeStyles.radioDiv}>
                            <input type="radio" name="sortAlpha" value="Alphabet" checked={this.props.sortBy === 2} onChange={this.props.handleChangeSortAlpha} />
                        </div>
                        <label htmlFor="sortAlpha">Alphabet</label>
                    </div>
                    <div className={biljkeStyles.biljkeSidebarRow}>
                        <div className={biljkeStyles.radioDiv}>
                            <input type="radio" name="sortLength" value="Length" checked={this.props.sortBy === 3} onChange={this.props.handleChangeSortLength} />
                        </div>
                        <label htmlFor="sortLength">Length</label>
                    </div>
                    <div className={biljkeStyles.biljkeSidebarRow}>
                        <div className={biljkeStyles.radioDiv}>
                            <input type="radio" name="sortDatumSadnje" value="Datum Sadnje" checked={this.props.sortBy === 4} onChange={this.props.handleChangeSortDatumSadnje} />
                        </div>
                        <label htmlFor="sortDatumSadnje">Datum Sadnje</label>
                    </div>
                    <div className={biljkeStyles.biljkeSidebarRow}>
                        <div className={biljkeStyles.radioDiv}>
                            <input type="radio" name="sortDatumBranja" value="Datum Branja" checked={this.props.sortBy === 5} onChange={this.props.handleChangeSortDatumBranja} />
                        </div>
                        <label htmlFor="sortDatumBranja">Datum Branja</label>
                    </div>
                    <div className={biljkeStyles.biljkeSidebarRow}>
                        <input type="checkbox" name="sortReverse" value="Reverse" checked={this.props.reverse} onChange={this.props.handleChangeSortReverse} />
                        <label htmlFor="sortReverse">Reverse</label>
                    </div>
                </div>
            </Sidebar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lokacije: state.skladiste.lokacije,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SkladisteSidebar);
