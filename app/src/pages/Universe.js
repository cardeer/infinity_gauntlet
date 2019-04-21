import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Axios from "axios";

import Space from "../rendered";

const dummyFile = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

Array.prototype.shuffle = function () {
    var clone = this.slice();
    var currentIndex = clone.length,
        temporaryValue,
        randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = clone[currentIndex];
        clone[currentIndex] = clone[randomIndex];
        clone[randomIndex] = temporaryValue;
    }

    return clone;
};

const Universe = props => {
    const [files, setFiles] = React.useState([]);
    const [filesToRemove, setFilesToRemove] = React.useState([]);
    const [thanosLoading, setThanosLoading] = React.useState(true);
    const [snapFinished, setSnapFinished] = React.useState(false);

    const snapFingers = async () => {
        setThanosLoading(true);
        filesToRemove.forEach(async (value, index) => {
            const path = btoa(value.path);
            await Axios.get(process.env.REACT_APP_API_URL + `path/delete/${path}`);
            if (index == filesToRemove.length - 1) {
                setSnapFinished(true);
            }
        });
    };

    React.useEffect(() => {
        if (!props.projectDirectory) props.history.push("/");
        else if (files.length == 0) {
            const { projectDirectory } = props;
            Axios.get(
                process.env.REACT_APP_API_URL + `path/view/${projectDirectory}`
            ).then(res => {
                const origin = res.data;
                setFiles(origin);
                const shuffle = res.data.shuffle();
                setFilesToRemove(shuffle.splice(0, Math.floor(shuffle.length / 2)));
                setThanosLoading(false);
            });
        }

        if (snapFinished) {
            const { projectDirectory } = props;
            Axios.get(
                process.env.REACT_APP_API_URL + `path/view/${projectDirectory}`
            ).then(res => {
                const origin = res.data;
                setFiles(origin);
                setThanosLoading(false);
                setSnapFinished(false);
            });
        }
    }, [files, snapFinished]);

    return (
        <div>
            {
                <Space files={dummyFile} />
            }
            <div loading={thanosLoading.toString()} className="preparing-thanos">
                <div className="preparing-thanos-bg"></div>
                <div className="preparing-thanos-title">
                    <h1>THANOS IS COMING !!</h1><br />
                    <h5 className="text-muted">He's coming from Titan</h5>
                </div>
                <img style={{ height: '200px', width: 'auto' }} src="/images/thanos-head.png" alt="" />
            </div>
            {
                files.length > 0 &&
                <h3 className="snap-fingers" style={{position: 'fixed', top: '10px', left: '10px', color: 'white'}} onClick={snapFingers}>Snap fingers</h3>
            }

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
                .preparing-thanos img{
                    position: fixed;
                    z-index: 3;
                    top: 50%;
                    left: 50%;
                    transform: rotateZ(0deg) translate(-50%, -50%);
                    transform-origin: 0 0;
                    animation: preparing 1s linear infinite;
                }
                .preparing-thanos .preparing-thanos-bg{
                    position: fixed;
                    z-index: 2;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    background-color: black;
                    display: block;
                }
                .preparing-thanos[loading=false]{
                    display: none;
                }
                .preparing-thanos[loading=true] img{
                    animation: preparing 1s linear infinite;
                }
                .preparing-thanos .preparing-thanos-title{
                    position: absolute;
                    z-index: 3;
                    color: white;
                    text-align: center;
                    display: block;
                    width: 100%;
                    top: 50px;
                }
            `}</style>
        </div>
    )
}

function mstp({ projectDirectory }) {
    return { projectDirectory: projectDirectory ? projectDirectory : null };
}

export default withRouter(connect(mstp)(Universe));
