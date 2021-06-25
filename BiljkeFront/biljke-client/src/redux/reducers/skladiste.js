import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  skladiste: [],
  skladisteFilter: [],
  lokacije: [],
  imanja: [],
  mikrolokacije: [],
  biljkeSearchArr: [],
  mikrolokacijeArr: [],
  isExistObj: {},
  skladisteDetails: {},
  loadingGetBiljkaSkladiste: false
};

// GET BILJKE SKLADISTE
const getBiljkeSkladisteLoad = (state, action) => ({
  ...state,
  loadingGetBiljkaSkladiste: true

});
const getBiljkeSkladiste = (state, action) => ({
  ...state,
  skladiste: [...action.skladiste],
  skladisteFilter: [...action.skladiste],
  loadingGetBiljkaSkladiste: false

});
const getBiljkeSkladisteFail = (state, action) => ({
  ...state,

});

// GET LOKACIJE
const getLokacijeLoad = (state, action) => ({
  ...state,

});
const getLokacijeSuccess = (state, action) => ({
  ...state,
  lokacije: [...action.lokacije]

});
const getLokacijeFail = (state, action) => ({
  ...state,

});

const getImanja = (state, action) => ({
  ...state,
  imanja: [...action.imanja]

});

const getMikrolokacijeImanje = (state, action) => ({
  ...state,
  mikrolokacije: [...action.mikrolokacije]

});

const getBiljkeMikrolokacije = (state, action) => ({
  ...state,
  biljkeSearchArr: [...action.biljkeSearchArr]

});

const getMikrolokacije = (state, action) => ({
  ...state,
  mikrolokacijeArr: [...action.mikrolokacijeArr]

});

const isStanjeExistSuccess = (state, action) => ({
  ...state,
  isExistObj: { ...action.isExistObj }


});

const loadModal = (state, action) => ({
  ...state,
  isExistObj: {},
  biljkeSearchArr: [],


});

const deleteBiljkaSkladiste = (state, action) => ({
  ...state,
  skladiste: [...state.skladiste.filter(biljka => biljka.idBiljkaMikrolokacija !== action.id)]



});

const details = (state, action) => ({
  ...state,
  skladisteDetails: { ...action.skladisteDetails }


});
const filterLokacije = (state, action) => ({
  ...state,
  skladisteFilter: [...action.filterArr]


});




const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.SKLADISTE_BILJKE_GET:
      return getBiljkeSkladiste(state, action);
    case actionsTypes.LOKACIJE_GET:
      return getLokacijeSuccess(state, action);
    case actionsTypes.GET_IMANJA_LOKACIJA:
      return getImanja(state, action);
    case actionsTypes.GET_MIKROLOKACIJE_IMANJE:
      return getMikrolokacijeImanje(state, action);
    case actionsTypes.GET_BILJKE_MIKROLOKACIJE:
      return getBiljkeMikrolokacije(state, action);
    case actionsTypes.GET_MIKROLOKACIJE:
      return getMikrolokacije(state, action);
    case actionsTypes.IS_STANJE_EXIST_SUCCESS:
      return isStanjeExistSuccess(state, action);
    case actionsTypes.SKLADISTE_RESET_MODAL_FORM:
      return loadModal(state, action);
    case actionsTypes.BILJKE_STANJE_DELETE:
      return deleteBiljkaSkladiste(state, action);
    case actionsTypes.SKLADISTE_DETAILS_BILJKE_GET:
      return details(state, action);
    case actionsTypes.SKLADISTE_BILJKE_GET_LOADING:
      return getBiljkeSkladisteLoad(state, action);
    case actionsTypes.FILTER_LOKACIJE:
      return filterLokacije(state, action);

    default: return state;
  }
};

export default reducer;