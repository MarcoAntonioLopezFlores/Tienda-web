import React, { useState, useEffect } from 'react'
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import CardAddress from './CardAddress'
import DialogComponent from '../DialogComponent';
import AddressForm from '../forms/AddressForm';
import api from '../../util/api';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        backgroundColor: '#ffff',
        boxShadow: '0px 10px 10px #C4C4C4',
        borderRadius: 20,
    }
}));

const AddressContent = () => {
    const classes = useStyles()
    const [openDialogoSesion, setDialogoSesion] = useState(false)
    const [openDialogoUpdate, setDialogoUpdate] = useState(false)
    const [direcciones, setDirecciones] = useState([])
    const [object, setObject] = useState(null)

    const listarUsuario = () => {
        api.get("/direccionusuario/listar").then(response => {
            setDirecciones(response.data)
        })
    }

    const listarSucursal = () => {
        let compania = JSON.parse(localStorage.getItem("compania"))
        api.get("/sucursalcompania/" + compania.id).then(response => {
            setDirecciones(response.data)
        })
    }

    useEffect(() => {
        
        if(localStorage.getItem("compania") !== null){
            listarSucursal()
        }else{
            listarUsuario()
        }
    }, [])

    return (
        <>
            <Grid style={{ marginTop: 20 }} item xs={12} sm={12}>
                <Grid container direction="row" justify="flex-end">
                    <Button onClick={() => setDialogoSesion(true)} style={{ fontWeight: "bold", margin: "1%" }} variant="contained" color="primary"> Registrar dirección</Button>
                </Grid>
                <Paper className={classes.paper}>
                    <Typography variant="h5">Direcciones</Typography>
                    {direcciones.length>0?direcciones.map((direccion,index) => (
                        <CardAddress key={index} load={localStorage.getItem("compania") !== null?listarSucursal:listarUsuario} setObject={setObject} object={direccion} setDialogoUpdate={setDialogoUpdate} />
                    )):<h4>No tienes direcciones registradas</h4>}
                </Paper>
            </Grid>
            {openDialogoSesion && <DialogComponent
                title={"Registro de dirección"}
                contentForm={AddressForm}
                load={localStorage.getItem("compania") !== null?listarSucursal:listarUsuario}
                toogleDialogo={setDialogoSesion}
                open={openDialogoSesion}
            />}
            {openDialogoUpdate && <DialogComponent
                title={"Actualización de dirección"}
                object={object}
                load={localStorage.getItem("compania") !== null?listarSucursal:listarUsuario}
                contentForm={AddressForm}
                toogleDialogo={setDialogoUpdate}
                open={openDialogoUpdate}
            />}
        </>
    )
}

export default AddressContent
