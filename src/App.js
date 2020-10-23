import React, {useCallback, useEffect }  from 'react';
import classes from './App.css';
import {useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import * as actionType from './Store/action/index'


/*  IMPORT COMPONENT */
import Auth from './Containers/Auth/Auth';
import Layout from './Components/Layout/Layout';
import Projects from './Containers/Projects/Projects'


const app = React.memo(props =>{
  /* SET SELECTOR AND DISPATCH */
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.token !==null)
  const CheckSignedInUser = useCallback(()=> dispatch(actionType.AuthCheckState()),[])

  useEffect(()=>{ CheckSignedInUser(); },[CheckSignedInUser])

  /* SET UP ROUTERS BASED ON AUTH */
  let Routes = (
  <Switch>
    <Route path='/login' component={Auth}/>
    <Redirect from='/' to='/login'/> 
  </Switch>)

  if(isAuth){
    Routes = (
    <React.Fragment>
      <Route path='/projects' exact component={Projects}/>
      <Route path='/time-sheet' exact render={()=><div><h1>From Time Sheet</h1></div>} />
      <Route path='/reports' exact render ={()=><div><h1>From Reports</h1></div>} />
      <Redirect from='/' to='/projects' />
    </React.Fragment>)
  }

    return (
      <div className={classes.App}>
        <Layout >
        
          {Routes}
         
        </Layout>

      </div>
    );

})

export default withRouter (app);
