import * as actionType from '../action/actionType'

const initialState={
    tasks:{},
    projects:{},
    projectForEdit:{},
    projectKey:null
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
        case actionType.EDIT_PROJECT:
            return{
                ...state,
                projectForEdit:action.project,
                projectKey:action.projectKey
            }
        default: return state
    }
}

export default reducer