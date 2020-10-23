import React, {useState } from 'react'
import { useSelector } from 'react-redux'
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar'
import classes from './Layout.css'
import SideDrawer from '../Navigation/SideDrower/SideDrower'

const layout = props => {
    const isAuth = useSelector(state => state.auth.token !==null)
    const [showSideDrawer,setshowSideDrawer] = useState(false)
   

   const ShowSideDrawerHandeler = () => {
      setshowSideDrawer(false)
   }

   const drawerToggleClickedHandeler = ()=>{
      setshowSideDrawer(!showSideDrawer)
    
   }


    return(
        <React.Fragment>
            {isAuth ?
                <React.Fragment>
                    <Toolbar toggle={drawerToggleClickedHandeler}/>
                    <SideDrawer open={showSideDrawer}  closed={ShowSideDrawerHandeler}/>
                </React.Fragment>  
            : null}

            <main className={classes.Content}>
                {props.children}
            </main>
        
        </React.Fragment>
        )
}
export default layout