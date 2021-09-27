import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from "@material-ui/core/ListItemText";
import { Divider } from '@material-ui/core';
import api from '../util/api';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    list: {
        width: 250,
        height: "100vh",
        backgroundColor: "#3F51B5",
    },
    headerList: {
        color:"white",display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"
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
const DrawerCategories = ({ openCategories, setOpenCategories }) => {
    const classes = useStyles();
    const history = useHistory();
    const [subcategorias, setSubcategoria] = useState([])
    const toggleDrawer = (openCategories) => {
        setOpenCategories(openCategories)
    };

    const cambiar = (subcategoria) => {
        localStorage.setItem("subcategoria", JSON.stringify(subcategoria))
        history.push("/productos")
    }

    const listar = () => {
        api.get("/subcategoria/listarDisponibles").then(response => {
            setSubcategoria(response.data)
        })
    }

    useEffect(() => {
        listar()
    }, [])

    const list = () => (
        <div>
            <div className={classes.list}>
                <List>
                    <div className={classes.headerList}>
                        <h3>Categorías</h3>
                    </div>
                    <Divider />
                    {subcategorias.map((categoria, index) =>
                        <ListItem key={index} divider button className={classes.button} onClick={() => {toggleDrawer(false); cambiar(categoria)}}>
                            <ListItemText primary={categoria.nombre} />
                        </ListItem>
                    )}
                </List>
            </div>
        </div>
    );

    return (
        <div>
            <React.Fragment>
                <Drawer anchor={'left'} open={openCategories} onClose={() => toggleDrawer(false)}>
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}

export default DrawerCategories
