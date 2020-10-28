import React, { useCallback, useEffect, useState } from 'react'
import classes from './DeleteTask.css'
import BackDrop from '../../../UI/Backdrop/Backdrop'
import { useDispatch, useSelector } from 'react-redux'
import * as actionType from '../../../Store/action/index'
import Spinner from '../../../Components/Spinner/Spinner'

const deleteTask = React.memo(props=>{
    const taskKey = useSelector(state=>state.addTask.taskKey)
    const projKey = useSelector(state=>state.addTask.projectKey)
    const loading = useSelector(state=>state.addTask.loading)
    const dispatch = useDispatch();
    const onDelete = useCallback((projKey,taskKey)=> dispatch(actionType.onDeleteTask(projKey,taskKey)),[])
    const [sendReq,setSendReq] = useState(false)

    const handleDelete = useCallback(()=>{
        setSendReq(true)
        onDelete(projKey,taskKey);
    },[onDelete,taskKey,projKey])

    useEffect(()=>{
        if(!loading && sendReq){
            props.onClose();
            setSendReq(false)
        }
    },[loading])

    let modalBody = 
    <div className={classes.NameSection}>
    <h5 style={{color:'red'}}>Are you sure ?</h5>
    </div>

    if(loading)
    modalBody=  <Spinner />

    return(
        <React.Fragment>
        <BackDrop show={props.show}/>
        <div className={classes.Container} >
            <div className={classes.Header}>
                <h4>Delete Task</h4>
               <button className={classes.closeX} onClick={props.onClose}><i className="fas fa-times fa-1x"></i></button>
            </div>
            <div className={classes.Body} >
               {modalBody}
            </div>
            
                    <div className={classes.Footer}>
                        <button type="button" onClick={props.onClose} className={classes.Cancel}>Cancel</button>
                        <button type="button" onClick={handleDelete}  className={classes.Delete}>Delete</button>
                    </div>
       
        </div>
        </React.Fragment>
    )
})


export default deleteTask