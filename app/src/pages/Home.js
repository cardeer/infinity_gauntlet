import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {setProjectDirectory} from '../actions'
import axios from 'axios'
import { connect } from 'react-redux';

class Home extends Component {
    onSelectProjectSubmit = async e => {
        e.preventDefault()
        const {setProjectDirectory, history} = this.props
        const projectPath = btoa(e.target[0].value)
        setProjectDirectory(projectPath)
        history.push('/universe')
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

function mstp({projectDirectory}){
    return {projectDirectory: projectDirectory}
}

export default withRouter(connect(mstp, {setProjectDirectory})(Home))
