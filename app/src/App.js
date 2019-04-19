import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
    onSelectProjectSubmit = async e => {
        e.preventDefault()
        const projectPath = e.target[0].value
        const data = await axios.get(process.env.REACT_APP_API_URL + 'path/' + btoa(projectPath))
        console.log(data)
    }

    render() {
        return (
            <div className="App">
                <form onSubmit={this.onSelectProjectSubmit}>
                    <input type="text" placeholder="Project path URL" name="project-dir" />
                </form>
            </div>
        )
    }
}

export default App
