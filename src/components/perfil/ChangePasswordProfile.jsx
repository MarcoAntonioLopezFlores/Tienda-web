import { Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import ChangePassForm from '../forms/ChangePassForm';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        backgroundColor: '#ffff',
        boxShadow: '0px 10px 10px #C4C4C4',
        borderRadius: 20,        
    }
}));

const ChangePasswordProfile = () => {

    const classes=useStyles()

    return (
        <Grid item xs={12} sm={12} md={4}>
            <Paper style={{marginTop:20}} className={classes.paper}>
                <Typography variant="h5">Cambio de contraseña</Typography>
                <ChangePassForm/>
            </Paper>
        </Grid>
    )
}

export default ChangePasswordProfile
