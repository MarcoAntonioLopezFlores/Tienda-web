import { Button, Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import StructureTable from '../../components/table/StructureTable';
import ProductTableBody from '../../components/admin/ProductTableBody';
import api from '../../util/api';
import DialogComponent from '../../components/DialogComponent';
import ProductForm from '../../components/forms/ProductForm';
import SearchComponent from '../../components/SearchComponent';

const ProductsManagement = () => {
    const [openDialogoSesion, setDialogoSesion] = useState(false)
    const [rows, setRows] = useState([])

    const load = ()=>{
        api.get("/producto/listar").then(response => {
            setRows(response.data)
        })
    }

    useEffect(() => {
        load()
    }, [])

    const headCells = [
        {
            id: "nombre",
            numeric: false,
            disablePadding: true,
            label: "Nombre"
        },
        {
            id: "modelo",
            numeric: false,
            disablePadding: false,
            label: "Modelo"
        },
        {
            id: "precio",
            numeric: true,
            disablePadding: false,
            label: "Precio"
        },
        {
            id: "existencia",
            numeric: true,
            disablePadding: false,
            label: "Existencia"
        },
        {
            id: "color",
            numeric: false,
            disablePadding: false,
            label: "Color"
        },
        {
            id: "estado",
            numeric: true,
            disablePadding: false,
            label: "Estado"
        },
        {
            id: "imagen",
            numeric: false,
            disablePadding: false,
            label: "Imagen"
        }
    ]
    return (
        <>
            <Grid container direction="row" justify="space-between">
                <SearchComponent nameField="nombre" atributte="nombre" rows={rows} setRows={setRows} reload={load} nameElements={"productos"}/>
                <Button
                    onClick={()=>setDialogoSesion(true)}
                    style={{ fontWeight: "bold", marginBottom: "1.5%" }}
                    variant="contained"
                    color="primary">    
                        Registrar Producto
                </Button>
            </Grid>
            <StructureTable
                contentTable={ProductTableBody}
                load={load}
                titleHead={"Productos"}
                rows={rows}
                headCells={headCells} />
            {openDialogoSesion && <DialogComponent
                title={"Registro de producto"}
                load={load}
                contentForm={ProductForm}
                toogleDialogo={setDialogoSesion} 
                open={openDialogoSesion}
            />}
        </>
    )
}

export default ProductsManagement
