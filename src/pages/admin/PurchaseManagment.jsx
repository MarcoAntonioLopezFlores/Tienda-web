import { Grid } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import PurchaseTableBody from '../../components/admin/PurchaseTableBody'
import UserStructureTableComponent from '../../components/table/UserStructureTableComponent';
import api from '../../util/api';
import SearchComponent from '../../components/SearchComponent';

const PurchaseManagement = () => {
    const [rows, setRows] = useState([])

    const load =()=>{
        api.get("/compra/administrador/listar").then(response => {
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
            id: "correo",
            numeric: false,
            disablePadding: false,
            label: "Correo electrónico"
        },
        {
            id: "fechaPago",
            numeric: false,
            disablePadding: false,
            label: "Fecha"
        },
        {
            id: "servicio",
            numeric: false,
            disablePadding: true,
            label: "Servicio de entrega"
        },
        {
            id: "detalles",
            numeric: false,
            disablePadding: true,
            label: "Detalles"
        },{
            id: "estado",
            numeric: false,
            disablePadding: true,
            label: "Estado"
        }
    ]
    return (
        <React.Fragment>
            <Grid container direction="row" justify="space-between">
                <SearchComponent nameField="usuario" atributte="usuario" rows={rows} setRows={setRows} reload={load} nameElements={"pedidos"}/>
            </Grid>
            <UserStructureTableComponent 
                contentTable={PurchaseTableBody} 
                titleHead={"Pedidos"}
                load={load} 
                rows={rows} 
                headCells={headCells} />
        </React.Fragment>
    )
}

export default PurchaseManagement
