import React, { useState } from 'react'
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";
import { getComparator, stableSort } from '../../util/functionsTable';
import DialogComponent from '../DialogComponent';
import CategorieForm from '../forms/CategorieForm';
import api from '../../util/api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Tooltip from '@material-ui/core/Tooltip';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
const CategorieTableBody = (props) => {

    const swal = withReactContent(Swal)
    const [object, setObject] = useState(null)
    const [openDialogoSesion, setDialogoSesion] = useState(false)
    
    const {load, rows, order, orderBy, page, rowsPerPage } = props
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const eliminar = categoria => {
        swal.fire({
            title: categoria.estado?'¿Desea inhabilitar la categoría?':'¿Desea habilitar la categoría?',
            text: '',
            icon: 'warning',
            showCancelButton: true, 
            cancelButtonText: 'No, cancelar',
            confirmButtonText: 'Sí, aceptar'
        }).then(result => {
            if(result.isConfirmed){
                const auxEstado=categoria.estado
                categoria.estado=!categoria.estado
                auxEstado?api.delete('/categoria/eliminar/' + categoria.id).then(response =>{
                    if(response.data === true){
                        swal.fire(
                            'Categoría eliminada con éxito',
                            '',
                            'success'
                        )
                        load()
                    }else{
                        swal.fire(
                            'Error al eliminar la categoría',
                            '',
                            'error'
                        )
                    }
                }):api.delete("/categoria/eliminar/" + categoria.id).then(response => {
                    if(response.data === true){
                        swal.fire(
                            'Categoría actualizada con éxito',
                            '',
                            'success'
                        )
                        load()
                    }else{
                        swal.fire(
                            'Error al actualizar la categoría',
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
                        <TableRow hover tabIndex={-1} key={row.nombre}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.nombre}</TableCell>
                            <TableCell>{row.descripcion}</TableCell>
                            <TableCell style={{fontWeight:"bold",color:row.estado?"#3F51B5":"#F50057"}}>
                                {row.estado? "ACTIVO" : "INACTIVO"}
                            </TableCell>
                            <TableCell>
                                <Tooltip title="Actualizar">
                                <span>
                                <Button color="primary" onClick={()=>{ setObject(row); setDialogoSesion(true)}} disabled={!row.estado}>
                                    <EditIcon />
                                </Button>
                                </span>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                            <Tooltip title={row.estado?"Inhabilitar":"Habilitar"}>
                                <Button color={row.estado?"secondary":"primary"}
                                 onClick={()=>eliminar(row)}
                                 >
                                    {row.estado?<DeleteIcon />:
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
        {openDialogoSesion && <DialogComponent
            title={"Actualizar categoría"}
            load={load}
            object={object}
            contentForm={CategorieForm}
            toogleDialogo={setDialogoSesion} 
            open={openDialogoSesion}
        />}
        </>
    )
}

export default CategorieTableBody
