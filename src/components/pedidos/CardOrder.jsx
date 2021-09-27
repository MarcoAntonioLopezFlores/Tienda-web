import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { addComa, dateFormat } from '../../util/functionsTable';

const useStyles = makeStyles({
  root: {
    width: "90%",
    margin: "5%"
  },
});

const CardOrder = ({ compra }) => {
  const classes = useStyles()
  return (
    <Card elevation={5} className={classes.root}>

      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
        Código de rastreo:  {compra.codigo}
        </Typography>
        <Typography gutterBottom variant="subtitle2" component="p">
          {dateFormat(compra.fechaPago)}
        </Typography>
        <Typography gutterBottom variant="subtitle2" component="p">
          Total: ${addComa((compra.carrito.total+ 200).toString())}
          </Typography>
        <Typography gutterBottom variant="subtitle2" component="p">
          {compra.estado}
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          to={
            {
              pathname: "/pedidos/detalle",
              state: { compra: compra }
            }
          } style={{ textDecoration: "none" }}>
          <Button style={{ fontWeight: "bold", }} variant="contained" size="small" color="primary">
            Ver más detalles
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default CardOrder
