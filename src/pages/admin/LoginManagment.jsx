import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import LoginTableBody from '../../components/admin/LoginTableBody'
import SearchComponent from '../../components/SearchComponent';
import LogsStructureTable from '../../components/table/LogsStructureTable';
import api from '../../util/api';

const LogsManagement = () => {

    const [rows, setRows] = useState([])

    const load =()=>{
        api.get("/bitacora/sesion/listar").then(response => {
            setRows(response.data)
        })
    }

    useEffect(() => {
        load()
    }, [])


    const headCells = [
        {
            id: "usuario",
            numeric: false,
            disablePadding: true,
            label: "Usuario"
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


    ]
    return (
        <React.Fragment>
            <Grid container direction="row" justify="space-between">
                <SearchComponent nameField="usuario" atributte="usuario" secondAttrib="nombre" rows={rows} setRows={setRows} reload={load} nameElements={"registros"}/>
            </Grid>
            <LogsStructureTable
                contentTable={LoginTableBody}
                titleHead={"Bitacora de sesiones"}
                rows={rows}
                headCells={headCells} />
        </React.Fragment>
    )
}

export default LogsManagement
