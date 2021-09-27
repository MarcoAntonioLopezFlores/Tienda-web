import { makeStyles } from '@material-ui/core/styles';
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Button, Paper } from '@material-ui/core';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import api from '../../util/api';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        backgroundColor: '#ffff',
        
    },
    labelsAddress: {
        color: '#4A6676'
    }
}));

const PhoneCard = ({ load,setObject, object, setDialogoUpdate }) => {

    const classes = useStyles();
    const swal = withReactContent(Swal)

    const eliminar = objeto => {
        swal.fire({
            title: '¿Desea eliminar el teléfono?',
            text: '',
            icon: 'warning',
            showCancelButton: true, 
            cancelButtonText: 'No, cancelar',
            confirmButtonText: 'Sí, aceptar'
        }).then(result => {
            if(result.isConfirmed){
                api.delete('/telefono/eliminar/' + objeto.id).then(response =>{
                    if(response.data === true){
                        swal.fire(
                            'Teléfono eliminado con éxito',
                            '',
                            'success'
                        )
                        load()
                    }else{
                        swal.fire(
                            'Error al eliminar el teléfono',
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
            <Grid style={{ marginTop: 10 }} item xs={11} sm={12}>
                <Paper elevation={0} className={classes.paper}>
                    <Grid container direction="row">
                        <Grid item xs={7} sm={12}>
                            <Typography variant="h5" color="initial" className={classes.labelsAddress}>{object.descripcion}</Typography>
                        </Grid>
                        <Grid container direction="row" justify="flex-end" alignItems="flex-end" item xs={12} sm={12}>
                        <Button style={{ fontWeight: "bold", margin: "1%" }} variant="contained" color="primary" onClick={()=>{setDialogoUpdate(true); setObject(object)}}>Actualizar telefono</Button>
                <Button style={{ fontWeight: "bold", margin: "1%" }} variant="contained" color="secondary" onClick={() => eliminar(object)}>Eliminar telefono</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default PhoneCard

