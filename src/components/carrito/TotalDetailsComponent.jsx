import { Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import { addComa } from '../../util/functionsTable';
import api from '../../util/api'
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        backgroundColor: '#ffff',
        boxShadow: '0px 10px 10px #C4C4C4',
        borderRadius: 20,
    }
}));

const TotalDetailsComponent = () => {

    const [totalProductos, setTotalProducto] = useState(0)
    const [listaProductos, setLista] = useState([{carrito:{total:0}}])

    const obtenerTotal = () => {
        api.get("/carrito/total").then(response => {
            setTotalProducto(response.data)
        })
        
        api.get("/carrito/listar").then(response => {
            setLista(response.data)
        })
    }

    useEffect(() => {
        obtenerTotal()
    },[])

    const classes = useStyles()
    return (
        <>
        {listaProductos.length>0?<Paper className={classes.paper}>
            <Typography style={{ textAlign: "center" }} variant={"h5"} >Resumen de compra</Typography>
            <br />
            <Grid container
                direction="row"
                justify="space-between"
                alignItems="center">
                <Typography>Productos({totalProductos})</Typography>
                <Typography color={"primary"}>${addComa(listaProductos[0].carrito.total.toString())}</Typography>
            </Grid>
            <Grid container
                direction="row"
                justify="space-between"
                alignItems="center">
                <Typography>Envío</Typography>
                <Typography color={"primary"}>${addComa("200")}</Typography>
            </Grid>
            <br />
            <Grid container
                direction="row"
                justify="space-between"
                alignItems="center">
                <Typography color={"textPrimary"} variant={"h5"}>Total:</Typography>
                <Typography color={"primary"}>${addComa((listaProductos[0].carrito.total + 200).toString())}</Typography>
            </Grid>
        </Paper>:
        
            <Redirect to="/"/>}
        </>
    )
}

export default TotalDetailsComponent
