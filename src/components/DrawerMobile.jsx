import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import logo from "../assets/img/logo-tech.svg"
import { Button, Divider } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { isLogin } from '../util/authentication';
const useStyles = makeStyles({
  list: {
    width: 250,
    height: "100vh",
    backgroundColor: "#3F51B5",

  },
  headerList: {
    margin: 25, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"
  },
  button: {
    color: "#ffffff",

    '&:hover': {
      backgroundColor: "#3B5B7E 60%",
      color: "#ffffff",

    }
  },
  icon: {
    color: "white"
  }
});

const DrawerMobile = ({ openMobile, setOpenMobile, setDialogoSesion }) => {
  const classes = useStyles();
  const history = useHistory()
  const toggleDrawer = (openMobile) => {
    setOpenMobile(openMobile)
  };

  const list = () => (
    <div>
      <div
        className={classes.list}
      >
        <List>
          <div className={classes.headerList}>
            <img src={logo} width="150" alt="logo" />
          </div>
          <Divider />
          {!isLogin() ? 
          <ListItem button className={classes.button} onClick={() => { setDialogoSesion(true); toggleDrawer(false) }} >
            <ListItemIcon>
              <AccountCircleIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Iniciar sesión" />
          </ListItem> : 
          <>
          <ListItem button className={classes.button} onClick={() => toggleDrawer(false)} component={Link} to="/perfil" >
            <ListItemIcon>
              <AccountCircleIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Mi perfil" />
          </ListItem>
            <Divider />
            <ListItem button className={classes.button} onClick={() => toggleDrawer(false)} component={Link} to="/pedidos" >
            <ListItemIcon>
              <LocalShippingIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Mis pedidos" />
          </ListItem>
            <Divider />
            <ListItem button className={classes.button} onClick={() => toggleDrawer(false)} component={Link} to="/carrito" >
              <ListItemIcon>
                <ShoppingCartIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Carrito" />
            </ListItem>
            <Divider />
            <ListItem className={classes.button} component={Button} onClick={() => {
              localStorage.clear()
              history.push('/')
            }}>
              <ListItemIcon className={classes.icon} ><ArrowBackIcon /></ListItemIcon>
              <ListItemText primary="Cerrar Sesión" />
            </ListItem></>}
        </List>
      </div>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer anchor={'left'} open={openMobile} onClose={() => toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
export default DrawerMobile
