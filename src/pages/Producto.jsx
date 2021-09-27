import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CardProducto from '../components/products/CardProducto'
import SearchComponent from '../components/SearchComponent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterListIcon from '@material-ui/icons/FilterList';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import api from '../../src/util/api';
import { useLocation } from 'react-router';
import Pagination from '@material-ui/lab/Pagination';
import BeardcrumbComponent from '../components/products/BeardcrumbComponent';

const useStyles = makeStyles(() => ({
    labels: {
        color: '#8A8686',
        fontSize: 22
    }
}));


const Producto = () => {
    const [anchorElCat, setAnchorElCat] = React.useState(null);
    const [anchorElMark, setAnchorElMark] = React.useState(null);
    const [anchorElFilter, setAnchorElFilter] = React.useState(null);
    const openCat = Boolean(anchorElCat);
    const openMark = Boolean(anchorElMark);
    const openFilter = Boolean(anchorElFilter);
    const location = useLocation()
    const [currentPage, setCurrentPage] = React.useState(1);
    const [elementsPerPage] = React.useState(8);
    const subcategoriaLocal = JSON.parse(localStorage.getItem("subcategoria"))
    const idSub = subcategoriaLocal !== null ? subcategoriaLocal.id : 0

    const changePage = (event, newPage) => {
        setCurrentPage(newPage);
        window.scrollTo(0, 0);
    };
    const [productos, setProductos] = useState([])
    const [marcas, setMarcas] = useState([])
    const [categorias, setCategorias] = useState([])
    const [marca, setMarca] = useState(null)
    const [categoria, setCategoria] = useState(null)

    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;

    const listarMarca = () => {
        api.get("/marca/listarDisponibles").then(response => {
            setMarcas(response.data)
        })
    }

    const listarSubcategorias = () => {
        api.get("/subcategoria/listarDisponibles").then(response => {
            setCategorias(response.data)
        })
    }

    const listarProductos = () => {
        api.get("/producto/listarDisponibles").then(response => {
            setProductos(response.data)
        })
    }

    const listarProductosSubcategoria = (id) => {
        api.get("/producto/subcategoria/" + id).then(response => {
            setProductos(response.data)
        })
    }

    const listarProductosMarca = (marca) => {
        api.get("/producto/marca/" + marca.id).then(response => {
            setProductos(response.data)
        })
    }

    const listarProductosPrecioAlto = () => {
        api.get("/producto/listarPrecioDesc").then(response => {
            setProductos(response.data)
        })
    }

    const listarProductosPrecioBajo = () => {
        api.get("/producto/listarPrecioAsc").then(response => {
            setProductos(response.data)
        })
    }

    useEffect(() => {
        listarMarca()
        listarSubcategorias()
    }, [])

    useEffect(() => {
        if(idSub === 0){
            listarProductos()
            setMarca(null)
            setCategoria(null)
        } else {
            setCategoria(subcategoriaLocal.categoria.nombre + " / " + subcategoriaLocal.nombre)
            listarProductosSubcategoria(idSub)
        }
    }, [idSub])

    const elementsShowed = productos.slice(
        indexOfFirstElement,
        indexOfLastElement
    );

    const handleClickCat = (event) => {
        setAnchorElCat(event.currentTarget);
    };

    const handleCloseCat = () => {
        setAnchorElCat(null);
    };

    const handleClickMark = (event) => {
        setAnchorElMark(event.currentTarget);
    };

    const handleCloseMark = () => {
        setAnchorElMark(null);
    };

    const handleClickFilter = (event) => {
        setAnchorElFilter(event.currentTarget);
    };

    const handleCloseFilter = () => {
        setAnchorElFilter(null);
    };

    const classes = useStyles();
    return (
        <div >

            <Grid container direction="row" justify="center">
                <Grid style={{ marginTop: 20 }} justify="center" container direction="row" justify="space-evenly" alignItems="center">
                    <Grid item xs={11} sm={11} md={5}>
                        <SearchComponent nameField="nombre" atributte="nombre" rows={productos} setRows={setProductos} reload={location.state === undefined ? listarProductos : listarProductosSubcategoria} nameElements={"productos"} />
                    </Grid>
                    <Grid style={{ marginTop: 20 }} justify="center" container direction="row" justify="center" alignItems="center" item xs={4} sm={4} md={2}>
                        <Typography variant="inherit" color="initial" className={classes.labels}>Categoría</Typography>
                        <Button aria-controls="categories" aria-haspopup="true" onClick={handleClickCat}>
                            <ExpandMoreIcon color="action" />
                        </Button>
                        <Menu
                            id="categories"
                            anchorEl={anchorElCat}
                            keepMounted
                            open={openCat}
                            onClose={handleCloseCat}
                            TransitionComponent={Fade}
                            PaperProps={{
                                style: {
                                  maxHeight: 48 * 4.5,
                                  width: '20ch',
                                },
                            }}
                        >
                            {categorias.map((categoria, index) => (
                                <MenuItem onClick={() => {handleCloseCat(); listarProductosSubcategoria(categoria.id); localStorage.setItem("subcategoria", JSON.stringify(categoria)); setCategoria(categoria.categoria.nombre + " / " + categoria.nombre); setMarca(null)}} key={index}>{categoria.nombre}</MenuItem>
                            ))}
                        </Menu>
                    </Grid>
                    <Grid style={{ marginTop: 20 }} justify="center" container direction="row" justify="center" alignItems="center" item xs={4} sm={4} md={2}>
                        <Typography variant="inherit" color="initial" className={classes.labels}>Marcas</Typography>
                        <Button aria-controls="marks" aria-haspopup="true" onClick={handleClickMark}>
                            <ExpandMoreIcon color="action" />
                        </Button>
                        <Menu
                            id="marks"
                            anchorEl={anchorElMark}
                            keepMounted
                            open={openMark}
                            onClose={handleCloseMark}
                            TransitionComponent={Fade}
                            PaperProps={{
                                style: {
                                  maxHeight: 48 * 4.5,
                                  width: '20ch',
                                },
                            }}
                        >
                            {marcas.map((marca, index) => (
                                <MenuItem onClick={() => {handleCloseCat(); listarProductosMarca(marca); setMarca(marca.nombre); setCategoria(null)}} key={index}>{marca.nombre}</MenuItem>
                            ))}
                        </Menu>
                    </Grid>
                    <Grid style={{ marginTop: 20 }} justify="center" container direction="row" justify="center" alignItems="center" item xs={3} sm={3} md={2}>
                        <Typography variant="inherit" color="initial" className={classes.labels}>Filtrar</Typography>
                        <Button aria-controls="filters" aria-haspopup="true" onClick={handleClickFilter}>
                            <FilterListIcon color="action" />
                        </Button>
                        <Menu
                            id="filters"
                            anchorEl={anchorElFilter}
                            keepMounted
                            open={openFilter}
                            onClose={handleCloseFilter}
                            TransitionComponent={Fade}
                        >
                            <MenuItem onClick={() => {handleCloseFilter(); listarProductosPrecioBajo();setMarca(null);setCategoria(null);localStorage.removeItem("subcategoria");}}>Menor precio</MenuItem>
                            <MenuItem onClick={() => {handleCloseFilter(); listarProductosPrecioAlto();setMarca(null);setCategoria(null);localStorage.removeItem("subcategoria");}}>Mayor precio</MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Grid>
            <BeardcrumbComponent loc = {(categoria !== null ? categoria : marca !== null ? marca : "")}/>
            <Grid container direction="row" justify="space-evenly" >
                {productos.length>0?elementsShowed.map((product, index) => (
                    <Grid key={index} item sm={3} xs={12} >
                        <CardProducto listar={marca==null&&categoria==null?listarProductos:marca?listarProductosMarca:listarProductosSubcategoria} marca={marca} sub={categoria} product={product} />
                    </Grid>
                )):<h4>No hay productos, lo sentimos</h4>}
            </Grid>
            <Grid container direction="row" justify="center">
                <Pagination
                    count={productos.length / elementsPerPage}
                    page={currentPage}
                    onChange={changePage}
                    variant="outlined"
                    color="primary"
                    size="large"
                />
            </Grid>
        </div>
    )
}
export default Producto;

