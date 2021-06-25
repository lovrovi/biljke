import React, { Component } from 'react'
import { connect } from "react-redux";
import { getBiljke, filterBiljke } from '../../redux/actions/biljke'
import Biljka from './Biljka';
import styles from '../../styles/Biljke.module.css'
import Title from '../../containers/Title';
import Sidebar from '../Sidebar/Sidebar'
import BiljkeSidebar from './BiljkeSidebar';



class Biljke extends Component {

    constructor() {
        super()
        this.state = {
            search: "",
            searchBy: 1, //1-naziv 2-vrsta
            exactMatch: false,
            caseSensitive: false,
            firstWord: false,
            sortBy: 1, //1-match 2-alphabet 3-length
            reverse: false,
            biljke: [],
            biljkeFilter: []
        }
    }

    componentDidMount() {
        this.props.getBiljke()
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

    handleChangeSortReverse = ({ target: { value, name } }) => {
        this.setState({
            reverse: !this.state.reverse,
        }, this.handleChange)
    }

    handleChange = () => {
        let filterArr;
        let s = this.state;

        if (s.searchBy === 1) {
            if (!s.exactMatch && !s.caseSensitive && !s.firstWord) filterArr = [...this.props.biljke.filter((biljka) => biljka.Naziv.toLowerCase().includes(s.search.toLowerCase()))];
            else if (!s.exactMatch && !s.caseSensitive && s.firstWord) filterArr = [...this.props.biljke.filter((biljka) => biljka.Naziv.toLowerCase().startsWith(s.search.toLowerCase()))];
            else if (!s.exactMatch && s.caseSensitive && !s.firstWord) filterArr = [...this.props.biljke.filter((biljka) => biljka.Naziv.includes(s.search))];
            else if (!s.exactMatch && s.caseSensitive && s.firstWord) filterArr = [...this.props.biljke.filter((biljka) => biljka.Naziv.startsWith(s.search))];
            else if (s.exactMatch && !s.caseSensitive && !s.firstWord) filterArr = [...this.props.biljke.filter((biljka) => biljka.Naziv.toLowerCase() === s.search.toLowerCase())];
            else if (s.exactMatch && !s.caseSensitive && s.firstWord) filterArr = [...this.props.biljke.filter((biljka) => biljka.Naziv.toLowerCase().split(" ", 1)[0] === s.search.toLowerCase().split(" ", 1)[0])];
            else if (s.exactMatch && s.caseSensitive && !s.firstWord) filterArr = [...this.props.biljke.filter((biljka) => biljka.Naziv === s.search)];
            else filterArr = [...this.props.biljke.filter((biljka) => biljka.Naziv.split(" ", 1)[0] === s.search.split(" ", 1)[0])];

            if (s.sortBy === 1) {
                filterArr.sort((a, b) => {
                    return a.Naziv.toLowerCase().indexOf(s.search.toLowerCase()) - b.Naziv.toLowerCase().indexOf(s.search.toLowerCase());
                })
            }
            else if (s.sortBy === 2) {
                filterArr.sort((a, b) => {
                    return a.Naziv.toLowerCase() < b.Naziv.toLowerCase() ? -1
                        : a.Naziv.toLowerCase() > b.Naziv.toLowerCase() ? 1
                            : 0;
                })
            }
            else if (s.sortBy === 3) {
                filterArr.sort((a, b) => {
                    return a.Naziv.length - b.Naziv.length;
                })
            }
        }
        else {
            if (!s.exactMatch && !s.caseSensitive && !s.firstWord) filterArr = [...this.props.biljke.filter((biljka) => biljka.Vrsta.toLowerCase().includes(s.search.toLowerCase()))];
            else if (!s.exactMatch && !s.caseSensitive && s.firstWord) filterArr = [...this.props.biljke.filter((biljka) => biljka.Vrsta.toLowerCase().startsWith(s.search.toLowerCase()))];
            else if (!s.exactMatch && s.caseSensitive && !s.firstWord) filterArr = [...this.props.biljke.filter((biljka) => biljka.Vrsta.includes(s.search))];
            else if (!s.exactMatch && s.caseSensitive && s.firstWord) filterArr = [...this.props.biljke.filter((biljka) => biljka.Vrsta.startsWith(s.search))];
            else if (s.exactMatch && !s.caseSensitive && !s.firstWord) filterArr = [...this.props.biljke.filter((biljka) => biljka.Vrsta.toLowerCase() === s.search.toLowerCase())];
            else if (s.exactMatch && !s.caseSensitive && s.firstWord) filterArr = [...this.props.biljke.filter((biljka) => biljka.Vrsta.toLowerCase().split(" ", 1)[0] === s.search.toLowerCase().split(" ", 1)[0])];
            else if (s.exactMatch && s.caseSensitive && !s.firstWord) filterArr = [...this.props.biljke.filter((biljka) => biljka.Vrsta === s.search)];
            else filterArr = [...this.props.biljke.filter((biljka) => biljka.Vrsta.split(" ", 1)[0] === s.search.split(" ", 1)[0])];

            if (s.sortBy === 1) {
                filterArr.sort((a, b) => {
                    return a.Vrsta.toLowerCase().indexOf(s.search.toLowerCase()) - b.Vrsta.toLowerCase().indexOf(s.search.toLowerCase());
                })
            }
            else if (s.sortBy === 2) {
                filterArr.sort((a, b) => {
                    return a.Vrsta.toLowerCase() < b.Vrsta.toLowerCase() ? -1
                        : a.Vrsta.toLowerCase() > b.Vrsta.toLowerCase() ? 1
                            : 0;
                })
            }
            else if (s.sortBy === 3) {
                filterArr.sort((a, b) => {
                    return a.Vrsta.length - b.Vrsta.length;
                })
            }
        }

        if(s.reverse){
            filterArr.reverse();
        }

        this.props.filterBiljke(filterArr)

    }

    render() {
        let renderBiljke = this.props.biljkeFilter.map((biljka, index) => {
            return (
                <div key={index}>
                    <Biljka
                        biljka={biljka}
                    />
                </div>
            )
        })
        return (
            <>
                <BiljkeSidebar 
                    handleChangeSearchNaziv={this.handleChangeSearchNaziv}
                    handleChangeSearchVrsta={this.handleChangeSearchVrsta}
                    handleChangeFilterExact={this.handleChangeFilterExact}
                    handleChangeFilterCase={this.handleChangeFilterCase}
                    handleChangeFilterFirst={this.handleChangeFilterFirst}
                    handleChangeSortNone={this.handleChangeSortNone}
                    handleChangeSortMatch={this.handleChangeSortMatch}
                    handleChangeSortAlpha={this.handleChangeSortAlpha}
                    handleChangeSortLength={this.handleChangeSortLength}
                    handleChangeSortReverse={this.handleChangeSortReverse}
                    searchBy={this.state.searchBy}
                    exactMatch={this.state.exactMatch}
                    caseSensitive={this.state.caseSensitive}
                    firstWord={this.state.firstWord}
                    sortBy={this.state.sortBy}
                    reverse={this.state.reverse}
                />
                <div id="searchId" className={styles.biljkeSearch + " " + styles.biljkeSearchHide}>
                    <input type="text" placeholder="Search..." value={this.state.search} onChange={this.handleChangeSearch} />
                </div>
                <Title title="Biljke" />
                <div className={styles.biljke}>
                    {renderBiljke}

                </div>
            </>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        biljke: state.biljke.biljke,
        biljkeFilter: state.biljke.biljkeFilter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBiljke: () => dispatch(getBiljke()),
        filterBiljke: (value) => dispatch(filterBiljke(value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Biljke);