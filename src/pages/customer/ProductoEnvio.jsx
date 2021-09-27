import React, { useState, useEffect } from 'react'
import { Button, Checkbox, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import RoomIcon from '@material-ui/icons/Room';
import { useHistory } from 'react-router';
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

const ProductoEnvio = () => {
    const history = useHistory()
    const [checkValue, setCheckValue] = useState(0)
    const [id, setId] = useState(0)
    const classes = useStyles();
    const [companias, setCompania] = useState([])
    const [compania, setCompa] = useState(null)

    const listar = () => {
        api.get("/compania/listarDisponibles").then(response => {
            setCompania(response.data)
        })
    }

    const agregar = objeto => {
        setCompa(objeto)
    }

    const confirmarConpania = () => {
        let compra = {companiaEnvio: compania}
        localStorage.setItem("compra", JSON.stringify(compra))
        history.push("/compra/direccion")
    }

    useEffect(() => {
        listar()
    }, [])

    return (
        <React.Fragment>
            <Grid style={{ marginTop: 20 }} container direction="row" justify="space-around">
                <Grid container direction="row" justify="flex-start" alignItems="center" item xs={11} sm={11}>
                    <RoomIcon fontSize="large" style={{ color: "#3B5B7E" }}></RoomIcon>
                    <Typography variant={"h4"} color="inherit">¿Cómo se enviará?</Typography>
                </Grid>
                <Grid style={{ marginTop: 15 }} item xs={11} sm={7}>
                    <Paper className={classes.paper}>
                        {companias.map((compania, index) => (
                            <Grid key={index}>
                                <Grid container direction="row" justify="flex-start" alignItems="center">
                                    <Typography variant={"h5"} color={"textPrimary"}>
                                        <Checkbox checked={((checkValue && index + 1 === id)? true : false)} onClick={() => { setId(index+1); setCheckValue(1); agregar(compania)}} inputProps={{ 'aria-label': 'primary checkbox' }} />
                                        {compania.descripcion}</Typography>
                                </Grid>
                                <Grid>
                                    <Typography style={{ paddingLeft: 45 }} color={"primary"}> Envío por $200.00 a la tienda más cercana</Typography>
                                    <Typography variant={"caption"} style={{ paddingLeft: 45 }} color={"initial"}>Recíbelo en 14 días </Typography>
                                </Grid>
                            </Grid>
                        ))}
                        <Grid container direction={"row"} justify="flex-end">
                            <Button style={{fontWeight: "bold"}} disabled={checkValue === 0} onClick={() => { confirmarConpania() }} size="medium" variant="contained" color="primary">
                                Continuar
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

export default ProductoEnvio;

