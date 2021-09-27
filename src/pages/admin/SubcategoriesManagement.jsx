import { Button, Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import StructureTable from '../../components/table/StructureTable';
import SubcategorieTableBody from '../../components/admin/SubcategorieTableBody'
import DialogComponent from '../../components/DialogComponent';
import SubcategorieForm from '../../components/forms/SubcategorieForm';
import api from '../../util/api';
import SearchComponent from '../../components/SearchComponent';

const SubcategoriesManagement = () => {
    
    const [openDialogoSesion, setDialogoSesion] = useState(false)
    const [rows, setRows] = useState([])

    const load =()=>{
        api.get("/subcategoria/listar").then(response => {
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
            id: "categoria",
            numeric: true,
            disablePadding: false,
            label: "Categoría"
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
        <React.Fragment>
            <Grid container direction="row" justify="space-between">
                <SearchComponent nameField="nombre" atributte="nombre" rows={rows} setRows={setRows} reload={load} nameElements={"subcategorías"}/>
                <Button
                    onClick={() => setDialogoSesion(true)}
                    style={{ fontWeight: "bold", marginBottom: "1.5%" }}
                    variant="contained"
                    color="primary">                    
                            Registrar Subcategoría
                    </Button>
            </Grid>
            <StructureTable
                contentTable={SubcategorieTableBody}
                load={load}
                titleHead={"Subcategorías"}
                rows={rows}
                headCells={headCells} />
            {openDialogoSesion && <DialogComponent
                title={"Registro de subcategoría"}
                load={load}
                contentForm={SubcategorieForm}
                toogleDialogo={setDialogoSesion}
                open={openDialogoSesion}
            />}
        </React.Fragment>
    )
}

export default SubcategoriesManagement
