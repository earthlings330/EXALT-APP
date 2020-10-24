import React,{useCallback, useState,useMemo, useEffect} from 'react';
import {Button,Modal,Form,Row,Col} from 'react-bootstrap'
import classes from './AddProject.css'
import Assigned from '../AssignedEmployee/AssignedEmployee'
import DataListInput from "react-datalist-input";
import BackDrop from '../../../UI/Backdrop/Backdrop'
import {useDispatch, useSelector } from 'react-redux';
import * as actionTye from '../../../Store/action/index'
import Spinner from '../../../Components/Spinner/Spinner'


const addProject = React.memo(props => {
    const {handleClose} = props
    /* useSelector , useDispatch , useState */
    const dispatch = useDispatch();
    const userID = useSelector(state=>state.auth.userID)
    const loading = useSelector(state=>state.addProj.loading)
    const error = useSelector(state=>state.addProj.error)
    const [validated, setValidated] = useState(false); // for validation form
    const [InputClasses, setInputClasses] = useState([classes.InputDataList]) // for validation DataList input
    const [ProjectName , setProjectName] = useState('')
    const [time,setTime] = useState('')
    const [module,setModule ] = useState('')
    const [assignedEmployeevalue,setem] = useState([]) // for assigned employees 
    const [sendData,setSendDate] = useState(false)
    const addProjectInit = useCallback( (projectName,time,module,assignedEmployees,userID)=>
    dispatch(actionTye.addProject_Init(projectName,time,module,assignedEmployees,userID)) )
    



    /* FOR TEST */
    const [employees , setEmployees] = useState([
        {name:"omar",id:201711564},
        {name:"Mohammad",id:2017},
        {name:"Maree",id:2018123},
        {name:"Ahmad",id:20171231564},
        {name:"Ali",id:2017123},
        {name:"omarya",id:201711231564},
        {name:"Mohammade",id:202317},
        {name:"Sara",id:20171123564},
        {name:"Momen",id:201237},
        {name:"Feras",id:2017123157764},
        {name:"Mohammad",id:201127},
        {name:"omar",id:20171155564},
        {name:"Mohammad",id:2034517},
        {name:"omar",id:20171761564},
        {name:"Mohammad",id:201767456},
        {name:"omar",id:20171156564},
        {name:"Mohammad",id:205317},
        {name:"omar",id:201711566564},
        {name:"Mohammad",id:2016677}
    ])

 
    
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
        
    
    /* Setup the assigned employees tags based on selected option from datalist */ 
    const listof = assignedEmployeevalue.map((el,index)=>{
        return <Assigned name={el.name} key={index} onClose={()=>onRemoveTags(el.name,el.id)}/>
    })

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
                onChange={event => setModule(event.target.value)}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
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
    useEffect(()=>{
        console.log("[useEffect]")
        if(!loading && sendData){
            handleClose();
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
                    <Button className={classes.Close} variant="dark" onClick={handleClose}>
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