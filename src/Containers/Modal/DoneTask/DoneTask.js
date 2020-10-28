import React, { useCallback, useEffect, useState } from 'react'
import classes from './DoneTask.css'
import BackDrop from '../../../UI/Backdrop/Backdrop'
import { useDispatch, useSelector } from 'react-redux'
import * as actionType from '../../../Store/action/index'
import Spinner from '../../../Components/Spinner/Spinner'
const doneTask = React.memo(props=>{
    const [parcent,setParcent] = useState(0)
    const disptach = useDispatch();
    const projKey = useSelector(state=>state.addTask.projectKey)
    const taskKey = useSelector(state=>state.addTask.taskKey)
    const loading = useSelector(state=>state.addTask.loading)
    const task = useSelector(state=>state.addTask.task)
    
    const onUpdateTaskProgress = useCallback((projKey,taskKey,parcent)=> disptach(actionType.onUpdataProgress(projKey,taskKey,parcent)),[])
    const [sendReq,setSendReq] = useState(false)

    useEffect(()=>{
        setParcent(task.progress)
    },[])

    const handleSaveProgress = useCallback(()=>{
        setSendReq(true)
        onUpdateTaskProgress(projKey,taskKey,parcent)
    },[parcent])
    
    useEffect(()=>{
        if(!loading && sendReq){
            props.onClose();
            setSendReq(false)
        }
    },[loading])

    let modalBody = 
    <div className={classes.ProgressSection}>
    <label>Progress Percent</label>
    <select id="progress" 
        value={parcent}
        onChange={event=> setParcent(event.target.value)}>
        <option value="0">0%</option>
        <option value="10">10%</option>
        <option value="20">20%</option>
        <option value="30">30%</option>
        <option value="40">40%</option>
        <option value="50">50%</option>
        <option value="60">60%</option>
        <option value="70">70%</option>
        <option value="80">80%</option>
        <option value="90">90%</option>
        <option value="100">100%</option>
    </select>
    </div> 
    
    if(loading)
    modalBody= <Spinner />
    return(
        <React.Fragment>
        <BackDrop show={props.show}/>
        <div className={classes.Container} >
            <div className={classes.Header}>
                <h4>Update Progress</h4>
               <button className={classes.closeX} onClick={props.onClose}><i className="fas fa-times fa-1x"></i></button>
            </div>
            <div className={classes.Body} >
                {modalBody}
            </div>
                    <div className={classes.Footer}>
                        <button type="button" onClick={props.onClose} className={classes.Cancel}>Cancel</button>
                        <button  className={classes.Save} onClick={handleSaveProgress}>Save</button>
                    </div>
        </div>
        </React.Fragment>
    )
})


export default doneTask