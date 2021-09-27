import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import UserTableBody from '../../components/admin/UserTableBody'
import SearchComponent from '../../components/SearchComponent';
import UserStructureTableComponent from '../../components/table/UserStructureTableComponent';
import api from '../../util/api';

const UserManagement = () => {

    const [rows, setRows] = useState([])

    const load =()=>{
        api.get("/usuario/listar").then(response => {
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
            id: "correo",
            numeric: true,
            disablePadding: false,
            label: "Correo electrónico"
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
                <SearchComponent nameField="nombre" atributte="nombre" rows={rows} setRows={setRows} reload={load} nameElements={"usuarios"}/>
        </Grid>
            <UserStructureTableComponent 
                contentTable={UserTableBody} 
                load={load}
                titleHead={"Usuarios"} 
                rows={rows} 
                headCells={headCells} />                
        </>
    )
}

export default UserManagement
