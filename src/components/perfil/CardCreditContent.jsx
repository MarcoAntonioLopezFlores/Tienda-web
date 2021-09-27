import React, { useState, useEffect } from 'react'
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import CardCards from './CardCards'
import CardForm from '../forms/CardForm';
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

const CardCreditContent = () => {
    const classes = useStyles()
    const [openDialogoSesion, setDialogoSesion] = useState(false)
    const [tarjetas, setTarjetas] = useState([])

    const listar = () => {
        api.get("/tarjeta/listar").then(response => {
            setTarjetas(response.data)
        })
    }

    useEffect(() => {
        listar()
    }, [])

    return (
        <>
            <Grid style={{marginTop:20}} item xs={12} sm={12}>
            <Grid container direction="row" justify="flex-end"
            >
                <Button onClick={()=>setDialogoSesion(true)} style={{ fontWeight: "bold", margin: "1%" }} variant="contained" color="primary"> Registrar tarjeta</Button>
            </Grid>
            <Paper className={classes.paper}>
                <Typography variant="h5">Tarjetas</Typography>
                {tarjetas.length>0?tarjetas.map((tarjeta, index) => (
                    <CardCards load={listar} key={index} object={tarjeta} />
                )):<h4>No tienes tarjetas registradas</h4>}
            </Paper>
            </Grid>
            {openDialogoSesion && <DialogComponent
                title={"Registro de tarjeta"}
                contentForm={CardForm}
                load={listar}
                toogleDialogo={setDialogoSesion}
                open={openDialogoSesion}
            />}
        </>
    )
}

export default CardCreditContent
