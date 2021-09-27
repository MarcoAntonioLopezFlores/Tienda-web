import React from 'react';
import PasswordForm from '../../components/forms/ChangePassForm'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        backgroundColor: '#ffff',
        boxShadow: '0px 10px 10px #C4C4C4',
        borderRadius: 20,
    }
}));

const PasswordSettings=()=>{
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid container direction="row"
             style={{ marginTop: 10 }} item
             justify="center">
                <Paper className={classes.paper}>
                    <Typography variant="h5">Cambio de contraseña</Typography>
                    <PasswordForm></PasswordForm>
                </Paper>
            </Grid>
        </React.Fragment>
    )
}

export default PasswordSettings