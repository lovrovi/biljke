import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
    narudzbe: [],
    biljkaSearch: [],
    listaProizvoda: [],
    getListaLoading: false
}; 

// GET
const getNarudzbeLoading = (state, action) => ({
    ...state,
    
});
  const getNarudzbeSuccess = (state, action) => ({
    ...state,
    narudzbe: [...action.narudzbe]
    
    
});
  const getNarudzbeFail = (state, action) => ({
    ...state,
    
});

// CREATE
const createNarudzbeSuccess = (state, action) => ({
    ...state,
   
    
});

//DELETE
const deleteNarudzbe = (state, action) => ({
    ...state,
    narudzbe: [...state.narudzbe.filter(narudzba => narudzba.NarudzbaId !== action.id)]
    
});


// UPDATE

const updateLoad = (state, action) => ({
    ...state,
    
    
});
  const updateSucces = (state, action) => ({
    ...state,
    
    
    
});

// SEARCH BILJKA STANJE MODAL

const searchBiljkaStanje = (state, action) => ({
    ...state,
    biljkaSearch: [...action.listaBiljkaStanje]
});

// LOAD MODAL

const loadModal = (state, action) => ({
    ...state,
    biljkaSearch: []
});

// GET LISTA PROIZVODA

const getListaProizvodaLoad = (state, action) => ({
    ...state,
    getListaLoading: true
});

const getListaProizvoda = (state, action) => ({
    ...state,
    listaProizvoda: [...action.listaProizvoda],
    getListaLoading: false
});






/*const resetModal = (state,action) => ({
    ...state,
    naziv: "",
    vrsta: ""
})*/

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.NARUDZBE_GET:
            return getNarudzbeSuccess(state,action);
        case actionsTypes.NARUDZBE_CREATE:
            return createNarudzbeSuccess(state,action);
        case actionsTypes.NARUDZBE_DELETE:
            return deleteNarudzbe(state,action);
        case actionsTypes.NARUDZBE_UPDATE_LOADING:
            return updateLoad(state,action);
        case actionsTypes.NARUDZBE_UPDATE:
            return updateSucces(state,action);
        case actionsTypes.SEARCH_BILJKA_STANJE_SUCCESS:
            return searchBiljkaStanje(state,action);
        case actionsTypes.NARUDZBE_RESET_MODAL_FORM:
            return loadModal(state,action);
        case actionsTypes.GET_LISTA_PROIZVODA:
            return getListaProizvoda(state,action);
        case actionsTypes.GET_LISTA_PROIZVODA_LOADING:
            return getListaProizvodaLoad(state,action);
        default: return state;
    }
};

export default reducer;