import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {setProjectDirectory} from '../actions'
import { connect } from 'react-redux'

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
                <div className="background-element"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-6 offset-lg-2 offset-md-3">
                            <div className="container-fluid text-center mb-4" style={{overflow: 'hidden'}}>
                                <img id="infinity-gauntlet-img" src="/images/infinity_gauntlet.png" alt="" style={{height: '200px', width: 'auto'}} />
                            </div>

                            <form onSubmit={this.onSelectProjectSubmit} className="text-center">
                                <label className="h5">Thanos2.js UI</label><br /><br />
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Your project path" name="project-dir" autoComplete="on" />
                                    <div className="input-group-append">
                                        <button className="input-group-text" style={{cursor: 'pointer', backgroundColor: '#202020'}}>CREATE</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <style>{`
                    .background-element{
                        position: fixed;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        background-image: url(http://sfwallpaper.com/images/black-space-wallpaper-4.jpg);
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-position: center;
                        opacity: .5;
                    }
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
                    button{
                        box-shadow: none;
                        outline: none !important;
                        border: none;
                    }

                    @keyframes velocity{
                        from{
                            transform: translateX(-200px);
                        }
                        to{
                            transform: translateX(200px);
                        }
                    }

                    #infinity-gauntlet-img{
                        transform: translateX(-200px);
                        animation: velocity 0.00001s linear infinite;
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
