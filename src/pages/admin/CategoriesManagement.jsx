import { Button, Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import CategorieTableBody from '../../components/admin/CategorieTableBody'
import StructureTable from '../../components/table/StructureTable';
import DialogComponent from '../../components/DialogComponent';
import CategorieForm from '../../components/forms/CategorieForm';
import api from '../../util/api';
import SearchComponent from '../../components/SearchComponent';

const CategoriesManagement = () => {

    const [openDialogoSesion, setDialogoSesion] = useState(false)
    const [rows, setRows] = useState([])
    const load =()=>{
        api.get("/categoria/listar").then(response => {
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
            disablePadding: true,
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
        <React.Fragment>
            <Grid container direction="row" justify="space-between">
                <SearchComponent nameField="nombre" atributte="nombre" rows={rows} setRows={setRows} reload={load} nameElements={"categorías"}/>
                    <Button
                        onClick={()=>setDialogoSesion(true)}
                        style={{ fontWeight: "bold", marginBottom:"1.5%"}} 
                        variant="contained" 
                        color="primary">
                            
                            Registrar categoría
                    </Button>
            </Grid>
            <StructureTable 
                contentTable={CategorieTableBody}
                load={load} 
                titleHead={"Categorías"} 
                rows={rows} 
                headCells={headCells} />
                {openDialogoSesion && <DialogComponent
                title={"Registro de categoría"}
                load={load}
                contentForm={CategorieForm}
                toogleDialogo={setDialogoSesion}
                open={openDialogoSesion}
            />}
        </React.Fragment>
    )
}

export default CategoriesManagement
