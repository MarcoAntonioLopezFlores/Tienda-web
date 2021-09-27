import { Grid } from '@material-ui/core';
import React, { useState, useEffect }from 'react'
import LogsTableBody from '../../components/admin/LogsTableBody'
import SearchComponent from '../../components/SearchComponent';
import LogsStructureTable from '../../components/table/LogsStructureTable';
import api from '../../util/api';

const   LogsManagement = () => {

    const [rows, setRows] = useState([])

    const load=()=>{
        api.get("/bitacora/listar").then(response => {
            setRows(response.data)
        })
    }

    useEffect(() => {
        load()
    }, [])

    const headCells = [
        {
            id: "accion",
            numeric: false,
            disablePadding: true,
            label: "Acción"
        },
        {
            id: "fechaRegistro",
            numeric: false,
            disablePadding: false,
            label: "Fecha"
        },
        {
            id: "host",
            numeric: false,
            disablePadding: true,
            label: "Host"
        },
        {
            id: "tabla",
            numeric: false,
            disablePadding: true,
            label: "Tabla"
        },
        {
            id: "nombre",
            numeric: false,
            disablePadding: true,
            label: "Usuario"
        },
        {
            id: "antiguaInformacion",
            numeric: false,
            disablePadding: true,
            label: "Antigua informacíón"
        },
        {
            id: "nuevaInformacion",
            numeric: false,
            disablePadding: true,
            label: "Nueva información"
        },
        
    ]
    return (
        <React.Fragment>
            <Grid container direction="row" justify="space-between">
                <SearchComponent nameField="acción" atributte="accion" rows={rows} setRows={setRows} reload={load} nameElements={"registros"}/>
            </Grid>
            <LogsStructureTable 
                contentTable={LogsTableBody} 
                titleHead={"Bitacora"} 
                rows={rows} 
                headCells={headCells} />
        </React.Fragment>
    )
}

export default LogsManagement
