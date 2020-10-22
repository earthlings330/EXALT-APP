import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar'
import classes from './Layout.css'
import SideDrawer from '../Navigation/SideDrower/SideDrower'

const layout = props => {
    const isAuth = useSelector(state => state.token !==null)
    const [showSideDrawer,setshowSideDrawer] = useState(false)
   

   const ShowSideDrawerHandeler = () => {
      setshowSideDrawer(false)
   }

   const drawerToggleClickedHandeler = ()=>{
      setshowSideDrawer(!showSideDrawer)
    
   }

    /* Redirect the user to Home page if he is already login */
    const RedirectUser = useMemo(()=>{
        console.log('RedirectUser')
        let redirect = null
        if(!isAuth){
            redirect = <Redirect to="/login"/>
        }
    return redirect
    },[])


    const content = (<div><h1>Yes i'm Auth</h1></div>)
return(
    <React.Fragment>
    {RedirectUser}
    <Toolbar toggle={drawerToggleClickedHandeler}/>
    <SideDrawer open={showSideDrawer}  closed={ShowSideDrawerHandeler}/>
    <main className={classes.Content}>
    {content}
    </main>
    
    </React.Fragment>
)
}
export default layout