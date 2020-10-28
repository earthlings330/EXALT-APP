import React, { useState,useCallback,useEffect,useMemo} from 'react'
import {Button} from 'react-bootstrap'
import classes from './Projects.css'
import Project from '../Project/Project'
import AddProject from '../Modal/AddProject/AddProject'
import ErrorModal from '../Modal/ErrorModal'
import { useDispatch,useSelector } from 'react-redux'
import * as actionType from '../../Store/action/index'
import firebase from '../../util/firebase'
import Empty from '../../UI/Empty/Empty'
import AddTask from '../Modal/AddTask/AddTask'

const projects = React.memo( props =>{


// useSelector
const userID = useSelector(state=>state.auth.userID)
const error = useSelector(state=>state.addProj.error)
const errorMsg = useSelector(state=>state.addProj.errorMsg)
const porjects = useSelector(state=>state.proj.projects)
const errorAddTask = useSelector(state=>state.addTask.error)
const errorMsgAddTask = useSelector(state=>state.addTask.errorMsg)


// useDispatch
const dispatch = useDispatch();
const clearError = ()=> dispatch(actionType.clearError())
const clearErrorTask =()=> dispatch(actionType.clearErrorTask())
// const onInitTasks =useCallback((tasks)=> dispatch(actionType.initTasks(tasks)),[])

const onInitPorjects = useCallback((projects)=> dispatch(actionType.initPorjects(projects)),[])

const onEditProject = useCallback((project,key) => {
    setEdit(true)
    dispatch(actionType.editProject(project,key))},[])

const onAddTask = useCallback((key)=>{
    handleAdd(true)
    dispatch(actionType.setProjectKey(key))
},[])



// useState for show
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
// useState for edit
const [edit,setEdit] = useState(false)
const handleEdit = ()=>setEdit(true);
const handleEditClose = () => setEdit(false)
// useState for add
const [add,setAdd] = useState(false)
const handleAdd = ()=> setAdd(true)
const handleCloseAdd = ()=> setAdd(false)



useEffect(()=>{
    const projectsRef= firebase.database().ref('ExalApp').child('projects').child(userID);
    projectsRef.on('value', (snapshot) => {
        const projects = snapshot.val();
        onInitPorjects(projects);
})
},[onInitPorjects])


/*  OnClose ErrorModel*/
const onClose =useCallback(()=>{
    clearError();
    clearErrorTask();
},[])


const Projects = useMemo(()=>{
    let PorjectElem = []  
    let allPorjects = {...porjects}
       for(let key of  Object.keys(allPorjects)){
           let project = allPorjects[key];
            let elm =  <Project 
            name={project.projectName}
            time={project.estimatedTime}
            emNumber={project.assginedEmployees.length}
            key={key}
            edit={()=>onEditProject(project,key)}
            add={()=>onAddTask(key)}
            projectKey={key}
           />;
            PorjectElem.push(elm);
          
       }
       return PorjectElem
    },[porjects])

  
return(

    <div className={classes.Projects}>
        <div>
         <Button onClick={handleShow}  variant="success"  type="button" size="md" className={classes.Button}>Add new Project</Button>
        </div>

        {(show||edit) && <AddProject handleClose={handleClose} show={show} showEdit={edit} openEdit={handleEdit} closeEdit={handleEditClose}/>}
        {error && <ErrorModal show={error} onClose={onClose}>{errorMsg}</ErrorModal>}
        {add  && <AddTask type={true} show={add} onClose={handleCloseAdd}/>}
        {errorAddTask && <ErrorModal show={errorAddTask} onClose={onClose}>{errorMsgAddTask}</ErrorModal>}

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
        {Projects.length > 0 ? Projects : <Empty type="proj" />}
        
    </div>
)

})


export default projects



