import * as actionType from './actionType'
import axios from 'axios'




export const addProject_Success = ()=>{
    return{
        type:actionType.ADD_PROJECT_SUCCESS
    }
}

export const addProject_Fail = error =>{
    return{
        type:actionType.ADD_PROJECT_FAIL,
        error:error
    }
}

export const addProject_Start = ()=>{
    return{
        type:actionType.ADD_PROJECT_START
    }
}

export const clearError = ()=>{
    return{
        type:actionType.CLEAR_ERROR
    }
}

export const addProject_Init = (projectName,time,module,assignedEmployees,userID)=>{
    console.log("send project")
    return dispatch=>{
        dispatch(addProject_Start())
        const newProject ={
            projectName:projectName,
            estimatedTime:time,
            Module:module,
            assginedEmployees:assignedEmployees
        }
        axios.post('https://medication-guide-3017f.firebaseio.com/ExalApp/projects/'+userID+'.json',newProject).then(res=>{
            dispatch(addProject_Success())
        }).catch(error=>{
            dispatch(addProject_Fail(error.message))
        })
       
    }
}