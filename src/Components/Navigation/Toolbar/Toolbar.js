import React from 'react'
import {useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import classes from './Toolbar.css'
import Logo from '../../../assests/logo.svg'
import Avatar from 'react-avatar'




const toolbar = React.memo(props=>{
  // const isAuth = useSelector(state=>state.token !==null)
  const UserEmail = useSelector(state => state.auth.email)
        return(
           <header className={classes.Toolbar}>
              
             <div className={classes.Container}>
              <button type="button" onClick={props.toggle} className={classes.toggleButton}><i className="fas fa-bars fa-3x"></i></button>
             
             <div className={classes.Logo}>
               <img src={Logo} alt="Logo"/>
             </div>
               <nav>
                   <ul className={classes.NavigationItems}>
                       <li className={classes.NavigationItem}>
                       <NavLink to='/time-sheet' exact activeClassName={classes.active}>TIMESHEET</NavLink>
                       </li>
                       <li className={classes.NavigationItem}>
                           <NavLink to='/projects' exact activeClassName={classes.active}>PROJECTS</NavLink>
                       </li>
                       <li className={classes.NavigationItem}>
                           <NavLink to='/reports' exact activeClassName={classes.active}>REPORTS</NavLink>
                       </li>
                       <li className={classes.NavigationItem}>
                           <NavLink to='/employees' exact activeClassName={classes.active}>EMPLOYEES</NavLink>
                       </li>
                       <li className={classes.NavigationItem}>
                           <NavLink to='/logout' exact activeClassName={classes.active}>LOGOUT</NavLink>
                       </li>
                   </ul>
               </nav>
               <div className={classes.user}>
               <Avatar className={classes.Avatar} size="50" facebook-id="invalidfacebookusername" src="http://www.gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3" round={true} />
                 <p style={{color:'white'}}>{UserEmail}</p>
               </div>
             </div>
        
           </header>
        );

})


export default toolbar
