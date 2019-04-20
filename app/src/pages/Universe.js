import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Axios from 'axios'

const Universe = props => {
    const [files, setFiles] = React.useState([])

    React.useEffect(() => {
        if (files.length == 0){
            const {projectDirectory} = props
            Axios.get(process.env.REACT_APP_API_URL + `path/${projectDirectory}`).then(res => {
                setFiles(res.data)
            })
        }
    }, [files])

    return(
        <div>
            {
                files.length > 0 &&
                files.map((value, index) => {
                    return <p key={index}>{value}</p>
                })
            }
        </div>
    )
}

function mstp({projectDirectory}){
    return {projectDirectory: projectDirectory ? projectDirectory : null}
}

export default withRouter(connect(mstp)(Universe))