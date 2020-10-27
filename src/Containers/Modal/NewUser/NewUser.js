import React, {useCallback, useState,useEffect } from 'react';
import classes from './NewUser.css';
import * as EmailValidator from 'email-validator';
import BackDrop from '../../../UI/Backdrop/Backdrop'
import { useDispatch, useSelector } from 'react-redux';
import * as actionType from '../../../Store/action/index';
import Spinner from '../../../Components/Spinner/Spinner';

const newuser = React.memo(props=>{
    const dispatch = useDispatch();
    const onAddUser = useCallback((name,email,role)=>dispatch(actionType.addEmployee(name,email,role)),[])
    const editEmployee = useCallback((emName,emEmail,emRole,emKey)=>dispatch(actionType.updateEmployee(emName,emEmail,emRole,emKey)),[])
    const loading = useSelector(state=>state.emp.loading)
    const employee = useSelector(state=>state.emp.employeeForEdit)
    const key = useSelector(state=>state.emp.key)
    const [sendData,setSendData] = useState(false)
    const [setup,setSetup] = useState(false)
  



    
    
    const [name,setName] = useState({
        value:'',
        valid:false,
        touched:false,
        requiered:true
    })
    const [email,setEmail] = useState({
        value:'',
        valid:false,
        touched:false,
        requiered:true,
        error:''
    })
    const [role,setRole] = useState('employee')

    const nameChangeHandeler = useCallback(event =>{
        
        let value = event.target.value
        
        if(value !== '' && !isNumeric(value)){
            setName(prevState => ({
                ...prevState,
                value: value,
                touched:true
             }))
           if(value.length > 5){
               setName(prevState => ({
                ...prevState,
                value: value,
                valid:true,
                error:''
             }))
           }else{
            setName(prevState=>({
                ...prevState,
                error:'Please make sure your name more than 5 chars',
                valid:false
            }))
        }
        }else{
            if(value === '' ){
                setName(prevState => ({
                    ...prevState,
                    value: value,
                    error:"Name requiered",
                    valid:false
                 }))
            }else if(isNumeric(value)){
                setName(prevState => ({
                    ...prevState,
                    value: value,
                    error:"Invalid name",
                    valid:false
                 }))
            }
        }
    },[name])
   const  isNumeric = value => /^-?[\d.]+(?:e-?\d+)?$/.test(value);


   const emailChangeHandle =useCallback(event =>{
       const value = event.target.value
       if(value !== ''){
        setEmail(prevState => ({
            ...prevState,
            value: value,
            touched:true
         }))
         if(EmailValidator.validate(value)){
            setEmail(prevState => ({
                ...prevState,
                value: value,
                valid:true,
                error:''
             }))
         }else{
            setEmail(prevState => ({
                ...prevState,
                value: value,
                valid:false,
                error:'Invalid E-mail'
             })) 
         }

       }else{
           if(value === ''){
            setEmail(prevState => ({
                ...prevState,
                value: value,
                error:"E-mail required",
                valid:false
             }))
           }
       }
   },[email])

   useEffect(()=>{
    if(!props.type){
        const employeeName = employee.name
        const employeeEmail = employee.email
        const employeeRole = employee.role
        if(!setup){
        setName({
            value:employeeName,
            valid:true,
            touched:true,
            requiered:true
             })
        setEmail(prevState => ({
        ...prevState,
        value:employeeEmail,
        touched:true,
        valid:true
        }))
        console.log(name)
        }
        setSetup(true)
        }else{
            setSetup(false)
        }
        return ()=>{}
    },[employee,setEmail,setName,name,email])


   const handleSubmit =useCallback( event =>{
    event.preventDefault()
    if(!name.touched || !email.touched){
        if(!name.touched){
            setName(prevState => ({
                ...prevState,
                error:"Name required",
                touched:true,
                valid:false
             }))
        }
        if(!email.touched){
            setEmail(prevState => ({
                ...prevState,
                error:"E-mail required",
                touched:true,
                valid:false
             }))
        }
    }else if(name.valid && email.valid){
        if(props.type){
        onAddUser(name.value,email.value,role);
        setSendData(true)}
        else{
            editEmployee(name.value,email.value,role,key);
            setSendData(true);
        }
    
    }else{
        return;
    }
   
   },[onAddUser,editEmployee,name,email,role])
   useEffect(()=>{
    if(!loading && sendData){
        props.onClose();
        }
    },[loading])
   let ModalBody =  <div className={classes.Body} >
   <div className={classes.NameSection}>
       <label>Name</label>
       <input type="text" placeholder="Enter employee name" value={name.value}
       onChange={nameChangeHandeler} className={name.error ? classes.error : null}/>
   </div>
   {(!name.valid && name.touched) ? <div className={classes.errorMsg}> <span> {"*"+name.error} </span> </div>  : null}
   <div className={classes.EmailSection}>
       <label>Email</label>
       <input type="email" placeholder="Enter employee email" id="email" name="email"
       className={email.error ? classes.error : null}
       value={email.value}
       onChange={emailChangeHandle}/>
   </div>
   {(!email.valid && email.touched) ? <div className={classes.errorMsg}> <span> {"*"+email.error} </span> </div>  : null}
   <div className={classes.RoleSection}>
       <label>Role</label>
       <select id="role" 
        value={role}
        onChange={event=> setRole(event.target.value)}>
           <option value="employee">Employee</option>
           <option value="manager">Manager</option>
       </select>
   </div> 
   </div>
   if(loading)
   ModalBody= <Spinner />
    return (
        <React.Fragment>
        <BackDrop show={props.show}/>
        <div className={classes.Container} >
            <div className={classes.Header}>
                <h4>{props.type ? "New User" : "Edit user"}</h4>
               <button className={classes.closeX} onClick={props.onClose}><i className="fas fa-times fa-1x"></i></button>
            </div>
            <form className={classes.Form} onSubmit={handleSubmit}>
               {ModalBody}
                    <div className={classes.Footer}>
                        <button type="button" onClick={props.onClose} className={classes.Cancel}>Cancel</button>
                        <button  className={classes.Save}>{props.type ? "Save" : "Update"}</button>
                    </div>
            </form>
        </div>
        </React.Fragment>
    )
})



export default newuser

