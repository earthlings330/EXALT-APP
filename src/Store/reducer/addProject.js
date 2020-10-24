
import * as actionType from '../action/actionType'

const InitialState = {
    modules:{},
    loading:false,
    error:false,
    errorMsg:''
        }

const reducer = (state = InitialState, action)=>{
    switch(action.type){
        case actionType.INIT_MODULES:
            return{
                ...state,
                modules:action.modules
            }
        case actionType.ADD_PROJECT_START:
            return {
                ...state,
                loading:true,
                error:false,
                errorMsg:null
            }
        case actionType.ADD_PROJECT_SUCCESS:
            return{
                ...state,
                loading:false,
                error:false,
                errorMsg:null
            }
        case actionType.ADD_PROJECT_FAIL:
            return{
                ...state,
                loading:false,
                error:true,
                errorMsg:action.error
            }
        case actionType.CLEAR_ERROR:
            return{
                ...state,
                loading:false,
                error:false,
                errorMsg:null
            }
        default:
            return state
    }
}

export default reducer