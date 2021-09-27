import React, { useState, useEffect } from 'react'
import { Button, Checkbox, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import styled from "styled-components/macro";
import { useHistory } from 'react-router';
import CardForm from '../../components/forms/CardForm';
import TotalDetailsComponent from '../../components/carrito/TotalDetailsComponent';
import api from '../../util/api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        backgroundColor: '#ffff',
        boxShadow: '0px 10px 10px #C4C4C4',
        borderRadius: 20,
    }
}));

const ImageContent = styled.img`
    width:8%;
    height:8%;
    
`
const ProductPay = () => {
    const history = useHistory()
    const swal = withReactContent(Swal)
    const compra = JSON.parse(localStorage.getItem("compra"))
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    const [checkValue, setCheckValue] = useState(0)
    const [id, setId] = useState(0)
    const [tarjeta, setTarjeta] = useState(null)
    const [tarjetas, setTarjetas] = useState([])
    const classes = useStyles();

    const listar = () => {
        api.get("/tarjeta/listar").then(response => {
            setTarjetas(response.data)
        }).then(() => {
            setCheckValue(0)
        })
    }

    const agregar = objeto => {
        setTarjeta(objeto)
    }

    const comprar = () => {
        if(compra!==null){
            compra.numeroTarjeta = tarjeta
            compra.usuario = usuario
            compra.estado = "Por enviar"
        
            api.post("/compra/registrar", compra).then(response => {
                if(response.data){
                    swal.fire(
                        'Compra realizada con exito',
                        '',
                        'success'
                    ).then(()=>{
                        localStorage.removeItem('compra')
                
                        history.push({
                            pathname: "/pedidos/detalle",
                            state: { compra: response.data }
                        })
                        window.location.reload()
                     })
                }else{
                    swal.fire(
                        'Error al realizar la compra',
                        '',
                        'error'
                    )
                }
            })
        }else{
            swal.fire(
                'Error al realizar la compra',
                '',
                'error'
            )
        }
        
    }

    useEffect(() => {
        listar()
    }, [])

    return (
        <React.Fragment>
            <Grid style={{ marginTop: 20 }} container direction="row" justify="space-around">
                <Grid container direction="row" justify="flex-start" alignItems="center" item xs={11} sm={11}>
                    <MonetizationOnIcon fontSize="large" style={{ color: "#3B5B7E" }} />
                    <Typography variant={"h4"} color={"inherit"}>Selecciona método de pago</Typography>
                </Grid>
                <Grid item xs={11} sm={7}>
                    <Paper className={classes.paper}>
                        {tarjetas.map((tarjeta, index) => (
                            <Grid key={index}>
                                <Grid container direction="row" justify="flex-start" alignItems="center">
                                    <Typography variant={"h5"} color={"textPrimary"}>
                                        <Checkbox checked={(checkValue === 1 && id === index + 1) ? true : false} onClick={() => {setCheckValue(1); setId(index + 1); agregar(tarjeta)}} inputProps={{ 'aria-label': 'primary checkbox' }} />
                                    Tarjeta guardada # {index+1}</Typography>
                                </Grid>
                                <Grid container justify="space-around" alignItems="center">
                                    <ImageContent src="https://s3-symbol-logo.tradingview.com/visa--600.png"
                                        alt="tarjeta"
                                    />
                                    <Typography color={"primary"}  >
                                        {tarjeta.nombre}
                                    </Typography>
                                    <Typography variant={"caption"} color={"initial"}>xxxx xxxxx xxxx {tarjeta.descripcion.substring(60)}</Typography>
                                </Grid>
                            </Grid>
                        ))}
                        <Grid>
                            <Grid container direction="row" justify="flex-start" alignItems="center">
                                <Typography variant={"h5"} color={"textPrimary"}>
                                    <Checkbox checked={checkValue === 2} onClick={() => setCheckValue(2)} inputProps={{ 'aria-label': 'primary checkbox' }} />
                                Nueva tarjeta</Typography>
                            </Grid>
                            <Grid container justify="space-evenly" alignItems="center">
                                {checkValue === 2 &&
                                    <CardForm load={listar} />}
                            </Grid>
                        </Grid>
                        
                        <Grid style={{ marginTop: 20 }} container direction={"row"} justify="flex-end">
                            <Button style={{fontWeight: "bold"}} size="medium" variant="contained" color="primary" disabled={checkValue === 0} onClick={() => {comprar()}}>
                                Finalizar compra
                            </Button>
                        </Grid>
                    </Paper>
                </Grid> 
                <Grid style={{ marginTop: 15 }} item xs={11} sm={4}>
                    <TotalDetailsComponent />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default ProductPay;
