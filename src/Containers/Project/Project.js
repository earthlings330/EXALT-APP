import React, { useEffect, useState,useMemo,useCallback} from 'react'
import classes from './Project.css'
import {ProgressBar,Card,Accordion,useAccordionToggle} from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import Task from '../../Components/Task/Task'
import firebase from '../../util/firebase'
import * as actionType from '../../Store/action/index'
import Empty from '../../UI/Empty/Empty'
import DeleteTask from '../Modal/DeleteTask/DeleteTask'
import ErrorModal from '../Modal/ErrorModal'
import AddTask from '../Modal/AddTask/AddTask'
import DoneTask from '../Modal/DoneTask/DoneTask'


const project = React.memo(props => {
    const {projectKey} = props
        const dispatch = useDispatch();
        const onInitTasks =useCallback((tasks)=> dispatch(actionType.initTasks(tasks)),[])
        const [showCinfirm , setShowComnfirm ] = useState(false)
        const [showEdit,setShowEdit] = useState(false)
        const [showDone,setShowDone] = useState(false)
        const error = useSelector(state=>state.addTask.error)
        const errorMsg = useSelector(state=>state.addTask.errorMsg)
        const beforeDeleteTask = useCallback((projKey,taskKey)=>dispatch(actionType.beforeDeleteTask(projKey,taskKey)),[])
        const beforeEditTask = useCallback((task,projKey,taskKey)=> dispatch(actionType.beforeEdit(task,projKey,taskKey)),[])
        const clearError = useCallback(()=>dispatch(actionType.clearErrorTask()),[])
        const [now,setNow] = useState(0)
        


        useEffect(()=>{
           
            const taskRef  = firebase.database().ref('ExalApp').child('Tasks');
            taskRef.on('value', (snapshot) => {
                const mapsTask = new Map();
                const tasks = snapshot.val();
                const temp = {...tasks}
                for(let key of Object.keys(temp)){
                    mapsTask.set(key,temp[key])
                }
                onInitTasks(mapsTask);
        })
        },[onInitTasks])

    const mapTasks = useSelector(state=>state.proj.tasks)
    const [toggle,settoggle] = useState(false)
    const CustomToggle = ({eventKey }) =>{
        const decoratedOnClick = useAccordionToggle(eventKey,()=> settoggle(!toggle));
        return (
            <button className={classes.toggleButton} type="button" onClick={decoratedOnClick}>
                {!toggle ? <i className='fas fa-sort-up fa-2x'/> : <i className={classes.down +" fas fa-sort-down fa-2x down" }></i> }
            </button>
          );
    }

    const handleDelete=(projectKey,key)=>{
        setShowComnfirm(true)
        beforeDeleteTask(projectKey,key)
    }
    const handleEdit = (task,projKey,taskKey)=>{
        setShowEdit(true)
        beforeEditTask(task,projKey,taskKey)
    }
    const handleDone = (task,projKey,taskKey)=>{
        setShowDone(true)
        beforeEditTask(task,projKey,taskKey)
    }
        const alltasks = useMemo(()=>{
            let tasksElem = []  
            let alltasks ={...mapTasks.get(projectKey)}
            let index = 0
            let prog = 0
            for(let key of  Object.keys(alltasks)){
                
                let task = alltasks[key];
                prog += (task.progress*10)/10
                    let elm =  <Task 
                    name={task.name}
                    time={task.estimatedTime}
                    key={key}
                    onRemove={()=>handleDelete(projectKey,key)}
                    onEdit={()=>handleEdit(task,projectKey,key)}
                    onDone={()=>handleDone(task,projectKey,key)}
                    index={index}/>;
                    tasksElem.push(elm);
                    index+=1
                   
                }
            if(tasksElem.length === 0){
                setNow(0)
            }else{
                setNow(prog/tasksElem.length)
            }
            return tasksElem
        },[mapTasks])
    const onClose = useCallback(()=>{
        setShowComnfirm(false)
        clearError();
    },[])


    const progressbar  = <ProgressBar variant="success" now={now}  srOnly/>;
    return(
    <React.Fragment>
        {showCinfirm && <DeleteTask show={showCinfirm} onClose={()=>setShowComnfirm(false)}/>}
        {error && <ErrorModal  show={error} onClose={onClose}>{errorMsg}</ErrorModal>}
        {showEdit  && <AddTask type={false} show={showEdit} onClose={()=>setShowEdit(false)}/>}
        {showDone && <DoneTask show={showDone} onClose={()=>setShowDone(false)}/>}
         <div>
        <Accordion >
            <Card>
                <Card.Header className={classes.CardHeader}>
                <div className={classes.ProjectName}>
                <CustomToggle eventKey="0"/>  
                    <p>{props.name}</p>
                </div>
                    <div className={classes.progressbar}>
                        {progressbar}
                    </div>
                    <div className={classes.Employee}>
                        <p>{props.emNumber}</p>
                    </div>
                    <div className={classes.Time}>
                        <p>{props.time}</p>
                        <button  type="button" className={classes.EditProjectbtn} onClick={props.edit}> <i className="fas fa-pen "></i></button>
                        <button type="button" onClick={props.add} className={classes.AddTaskbtn}><i className="far fa-plus-square"></i></button>
                    </div>
                
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>{alltasks.length ? alltasks  : <Empty type='task'/>}</Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    </div>
    </React.Fragment>
    
    );


})

export default project