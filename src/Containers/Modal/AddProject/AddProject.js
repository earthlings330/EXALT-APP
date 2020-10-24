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

    // useSelector
    const userID = useSelector(state=>state.auth.userID)
    const loading = useSelector(state=>state.addProj.loading)
    const moduels = useSelector(state=>state.addProj.modules)

    // useState
    const [validated, setValidated] = useState(false); // for validation form
    const [InputClasses, setInputClasses] = useState([classes.InputDataList]) // for validation DataList input
    const [ProjectName , setProjectName] = useState('')
    const [time,setTime] = useState('')
    const [module,setModule ] = useState('1')
    const [assignedEmployeevalue,setem] = useState([]) // for assigned employees 
    const [sendData,setSendDate] = useState(false) // to check if create clicked and data sent 
    const [employees , setEmployees] = useState([])
    
    
    useEffect(()=>{
        const taskRef  = firebase.database().ref('ExalApp').child('Employees');
        taskRef.once('value', (snapshot) => {
            const employees = snapshot.val();
           const temp= []
           for(const key in employees){
               temp.push(employees[key])
           }
            setEmployees(temp)
            
      })
    },[])

    
    useEffect(()=>{
        const taskRef  = firebase.database().ref('ExalApp').child('Module');
        taskRef.on('value', (snapshot) => {
             const modules = snapshot.val();
             console.log(modules)
             onInitModule(modules);
       })
    },[onInitModule])
    
    /* SUBMIT   & VALIDATION */
    const submitedHandeler = useCallback((event)=>{
        console.log("[Submit]")
        setSendDate(false)
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false | assignedEmployeevalue.length ===0) {

            if(assignedEmployeevalue.length ===0)
            setInputClasses([...InputClasses,classes.error])

            setValidated(true)

        }else{
            setInputClasses([classes.InputDataList])
            addProjectInit(ProjectName,time,module,assignedEmployeevalue,userID)
            setSendDate(true)
            setValidated(false)
        }
    },[assignedEmployeevalue])

    
    /* When select an option from the datalist */
    const onSelect = useCallback((selectedItem) => {
        if(selectedItem!==null){
        const temp = [...assignedEmployeevalue]
        temp.push({name:selectedItem.label,id:selectedItem.key})
        setem(temp)
        const tempemployees= employees.filter(el=>el.id !== selectedItem.key)
        setEmployees(tempemployees)
        }
    }, [assignedEmployeevalue]);

    /* When delete an tag from assigned employees tags*/
    const onRemoveTags = (name,id)=>{
        const newArray = assignedEmployeevalue.filter(el=> el.id !== id)
        setem(newArray)
        const tempemployees= [...employees]
        tempemployees.push({name:name,id:id})
        setEmployees(tempemployees)
    }
    
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
                    <Form.Control type="text" placeholder="Enter time" required value={time}
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
                    requiredInputLength={2}
                    suppressReselect={false}
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

    /* Close the modal after sending data for firebase */
    useEffect(()=>{
        console.log("[useEffect]")
        if(!loading && sendData){
            props.handleClose();
            }
        },[loading])

  return (
        <React.Fragment> 
            <BackDrop show={props.show} />
            <Modal show={props.show} onHide={props.handleClose}  aria-labelledby="contained-modal-title-vcenter" centered size='md' 
            backdrop={false}>
                <Form noValidate validated={validated} onSubmit={submitedHandeler}> 
                <Modal.Header closeButton>
                    <Modal.Title>New Project</Modal.Title>
                </Modal.Header>
                <Modal.Body className={classes.ModalBody}>
                    {ModalBody}
                </Modal.Body>
                <Modal.Footer>
                    <Button className={classes.Close} variant="dark" onClick={props.handleClose}>
                        Cancel
                    </Button>
                    <Button className={classes.create} type="submit" variant="secondary">
                        Create
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </React.Fragment>
  );
});

export default addProject;