import { Button, Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import StructureTable from '../../components/table/StructureTable';
import CompanieTableBody from '../../components/admin/CompanieTableBody'
import CompanieForm from '../../components/forms/CompanieForm';
import DialogComponent from '../../components/DialogComponent';
import api from '../../util/api';
import SearchComponent from '../../components/SearchComponent';

const CompaniesManagement = () => {
    const [openDialogoSesion, setDialogoSesion] = useState(false)
    const [rows, setRows] = useState([])

    const load = ()=>{
        api.get("/compania/listar").then(response => {
            setRows(response.data)
        })
    }

    useEffect(() => {
        load()
    }, [])

    const headCells = [
        {
            id: "descripcion",
            numeric: false,
            disablePadding: true,
            label: "Nombre"
        },
        {
            id: "rfc",
            numeric: false,
            disablePadding: false,
            label: "RFC"
        },
        {
            id: "estado",
            numeric: true,
            disablePadding: false,
            label: "Estado"
        },
        {
            id: "direcciones",
            numeric: false,
            disablePadding: false,
            label: "Direcciones"
        }
    ]
    return (
        <>
       <Grid container direction="row" justify="space-between">
                <SearchComponent nameField="nombre" atributte="descripcion" rows={rows} setRows={setRows} reload={load} nameElements={"compañías"}/>
                <Button 
                    onClick={()=>setDialogoSesion(true)}
                    style={{ fontWeight: "bold", marginBottom:"1.5%"}} 
                    variant="contained" 
                    color="primary">       
                        Registrar Compañía
                </Button>
        </Grid>
        <StructureTable 
            contentTable={CompanieTableBody} 
            load={load}
            titleHead={"Compañías"} 
            rows={rows} 
            headCells={headCells} />

        {openDialogoSesion && <DialogComponent
            title={"Registro de compañía"}
            contentForm={CompanieForm}
            load={load}
            toogleDialogo={setDialogoSesion} 
            open={openDialogoSesion}
        />}
    </>
    )
}

export default CompaniesManagement
