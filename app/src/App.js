import React, { Component } from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom"

import Home from "./pages/Home"

class App extends Component {
    route(){
        return(
            <Switch>
                <Route exact path="/" component={Home} />
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
