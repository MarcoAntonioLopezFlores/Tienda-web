import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    labelsAddress: {
        color: '#4A6676'
    },paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,        
    }
}));

const CardAddressOrder = ({info, sucursal}) => {
    const classes = useStyles()
    return (
        <Grid container direction="row">
            <Grid  style={{ marginTop: 10 }} item xs={12} sm={12}>            
            <Grid container direction="column" item xs={12} sm={12}>
                <Typography variant="subtitle2" color="initial" className={classes.labelsAddress}>{sucursal==true?info.companiaEnvio.descripcion:info.usuario.nombre}</Typography>
                <Typography variant="subtitle2" color="initial" className={classes.labelsAddress}>{info.direccion.calle} #{info.direccion.numeroExterior}</Typography>
                <Typography variant="subtitle2" color="initial" className={classes.labelsAddress} >{info.direccion.tipoAsentamiento} {info.direccion.asentamiento}, {info.direccion.codigoPostal}</Typography>
                <Typography variant="subtitle2" color="initial" className={classes.labelsAddress}>{info.direccion.municipio}, {info.direccion.entidadFederativa}</Typography>
            </Grid>            
            </Grid>
        </Grid>
    )
}

export default CardAddressOrder
