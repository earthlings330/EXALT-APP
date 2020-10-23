import React from 'react'
import classes from './AssignedEmployee.css'
const assignedemployee = React.memo(props=>{
return(
    <div className={classes.Assigned}>
        <p>{props.name}</p>
        <button className={classes.btnRemove} type="button" onClick={props.onClose}> <i className="fas fa-times fa-1x"></i> </button>
    </div>
)
})

export default assignedemployee