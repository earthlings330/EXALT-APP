import React, { useState } from 'react'
import classes from './Project.css'
import {ProgressBar,Card,Accordion,useAccordionToggle} from 'react-bootstrap'






const project = React.memo(props => {

    const [toggle,settoggle] = useState(false)
    const CustomToggle = ({eventKey }) =>{
        const decoratedOnClick = useAccordionToggle(eventKey,()=> settoggle(!toggle));
        return (
            <button className={classes.toggleButton} type="button" onClick={decoratedOnClick}>
                {!toggle ? <i className='fas fa-sort-up fa-2x'/> : <i className="fas fa-sort-down fa-2x"></i>}
            </button>
          );
    }


    const [now] = useState(50)
    const progressbar  = <ProgressBar variant="success" now={now}  srOnly/>;

    return(
    <div>
        <Accordion >
            <Card>
                <Card.Header className={classes.CardHeader}>
                <div className={classes.ProjectName}>
                <CustomToggle eventKey="0"/>  
                    <p>Project x</p>
                </div>
                    <div className={classes.progressbar}>
                        {progressbar}
                    </div>
                    <div className={classes.Employee}>
                        <p>4</p>
                    </div>
                    <div className={classes.Time}>
                        <p>130h</p>
                    </div>
                
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>{props.children}</Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    </div>
    );


})

export default project