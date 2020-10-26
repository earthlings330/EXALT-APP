import React from 'react'
import classes from './Employee.css'
const employee = React.memo(props=>{
    const ClassesName = [classes.Employee]
    if(props.index%2){
        ClassesName.push(classes.evenEmployee)
    }else{
        ClassesName.push(classes.oddEmployee)
    }
    return(
        <div className={ClassesName.join(' ')}>
            <div className={classes.EmployeeName}>
                <p>{props.name}</p>
            </div>
            <div className={classes.EmployeeEmail}>
                <p>{props.email}</p>
            </div>
            <div className={classes.EmployeeRole}>
                <p>{props.role}</p>
            </div>
            <div className={classes.EmployeeEdit}>
                <button  type="button" onClick={props.edit}> <i className="fas fa-pen "></i></button>
            </div>
        </div>
    )
})

export default employee