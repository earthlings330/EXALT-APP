import React, { useState , useMemo} from 'react'
import NewUser from '../Modal/NewUser/NewUser'
import classes  from './Employees.css'
import Employee from '../../Components/Employee/Employee'
import Empty from '../../UI/Empty/Empty'

const employees = React.memo(props=>{

    const [Color, setColor] = useState(true)
    const handleColor = () => setColor(true)
    const handleNonColor = ()=> setColor(false)
    const Employees = [
        {name:"omar",email:"asd@asd.com",role:"employee"},
        {name:"omar",email:"asd@asd.com",role:"employee"},
        {name:"omar",email:"asd@asd.com",role:"employee"},
        {name:"omar",email:"asd@asd.com",role:"employee"},
        {name:"omar",email:"asd@asd.com",role:"employee"},
        {name:"omar",email:"asd@asd.com",role:"employee"},
        {name:"omar",email:"asd@asd.com",role:"employee"},
        {name:"omar",email:"asd@asd.com",role:"employee"}]

    const [showNew, setShowNew] = useState(false)
    const handleShow = ()=> setShowNew(true)
    const handleClose = () => setShowNew(false)
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
                index={index}/>;
                EmployeesArray.push(emp);
                index+=1
           }
           return EmployeesArray
    },[Employees])
return (
<React.Fragment>
    <NewUser  show={showNew} onClose={handleClose}/>
    <div className={classes.SwitchSection}>
            <button onClick={handleColor}  className={Color ? classes.Active : null}>Manage users</button>
            <button onClick={handleNonColor}  className={Color ? null : classes.Active}>Manage working days/hours</button>
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