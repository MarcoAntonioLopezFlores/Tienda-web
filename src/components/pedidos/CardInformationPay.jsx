import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { addComa } from '../../util/functionsTable';

const useStyles = makeStyles((theme) => ({
    labelsAddress: {
        color: '#4A6676'
    }, paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    }
}));
const CardInformationPay = ({info}) => {
    const classes = useStyles()
    return (
        <Grid container direction="row">
            <Grid style={{ marginTop: 10 }} item xs={12} sm={12}>
                <Grid container direction="column" item xs={12} sm={12}>
                    <Grid container direction="row" justify="space-between">
                        <Typography variant="subtitle2" color="initial" className={classes.labelsAddress}>Subtotal:</Typography>
                        <Typography variant="subtitle2" color="initial" className={classes.labelsAddress}>${addComa(info.carrito.total.toString())}</Typography>
                    </Grid>
                    <Grid container direction="row" justify="space-between">
                        <Typography variant="subtitle2" color="initial" className={classes.labelsAddress}>Gastos de envío:</Typography>
                        <Typography variant="subtitle2" color="initial" className={classes.labelsAddress}>${addComa("200")}</Typography>
                    </Grid>
                    <Grid container direction="row" justify="space-between">
                        <Typography variant="subtitle2" color="initial" className={classes.labelsAddress} >Total:</Typography>
                        <Typography variant="subtitle2" color="initial" className={classes.labelsAddress}>${addComa((info.carrito.total+200).toString())}</Typography>
                    </Grid>
                    <Grid container direction="row" justify="space-between">
                        <Typography variant="subtitle2" color="initial" className={classes.labelsAddress}>Estado: </Typography>
                        <Typography variant="subtitle2" color="initial" className={classes.labelsAddress}>{info.estado}</Typography>
                    </Grid>
                    <Grid container direction="row" justify="space-between">
                        <Typography variant="subtitle2" color="initial" className={classes.labelsAddress}>Servicio de entrega: </Typography>
                        <Typography variant="subtitle2" color="initial" className={classes.labelsAddress}>{info.companiaEnvio.descripcion}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CardInformationPay
