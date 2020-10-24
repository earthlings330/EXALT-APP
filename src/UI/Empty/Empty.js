import React from 'react'
import classes from './Empty.css'

const empty = React.memo(props=>{
    return(
        <div className={classes.Empty}>
            <p> You dont have any projects yet , <strong>create one!</strong> </p>
        </div>
    )
})


export default empty