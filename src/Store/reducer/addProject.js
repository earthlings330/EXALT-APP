
import * as actionType from '../action/actionType'

const InitialState = {
    loading:false,
    error:false
        }

const reducer = (state = InitialState, action)=>{
    switch(action.type){
        case actionType.ADD_PROJECT_START:
            return {
                ...state,
                loading:true,
                error:null
            }
        case actionType.ADD_PROJECT_SUCCESS:
            return{
                ...state,
                loading:false,
                error:null
            }
        case actionType.ADD_PROJECT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.error
            }
        default:
            return state
    }
}

export default reducer