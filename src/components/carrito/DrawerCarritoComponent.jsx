import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CardCarritoComponent from './CardCarritoComponent';
import { Button, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { addComa } from '../../util/functionsTable';
import api from '../../util/api'
import { isLogin } from '../../util/authentication';

const useStyles = makeStyles({
  list: {
    width: 380,
    height: "86vh",
    overflowY: "scroll"
  },
  listButtons: {
    width: 380,
    height: "6vh",
  },
  fullList: {
    width: 'auto',
  },
  titleCarrito:{
    textAlign: "center"
  },
  containerTotalPay:{
    justifyContent: "space-between"
  },
  linkPay:{
    textDecoration: 'none',
    
  }

});

const DrawerCarritoComponent = ({ toogleCarrito, open }) => {
  const classes = useStyles();
  const [productos, setProducto] = useState([])
  const idCarrito = localStorage.getItem("carrito") !== null ? parseInt(localStorage.getItem("carrito")) : 0
  const toggleDrawer = (open) => {
    toogleCarrito(open)
  };

  const listar = () =>{
    
    api.get("/carrito/listar").then(response => {
      setProducto(response.data)
    })
  }

  useEffect(() => {
    if(isLogin() || idCarrito !== 0)listar()
  }, [idCarrito])

  const list = () => (
    <div>
      <div
        className={classes.list}
      >
        <List>
          <div className={classes.titleCarrito}>
            <h4>Carrito de compra</h4>
          </div>
          <Divider />
            {productos.length>0?productos.map((product,index)=>{
                return( 
                    <React.Fragment key={index}>
                    <ListItem >
                      <CardCarritoComponent product={product} listar={listar}/>
                    </ListItem>
                    <Divider />
                    </React.Fragment>              
                )
            }):<h4 align="center">No tienes aún productos en tu carrito</h4>}
            
        </List>
      </div>
      <div className={classes.listButtons}>
        <List>
          <ListItem className={classes.containerTotalPay} >
            <h3>Total: ${addComa(productos.length != 0 ? productos[0].carrito.total.toString(): "0")}</h3>
            <Link to={productos.length != 0 ?"/carrito":"/productos"} className={classes.linkPay}>
              <Button style={{fontWeight: "bold"}} variant="contained" color="primary">
              {productos.length != 0 ?"Continuar":"Ir a productos"}
            </Button>
            </Link>
          </ListItem>
        </List>
      </div>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer anchor={'right'} open={open} onClose={() => toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default DrawerCarritoComponent;