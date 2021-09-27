import React, { useState, useEffect } from 'react'
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import PhoneCard from './PhoneCard';
import PhoneForm from '../forms/PhoneForm';
import DialogComponent from '../DialogComponent';
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

const PhoneContent = () => {
    const classes = useStyles()
    const [openDialogoSesion, setDialogoSesion] = useState(false)
    const [openDialogoUpdate, setDialogoUpdate] = useState(false)
    const [object, setObject] = useState(false)
    const [telefonos, setTelefonos] = useState([])

    const listar = () => {
        api.get("/telefono/listar").then(response => {
            setTelefonos(response.data)
        })
    }

    useEffect(() => {
        listar()
    }, [])

    return (
        <>
            <Grid style={{ marginTop: 20 }} item xs={12} sm={12}>
                <Grid container direction="row" justify="flex-end">
                    <Button color="primary" onClick={() => setDialogoSesion(true)} style={{ fontWeight: "bold", margin: "1%" }} variant="contained"> Registrar teléfono</Button>
                </Grid>
                <Paper className={classes.paper}>
                    <Typography variant="h5">Teléfonos</Typography>                
                    {telefonos.length>0?telefonos.map((telefono,index) => (
                        <PhoneCard key={index} load={listar} setObject={setObject} object={telefono} setDialogoUpdate={setDialogoUpdate} />
                    )):
                        <h4>No tienes telefonos registrados</h4>}
                </Paper>
            </Grid>
            {openDialogoSesion && <DialogComponent
                title={"Registro de teléfono"}
                contentForm={PhoneForm}
                load={listar}
                toogleDialogo={setDialogoSesion}
                open={openDialogoSesion}
            />}
            {openDialogoUpdate && <DialogComponent
                title={"Actualización de teléfono"}
                object={object}
                load={listar}
                contentForm={PhoneForm}
                toogleDialogo={setDialogoUpdate}
                open={openDialogoUpdate}
            />}
        </>
    )
}

export default PhoneContent
