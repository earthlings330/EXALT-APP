import React, { useCallback, useEffect }  from 'react';
import classes from './App.css';
import {useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import * as actionType from './Store/action/index'

/*  IMPORT COMPONENT */
import Auth from './Containers/Auth/Auth'
import Layout from './Components/Layout/Layout'


const app = React.memo(props =>{
  /* SET SELECTOR AND DISPATCH */
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.token !==null)
  const CheckSignedInUser = useCallback(()=> dispatch(actionType.AuthCheckState()),[])

  useEffect(()=>{ CheckSignedInUser(); },[CheckSignedInUser])

  /* SET UP ROUTERS BASED ON AUTH */
  let Routes = (<Switch>
    <Route path='/login' component={Auth}/>
    <Redirect to='/login'/> 
  </Switch>)

  if(isAuth){
    Routes = (
    <React.Fragment>
      <Route path='/Layout' exact component={Layout}/>
      <Route path='/' component={Layout} />
      <Redirect to='/' />
      </React.Fragment>)
  }

    return (
      <div className={classes.App}>
        {Routes}
      </div>
    );

})

export default withRouter (app);
