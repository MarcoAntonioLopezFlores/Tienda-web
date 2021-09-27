import React from 'react'
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Breadcrumbs, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    containerBreadcrumb:{
        display: "flex", flexDirection: "row", backgroundColor: "#3F51B5", width: "30%", height: 40, justifyContent: "center", alignItems: "center", borderRadius: 50, margin: 15, textAlign: "center" 
    }
}));

const BeardcrumbComponent = ({loc}) => {
    const classes = useStyles()
    return (
        <div className={classes.containerBreadcrumb}>
            <Breadcrumbs separator={loc.state||loc!==""?<NavigateNextIcon style={{ color: "white" }} fontSize="small" />:<></>} aria-label="breadcrumb">
                <Link style={{ color: "white", textDecoration: "none" }} color="inherit" to={"/productos"}>
                    <h3>Productos</h3>
                </Link>
                {loc.state?
                    <h3 style={{ color: "white" }}>{loc.state.nombre}</h3>:
                    <h3 style={{ color: "white" }}>{loc}</h3>
                    
                }
            </Breadcrumbs>
        </div>
    )
}

export default BeardcrumbComponent
