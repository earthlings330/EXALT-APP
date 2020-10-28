import * as actionType from '../action/actionType'

const intialState= {
    loading:false,
    error:false,
    errorMsg:'',
    projectKey:null,
    taskKey:null,
    task:{}
}

const reducer  = (state=intialState, action)=>{
    switch(action.type){
        case actionType.ADD_TASK_START:
            return{
                ...state,
                loading:true,
                error:false,
                errorMsg:null
            }
        case actionType.ADD_TASK_SUCCESS:
            return{
                ...state,
                loading:false,
                error:false,
                errorMsg:null
            }
        case actionType.ADD_TASK_FAIL:
            return {
                ...state,
                loading:false,
                error:true,
                errorMsg:action.error
            }
        case actionType.SET_PROJECT_KEY:
            return{
                ...state,
                loading:false,
                error:false,
                errorMsg:null,
                projectKey:action.key
            }
        case actionType.CLEAR_ERROR:
            return{
                ...state,
                loading:false,
                error:false,
                errorMsg:null,
            }
        case actionType.DELETE_TASK:
            return{
                ...state,
                loading:false,
                error:false,
                errorMsg:null,
                projectKey:action.projKey,
                taskKey:action.taskKey
            }
        case actionType.EDIT_TASK:
            return{
                ...state,
                loading:false,
                error:false,
                errorMsg:null,
                projectKey:action.projKey,
                taskKey:action.taskKey,
                task:action.taskForEdit
            }

        default:
            return state
    }
}

export default reducer