import React,{useState,useEffect,useCallback} from 'react'
import classes from './AddTask.css'
import BackDrop from '../../../UI/Backdrop/Backdrop'
import Spinner from '../../../Components/Spinner/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import * as actionType from '../../../Store/action/index'



const addTask = React.memo(props=>{

    const task = useSelector(state=>state.addTask.task)
    const [sendData,setSendData] = useState(false)
    const dispatch = useDispatch();
    const [setup,setSetup] = useState(false)
    const loading = useSelector(state=>state.addTask.loading)
    const projKey = useSelector(state=>state.addTask.projectKey)
    const taskKey = useSelector(state=>state.addTask.taskKey)
    const onAddTask = useCallback((name,time,key)=>dispatch(actionType.addTask(name,time,key)),[])
    const onEditTask = useCallback((projKey,taskKey,name,time)=> dispatch(actionType.onEditTask(projKey,taskKey,name,time)),[])
    const [name,setName] = useState({
        value:'',
        valid:false,
        touched:false,
        requiered:true
    })
    const [time,setTime] = useState({
        value:'',
        valid:false,
        touched:false,
        requiered:true,
        error:''
    })
    const nameChangeHandeler = useCallback(event =>{
        
        let value = event.target.value
        
        if(value !== '' && !isNumeric(value)){
            setName(prevState => ({
                ...prevState,
                value: value,
                touched:true
             }))
           if(value.length > 4){
               setName(prevState => ({
                ...prevState,
                value: value,
                valid:true,
                error:''
             }))
           }else{
            setName(prevState=>({
                ...prevState,
                error:'Please make sure  name more than 4 chars',
                valid:false
            }))
        }
        }else{
            if(value === '' ){
                setName(prevState => ({
                    ...prevState,
                    value: value,
                    error:"Name requiered",
                    valid:false
                 }))
            }else if(isNumeric(value)){
                setName(prevState => ({
                    ...prevState,
                    value: value,
                    error:"Invalid name",
                    valid:false
                 }))
            }
        }
    },[name])
   const  isNumeric = value => /^-?[\d.]+(?:e-?\d+)?$/.test(value);

    const timeChangeHandle =useCallback(event =>{
        const value = event.target.value
        if(value !== ''){
            if(value > 0){
                setTime(prevState => ({
                    ...prevState,
                    value: value,
                    touched:true,
                    valid:true,
                    error:''
                 }))
            }else{
                setTime(prevState=>(
                    {
                       ...prevState,
                       value: value,
                       touched:true,
                       valid:false,
                       error:'Time must be positve'
                    }
                ))
            }
         


        }else{
            if(value === ''){
                setTime(prevState => ({
                 ...prevState,
                 value: value,
                 error:"Time required",
                 valid:false
              }))
            }
        }
    },[time])

    useEffect(()=>{
        if(!props.type){
            const taskName  = task.name
            const taskTime = task.estimatedTime
            if(!setup){
            setName({
                value:taskName,
                valid:true,
                touched:true,
                requiered:true
                 })
            setTime(prevState => ({
            ...prevState,
            value:taskTime,
            touched:true,
            valid:true
            }))
            
            }
            setSetup(true)
            }else{
                setSetup(false)
            }
            return ()=>{}
        },[task])

    const handleSubmit =useCallback( event =>{
        event.preventDefault()
        if(!name.touched || !time.touched){
            if(!name.touched){
                setName(prevState => ({
                    ...prevState,
                    error:"Name required",
                    touched:true,
                    valid:false
                 }))
            }
            if(!time.touched){
                setTime(prevState => ({
                    ...prevState,
                    error:"Time required",
                    touched:true,
                    valid:false
                 }))
            }
        }else if(name.valid && time.valid){
            if(props.type){
                onAddTask(name.value,time.value,projKey)
            setSendData(true)}
            else{
                onEditTask(projKey,taskKey,name.value,time.value)
                setSendData(true);
            }
        
        }else{
            return;
        }
       
       },[onAddTask,onEditTask,name,time,projKey,taskKey])

    useEffect(()=>{
        if(!loading && sendData){
            props.onClose();
            }
        },[loading])

    let ModalBody =  <div className={classes.Body} >
    <div className={classes.NameSection}>
        <label>Task Name</label>
        <input type="text" placeholder="Enter task name" value={name.value}
        onChange={nameChangeHandeler} className={name.error ? classes.error : null}/>
    </div>
    {(!name.valid && name.touched) ? <div className={classes.errorMsg}> <span> {"*"+name.error} </span> </div>  : null}
    <div className={classes.EstimatedTime}>
        <label>Estimated Time</label>
        <input type="number" placeholder="Enter estimated time " id="time" name="time"
        className={time.error ? classes.error : null}
        value={time.value}
        onChange={timeChangeHandle}/>
    </div>
    {(!time.valid && time.touched) ? <div className={classes.errorMsg}> <span> {"*"+time.error} </span> </div>  : null}
 
    </div>
    if(loading)
    ModalBody= <Spinner />
return(
    <React.Fragment>
        <BackDrop show={props.show}/>
        <div className={classes.Container} >
            <div className={classes.Header}>
                <h4>{props.type ? "New task" : "Edit task"}</h4>
               <button className={classes.closeX} onClick={props.onClose}><i className="fas fa-times fa-1x"></i></button>
            </div>
            <form className={classes.Form} onSubmit={handleSubmit}>
               {ModalBody}
                    <div className={classes.Footer}>
                        <button type="button" onClick={props.onClose} className={classes.Cancel}>Cancel</button>
                        <button  className={classes.Save}>{props.type ? "Add" : "Update"}</button>
                    </div>
            </form>
        </div>
        </React.Fragment>
)
})

export default addTask