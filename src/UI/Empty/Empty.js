import React from 'react'
import classes from './Empty.css'

const empty = React.memo(props=>{
    
    return(
        <div className={classes.Empty}>
            <p> You dont have any {props.type==='task'? 'task ' : props.type === 'proj' ? 'project ' : 'Employee '}
             yet , <strong>Add one!</strong> </p>
        </div>
    )
})


export default empty