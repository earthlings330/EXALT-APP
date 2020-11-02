import React, { useEffect, useState } from 'react'
import classes from './Task.css'

const task = props=>{
    const {percent} = props
    const [colors,setColors] = useState([])
    const ClassesName = [classes.Task]
    if(props.index%2){
        ClassesName.push(classes.even)
    }else{
        ClassesName.push(classes.odd)
    }


    useEffect(()=>{
      
        if(percent==="0"){
            setColors([classes.Red])
        }
        else if(percent !=="100" && percent!=="0"){
            setColors([classes.Orange])
        }
        else if(percent === "100"){
            setColors([classes.Green])
        }
    },[percent])
    
    return(

    
        <div className={ClassesName.join(' ')}>
            <div><button className={classes.btnDone} onClick={props.onDone}><i className={colors.join(' ')+" far fa-check-circle fa-1x"}></i></button></div>
            <div className={classes.TaskName}> <p>{props.name}</p> </div>
            <div className={classes.TaskTime}> <p>{props.time}</p> </div>
            <div><button className={classes.btnRemove} onClick={props.onRemove}><i className="fas fa-trash"></i></button></div>
            <div><button className={classes.btnEdit} onClick={props.onEdit}><i className="fas fa-pen "></i></button></div>
        </div>
    )
}



export default task