import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
    biljke: [],
    biljkeFilter: [],
    naziv: "",
    vrsta: "",
    biljkaDetailsArr: [],
    biljkaDetails: {},
    biljkaUpotreba: [],
    loadingBiljkaDetails: false,
    loadingUpdate: false
};

// GET
const getBiljkeLoading = (state, action) => ({
    ...state,

});
const getBiljkeSuccess = (state, action) => ({
    ...state,
    biljke: [...action.biljke.data],
    biljkeFilter: [...action.biljke.data],

});
const getBiljkeFail = (state, action) => ({
    ...state,

});

// CREATE
const createBiljkeSuccess = (state, action) => ({
    ...state,
    naziv: action.naziv,
    vrsta: action.vrsta

});

//DELETE
const deleteBiljke = (state, action) => ({
    ...state,
    biljke: [...state.biljke.filter(biljka => biljka.idBiljka !== action.id)]

});

//GET BILJKA DETAILS
const getBiljkaDetailsLoad = (state, action) => ({
    ...state,
    loadingBiljkaDetails: true

});
const getBiljkaDetailsSucces = (state, action) => ({
    ...state,
    biljkaDetailsArr: [...action.biljkaDetailsArr],
    biljkaDetails: { ...action.biljkaDetailsArr[0] },
    loadingBiljkaDetails: false



});
const getBiljkaDetailsFail = (state, action) => ({
    ...state,

});
// UPDATE

const updateLoad = (state, action) => ({
    ...state,
    loadingUpdate: true

});
const updateSucces = (state, action) => ({
    ...state,
    loadingUpdate: false



});

// BILJKE FILTER

const filterBiljke = (state, action) => ({
    ...state,
    biljkeFilter: [...action.filterArr]


});




/*const resetModal = (state,action) => ({
    ...state,
    naziv: "",
    vrsta: ""
})*/

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.BILJKE_GET:
            return getBiljkeSuccess(state, action);
        case actionsTypes.BILJKE_CREATE:
            return createBiljkeSuccess(state, action);
        case actionsTypes.BILJKE_DELETE:
            return deleteBiljke(state, action);
        case actionsTypes.BILJKA_DETAILS_GET:
            return getBiljkaDetailsSucces(state, action);
        case actionsTypes.BILJKA_DETAILS_GET_LOADING:
            return getBiljkaDetailsLoad(state, action);
        case actionsTypes.BILJKE_UPDATE_LOADING:
            return updateLoad(state, action);
        case actionsTypes.BILJKE_UPDATE:
            return updateSucces(state, action);
        case actionsTypes.FILTER_BILJKE:
            return filterBiljke(state, action);
        default: return state;
    }
};

export default reducer;