import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Axios from 'axios'

Array.prototype.shuffle = function(){
    var currentIndex = this.length, temporaryValue, randomIndex
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = this[currentIndex]
        this[currentIndex] = this[randomIndex]
        this[randomIndex] = temporaryValue
    }

    return this
}

const Universe = props => {
    const [files, setFiles] = React.useState([])
    const [filesToRemove, setFilesToRemove] = React.useState([])
    const [thanosLoading, setThanosLoading] = React.useState(true)

    React.useEffect(() => {
        if (!props.projectDirectory)
            props.history.push('/')
        else if (files.length == 0){
            const {projectDirectory} = props
            Axios.get(process.env.REACT_APP_API_URL + `path/view/${projectDirectory}`).then(res => {
                setFiles(res.data)
                setFilesToRemove(res.data.shuffle())
                setThanosLoading(false)
            })
        }
    }, [files])

    return(
        <div>
            <img loading={thanosLoading.toString()} className="preparing-thanos" style={{height: '200px', width: 'auto'}} src="/images/thanos-head.png" alt="" />
            {
                files.length > 0 &&
                files.map((value, index) => {
                    return <p key={index}>{value.name}</p>
                })
            }

            <style>{`
                @keyframes preparing{
                    from{
                        transform: rotateZ(0deg) translate(-50%, -50%);
                    }
                    to{
                        transform: rotateZ(360deg) translate(-50%, -50%);
                    }
                }
                .preparing-thanos{
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: rotateZ(0deg) translate(-50%, -50%);
                    transform-origin: 0 0;
                    animation: preparing 1s linear infinite;
                }
                .preparing-thanos[loading=false]{
                    display: none;
                    animation: none;
                }
            `}</style>
        </div>
    )
}

function mstp({projectDirectory}){
    return {projectDirectory: projectDirectory ? projectDirectory : null}
}

export default withRouter(connect(mstp)(Universe))