import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CardOrder from '../../components/pedidos/CardOrder';
import { Paper } from '@material-ui/core';
import api from '../../util/api';

const useStyles = makeStyles(() => ({
    paper: {
        padding: 10,
        margin: 'auto',
        marginTop: 20,
        maxWidth: '90%',
    },
    labels: {
        color: '#8A8686',
        marginLeft: 10
    },
    principal: {
        padding: 10
    }
}));


const Pedidos = () => {
    const [compras, setCompras] = useState([])

    useEffect(() => {
        api.get("/compra/listar").then(response => {
            setCompras(response.data)
        })
    }, [])

    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.paper}>
                <Grid container direction="row" className={classes.root}>
                    <Grid className={classes.principal} container direction="row" >
                        <LocalShippingIcon fontSize="large" style={{ color: '#002E60', opacity: '70%' }} />
                        <Typography variant="h5" color="initial" className={classes.labels}>Mis compras</Typography>
                    </Grid>
                    <Grid container direction="row" >
                        {compras.length>0?compras.map((compra, index) => (
                                <Grid item sm={6} xs={12} key={index}>
                                    <CardOrder compra={compra} />
                                </Grid>
                            
                        )):<h4>No tienes pedidos realizados</h4>}
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}
export default Pedidos;
