import React, { useState, useEffect } from 'react'
import { Button, Checkbox, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import RoomIcon from '@material-ui/icons/Room';
import { useHistory } from 'react-router';
import DialogComponent from '../../components/DialogComponent';
import AddressForm from '../../components/forms/AddressForm';
import TotalDetailsComponent from '../../components/carrito/TotalDetailsComponent';
import api from '../../util/api'

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

const ProductAddress = () => {
    const history = useHistory()
    const [openDialogoSesion, setDialogoSesion] = useState(false)
    const [checkValueC, setCheckValueC] = useState(0)
    const [idC, setIdC] = useState(0)
    const [checkValueU, setCheckValueU] = useState(0)
    const [idU, setIdU] = useState(0)
    const [direccionesCompania, setDirCompania] = useState([])
    const [direccionesUsuario, setDirUsuario] = useState([])
    const [direccion, setDireccion] = useState(null)
    const compra = JSON.parse(localStorage.getItem("compra"))
    const classes = useStyles();

    const listar = () => {
        api.get("/sucursalcompania/" + compra.companiaEnvio.id).then(response => {
            setDirCompania(response.data)
        })

        api.get("/direccionusuario/listar").then(response => {
            setDirUsuario(response.data)
        })
    }

    const agregar = objeto => {
        setDireccion(objeto)
    }

    const confirmarDireccion = () => {
        compra.direccion = direccion
        localStorage.setItem("compra", JSON.stringify(compra))
        history.push("/compra/pago") 
    }

    useEffect(() => {
        listar()
    }, [])

    return (
        <React.Fragment>
            <Grid style={{ marginTop: 15 }} container direction="row" justify="space-around">
                <Grid container direction="row" justify="flex-start" alignItems="center" item xs={11} sm={11}>
                    <RoomIcon fontSize="large" style={{ color: "#3B5B7E" }}></RoomIcon>
                    <Typography variant={"h4"} color={"inherit"}>¿A dónde se enviará?</Typography>
                </Grid>
                <Grid item xs={11} sm={7}>
                    <Paper className={classes.paper}>
                        <Typography variant={"h5"} color={"textPrimary"}>
                            Direcciones disponibles de la compañía </Typography>
                                {direccionesCompania.map((direccionCompania, index) => (
                                    <Grid key={index}>
                                        <Grid item xs={11} sm={7}>
                                            <Typography color={"primary"}> 
                                            <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }} checked={((checkValueC && index + 1 === idC && checkValueU === 0) ? true : false)} onClick={() => { setIdC(index+1); setCheckValueC(1); setCheckValueU(0); agregar(direccionCompania)}} />
                                            {direccionCompania.direccion.tipoAsentamiento} {direccionCompania.direccion.calle}, {direccionCompania.direccion.asentamiento}, 
                                            {direccionCompania.direccion.codigoPostal} {direccionCompania.direccion.municipio}, {direccionCompania.direccion.entidadFederativa}</Typography>
                                        </Grid>
                                    </Grid>
                                ))}
                        <Typography variant={"h5"} color={"textPrimary"}>
                            Sus direcciones disponibles </Typography>
                                {direccionesUsuario.map((direccioneUsuario, index) => (
                                    <Grid key={index}>
                                        <Grid item xs={11} sm={7}>
                                        <Typography color={"primary"}>
                                            <Checkbox inputProps={{ 'aria-label': 'primary checkbox' }} checked={((checkValueU && index + 1 === idU && checkValueC === 0) ? true : false)} onClick={() => { setIdU(index+1); setCheckValueU(1); setCheckValueC(0); agregar(direccioneUsuario)}} />
                                            {direccioneUsuario.direccion.tipoAsentamiento} {direccioneUsuario.direccion.calle}, {direccioneUsuario.direccion.asentamiento}, 
                                            {direccioneUsuario.direccion.codigoPostal} {direccioneUsuario.direccion.municipio}, {direccioneUsuario.direccion.entidadFederativa}</Typography>
                                        </Grid>
                                    </Grid>
                                ))}
                        <Grid container direction="row" justify="flex-end" style={{ marginTop: 30 }}>
                            <Button onClick={() => setDialogoSesion(true)} style={{ marginLeft: 25, marginTop: 15,fontWeight: "bold" }} variant="contained" color="inherit" >
                                Agregar nueva dirección
                            </Button>
                        </Grid>
                        <Grid container direction={"row"} justify="flex-end" style={{ marginTop: 30 }}>
                            <Button style={{fontWeight: "bold"}} size="medium" variant="contained" color="primary" disabled={checkValueU === 0 && checkValueC === 0}
                                onClick={() => { confirmarDireccion()}}>
                                Continuar
                            </Button>
                        </Grid>
                        <Grid container direction="row" justify="flex-start" alignItems="center"
                            style={{ paddingTop: 50 }}>
                            <ErrorIcon color={"error"} />
                            <Typography variant={"caption"} color={"error"}>
                                Recuerda que para la recepción del paquete es necesario portar una identificación oficial</Typography>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={11} sm={4} style={{ marginTop: 10 }}>
                    <TotalDetailsComponent/>
                </Grid>                
            </Grid>            
            {openDialogoSesion && <DialogComponent
                title={"Registro de dirección"}
                contentForm={AddressForm}
                load={listar}
                toogleDialogo={setDialogoSesion}
                open={openDialogoSesion}
            />}
        </React.Fragment>
    )
}

export default ProductAddress;
