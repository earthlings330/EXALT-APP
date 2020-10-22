import React from 'react'
import Logo from '../../../assests/logo.svg'
import classes from './SideDrower.css'
import Backdrop from '../../../UI/Backdrop/Backdrop'
import { NavLink } from 'react-router-dom'
import Avatar from 'react-avatar'
import { useSelector } from 'react-redux'
const sideDrower  = (props)=>{

    const UserEmail = useSelector(state => state.email)
    let attachClasses = [classes.SideDrower,classes.Close];
    if(props.open){
        attachClasses = [classes.SideDrower,classes.Open];
    }
return(
    <React.Fragment>
    <Backdrop  show={props.open} clicked={props.closed}/>
    <div className={attachClasses.join(' ')}>
        <div className={classes.Logo}>
        <img src={Logo} alt="Logo"/>
        </div>
        <div className={classes.User}>
        <Avatar  className={classes.Avarat} size="50" facebook-id="invalidfacebookusername"
                src="http://www.gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3"
                round={true} />
        <p style={{color:"white"}}>{UserEmail}</p>
        </div>
        <div className={classes.Nav}>
            <ul className={classes.NavigationItems}>
                <li className={classes.NavigationItem}>
                    <NavLink onClick={props.closed} to='/time-sheet' exact activeClassName={classes.active}>TIMESHEET</NavLink>
                </li>
                <li className={classes.NavigationItem}>
                    <NavLink onClick={props.closed} to='/projects' exact activeClassName={classes.active}>PROJECTS</NavLink>
                </li>
                <li className={classes.NavigationItem}>
                    <NavLink onClick={props.closed} to='/reports' exact activeClassName={classes.active}>REPORTS</NavLink>
                </li>
            </ul>
        </div>
    </div>
    </React.Fragment>
);
}
export default sideDrower