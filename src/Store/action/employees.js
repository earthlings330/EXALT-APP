import * as actionType from './actionType'
import axios from 'axios'
import firebase from '../../util/firebase'
export const editEmployee = (employee,key) =>{
    return{
        type:actionType.EDIT_EMPLOYEE,
        employee:employee,
        employeeKey:key
    }
}
export const addEmployeeStart = ()=>{
    return{
        type:actionType.ADD_EMPLOYEE_START
    }
}
export const addEmployeeSuccess = ()=>{
    return{
        type:actionType.ADD_EMPLOYEE_SUCCESS
    }
}
export const addEmployeeFail = error=>{
    return{
        type:actionType.ADD_EMPLOYEE_FAIL,
        error:error
    }
}

export const clearEmployeeError=()=>{
    return{
        type:actionType.CLEAR_ERROR
    }
}
export const initEmployees = employees =>{
    return{
        type:actionType.INIT_EMPLOYEES,
        employees:{...employees}
    }
}
export const updateEmployee = (name,email,role,key)=>{
    return dispatch=>{
        dispatch(addEmployeeStart())
        const newEmployee ={
            name:name,
            email:email,
            role:role
        }

        const ref = firebase.database().ref('ExalApp').child('Employees').child(key);
        ref.update(newEmployee).then(res=>dispatch(addEmployeeSuccess())).catch(error=>
            dispatch(addEmployeeFail("Something went wrong try later!")))
             }
            }
export const addEmployee = (name,email,role)=>{
    const employee = {
        name:name,
        email:email,
        role:role
    }
    return dispatch=>{
        dispatch(addEmployeeStart())
        axios.post('https://medication-guide-3017f.firebaseio.com/ExalApp/Employees.json',employee).then(res=>{
            dispatch(addEmployeeSuccess())
        }).catch(error=>{
            dispatch(addEmployeeFail(error.message))
        })
    }
}