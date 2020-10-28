import React, { useState , useMemo, useEffect,useCallback} from 'react'
import NewUser from '../Modal/NewUser/NewUser'
import classes  from './Employees.css'
import Employee from '../../Components/Employee/Employee'
import Empty from '../../UI/Empty/Empty'
import { useDispatch,useSelector } from 'react-redux'
import  * as actionType from '../../Store/action/index'
import ErrorModal from '../Modal/ErrorModal'
import firebase from '../../util/firebase'
const employees = React.memo(props=>{

    const dispatch = useDispatch();
    const error = useSelector(state=>state.emp.error)
    const errorMsg = useSelector(state=>state.emp.errorMsg)
    const clearError  = ()=> dispatch(actionType.clearEmployeeError())
    const onInitEmployees = useCallback((employees)=> dispatch(actionType.initEmployees(employees)),[])
    const onEditEmployee = useCallback((emp , key)=>dispatch(actionType.editEmployee(emp,key)),[])
    const [selectedButton,setSelectedButton] = useState('first')
    const Employees = useSelector(state=>state.emp.employees)

    // const Employees = []

    const [showNew, setShowNew] = useState(false)
    const [showEdit,setShowEdit] = useState(false)
    const handleShow = ()=> setShowNew(true)
    const handleClose = () => setShowNew(false)
    const handleShowEdit = ()=> setShowEdit(true)
    const handleCloseEdit = () => setShowEdit(false)


    const handleEdit = (employee , key)=>{
        handleShowEdit();
        onEditEmployee(employee,key)
    }
    const allEmployees = useMemo(()=>{
        let EmployeesArray = []  
        let employees = {...Employees}
        let index = 0
           for(let key of  Object.keys(employees)){
               let employee = employees[key];
                let emp =  <Employee 
                name={employee.name}
                email={employee.email}
                role={employee.role}
                key={index}
                index={index}
                edit={()=>handleEdit(employee,key)}/>;
                EmployeesArray.push(emp);
                index+=1
           }
           return EmployeesArray
    },[Employees])

    const onClose =()=>{
        clearError();
    }

    useEffect(()=>{
        const taskRef  = firebase.database().ref('ExalApp').child('Employees');
        taskRef.on('value', (snapshot) => {
             const emps = snapshot.val();
             onInitEmployees(emps);
       })
    },[onInitEmployees])


    
    const handleClick = event=>{
        setSelectedButton(event.target.id)
        
    }
return (
<React.Fragment>
        {(showNew||showEdit) && <NewUser type={showNew ? true : false} show={showNew ? showNew : showEdit } onClose={showNew ? handleClose : handleCloseEdit}/>}
        {error && <ErrorModal show={error} onClose={onClose}>{errorMsg}</ErrorModal>}
    <div className={classes.SwitchSection}>
            <button type="button"  id='first' onClick={handleClick}
            className={selectedButton ==='first' ? classes.Active : null}>Manage users</button>

            <button  type="button" onClick={handleClick}  id='second'
            className={selectedButton ==='second' ? classes.Active : null}>Manage working days/hours</button>


        </div>
    <div className={classes.Container}>
        
        <div>
            <button onClick={handleShow} className={classes.NewUser}>New User</button>
        </div>
        <div className={classes.EmployeesHeader}>
            <div  className={classes.Name}>
                <p>Name</p>
            </div>
            <div className={classes.Email}>
                <p>Email</p>
            </div>
            <div className={classes.Role}>
                <p>Role</p>
            </div>
            <div className={classes.Edit}> </div>
        </div>
        {allEmployees.length > 0 ? allEmployees : <Empty type="emp"/>}
        
    </div>
</React.Fragment>



)
})

export default employees