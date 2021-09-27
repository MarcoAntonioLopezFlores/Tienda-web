import { makeStyles } from '@material-ui/core/styles';
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Button, Paper } from '@material-ui/core';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import api from '../../util/api';

const useStyles = makeStyles((theme) => ({
    labelsAddress: {
        color: '#4A6676'
    }, paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        
    }

}));

const CardCards = ({load,object}) => {
    const classes = useStyles();

    const swal = withReactContent(Swal)

    const eliminar = objeto => {
        swal.fire({
            title: '¿Desea eliminar la tarjeta?',
            text: '',
            icon: 'warning',
            showCancelButton: true, 
            cancelButtonText: 'No, cancelar',
            confirmButtonText: 'Sí, aceptar'
        }).then(result => {
            if(result.isConfirmed){
                api.delete('/tarjeta/bajalogica/' + objeto.id).then(response =>{
                    if(response.data === true){
                        swal.fire(
                            'Tarjeta eliminada con éxito',
                            '',
                            'success'
                        )
                        load()
                    }else{
                        swal.fire(
                            'Error al eliminar la tarjeta',
                            '',
                            'error'
                        )
                    }
                })
            }
        })
    }

    return (

        <Grid container direction="row">
            <Grid style={{ marginTop: 10 }} item xs={12} sm={12}>
                <Paper elevation={0} className={classes.paper}>
                    <Grid container direction="row" >
                    <Grid container direction="column" style={{marginRight:5}} item xs={12} md={3} sm={3}>
                        <img
                            src="https://s3-symbol-logo.tradingview.com/visa--600.png"
                            alt="tipo tarjeta"
                            height={70}
                            width={100}
                        />
                    </Grid>
                    <Grid container direction="column" alignContent="center" justify="center" item xs={12} md={8} sm={8}>
                        <Typography variant="h6" color="initial" className={classes.labelsAddress}>{object.nombre}</Typography>
                        <Typography variant="inherit" color="initial" className={classes.labelsAddress}>xxxx xxxx xxxx {object.descripcion.substring(60)}</Typography>
                    </Grid>
                    </Grid>
                    <Grid container direction="row" justify="flex-end" alignItems="flex-end" item xs={12} sm={12}>
                    <Button style={{ fontWeight: "bold", margin: "1%" }} variant="contained" color="secondary" onClick={() => eliminar(object)}>Eliminar tarjeta</Button>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default CardCards