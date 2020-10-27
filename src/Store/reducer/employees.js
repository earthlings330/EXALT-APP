import * as actionType from '../action/actionType'


const intialState = {
    loading:false,
    error:false,
    errorMsg:'',
    employees:{},
    employeeForEdit:{},
    key:null
}

const reducer = (state = intialState , action) =>{
    switch(action.type){
        case actionType.INIT_EMPLOYEES:
            return{
                ...state,
                employees:action.employees
            }
        case actionType.EDIT_EMPLOYEE:
            return {
                ...state,
                employeeForEdit :action.employee,
                key:action.employeeKey
            }
        case actionType.ADD_EMPLOYEE_START:
            return{
                ...state,
                loading:true,
                error:false,
                errorMsg:null
            }
        case actionType.ADD_EMPLOYEE_SUCCESS:
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
        default : return state
    }
    }

export default reducer