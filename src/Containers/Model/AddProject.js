import React,{useState} from 'react';
import {Button,Modal,Form,Row,Col} from 'react-bootstrap'
import classes from './AddProject.css'

const addProject = React.memo(props => {
    const [validated, setValidated] = useState(false);
        /* SUBMIT   & VALIDATION */
        const submitedHandeler = (event)=>{
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.preventDefault();
                setValidated(true)
              }else{
                setValidated(false)
              }
            
        }
  return (
    <Modal show={props.show} onHide={props.handleClose}  aria-labelledby="contained-modal-title-vcenter" centered size='md'>
        <Modal.Header closeButton>
            <Modal.Title>New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form noValidate validated={validated} onSubmit={submitedHandeler} > 

        <Form.Group controlId="formBasicEmail" as={Row}>
            <Form.Label column sm="4">Project Name</Form.Label>
            <Col sm="8">
                <Form.Control type="text" placeholder="Enter Project name" required/>
            </Col>
            <Form.Control.Feedback type="invalid">
                Please Enter your E-mail
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword"  as={Row}>
            <Form.Label column sm="4">Total estimated time</Form.Label>
            <Col sm="8">
                <Form.Control type="text" placeholder="Enter time" required/>
            </Col>
            <Form.Control.Feedback type="invalid">
                Please Enter your password
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="SelectModule" as={Row}>
            <Form.Label  column sm="4" >Module</Form.Label>
            <Col sm="8">
            <Form.Control as="select" size="md" custom>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </Form.Control>
            </Col>
        </Form.Group>

        <Form.Group controlId="assignEmployee" as={Row}>
            <Form.Label  column sm="4" >assign employee</Form.Label>
            <Col sm="8">
                <Form.Control list="employees" type="text" id="employee" placeholder="name" required/>
                <datalist id="employees">
                <option value="Edge"/>
                <option value="Firefox"/>
                <option value="Chrome"/>
                <option value="Opera"/>
                <option value="Safari"/>
                </datalist>
            </Col>
        </Form.Group>

        </Form>

        </Modal.Body>
        <Modal.Footer>
            <Button className={classes.Close} variant="dark" onClick={props.handleClose}>
                Cancel
            </Button>
            <Button className={classes.create}  variant="secondary" onClick={props.handleClose}>
                Create
            </Button>
        </Modal.Footer>
    </Modal>
  );
});

export default addProject;