import React, {useState } from 'react'
import classes from './NewUser.css'

import BackDrop from '../../../UI/Backdrop/Backdrop'

const newuser = React.memo(props=>{
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [role,setRole] = useState('employee')
    return (
        <React.Fragment>
        <BackDrop show={props.show}/>
        <div className={classes.Container} 
            style={{
                transform: props.show ? "translateY(0vh)" : "translateY(-100vh)",
                opacity: props.show ? "1" : "0" }}>
            <div className={classes.Header}>
               <h4>New User</h4>
               <button className={classes.closeX} onClick={props.onClose}><i className="fas fa-times fa-1x"></i></button>
            </div>
            <form className={classes.Form}>
                <div className={classes.Body}>
                    <div className={classes.NameSection}>
                        <label>Name</label>
                        <input type="text" placeholder="Enter employee name" id="name" name="name"
                        value={name}
                        onChange={event=> setName(event.target.value)}/>
                    </div>
                    <div className={classes.EmailSection}>
                        <label>Email</label>
                        <input type="email" placeholder="Enter employee email" id="email" name="email"
                        value={email}
                        onChange={event=> setEmail(event.target.value)}/>
                    </div>
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
                    <div className={classes.Footer}>
                        <button type="button" onClick={props.onClose} className={classes.Cancel}>Cancel</button>
                        <button className={classes.Save}>Save</button>
                    </div>
            </form>
        </div>
        </React.Fragment>
    )
})



export default newuser