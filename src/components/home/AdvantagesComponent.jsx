import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import envioImagen from '../../assets/img/envio.jpg'
import entregaImagen from '../../assets/img/entrega.jpg'
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    paper:{ 
        width:"95%",
        height:"100%",
        '&:hover':{
            transform: "scale(1.05)"
        },
    },
    img:{
        height:"100%",
        width:"100%",
    }
}));

const AdvantagesComponent = () => {
    const classes = useStyles();
    return (
        <Grid 
            container
            direction="row"
            justify="space-evenly"
            
            >
            <Grid item sm={6} xs={6}>
            <Paper elevation={0} className={classes.paper}>
                <img className={classes.img} src={envioImagen} alt={"1"}/>
            </Paper>
            </Grid>   
            <Grid item sm={6} xs={6}>
            <Paper elevation={0} className={classes.paper}>
                <img className={classes.img} src={entregaImagen} alt={"2"}/>
            </Paper>
            </Grid>
        </Grid>
    )
}

export default AdvantagesComponent
