import * as actionType from '../action/actionType'

const initialState={
    tasks:{},
    projects:{}
}


const reducer = (state = initialState, action)=>{
    switch(action.type){
        case actionType.INIT_TASKS:
            return{
                ...state,
                tasks:action.tasks
            }
        case actionType.INIT_PROJECTS:
            return{
                ...state,
                projects:action.projects
            }
        default: return state
    }
}

export default reducer