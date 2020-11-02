import * as actionType from './actionType'
import axios from 'axios'
import firebase from '../../util/firebase'


export const beforeDeleteTask = (projectKey , taskKey)=>{
    return{
        type:actionType.DELETE_TASK,
        projKey:projectKey,
        taskKey:taskKey
    }
}
export const beforeEdit = (task,projectKey , taskKey) =>{
    return{
        type:actionType.EDIT_TASK,
        taskForEdit:task,
        projKey:projectKey,
        taskKey:taskKey
    }
}


export const clearErrorTask = ()=>{
    return{
        type:actionType.CLEAR_ERROR
    }
}
export const addTaskStart = ()=>
{
    return {
        type:actionType.ADD_TASK_START
    }
}

export const setProjectKey = key =>{
    return {
        type:actionType.SET_PROJECT_KEY,
        key : key 
    }
}
export const addTaskSuccess = ()=>{
    return{
        type:actionType.ADD_TASK_SUCCESS
    }
}

export const addTaskFail = error =>{
 return{
     type:actionType.ADD_TASK_FAIL,
     error:error
 }
}


export const addTask =  (name,time,key)=>{
return dispatch=>{
    dispatch(addTaskStart())
    const task ={
        name:name,
        estimatedTime:time,
        progress:"0"
    }
    axios.post('https://medication-guide-3017f.firebaseio.com/ExalApp/Tasks/'+key+'/.json',task).then(res=>{
        dispatch(addTaskSuccess())
    }).catch(error=>{
        dispatch(addTaskFail(error.message))
    })
}
}
export const onDeleteTask = (projectKey,taskKey)=>{
    return dispatch =>{
        dispatch(addTaskStart())
        axios.delete('https://medication-guide-3017f.firebaseio.com/ExalApp/Tasks/'+projectKey+'/'+taskKey+'/.json').then(res=>{
            dispatch(addTaskSuccess())
        }).catch(error=> dispatch(addTaskFail(error.message)))
    }
}

export const onEditTask = (projKey,taskKey,name,time) =>{
    return dispatch=>{
        dispatch(addTaskStart())
        const ref = firebase.database().ref('ExalApp').child('Tasks').child(projKey).child(taskKey);
        ref.update({
            name:name,
            estimatedTime:time
        }).then(res=> dispatch(addTaskSuccess())).catch(error=>dispatch(addTaskFail('something went wrong')))
    }
}

export const onUpdataProgress = (projKey,taskKey,progress)=>{
    return dispatch=>{
        dispatch(addTaskStart())
        const ref = firebase.database().ref('ExalApp').child('Tasks').child(projKey).child(taskKey);
        ref.update({
            progress:progress
        }).then(res=>dispatch(addTaskSuccess())).catch(error=> dispatch(addTaskFail('Something went wrong')))
    }
}