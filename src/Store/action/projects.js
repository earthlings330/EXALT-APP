import * as actionType from './actionType'


export const initTasks = (tasks) =>{
return{
    type:actionType.INIT_TASKS,
    tasks:{...tasks}
}
}

export const initPorjects = (projects) =>{
    return{
        type:actionType.INIT_PROJECTS,
        projects:{...projects}
    }
}