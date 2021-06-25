import { combineReducers } from 'redux';
import biljkeReducer from './biljke';
import narudzbeReducer from './narudzbe'
import skladisteReducer from './skladiste'

const rootReducer = combineReducers({
    biljke: biljkeReducer,
    narudzbe: narudzbeReducer,
    skladiste: skladisteReducer
});

export default rootReducer;