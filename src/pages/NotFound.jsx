import React from 'react'
import logo from '../assets/img/logo-tech.svg'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        margin: "5%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    }
})
const NotFound = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <img height={"30%"} width={"30%"} src={logo} alt="LOGO TECH" />
            <h1>HA OCURRIDO ALGO</h1>
            <div>
                <Link to="/">Volver a página principal</Link>
            </div>
        </div>
    )
}

export default NotFound;
