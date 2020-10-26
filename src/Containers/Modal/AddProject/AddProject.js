import React,{useCallback, useState,useMemo, useEffect} from 'react';
import {Button,Modal,Form,Row,Col} from 'react-bootstrap'
import classes from './AddProject.css'
import Assigned from '../AssignedEmployee/AssignedEmployee'
import DataListInput from "react-datalist-input";
import BackDrop from '../../../UI/Backdrop/Backdrop'
import {useDispatch, useSelector } from 'react-redux';
import * as actionTye from '../../../Store/action/index'
import Spinner from '../../../Components/Spinner/Spinner'
import firebase from '../../../util/firebase'



const addProject = React.memo(props => {


    // useDispatch
    const dispatch = useDispatch();
    const addProjectInit = useCallback( (projectName,time,module,assignedEmployees,userID)=>
    dispatch(actionTye.addProject_Init(projectName,time,module,assignedEmployees,userID)) )
    const onInitModule = useCallback((modules)=>dispatch(actionTye.initModules(modules)),[])
    const onUpdateProject = useCallback((projectName,time,module,assignedEmployees,userID,key)=>
    dispatch(actionTye.updateProject(projectName,time,module,assignedEmployees,userID,key)))

    // useSelector
    const userID = useSelector(state=>state.auth.userID)
    const loading = useSelector(state=>state.addProj.loading)
    const moduels = useSelector(state=>state.addProj.modules)
    const project = useSelector(state=>state.proj.projectForEdit)
    const projectKey = useSelector(state=>state.proj.projectKey)

    // useState
    const [validated, setValidated] = useState(false); // for validation form
    const [InputClasses, setInputClasses] = useState([classes.InputDataList]) // for validation DataList input
    const [ProjectName , setProjectName] = useState('')
    const [time,setTime] = useState('')
    const [module,setModule ] = useState('DevOps')
    const [assignedEmployeevalue,setem] = useState([]) // for assigned employees 
    const [sendData,setSendDate] = useState(false) // to check if create clicked and data sent 
    const [employees , setEmployees] = useState([])
    const [show,setShow] = useState(false)
    const [setup,setSetup] = useState(false)


    useEffect(()=>{
        if(props.show){
            setShow(true)
        }else if(props.showEdit){
            if(!setup){
            setProjectName(project.projectName)
            setTime(project.estimatedTime)
            setModule(project.Module)
            setem([...project.assginedEmployees])
            setShow(true)
            }
            setSetup(true)
        }else{
            setShow(false)
            setSetup(false)
        }
        return ()=>{}
    },[project])

    
    
    useEffect(()=>{
        const taskRef  = firebase.database().ref('ExalApp').child('Employees');
        taskRef.once('value', (snapshot) => {
            const employees = snapshot.val();
           let temp= []
           for(const key in employees){
               temp.push(employees[key])
           }
           if(props.showEdit){
           const assigned = [...project.assginedEmployees]
           for(let key in assigned){
               let employee = temp.filter(el => el.id !== assigned[key].id)
               temp = employee
               setEmployees(temp)
           } }else{
            setEmployees(temp)
           }

      })
    },[])

    
    useEffect(()=>{
        const taskRef  = firebase.database().ref('ExalApp').child('Module');
        taskRef.on('value', (snapshot) => {
             const modules = snapshot.val();
             onInitModule(modules);
       })
    },[onInitModule])
    

    /* Close the modal after sending data for firebase */
    useEffect(()=>{
        if(!loading && sendData){
            if(props.show){
                props.handleClose();
            }else if(props.showEdit){
                props.closeEdit();
            }
            }
        },[loading])

    

   


 
    const closeModule = ()=>{
        if(props.show){
            props.handleClose();
        }else if(props.showEdit){
            props.closeEdit();
        }
    }


    /* SUBMIT   & VALIDATION */
    const submitedHandeler = useCallback((event)=>{
        console.log("from",ProjectName)
        setSendDate(false)
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false | assignedEmployeevalue.length ===0) {

            if(assignedEmployeevalue.length ===0)
            setInputClasses([...InputClasses,classes.error])

            setValidated(true)

        }else{
            setInputClasses([classes.InputDataList])
            if(props.show){
            addProjectInit(ProjectName,time,module,assignedEmployeevalue,userID)
            }
            else if(props.showEdit){
            onUpdateProject(ProjectName,time,module,assignedEmployeevalue,userID,projectKey)
            }
            setSendDate(true)
            setValidated(false)
        }
    },[assignedEmployeevalue,ProjectName,time,module,projectKey])



    /* When select an option from the datalist */
    const onSelect = useCallback((selectedItem) => {
        console.log('before select',employees)
        if(selectedItem!==null){
        const temp = [...assignedEmployeevalue]
        temp.push({name:selectedItem.label,id:selectedItem.key})
        setem(temp)
        const tempemployees= employees.filter(el=>el.id !== selectedItem.key)
        setEmployees(tempemployees)
        }
     
    }, [assignedEmployeevalue,employees]);

    /* When delete an tag from assigned employees tags*/
    const onRemoveTags = (name,id)=>{
        const newArray = assignedEmployeevalue.filter(el=> el.id !== id)
        setem(newArray)
        const tempemployees= [...employees]
        tempemployees.push({name:name,id:id})
        setEmployees(tempemployees)
        console.log(tempemployees)
    }
    
    const match = (currentInput, item) => {
        console.log("math")
        // const 
        return (
          item.label.substr(0, currentInput.length).toUpperCase() ===
          currentInput.toUpperCase()
        );
      };

    /* Setup an array of objects for datalist  */
    const items = useMemo(
        () =>
          employees.map((oneItem) => ({
            // required: what to show to the user
            label: oneItem.name,
            // required: key to identify the item within the array
            key: oneItem.id
          })),
        [employees]
      );
    
      
    /* Setup Modules */
    const ListOfMOdules = useMemo(()=>{
        let Options = []
        let Modules = {...moduels}
        for(let key in Modules){
        let el = <option value={key} key={key}>{Modules[key]}</option>
        Options.push(el)
        }
        return Options
    },[moduels])
    
    /* Setup the assigned employees tags based on selected option from datalist */ 
    const listof = assignedEmployeevalue.map((el,index)=>{
        return <Assigned name={el.name} key={index} onClose={()=>onRemoveTags(el.name,el.id)}/>
    })

    /* For changing the modal body from form to spinner after click create */
    let ModalBody = (
        <React.Fragment>
        <Form.Group controlId="formBasicEmail" as={Row}>
                <Form.Label column sm="4">Project Name</Form.Label>
                <Col sm="8">
                    <Form.Control type="text" placeholder="Enter Project name" required value={ProjectName}
                    onChange={event=> setProjectName(event.target.value)}/>
                </Col>
                <Form.Control.Feedback type="invalid">
                    Please Enter Project name
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicPassword"  as={Row}>
                <Form.Label column sm="4">Total estimated time</Form.Label>
                <Col sm="8">
                    <Form.Control type="number" placeholder="Enter time" required value={time}
                    onChange={event => setTime(event.target.value)}/>
                </Col>
                <Form.Control.Feedback type="invalid">
                    Please Enter time
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="SelectModule" as={Row}>
                <Form.Label  column sm="4" >Module</Form.Label>
                <Col sm="8">
                <Form.Control as="select" size="md" custom placeholder="Select module" value={module} 
                onChange={event => {
                    console.log(event.target.value)
                    setModule(event.target.value)}}>
                    {ListOfMOdules}
                </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group controlId="assignEmployee" as={Row}>
                <Form.Label  column sm="4" >Assign employee</Form.Label>
                <Col sm="8">
                <DataListInput
                    inputClassName={InputClasses.join(' ')}
                    activeItemClassName={classes.activeItem}
                    itemClassName={classes.items}
                    dropdownClassName={classes.CoustomeDropDown}
                    placeholder="Search for employee..."
                    items={items}
                    onSelect={onSelect}
                    clearInputOnSelect={true}
                    requiredInputLength={1}
                    suppressReselect={false}
                    debounceTime={1000}
                    match={(currentInput, item)=>match(currentInput, item)}
                    
                />
                </Col>
            </Form.Group>
            <div className={classes.tags}>
                {listof}
            </div>
            </React.Fragment>
    )
    if(loading)
    ModalBody = <Spinner />

    const Hide = ()=>{
        if(props.show){
            props.handleClose();
        }else if(props.showEdit){
            props.closeEdit();
        }
    }
  return (
        <React.Fragment> 
            <BackDrop show={show} />
            <Modal show={show} onHide={Hide}  aria-labelledby="contained-modal-title-vcenter" centered size='md' 
            backdrop={false}>
                <Form noValidate validated={validated} onSubmit={submitedHandeler}> 
                <Modal.Header closeButton>
                    <Modal.Title>{props.show ? "New Project" : "Edit Project"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={classes.ModalBody}>
                    {ModalBody}
                </Modal.Body>
                <Modal.Footer>
                    <Button className={classes.Close} variant="dark" onClick={closeModule}>
                        Cancel
                    </Button>
                    <Button className={classes.create} type="submit" variant="secondary">
                        {props.show ?"Create" : "Save"}
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </React.Fragment>
  );
});

export default addProject;