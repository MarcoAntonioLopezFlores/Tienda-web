import React from 'react'
import logo from '../../assets/img/logo-tech.svg'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CategoryIcon from '@material-ui/icons/Category';
import AssignmentIcon from '@material-ui/icons/Assignment'; 
import { Link } from 'react-router-dom';
import TableChartIcon from '@material-ui/icons/TableChart';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import ApartmentIcon from '@material-ui/icons/Apartment';
import GroupIcon from '@material-ui/icons/Group';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import BookIcon from '@material-ui/icons/Book';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import VpnKeyIcon from '@material-ui/icons/VpnKey'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    linkSelected: {
        backgroundColor: "#093f63"
    },
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "#3F51B5",
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "#3F51B5",
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    nested: {
        paddingLeft: theme.spacing(4),
        color: "#FFFFFF"
    },
    imageLogo: {
        padding:5,
        width:50,
        [theme.breakpoints.up('sm')]: {
            width: 65,
        },
    }
}));

const Nav = (props) => {
    const history = useHistory()
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false)
    const [location, setLocation] = React.useState(history.location.pathname)
    const onSelectItem = (n) => {
        setLocation(n)

    }
    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }
    
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img className={classes.imageLogo} src={logo} alt="Logo from the enterprise" />
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon style={{ color: "white" }} /> : <ChevronRightIcon style={{ color: "white" }} />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem className={clsx("link", location === "/admin/productos" && classes.linkSelected)} component={Link} to={"/admin/productos"} onClick={() => { onSelectItem("/admin/productos") }} >
                        <ListItemIcon style={{ color: "white" }} ><TableChartIcon /></ListItemIcon>
                        <ListItemText primary={"Productos"} />
                    </ListItem>
                    <ListItem className={clsx("link", location === "/admin/companias" && classes.linkSelected)} component={Link} to={"/admin/companias"} onClick={() => onSelectItem("/admin/companias")}>
                        <ListItemIcon style={{ color: "white" }} ><LocalShippingIcon /></ListItemIcon>
                        <ListItemText primary={"Compañías"} />
                    </ListItem>
                    <ListItem className={clsx("link", location === "/admin/marcas" && classes.linkSelected)} component={Link} to={"/admin/marcas"} onClick={() => onSelectItem("/admin/marcas")}>
                        <ListItemIcon style={{ color: "white" }}><ApartmentIcon /></ListItemIcon>
                        <ListItemText primary={"Marcas"} />
                    </ListItem>
                    <ListItem className={clsx("link", location === "/admin/categorias" && classes.linkSelected)} component={Link} to={"/admin/categorias"} onClick={() => onSelectItem("/admin/categorias")}>
                        <ListItemIcon style={{ color: "white" }}><CategoryIcon /></ListItemIcon>
                        <ListItemText primary={"Categorías"} />
                    </ListItem>
                    <ListItem className={clsx("link", location === "/admin/subcategorias" && classes.linkSelected)} component={Link} to={"/admin/subcategorias"} onClick={() => onSelectItem("/admin/subcategorias")}>
                        <ListItemIcon style={{ color: "white" }}><AssignmentIcon /></ListItemIcon>
                        <ListItemText primary={"Subcategorías"} />
                    </ListItem>

                    <ListItem className={clsx("link", location === "/admin/usuarios" && classes.linkSelected)} component={Link} to={"/admin/usuarios"} onClick={() => onSelectItem("/admin/usuarios")}>
                        <ListItemIcon style={{ color: "white" }}><GroupIcon /></ListItemIcon>
                        <ListItemText primary={"Usuarios"} />
                    </ListItem>

                    <ListItem className={clsx("link", location === "/admin/pedidos" && classes.linkSelected)} component={Link} to={"/admin/pedidos"} onClick={() => onSelectItem("/admin/pedidos")}>
                        <ListItemIcon style={{ color: "white" }}><ShoppingCartIcon /></ListItemIcon>
                        <ListItemText primary={"Pedidos"} />
                    </ListItem>

                    <ListItem className={clsx("link", location === "/admin/bitacora" && classes.linkSelected)} component={Link} to={"/admin/bitacora"} onClick={() => onSelectItem("/admin/bitacora")}>
                        <ListItemIcon style={{ color: "white" }}><BookIcon /></ListItemIcon>
                        <ListItemText primary={"Bitácora"} />
                    </ListItem>

                    <ListItem className={clsx("link", location === "/admin/bitacora-sesiones" && classes.linkSelected)} component={Link} to={"/admin/bitacora-sesiones"} onClick={() => onSelectItem("/admin/bitacora-sesiones")}>
                        <ListItemIcon style={{ color: "white" }}><AccountBoxIcon /></ListItemIcon>
                        <ListItemText primary={"Bitácora Sesiones"} />
                    </ListItem>

                    <ListItem className={clsx("link", location === "/admin/contrase"  && classes.linkSelected)} component={Link} to={"/admin/contraseña"} onClick={() => onSelectItem("/admin/contraseña")}>
                        <ListItemIcon style={{ color: "white" }}><VpnKeyIcon /></ListItemIcon>
                        <ListItemText primary={"Modificar contraseña"} />
                    </ListItem>     

                    <ListItem className={"link"} style={{ color: "white" }} component={Button} onClick={()=>{localStorage.clear()
                                    history.push('/')}}>
                        <ListItemIcon style={{ color: "white" }} ><ArrowBackIcon /></ListItemIcon>
                        <ListItemText primary="Cerrar sesión"/>
                    </ListItem>
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {props.children}
            </main>
        </div>
    );
}

export default Nav;
