import React, { useEffect, useState } from 'react'
import { Grid} from '@material-ui/core';
import CardProducto from '../components/products/CardProducto';
import api from '../util/api';
import BeardcrumbComponent from '../components/products/BeardcrumbComponent';

const NewProducts = () => {    
    const [productos, setProductos] = useState([])
    const listar = () => {
        api.get("/producto/listarNuevos").then(response => {
            setProductos(response.data)
        })
    }

    useEffect(() => {        
        listar()
    },[])

    return (
        <>
            <BeardcrumbComponent loc={"Nuevos"}/>
            <Grid container direction="row" justify="space-evenly" >
                {productos.map((product, index) => (
                    <Grid key={index} item sm={3} xs={12} >
                        <CardProducto listar={listar} product={product} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default NewProducts
