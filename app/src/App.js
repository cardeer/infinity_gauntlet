import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
    state = {
        files: []
    }
    onSelectProjectSubmit = async e => {
        e.preventDefault()
        const projectPath = btoa(e.target[0].value)
        const files = await axios.get(process.env.REACT_APP_API_URL + `path/${projectPath}`)
        this.setState({files: files.data})
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-6 offset-lg-2 offset-md-3">
                            <div className="form-group text-center">
                                <form onSubmit={this.onSelectProjectSubmit}>
                                    <label>Project path</label>
                                    <input type="text" className="form-control" placeholder="Project path URL" name="project-dir" autoComplete="false" />
                                </form>
                            </div>

                            <div className="container-fluid">
                                {
                                    this.state.files && this.state.files.length > 0 &&
                                    this.state.files.map((value, key) => {
                                        // return <p key={key}>{value[0]} => {value[1]} ({value[2]}MB)</p>
                                        return <p key={key}>{value}</p>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
