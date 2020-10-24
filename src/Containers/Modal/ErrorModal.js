import React from 'react'
import {Button,Modal} from 'react-bootstrap'
import BackDrop from '../../UI/Backdrop/Backdrop'

const errorModel = React.memo( props=>{
    return(
        <React.Fragment>
        <BackDrop show={props.show} />
        <Modal show={props.show} onHide={props.onClose}  aria-labelledby="contained-modal-title-vcenter" centered size='md' 
        backdrop={false}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Something went wrong
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>{props.children}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      </React.Fragment>
    )
})


export default errorModel


