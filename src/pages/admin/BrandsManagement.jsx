import { Button, Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import BrandTableBody from '../../components/admin/BrandTableBody';
import StructureTable from '../../components/table/StructureTable';
import DialogComponent from '../../components/DialogComponent';
import BrandForm from '../../components/forms/BrandForm';
import api from '../../util/api';
import SearchComponent from '../../components/SearchComponent';

const BrandsManagement = () => {
    const [openDialogoSesion, setDialogoSesion] = useState(false)
    const [rows, setRows] = useState([])

    const load =()=>{
        api.get("/marca/listar").then(response => {
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
            id: "descripcion",
            numeric: false,
            disablePadding: false,
            label: "Descripción"
        },
        {
            id: "estado",
            numeric: true,
            disablePadding: false,
            label: "Estado"
        }
    ]

    return (
        <>
            <Grid container direction="row" justify="space-between">
                <SearchComponent nameField="nombre" atributte="nombre" rows={rows} setRows={setRows} reload={load} nameElements={"marcas"}/>
                    <Button onClick={()=>setDialogoSesion(true)} style={{ fontWeight: "bold", marginBottom:"1.5%"}} variant="contained" color="primary"> Registrar marca</Button>
            </Grid>
            <StructureTable load={load} contentTable={BrandTableBody} titleHead={"Marcas"} rows={rows} headCells={headCells} />
            {openDialogoSesion && <DialogComponent
                title={"Registro de marca"}
                contentForm={BrandForm}
                load={load}
                toogleDialogo={setDialogoSesion}
                open={openDialogoSesion}
            />}
        </>
    )
}

export default BrandsManagement
