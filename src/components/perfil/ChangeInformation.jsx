import React from 'react'
import { makeStyles, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import PersonalForm from '../forms/PersonalForm'

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        backgroundColor: '#ffff',
        boxShadow: '0px 10px 10px #C4C4C4',
        borderRadius: 20,
        
    }
}));

const ChangeInformation = () => {
    const classes = useStyles();
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    return (
        <Paper className={classes.paper}>
            <Typography align="justify" variant="h3">{usuario.nombre} {usuario.apellidos}</Typography>
            <Typography variant="h5">Datos personales</Typography>
            <PersonalForm />
        </Paper>        
    )
}

export default ChangeInformation
