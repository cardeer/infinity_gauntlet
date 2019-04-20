export const projectDirectory = function(state = null, action){
    switch(action.type){
        case 'PROJECTDIR':
            return action.payload
        default:
            return state
    }
}