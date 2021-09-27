import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CardCarritoScreenComponent from '../../components/carrito/CardCarritoScreenComponent';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useHistory } from 'react-router';
import { addComa } from '../../util/functionsTable';
import api from '../../util/api'

const useStyles = makeStyles(() => ({
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
const Carrito = () => {
    const history = useHistory()
    const classes = useStyles();
    const [productos, setProducto] = useState([])

    const listar = () =>{
        api.get("/carrito/listar").then(response => {
            setProducto(response.data)
        })
    }

    useEffect(() => {
        listar()
    }, [])

    return (
        <>
            <Paper className={classes.paper}>
                <Grid className={classes.principal} container direction="row">
                    <ShoppingCartIcon fontSize="large" style={{ color: '#002E60', opacity: '70%' }} />
                    <Typography variant="h5" color="initial" className={classes.labels} >Resumen de compra</Typography>
                </Grid>
                <Grid >
                    <List>
                        {productos.map((product, index) => {
                            return (
                                <ListItem divider key={index}>
                                    <CardCarritoScreenComponent product={product} listar={listar} />
                                </ListItem>
                            )
                        })}
                    </List>
                </Grid>
                <Grid container direction="row" justify="flex-start">                                            
                        <Grid container direction="row" justify="flex-end">
                            <Typography style={{marginRight:15}} variant="h6" color="initial">Total a pagar con envío</Typography>
                            <Typography style={{marginRight:15}} variant="h6" color="initial">${addComa(productos.length != 0 ? (productos[0].carrito.total+ 200).toString(): "0")}</Typography>
                        </Grid>
                        <Grid container direction="row" justify="flex-end">
                            <Button style={{fontWeight: "bold", margin:15}} variant="contained" color="primary"
                            onClick={()=>{history.push(productos.length != 0 ?"/compra/envio":"/productos")}}>
                                {productos.length != 0 ?"Continuar":"Ir a productos"}
                            </Button>
                        </Grid>                    
                </Grid>
            </Paper>            
        </>
    )
}
export default Carrito;

