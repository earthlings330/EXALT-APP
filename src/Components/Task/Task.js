import React from 'react'
import classes from './Task.css'

const task = React.memo(props=>{
    const ClassesName = [classes.Task]
    if(props.index%2){
        ClassesName.push(classes.even)
    }else{
        ClassesName.push(classes.odd)
    }
    return(
        <div className={ClassesName.join(' ')}>
            <div className={classes.TaskName}> <p>{props.name}</p> </div>
            <div className={classes.TaskTime}> <p>{props.time}</p> </div>
        </div>
    )
})



export default task