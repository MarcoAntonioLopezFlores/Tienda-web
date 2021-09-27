import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import CardProductOrder from '../../components/pedidos/CardProductOrder';
import CardAddressOrder from '../../components/pedidos/CardAddressOrder';
import CardInformationPay from '../../components/pedidos/CardInformationPay';
import api from '../../util/api';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: 10,
        margin: 'auto',
        marginTop: 20,
        maxWidth: '90%'
    },
    principal: {
        padding: 10
    },
    labels: {
        color: '#8A8686'
    }
}));

const DetailPedido = ({ object }) => {
    const [isSucursal, setIsSucursal] = useState(false)
    const [productos, setProductos] = useState([])
    const history = useHistory()
    const classes = useStyles();
    const { state } = useLocation();

    useEffect(() => {
        sessionStorage.setItem("carrito", JSON.stringify(state.compra.carrito))
        api.get("/sucursalcompania/" + state.compra.companiaEnvio.id).then(response => {
           response.data.map((sucursalCompania) => {
            if(sucursalCompania.direccion.id == state.compra.direccion.id){
                setIsSucursal(true)
            }
           })
        })
        api.get("/carrito/compra/" + state.compra.carrito.id).then(response => {
           setProductos(response.data)
        })
    }, [])

    return (
        <>
            <Paper className={classes.paper}>
                <Grid className={classes.principal} container direction="row">
                    <Grid container direction="row" item sm={11}>
                        <ShoppingCartIcon fontSize="large" style={{ color: '#002E60', opacity: '70%' }} />
                        <Typography variant="h5" color="initial" className={classes.labels} >Resumen del pedido</Typography>
                    </Grid>
                    <Grid container direction="row" justify="flex-end" item sm={1}>
                        <Button style={{ fontWeight: "bold" }} variant="contained" color="primary"
                            onClick={() => { history.goBack() }}>
                            Volver
                    </Button>
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-around">
                    <Grid style={{ marginTop: 10 }} item xs={12} sm={12} md={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="h5">Dirección de envío</Typography>
                            <CardAddressOrder info={state.compra} sucursal={isSucursal}  />
                        </Paper>
                    </Grid>
                    <Grid style={{ marginTop: 10 }} item xs={12} sm={12} md={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="h5">Información del pago</Typography>
                            <CardInformationPay info={state.compra} />
                        </Paper>
                    </Grid>
                </Grid>
                <Grid className={classes.heightWin}>
                    <List>
                        {productos.map((producto, index) => {
                            return (
                                <ListItem divider key={index}>
                                    <CardProductOrder product={producto} />
                                </ListItem>
                            )
                        })}
                    </List>
                </Grid>
            </Paper>
        </>
    )
}

export default DetailPedido
