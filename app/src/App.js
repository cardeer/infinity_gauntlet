import React, { Component } from 'react'

class App extends Component {
    onSelectProjectSubmit = e => {
        e.preventDefault()
        
    }

    render() {
        return (
            <div className="App">
                <form onSubmit={this.onSelectProjectSubmit}>
                    <input type="text" placeholder="Project path URL" />
                </form>
            </div>
        )
    }
}

export default App
