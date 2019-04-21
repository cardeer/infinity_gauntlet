import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Axios from 'axios'

Array.prototype.shuffle = function(){
    var clone = this.slice()
    var currentIndex = clone.length, temporaryValue, randomIndex
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = clone[currentIndex]
        clone[currentIndex] = clone[randomIndex]
        clone[randomIndex] = temporaryValue
    }

    return clone
}

const Universe = props => {
    const [files, setFiles] = React.useState([])
    const [filesToRemove, setFilesToRemove] = React.useState([])
    const [thanosLoading, setThanosLoading] = React.useState(true)
    const [snapFinished, setSnapFinished] = React.useState(false)

    const snapFingers = async () => {
        setThanosLoading(true)
        filesToRemove.forEach(async (value, index) => {
            const path = btoa(value.path)
            await Axios.get(process.env.REACT_APP_API_URL + `path/delete/${path}`)
            if (index == filesToRemove.length - 1){
                setSnapFinished(true)
            }
        })
    }

    React.useEffect(() => {
        if (!props.projectDirectory)
            props.history.push('/')
        else if (files.length == 0){
            const {projectDirectory} = props
            Axios.get(process.env.REACT_APP_API_URL + `path/view/${projectDirectory}`).then(res => {
                const origin = res.data
                setFiles(origin)
                const shuffle = res.data.shuffle()
                setFilesToRemove(shuffle.splice(0, Math.floor(shuffle.length / 2)))
                setThanosLoading(false)
            })
        }

        if (snapFinished){
            const {projectDirectory} = props
            Axios.get(process.env.REACT_APP_API_URL + `path/view/${projectDirectory}`).then(res => {
                const origin = res.data
                setFiles(origin)
                setThanosLoading(false)
                setSnapFinished(false)
            })
        }
    }, [files, snapFinished])

    return(
        <div>
            <img loading={thanosLoading.toString()} className="preparing-thanos" style={{height: '200px', width: 'auto'}} src="/images/thanos-head.png" alt="" />
            <h3 onClick={snapFingers}>Snap</h3>
            {
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