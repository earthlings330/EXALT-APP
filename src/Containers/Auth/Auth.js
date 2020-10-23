import React , {useMemo, useState} from 'react'
import classes from './Auth.css'
import * as actionType from '../../Store/action/index'
import {useDispatch, useSelector } from 'react-redux'
    import Spinner from '../../Components/Spinner/Spinner'
import {Form,Button,Alert} from 'react-bootstrap'
import { Redirect } from 'react-router'
import { NavLink } from 'react-router-dom'


const login = React.memo(props=>{

    const loading  = useSelector(state=>state.auth.loading)
    const error  = useSelector(state=>state.auth.error)
    const isAuth  = useSelector(state=>state.auth.token !==null )

    const dispatch = useDispatch();
    const onFormSubmited = (email,password)=> dispatch(actionType.authInit(email,password))

    const [ email , setEmail ] = useState('')
    const [ password , setPassword ] = useState('')
    const [showAlert, setShowAlert] = useState(false);
    const [validated, setValidated] = useState(false);




    /* SUBMIT   & VALIDATION */
    const submitedHandeler = (event)=>{
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            setValidated(true)
          }else{
            onFormSubmited(
                email,
                password
            )
            setValidated(false)
          }
        
    }


     /* Body Content either the form or spinner after clicking the login button */   
    let BodyContent = 
        <Form noValidate validated={validated} onSubmit={submitedHandeler}>

            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email" required value={email}
                onChange={event=>{setEmail(event.target.value);}}/>
            <Form.Control.Feedback type="invalid">
                Please Enter your E-mail
            </Form.Control.Feedback>
            </Form.Group>
          
            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password"  required value={password}
                onChange={event=>{setPassword(event.target.value);}}/>
            <Form.Control.Feedback type="invalid">
                Please Enter your password
            </Form.Control.Feedback>
            </Form.Group>

            <Button  variant="success"  type="success" size="md" block className={classes.Button}>Login</Button>

            <div className={classes.footerAuth}>
                <Form.Group controlId="formBasicCheckbox" >
                    <Form.Check type="checkbox" label="Keep me signed in" style={{color:'lightgray'}}/>
                </Form.Group>
                <NavLink to='#'> Forget Password ? </NavLink>
            </div>
            
        </Form>
    
    /* If user pressed the button */
    if(loading)
    BodyContent= <Spinner />


   /* Redirect the user to Home page if he is already login */
    const RedirectUser = useMemo(()=>{
        console.log('RedirectUser')
        let redirect = null
        if(isAuth){
            redirect = <Redirect to="/"/>
        }
    return redirect
    },[])
   
    
    /* ErrorMessage Shown if there is an error with login process  */
    const LoginAlert = <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible > {error} </Alert>
    const ErrorMessage = useMemo(()=>{
    console.log('ErrorMessage')
        if(error){  
           setShowAlert(true)
            }
    },[error])

    

        return(
            <section className={classes.section}>
                {RedirectUser}
            <div className={classes.Auth}>
                <div className={classes.headerAuth}>
                    <h3>Login</h3>
                </div>
                <div className={classes.bodyAuth}>
                    {BodyContent}
                    {showAlert && LoginAlert}
                </div>
            </div>
            </section>
        );
    }
)




export default login