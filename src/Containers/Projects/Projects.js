import React, { useState,useCallback,useEffect,useMemo} from 'react'
import {Button} from 'react-bootstrap'
import classes from './Projects.css'
import Task from '../../Components/Task/Task'
import Project from '../Project/Project'
import AddProject from '../Modal/AddProject/AddProject'
import ErrorModal from '../Modal/ErrorModal'
import { useDispatch,useSelector } from 'react-redux'
import * as actionTye from '../../Store/action/index'
import firebase from '../../util/firebase'
import Empty from '../../UI/Empty/Empty'
const projects = React.memo( props =>{


// useSelector
const userID = useSelector(state=>state.auth.userID)
const error = useSelector(state=>state.addProj.error)
const errorMsg = useSelector(state=>state.addProj.errorMsg)
const tasks = useSelector(state=> state.proj.tasks)
const porjects = useSelector(state=>state.proj.projects)

// useDispatch
const dispatch = useDispatch();
const clearError = ()=> dispatch(actionTye.clearError())
const onInitTasks =useCallback((tasks)=> dispatch(actionTye.initTasks(tasks)),[])
const onInitPorjects = useCallback((projects)=> dispatch(actionTye.initPorjects(projects)),[])

// useState
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


useEffect(()=>{
    console.log('[INIT Porjects ]')
    const projectsRef= firebase.database().ref('ExalApp').child('projects').child(userID);
    projectsRef.on('value', (snapshot) => {
        const projects = snapshot.val();
        console.log(projects)
        onInitPorjects(projects);
  })
},[onInitPorjects])
useEffect(()=>{
    console.log('[INIT TASKS ]')
    const taskRef  = firebase.database().ref('ExalApp').child('Tasks');
    taskRef.on('value', (snapshot) => {
         const tasks = snapshot.val();
         console.log(tasks)
         onInitTasks(tasks);
   })
},[onInitTasks])






/*  OnClose ErrorModel*/
const onClose =useCallback(()=>{
    setShow(false)
    clearError();
},[])

const alltasks = useMemo(()=>{
    console.log('[MEMO TASK]')
    let tasksElem = []  
    let alltasks = {...tasks}
    let index = 0
       for(let key of  Object.keys(alltasks)){
           let task = alltasks[key];
            let elm =  <Task 
            name={task.name}
            time={task.time}
            key={key}
            index={index}/>;
            tasksElem.push(elm);
            index+=1
       }
       return tasksElem
},[tasks])

const Projects = useMemo(()=>{
    console.log('[MEMO Projects]')
    let PorjectElem = []  
    let allPorjects = {...porjects}
       for(let key of  Object.keys(allPorjects)){
           let project = allPorjects[key];
            let elm =  <Project 
            name={project.projectName}
            time={project.estimatedTime}
            emNumber={project.assginedEmployees.length}
            key={key}
            >{alltasks}</Project>;
            PorjectElem.push(elm);
          
       }
       return PorjectElem
},[porjects])


return(

    <div className={classes.Projects}>
        <div>
         <Button onClick={handleShow}  variant="success"  type="button" size="md" className={classes.Button}>Add new Project</Button>
        </div>
        {show && <AddProject handleClose={handleClose} show={show} />}
        {error && <ErrorModal show={error} onClose={onClose}>{errorMsg}</ErrorModal>}
        <div className={classes.ProjectsHeader}>
            <div  className={classes.Project}>
                <p>Project</p>
            </div>
            <div className={classes.Spent}>
                <p>Spent</p>
            </div>
            <div className={classes.Employee}>
                <p>Employee</p>
            </div>
            <div className={classes.Time}> 
                <p>Time</p>
            </div>
        </div>
        {Projects.length > 0 ? Projects : <Empty />}
        {/* <Project>
            {alltasks}
        </Project>
        <Project>
            {alltasks}
        </Project> */}
        
    </div>
)

})


export default projects



    // <th><div className={classes.SpendTime}>
    //             <div className={classes.InnerSpent}> </div>
    //         </div></th>