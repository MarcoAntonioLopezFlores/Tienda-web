import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';
import { isLogin } from '../../util/authentication';
import { addComa } from '../../util/functionsTable';
import api from '../../util/api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const useStyles = makeStyles({
  root: {
    width: 295,
    height:310,
    margin: "5%"
  },
  media: {
    width: "100%",
    height: 150,
  },
});

const CardProductComponent = ({ product }) => {
  const history = useHistory()
  const classes = useStyles();
  const swal = withReactContent(Swal)
  const detailProduct = (producto) => {
    history.push({pathname:"/producto/detalles", state:{producto: producto}})
  }

  const agregarCarrito = producto => {
    api.get("/carrito/agregar/" + producto.id).then(response => {
      if(response.data === true){
        swal.fire(
          'Producto agregado con exito',
          '',
          'success'
        ).then(()=>window.location.reload())
        
      }else{
        swal.fire(
          'Error al agregar el producto',
          '',
          'error'
        )
      }
    })
  }


  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => detailProduct(product)}>
        <CardMedia
          className={classes.media}
          image={product.imagen}
          title={product.nombre}
        />
        <CardContent>
          <Typography style={{whiteSpace:"nowrap",textOverflow:"ellipsis", overflow:"hidden"}} gutterBottom variant="h5" component="h2">
            {product.nombre}
          </Typography>
          <Typography gutterBottom variant="h6" style={{fontWeight:"bold",color:"#469A49"}} component="p">
            ${addComa(product.precio.toString())}
          </Typography>
          {product.existencia<4&&<Typography gutterBottom style={{fontWeight:"bold"}} variant="h6" component="p" color="error" align="inherit">
          Pocas existencias
          </Typography>}
        </CardContent>
      </CardActionArea>
      <CardActions>
        {isLogin() && <Button style={{ fontWeight:"bold" }} fullWidth variant="contained" size="small" color="primary" onClick={() => agregarCarrito(product)}>
           Agregar al carrito
        </Button>}
      </CardActions>
    </Card>
  );
}

export default CardProductComponent;
