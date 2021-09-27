import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useHistory } from 'react-router';
import { isLogin } from '../../util/authentication';
import api from '../../util/api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { addComa } from '../../util/functionsTable';

const useStyles = makeStyles({
  root: {    
    maxWidth: "90%",
    margin: "5%",
    boxShadow: '0px 10px 10px #C4C4C4'
  },
  photo: {
    width: "100%",
    height: 200,
  },
  textEllipsis:{
    height:"24vh",
    WebkitBoxOrient:"vertical",
    WebkitLineClamp:6,
    display:"-webkit-box",
    overflow:"hidden"
  }
});


const CardProducto = ({ listar, product,marca,sub }) => {
  const history = useHistory()
  const classes = useStyles();
  const swal = withReactContent(Swal)

  const detailProduct = (producto) => {
    history.push({pathname:"/producto/detalles", state:{producto: producto}})
  }

  const agregarCarrito = producto => {
    api.get("/carrito/agregar/" + producto.id).then(response => {
      if(response.data === true){
        localStorage.setItem("carrito", localStorage.getItem("carrito") !== null ? parseInt(localStorage.getItem("carrito")) + 1 : 1)
        swal.fire(
          'Producto agregado con exito',
          '',
          'success'
        ).then(()=>{
          marca==null&&sub==null?listar():marca?listar(marca):listar(sub)            
          window.location.reload()
        }
        )
        
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
    <Card className={classes.root} >
      <CardActionArea onClick={()=>detailProduct(product)}>
        <CardMedia
          className={classes.photo}
          image={product.imagen}
          title={product.nombre}
        />
        <CardContent className={classes.textEllipsis} >
          <Typography gutterBottom variant="h6" color="primary">
          {product.nombre}
          </Typography>
          <Typography gutterBottom style={{fontWeight:"bold",color:"#469A49"}} variant="h6" component="p" color="error" align="inherit">
          ${addComa(product.precio.toString())}
          </Typography>
          {product.existencia<4&&<Typography gutterBottom style={{fontWeight:"bold"}} variant="h6" component="p" color="error" align="inherit">
          Pocas existencias
          </Typography>}
          <Typography style={{textOverflow:"ellipsis"}} gutterBottom variant="body2" component="p">
            {product.descripcion}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {isLogin() && <Button style={{ fontWeight:"bold" }} fullWidth size="small" variant="contained" color="primary" onClick={() => agregarCarrito(product)}>
           Agregar al carrito
        </Button>}
      </CardActions>
    </Card>
  );
}

export default CardProducto;