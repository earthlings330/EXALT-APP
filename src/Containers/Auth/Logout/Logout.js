import React,{useEffect} from 'react'
import {useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import * as actionType from '../../../Store/action/index'


const logout = React.memo(props=>{
    const dispatch = useDispatch();
    const onLogout = () => dispatch(actionType.AuthLogOut())
useEffect(()=>{
    onLogout();
},[])


        return(
            <Redirect to="/login"/>
        );
    })



export default   logout