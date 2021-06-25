import React, { Component } from 'react'
import { connect } from "react-redux";
import { filterLokacije, getBiljkeSkladiste, getImanjaFromLokacija, getLokacije, getMikrolokacijeFromImanje } from '../../redux/actions/skladiste'
import SkladisteBiljka from './SkladisteBiljka';
import styles from '../../styles/Skladiste.module.css'
import biljkeStyles from '../../styles/Biljke.module.css'
import Title from '../../containers/Title'
import SkladisteSidebar from './SkladisteSidebar'


class SkladisteBiljke extends Component {

    constructor() {
        super()
        this.state = {
            lokacija: "",
            imanje: "",
            mikrolokacija: "",
            search: "",
            searchBy: 1, //1-naziv 2-vrsta
            exactMatch: false,
            caseSensitive: false,
            firstWord: false,
            sortBy: 1, //1-match 2-alphabet 3-length
            reverse: false,
            skladiste: [],
            skladisteFilter: []
        }
    }

    componentDidMount() {

        this.props.getLokacije()
        this.props.getBiljkeSkladiste()

    }

    handleChange = () => {
        
        let filterArr;
        let s = this.state;

        if (s.searchBy === 1) {
            if (!s.exactMatch && !s.caseSensitive && !s.firstWord) filterArr = [...this.props.skladiste.filter((biljka) => biljka.nazivBiljke.toLowerCase().includes(s.search.toLowerCase()))];
            else if (!s.exactMatch && !s.caseSensitive && s.firstWord) filterArr = [...this.props.skladiste.filter((biljka) => biljka.nazivBiljke.toLowerCase().startsWith(s.search.toLowerCase()))];
            else if (!s.exactMatch && s.caseSensitive && !s.firstWord) filterArr = [...this.props.skladiste.filter((biljka) => biljka.nazivBiljke.includes(s.search))];
            else if (!s.exactMatch && s.caseSensitive && s.firstWord) filterArr = [...this.props.skladiste.filter((biljka) => biljka.nazivBiljke.startsWith(s.search))];
            else if (s.exactMatch && !s.caseSensitive && !s.firstWord) filterArr = [...this.props.skladiste.filter((biljka) => biljka.nazivBiljke.toLowerCase() === s.search.toLowerCase())];
            else if (s.exactMatch && !s.caseSensitive && s.firstWord) filterArr = [...this.props.skladiste.filter((biljka) => biljka.nazivBiljke.toLowerCase().split(" ", 1)[0] === s.search.toLowerCase().split(" ", 1)[0])];
            else if (s.exactMatch && s.caseSensitive && !s.firstWord) filterArr = [...this.props.skladiste.filter((biljka) => biljka.nazivBiljke === s.search)];
            else filterArr = [...this.props.skladiste.filter((biljka) => biljka.nazivBiljke.split(" ", 1)[0] === s.search.split(" ", 1)[0])];

            if (s.sortBy === 1) {
                filterArr.sort((a, b) => {
                    return a.nazivBiljke.toLowerCase().indexOf(s.search.toLowerCase()) - b.nazivBiljke.toLowerCase().indexOf(s.search.toLowerCase());
                })
            }
            else if (s.sortBy === 2) {
                filterArr.sort((a, b) => {
                    return a.nazivBiljke.toLowerCase() < b.nazivBiljke.toLowerCase() ? -1
                        : a.nazivBiljke.toLowerCase() > b.nazivBiljke.toLowerCase() ? 1
                            : 0;
                })
            }
            else if (s.sortBy === 3) {
                filterArr.sort((a, b) => {
                    return a.nazivBiljke.length - b.nazivBiljke.length;
                })
            }
            else if (s.sortBy === 4) {
                filterArr.sort((a, b) => {
                    return parseInt(a.datumSadnje.split(".")[2]) < parseInt(b.datumSadnje.split(".")[2]) ? -1
                    : parseInt(a.datumSadnje.split(".")[2]) > parseInt(b.datumSadnje.split(".")[2]) ? 1
                    : parseInt(a.datumSadnje.split(".")[1]) < parseInt(b.datumSadnje.split(".")[1]) ? -1
                    : parseInt(a.datumSadnje.split(".")[1]) > parseInt(b.datumSadnje.split(".")[1]) ? 1
                    : parseInt(a.datumSadnje.split(".")[0]) < parseInt(b.datumSadnje.split(".")[0]) ? -1
                    : parseInt(a.datumSadnje.split(".")[0]) > parseInt(b.datumSadnje.split(".")[0]) ? 1
                    : 0; 
                })
            }
            else if (s.sortBy === 5) {
                filterArr.sort((a, b) => {
                    return parseInt(a.datumBranja.split(".")[2]) < parseInt(b.datumBranja.split(".")[2]) ? -1
                    : parseInt(a.datumBranja.split(".")[2]) > parseInt(b.datumBranja.split(".")[2]) ? 1
                    : parseInt(a.datumBranja.split(".")[1]) < parseInt(b.datumBranja.split(".")[1]) ? -1
                    : parseInt(a.datumBranja.split(".")[1]) > parseInt(b.datumBranja.split(".")[1]) ? 1
                    : parseInt(a.datumBranja.split(".")[0]) < parseInt(b.datumBranja.split(".")[0]) ? -1
                    : parseInt(a.datumBranja.split(".")[0]) > parseInt(b.datumBranja.split(".")[0]) ? 1
                    : 0; 
                })
            }
        }
        else {
            if (!s.exactMatch && !s.caseSensitive && !s.firstWord) filterArr = [...this.props.skladiste.filter((biljka) => biljka.vrstaBiljke.toLowerCase().includes(s.search.toLowerCase()))];
            else if (!s.exactMatch && !s.caseSensitive && s.firstWord) filterArr = [...this.props.skladiste.filter((biljka) => biljka.vrstaBiljke.toLowerCase().startsWith(s.search.toLowerCase()))];
            else if (!s.exactMatch && s.caseSensitive && !s.firstWord) filterArr = [...this.props.skladiste.filter((biljka) => biljka.vrstaBiljke.includes(s.search))];
            else if (!s.exactMatch && s.caseSensitive && s.firstWord) filterArr = [...this.props.skladiste.filter((biljka) => biljka.vrstaBiljke.startsWith(s.search))];
            else if (s.exactMatch && !s.caseSensitive && !s.firstWord) filterArr = [...this.props.skladiste.filter((biljka) => biljka.vrstaBiljke.toLowerCase() === s.search.toLowerCase())];
            else if (s.exactMatch && !s.caseSensitive && s.firstWord) filterArr = [...this.props.skladiste.filter((biljka) => biljka.vrstaBiljke.toLowerCase().split(" ", 1)[0] === s.search.toLowerCase().split(" ", 1)[0])];
            else if (s.exactMatch && s.caseSensitive && !s.firstWord) filterArr = [...this.props.skladiste.filter((biljka) => biljka.vrstaBiljke === s.search)];
            else filterArr = [...this.props.skladiste.filter((biljka) => biljka.vrstaBiljke.split(" ", 1)[0] === s.search.split(" ", 1)[0])];

            if (s.sortBy === 1) {
                filterArr.sort((a, b) => {
                    return a.vrstaBiljke.toLowerCase().indexOf(s.search.toLowerCase()) - b.vrstaBiljke.toLowerCase().indexOf(s.search.toLowerCase());
                })
            }
            else if (s.sortBy === 2) {
                filterArr.sort((a, b) => {
                    return a.vrstaBiljke.toLowerCase() < b.vrstaBiljke.toLowerCase() ? -1
                        : a.vrstaBiljke.toLowerCase() > b.vrstaBiljke.toLowerCase() ? 1
                            : 0;
                })
            }
            else if (s.sortBy === 3) {
                filterArr.sort((a, b) => {
                    return a.vrstaBiljke.length - b.vrstaBiljke.length;
                })
            }
            else if (s.sortBy === 4) {
                filterArr.sort((a, b) => {
                    return parseInt(a.datumSadnje.split(".")[2]) < parseInt(b.datumSadnje.split(".")[2]) ? -1
                    : parseInt(a.datumSadnje.split(".")[2]) > parseInt(b.datumSadnje.split(".")[2]) ? 1
                    : parseInt(a.datumSadnje.split(".")[1]) < parseInt(b.datumSadnje.split(".")[1]) ? -1
                    : parseInt(a.datumSadnje.split(".")[1]) > parseInt(b.datumSadnje.split(".")[1]) ? 1
                    : parseInt(a.datumSadnje.split(".")[0]) < parseInt(b.datumSadnje.split(".")[0]) ? -1
                    : parseInt(a.datumSadnje.split(".")[0]) > parseInt(b.datumSadnje.split(".")[0]) ? 1
                    : 0; 
                })
            }
            else if (s.sortBy === 5) {
                filterArr.sort((a, b) => {
                    return parseInt(a.datumBranja.split(".")[2]) < parseInt(b.datumBranja.split(".")[2]) ? -1
                    : parseInt(a.datumBranja.split(".")[2]) > parseInt(b.datumBranja.split(".")[2]) ? 1
                    : parseInt(a.datumBranja.split(".")[1]) < parseInt(b.datumBranja.split(".")[1]) ? -1
                    : parseInt(a.datumBranja.split(".")[1]) > parseInt(b.datumBranja.split(".")[1]) ? 1
                    : parseInt(a.datumBranja.split(".")[0]) < parseInt(b.datumBranja.split(".")[0]) ? -1
                    : parseInt(a.datumBranja.split(".")[0]) > parseInt(b.datumBranja.split(".")[0]) ? 1
                    : 0; 
                })
            }
        }

        if(s.reverse){
            filterArr.reverse();
        }

        if(s.mikrolokacija.length > 0){
            filterArr = filterArr.filter((biljka) => biljka.idMikrolokacija === s.mikrolokacija)
        }
        else if(s.imanje.length > 0){
            filterArr = filterArr.filter((biljka) => biljka.nazivImanja === s.imanje)
        }
        else if(s.lokacija.length > 0){
            filterArr = filterArr.filter((biljka) => biljka.nazivLokacije === s.lokacija)
        }

        this.props.filterLokacije(filterArr)
        
    }

    handleChangeLokacija = ({ target: { value, name } }) => {
        /*let filterArr = [...this.props.skladiste.filter((biljka) => biljka.nazivLokacije === value)]
        this.props.filterLokacije(filterArr)*/

        this.props.getImanjaFromLokacija(value)

        this.setState({
            [name]: value,
            //skladisteFilter: skladisteCopy,
            imanje: "",
            mikrolokacija: ""
        }, this.handleChange)

        //console.log(skladisteCopy)
        console.log(value)

    }

    handleChangeImanje = ({ target: { value, name } }) => {
        /*let filterArr = [...this.props.skladiste].filter((biljka) => biljka.nazivImanja === value)
        this.props.filterLokacije(filterArr)*/

        this.props.getMikrolokacijeFromImanje(value)

        this.setState({
            [name]: value,
            //skladisteFilter: skladisteCopy,
            mikrolokacija: ""
        }, this.handleChange)

    }

    handleChangeMikrolokacija = ({ target: { value, name } }) => {
        /*let filterArr = [...this.props.skladiste].filter((biljka) => biljka.idMikrolokacija === value)
        this.props.filterLokacije(filterArr)*/

        this.setState({
            [name]: value,
            //skladisteFilter: skladisteCopy
        }, this.handleChange)

    }

    handleChangeSearch = ({ target: { value, name } }) => {
        this.setState({
            search: value,
        }, this.handleChange)
        console.log(value)
    }

    handleChangeSearchNaziv = ({ target: { value, name } }) => {
        this.setState({
            searchBy: 1,
        }, this.handleChange)
        console.log(value)
    }

    handleChangeSearchVrsta = ({ target: { value, name } }) => {
        this.setState({
            searchBy: 2,
        }, this.handleChange)
        console.log(value)
    }

    handleChangeFilterExact = ({ target: { value, name } }) => {
        this.setState({
            exactMatch: !this.state.exactMatch,
        }, this.handleChange)
        console.log(value)
    }

    handleChangeFilterCase = ({ target: { value, name } }) => {
        this.setState({
            caseSensitive: !this.state.caseSensitive,
        }, this.handleChange)
        console.log(value)
    }

    handleChangeFilterFirst = ({ target: { value, name } }) => {
        this.setState({
            firstWord: !this.state.firstWord,
        }, this.handleChange)
        console.log(value)
    }

    handleChangeSortNone = ({ target: { value, name } }) => {
        this.setState({
            sortBy: 0,
        }, this.handleChange)
    }

    handleChangeSortMatch = ({ target: { value, name } }) => {
        this.setState({
            sortBy: 1,
        }, this.handleChange)
    }

    handleChangeSortAlpha = ({ target: { value, name } }) => {
        this.setState({
            sortBy: 2,
        }, this.handleChange)
    }

    handleChangeSortLength = ({ target: { value, name } }) => {
        this.setState({
            sortBy: 3,
        }, this.handleChange)
    }

    handleChangeSortDatumSadnje = ({ target: { value, name } }) => {
        this.setState({
            sortBy: 4,
        }, this.handleChange)
    }

    handleChangeSortDatumBranja = ({ target: { value, name } }) => {
        this.setState({
            sortBy: 5,
        }, this.handleChange)
    }

    handleChangeSortReverse = ({ target: { value, name } }) => {
        this.setState({
            reverse: !this.state.reverse,
        }, this.handleChange)
    }


    render() {
        //const { skladiste, skladisteFilter } = this.state
        let skladisteRender = this.props.skladisteFilter.map((biljkaSkladiste, i) => {
            return (
                <div key={i}>
                    <SkladisteBiljka
                        biljkaSkladiste={biljkaSkladiste}
                    />
                </div>

            )
        })
        return (
            <>
                <SkladisteSidebar
                    lokacija={this.state.lokacija}
                    handleChangeLokacija={this.handleChangeLokacija}
                    imanje={this.state.imanje}
                    handleChangeImanje={this.handleChangeImanje}
                    imanja={this.props.imanja}
                    mikrolokacija={this.state.mikrolokacija}
                    handleChangeMikrolokacija={this.handleChangeMikrolokacija}
                    mikrolokacije={this.props.mikrolokacije}
                    handleChangeSearchNaziv={this.handleChangeSearchNaziv}
                    handleChangeSearchVrsta={this.handleChangeSearchVrsta}
                    handleChangeFilterExact={this.handleChangeFilterExact}
                    handleChangeFilterCase={this.handleChangeFilterCase}
                    handleChangeFilterFirst={this.handleChangeFilterFirst}
                    handleChangeSortNone={this.handleChangeSortNone}
                    handleChangeSortMatch={this.handleChangeSortMatch}
                    handleChangeSortAlpha={this.handleChangeSortAlpha}
                    handleChangeSortLength={this.handleChangeSortLength}
                    handleChangeSortDatumSadnje={this.handleChangeSortDatumSadnje}
                    handleChangeSortDatumBranja={this.handleChangeSortDatumBranja}
                    handleChangeSortReverse={this.handleChangeSortReverse}
                    searchBy={this.state.searchBy}
                    exactMatch={this.state.exactMatch}
                    caseSensitive={this.state.caseSensitive}
                    firstWord={this.state.firstWord}
                    sortBy={this.state.sortBy}
                    reverse={this.state.reverse}

                />
                <div id="searchId" className={biljkeStyles.biljkeSearch + " " + biljkeStyles.biljkeSearchHide}>
                    <input type="text" placeholder="Search..." value={this.state.search} onChange={this.handleChangeSearch} />
                </div>
                <div className={styles.skladiste}>
                    <Title title="Skladište" />
                    {this.props.loadingGetBiljkaSkladiste ? "loading..." : skladisteRender}
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        skladiste: state.skladiste.skladiste,
        skladisteFilter: state.skladiste.skladisteFilter,
        lokacije: state.skladiste.lokacije,
        imanja: state.skladiste.imanja,
        mikrolokacije: state.skladiste.mikrolokacije,
        loadingGetBiljkaSkladiste: state.skladiste.loadingGetBiljkaSkladiste
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBiljkeSkladiste: () => dispatch(getBiljkeSkladiste()),
        getLokacije: () => dispatch(getLokacije()),
        getImanjaFromLokacija: (naziv) => dispatch(getImanjaFromLokacija(naziv)),
        getMikrolokacijeFromImanje: (naziv) => dispatch(getMikrolokacijeFromImanje(naziv)),
        filterLokacije: (value) => dispatch(filterLokacije(value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SkladisteBiljke);
