import React, { useState, useEffect } from 'react'
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import { getComparator, stableSort } from '../../util/functionsTable';
import Tooltip from '@material-ui/core/Tooltip';
import api from '../../util/api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
const UserTableBody = (props) => {

    const swal = withReactContent(Swal)
    const {load, rows, order, orderBy, page, rowsPerPage } = props
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
        const inhabilitar = objeto => {
            swal.fire({
                title: objeto.enabled?'¿Desea inhabilitar el usuario?':'¿Desea habilitar el usuario?',
                text: '',
                icon: 'warning',
                showCancelButton: true, 
                cancelButtonText: 'No, cancelar',
                confirmButtonText: 'Sí, aceptar'
            }).then(result => {
                objeto.enabled = !objeto.enabled;
                if(result.isConfirmed){
                        api.put('/usuario/actualizar', objeto).then(response =>{
                            if(response){
                                swal.fire(
                                    'Estado del usuario modificado con éxito',
                                    '',
                                    'success'
                                )
                                load()
                            }else{
                                swal.fire(
                                    'Error al modificar el estado del usuario',
                                    '',
                                    'error'
                                )
                            }
                        })
                }
            })
    }
    
    
    return (
        <>
        <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                    return (
                        <TableRow hover tabIndex={-1} key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.nombre} {row.apellidos}</TableCell>
                            <TableCell>{row.correo}</TableCell>
                            <TableCell style={{fontWeight:"bold",color:row.enabled?"#3F51B5":"#F50057"}}>
                                {row.enabled? "ACTIVO" : "INACTIVO"}
                            </TableCell>
                            <TableCell>
                                <Tooltip title={row.enabled?"Inhabilitar":"Habilitar"}>
                                <Button color={row.enabled?"secondary":"primary"}
                                 onClick={()=>inhabilitar(row)}
                                 >
                                    {row.enabled?<DeleteIcon />:
                                        <RestoreFromTrashIcon/>}
                                </Button>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    );
                })}
            {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={rows.length} />
                </TableRow>
            )}
        </TableBody>
        </>
    )
}

export default UserTableBody
