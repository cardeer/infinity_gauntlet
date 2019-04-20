import React, { Component } from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom"

import Home from "./pages/Home"
import Universe from './pages/Universe'

class App extends Component {
    route(){
        return(
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/universe" component={Universe} />
            </Switch>
        )
    }

    render(){
        return(
            <BrowserRouter>
                {this.route()}
            </BrowserRouter>
        )
    }
}

export default App
