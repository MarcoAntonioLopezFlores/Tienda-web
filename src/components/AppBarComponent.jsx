import React, { useState, useEffect } from 'react';
import { Badge, Button, Divider, Grid, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MoreIcon from '@material-ui/icons/MoreVert';
import logo from '../assets/img/logo-tech.svg'
import DialogComponent from './DialogComponent';
import DrawerCarritoComponent from './carrito/DrawerCarritoComponent';
import { isLogin } from '../util/authentication';
import { useHistory } from "react-router-dom";
import LoginForm from './forms/LoginForm';
import DrawerMobile from './DrawerMobile';
import ListIcon from '@material-ui/icons/List';
import DrawerCategories from './DrawerCategories';
import api from '../util/api'
import NewReleasesIcon from '@material-ui/icons/NewReleases';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 3,
    },
    appBar: {
        backgroundColor: "#3F51B5"
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    divider: {
        backgroundColor: "white",
        margin: 15
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    imageLogo: {
        padding: 5,
        width: 50,
        [theme.breakpoints.up('sm')]: {
            width: 65,
        },
    },
    linkPay: {
        textDecoration: 'none',
        color: '#ffffff'
    },
}));

const AppBarComponent = (props) => {
    const history = useHistory()
    const classes = useStyles();
    const [openCategories, setOpenCategories] = React.useState(false);
    const [openMobile, setOpenMobile] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openCarrito, setOpenCarrito] = useState(false)
    const [openDialogoSesion, setDialogoSesion] = useState(false)
    const isMenuOpen = Boolean(anchorEl);
    const idCarrito = localStorage.getItem("carrito") !== null ? parseInt(localStorage.getItem("carrito")) : 0

    const [total, setTotal] = useState(0)

    const nuevos=()=>{
        history.push("/productos/nuevos")
    }

    const totalCarrito = () => {
        isLogin()?api.get("/carrito/total").then(response => {
            setTotal(response.data)
        }):setTotal(0)
    }

    useEffect(() => {
        if(isLogin() || idCarrito !== 0) totalCarrito()
    }, [idCarrito])
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => {
                history.push('/perfil');
                handleMenuClose()
            }}>Perfil</MenuItem>
            <MenuItem onClick={() => {
                history.push('/pedidos');
                handleMenuClose()
            }}>Mis pedidos</MenuItem>
            <MenuItem onClick={() => {
                localStorage.clear();
                handleMenuClose();
                history.push('/');
            }}>Cerrar Sesión</MenuItem>
        </Menu>
    );

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                    <Button onClick={() => {history.push("/"); localStorage.removeItem("subcategoria");}}>
                        <img height={60} className={classes.imageLogo} src={logo} alt="Logo empresa" />
                    </Button>
                    <IconButton aria-label="categories" aria-haspopup="true"onClick={() => setOpenCategories(true)} color="inherit">
                        <ListIcon fontSize="large" />
                    </IconButton>
                    <h4>Categorías</h4>
                    <IconButton aria-label="categories" aria-haspopup="true" color="inherit" onClick={nuevos}>
                        <NewReleasesIcon fontSize="large" />
                    </IconButton>
                    <h4>Lo más nuevo</h4>
                    <Grid
                        className={classes.sectionDesktop} container direction="row" justify="flex-end" alignItems="center">
                        {!isLogin() ?
                            <>
                                <IconButton aria-label="cart-products" aria-haspopup="true" onClick={() => setDialogoSesion(true)} color="inherit">
                                    <AccountCircleIcon fontSize="large" />
                                </IconButton>
                                <h4>Iniciar sesión</h4>
                            </> :
                            <>
                                <IconButton edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
                                    <AccountCircleIcon fontSize="large" />
                                </IconButton>
                                <h4>Mi cuenta</h4>
                                <Divider orientation="vertical" flexItem className={classes.divider} />
                                <IconButton aria-label="cart-products" aria-haspopup="true" color="inherit" onClick={() => setOpenCarrito(true)}>
                                    <Badge badgeContent={total} color="secondary">
                                        <ShoppingCartIcon fontSize="large" />
                                    </Badge>
                                </IconButton>
                                <h4>Mi carrito</h4></>}
                    </Grid>
                    <Grid className={classes.sectionMobile} container direction="row" justify="flex-end" alignItems="center">
                        <IconButton aria-label="show more" aria-haspopup="true" color="inherit"
                            onClick={() => setOpenMobile(!openMobile)}
                        >
                            <MoreIcon />
                        </IconButton>
                    </Grid>
                </Toolbar>
            </AppBar>
            {renderMenu}
            {openDialogoSesion && <DialogComponent
                title={"Iniciar sesión"}
                enableClick={false}
                contentForm={LoginForm}
                toogleDialogo={setDialogoSesion}
                open={openDialogoSesion}
            />}
            <DrawerCategories openCategories={openCategories} setOpenCategories={setOpenCategories} />
            <DrawerCarritoComponent
                toogleCarrito={setOpenCarrito}
                open={openCarrito}
            />
            <DrawerMobile setDialogoSesion={setDialogoSesion} openMobile={openMobile} setOpenMobile={setOpenMobile} />
            {props.children}
        </div>
    );
}

export default AppBarComponent;
