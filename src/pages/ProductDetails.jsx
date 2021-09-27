import React, {useState} from 'react'
import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { isLogin } from '../util/authentication';
import { Redirect, useLocation } from 'react-router';
import api from '../util/api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { addComa } from '../util/functionsTable';
import BeardcrumbComponent from '../components/products/BeardcrumbComponent';
const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: '#ffff',
        boxShadow: '0px 10px 10px #C4C4C4',
        borderRadius: 20,
    },
    dataPaper: {
        padding: theme.spacing(2),
        textAlign: 'start',
        color: theme.palette.text.secondary,
        backgroundColor: '#ffff',
        boxShadow: '0px 10px 10px #C4C4C4',
        borderRadius: 20,
    }
}));

const ProductDetails = () => {
    const classes = useStyles();
    const location = useLocation()
    const swal = withReactContent(Swal)
    const [producto, setProducto] = useState(location.state !== undefined ? location.state.producto : null)

    const agregarCarrito = () => {
        api.get("/carrito/agregar/" + producto.id).then(response => {
            if(response.data === true){
                localStorage.setItem("carrito", localStorage.getItem("carrito") !== null ? parseInt(localStorage.getItem("carrito")) + 1 : 1)
                swal.fire(
                'Producto agregado con éxito',
                '',
                'success'
                ).then(() => {
                    consultar()
                    window.location.reload()
                })
                
            }else{
                swal.fire(
                'Error al agregar el producto',
                '',
                'error'
                )
            }
        })
    }

    const consultar = () => {
        api.get("/producto/" + producto.id).then(response => {
            setProducto(response.data)
        })
    }

    return (
        producto?<>
            <BeardcrumbComponent loc={producto.subcategoria.categoria.nombre + " / "+ producto.subcategoria.nombre}/>
            <Grid container direction="row" justify="space-around">
                <Grid item xs={12} sm={6} style={{ marginTop: 15 }}>
                    <Paper className={classes.paper} >
                        <img width={"100%"} src={producto.imagen} alt="xp" height={"100%"}></img>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={5} style={{ marginTop: 15 }}>
                    <Paper className={classes.dataPaper}>
                        <Typography variant="h4" color="initial">{producto.nombre} {producto.modelo} </Typography>
                        <br />
                        <Typography variant="h6" color="textPrimary">{producto.descripcion}</Typography>
                        <br />
                        <Typography variant={"h6"} color="initial">Color: {producto.color} </Typography>
                        <br />
                        <Typography variant={"h6"} color="initial">Marca: {producto.marca.nombre} </Typography>
                        <br />
                        <Typography variant={"h6"} style={{fontWeight:"bold",color:"#469A49"}}>Precio: ${addComa(producto.precio.toString())}</Typography>
                        <br />
                        <Typography variant={"h6"} color="initial">Disponibles: {producto.existencia} </Typography>
                        <br />
                        <Typography variant={"h6"} color="initial">Categoría: {producto.subcategoria.categoria.nombre}/ {producto.subcategoria.nombre}  </Typography>
                        <br />
                        {isLogin() && <Grid container direction="row" justify="flex-start" alignItems="center">
                            <Button style={{ fontWeight:"bold" }} color="primary" fullWidth size="medium" variant="contained" onClick={() => agregarCarrito()}>
                                Agregar a carrito
                            </Button>
                        </Grid>}
                    </Paper>
                    <Paper className={classes.paper} style={{ marginTop: 15 }}>
                        <Typography color="initial">Métodos de pago aceptados</Typography>
                        <Typography color={"textPrimary"}>Tarjetas de crédito</Typography>
                        <Grid container direction="row" justify="space-around" alignItems="center">
                            <img height={50} width={70} src="https://s3-symbol-logo.tradingview.com/visa--600.png" alt="pago1" />
                            <img height={50} width={50} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1000px-Mastercard-logo.svg.png" alt="pago2" />
                            <img height={50} width={50} src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" alt="pago3" />
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>:<>
            <Redirect to={"/productos"}/>
        </>
    )
}

export default ProductDetails;
