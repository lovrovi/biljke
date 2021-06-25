import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { createWrapper } from "next-redux-wrapper"
import { composeWithDevTools } from 'redux-devtools-extension'


const middleware = [thunk]

const makeStore = () => createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))
//const store = createStore(rootReducer, compose(applyMiddleware(...middleware)))

export const wrapper = createWrapper(makeStore)