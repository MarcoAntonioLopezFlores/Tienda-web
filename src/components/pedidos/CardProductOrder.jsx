import { makeStyles } from '@material-ui/core/styles';
import React from 'react'
import styled from 'styled-components/macro';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';
import { addComa } from '../../util/functionsTable';

const useStyles = makeStyles(() => ({
    labels: {
        color: '#8A8686'
    },
    txtGrey: {
        color: '#575656'
    },
    txtBold: {
        fontWeight: "bold",

    }
}));

const ImageContent = styled.img`
    width:100%;
    height:100%;
`

const CardProductOrder = ({ product }) => {
    const classes = useStyles();
    return (
        <Grid container direction="row" alignItems="flex-start">            
                <Grid item sm={2}>
                    <ImageContent
                        src={product.producto.imagen}
                        alt={product.producto.nombre} />
                </Grid>
                <Grid container direction="row" item sm={10}>
                    <Grid container justify="center" item sm={12} xs={12}>
                        <Typography variant="h6" className={classes.txtGrey} color="initial" >{product.producto.nombre}</Typography>
                    </Grid>
                    <Grid item sm={4} xs={4}>
                        <Grid container direction="column" alignItems="center"  >
                            <Typography style={{ marginTop: 15, fontSize: 18 }} className={classes.txtGrey} variant="inherit" color="initial" >Cantidad</Typography>
                            <Typography style={{ marginTop: 15, fontSize: 18 }} className={classes.txtBold} variant="inherit" color="initial" >{product.cantidad}</Typography>
                        </Grid>
                    </Grid>
                    <Grid  item sm={4} xs={4}>
                        <Grid container direction="column" alignItems="center" >
                            <Typography style={{ marginTop: 15, fontSize: 18 }} className={classes.txtGrey} variant="inherit" color="initial" >Precio</Typography>
                            <Typography style={{ marginTop: 15, fontSize: 18 }} className={classes.txtBold} variant="inherit" color="initial" >${addComa(product.producto.precio.toString())}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} xs={4}>                    
                    <Grid container direction="column" alignItems="center" >
                        <Typography style={{ marginTop: 15, fontSize: 18 }} className={classes.txtGrey} variant="inherit" color="initial" >Total</Typography>
                        <Typography style={{ marginTop: 15, fontSize: 18 }} className={classes.txtBold} variant="inherit" color="initial" >${addComa((product.cantidad * product.producto.precio).toString())}</Typography>
                    </Grid>
                    </Grid>
                </Grid>
        </Grid>
    )
}

export default CardProductOrder