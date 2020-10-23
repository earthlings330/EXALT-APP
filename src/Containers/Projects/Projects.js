import React, { useState } from 'react'
import {Button} from 'react-bootstrap'
import classes from './Projects.css'
import Task from '../../Components/Task/Task'
import Project from '../Project/Project'
import AddProject from '../Modal/AddProject/AddProject'

const projects = React.memo( props =>{
const [tasks] = useState([
    {name:"task1",time:"60h"},
    {name:"task2",time:"50h"},
    {name:"task3",time:"10h"},
    {name:"task3",time:"10h"}

])
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const alltasks = tasks.map((el,index)=>{
    return <Task name={el.name} time={el.time} key={index} index={index} />
})
return(

    <div className={classes.Projects}>
        <div>
         <Button onClick={handleShow}  variant="success"  type="button" size="md" className={classes.Button}>Add new Project</Button>
        </div>
        {show && <AddProject handleClose={handleClose} show={show} />}
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
        <Project>
            {alltasks}
        </Project>
        <Project>
            {alltasks}
        </Project>
        
    </div>
)

})


export default projects



    // <th><div className={classes.SpendTime}>
    //             <div className={classes.InnerSpent}> </div>
    //         </div></th>