import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import reduxThunk from "redux-thunk"
import {createStore, applyMiddleware} from "redux"
import {Provider} from "react-redux"
import rootReducer from "./rootReducer"

import 'bootstrap/dist/css/bootstrap.min.css'

const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
