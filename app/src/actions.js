export const setProjectDirectory = (path) => {
    return dispatch => {
        dispatch({type: 'PROJECTDIR', payload: path})
    }
}