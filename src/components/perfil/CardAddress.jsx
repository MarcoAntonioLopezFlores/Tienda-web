import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Button, Paper } from '@material-ui/core';
import api from '../../util/api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const useStyles = makeStyles((theme) => ({
    labelsAddress: {
        color: '#4A6676'
    },paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        backgroundColor: '#ffff',
        
    }
}));

const CardAddress = ({load,setObject, object, setDialogoUpdate}) => {
    
    const classes = useStyles();
    const swal = withReactContent(Swal)
    const [sucursal,] = useState(JSON.parse(localStorage.getItem("compania")))

    const eliminar = objeto => {
        swal.fire({
            title: '¿Desea eliminar la dirección?',
            text: '',
            icon: 'warning',
            showCancelButton: true, 
            cancelButtonText: 'No, cancelar',
            confirmButtonText: 'Sí, aceptar'
        }).then(result => {
            if(result.isConfirmed){
                if(sucursal !== null){
                    api.delete('/sucursalcompania/eliminar/' + objeto.id).then(response =>{
                        if(response.data === true){
                            swal.fire(
                                'Dirección eliminada con éxito',
                                '',
                                'success'
                            )
                            load()
                        }else{
                            swal.fire(
                                'Error al eliminar la dirección',
                                '',
                                'error'
                            )
                        }
                    })
                }else{
                    api.delete('/direccionusuario/eliminar/' + objeto.id).then(response =>{
                        if(response.data === true){
                            swal.fire(
                                'Dirección eliminada con éxito',
                                '',
                                'success'
                            )
                            load()
                        }else{
                            swal.fire(
                                'Error al eliminar la dirección',
                                '',
                                'error'
                            )
                        }
                    })
                }
            }
        })
    }

    return (
        
        <Grid container direction="row">
            <Grid  style={{ marginTop: 10 }} item xs={11} sm={12}>
            <Paper elevation={0} className={classes.paper}>
            <Grid container direction="column" item xs={12} sm={11}>
                <Typography variant="subtitle1" color="initial" className={classes.labelsAddress}>{object.direccion.calle} #{object.direccion.numeroExterior}</Typography>
                <Typography variant="subtitle1" color="initial" className={classes.labelsAddress} >{object.direccion.tipoAsentamiento} {object.direccion.asentamiento}, {object.direccion.codigoPostal}</Typography>
                <Typography variant="subtitle1" color="initial" className={classes.labelsAddress}>{object.direccion.municipio}, {object.direccion.entidadFederativa}</Typography>
            </Grid>
            <Grid container direction="row" justify="flex-end" alignItems="flex-end" item xs={12} sm={12}>
                <Button style={{ fontWeight: "bold", margin: "1%" }} variant="contained" color="primary" onClick={()=>{setDialogoUpdate(true); setObject(object)}}>Actualizar dirección</Button>
                <Button style={{ fontWeight: "bold", margin: "1%" }} variant="contained" color="secondary" onClick={() => eliminar(object)}>Eliminar dirección</Button>
                
            </Grid>
            </Paper>

            </Grid>
        </Grid>
        
    )
}

export default CardAddress
