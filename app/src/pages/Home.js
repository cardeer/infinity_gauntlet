import React, { Component } from 'react'
import axios from 'axios'

class Home extends Component {
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
                            <form onSubmit={this.onSelectProjectSubmit} className="text-center">
                                <label>Galaxy path</label><br /><br />
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Your galaxy path" name="project-dir" autoComplete="off" />
                                    <div className="input-group-append">
                                        <div className="input-group-text" style={{cursor: 'pointer'}}>TELEPORT</div>
                                    </div>
                                </div>
                            </form>

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

                <style>{`
                    .App{
                        position: fixed;
                        top:0;
                        left: 0;
                        height: 100%;
                        width: 100%;
                    }
                    .App > .container{
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                    .form-control{
                        border: none;
                        box-shadow: none !important;
                        outline: none;
                        border-bottom: 1px solid black !important;
                        padding-bottom: 10px;
                        border-radius: 0;
                    }
                    .input-group .input-group-text{
                        border-radius: 0;
                        border: none;
                        background: #202020;
                        color: white;
                    }
                `}</style>
            </div>
        )
    }
}

export default Home
