import React, { useState } from 'react'
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";
import { getComparator, stableSort } from '../../util/functionsTable';
import DialogComponent from '../DialogComponent';
import BrandForm from '../forms/BrandForm';
import api from '../../util/api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Tooltip from '@material-ui/core/Tooltip';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
const BrandTableBody = (props) => {

    const swal = withReactContent(Swal)
    const [object, setObject] = useState(null)
    const [openDialogoSesion, setDialogoSesion] = useState(false)
    
    const {load,rows, order, orderBy,page,rowsPerPage} = props
    const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const eliminar = marca => {
        swal.fire({
            title: marca.estado?'¿Desea inhabilitar la marca?':'¿Desea habilitar la marca?',
            text: '',
            icon: 'warning',
            showCancelButton: true, 
            cancelButtonText: 'No, cancelar',
            confirmButtonText: 'Sí, aceptar'
        }).then(result => {
            if(result.isConfirmed){
                const auxEstado=marca.estado
                marca.estado=!marca.estado
                auxEstado?api.delete('/marca/eliminar/' + marca.id).then(response =>{
                    if(response.data === true){
                        swal.fire(
                            'Marca eliminada con éxito',
                            '',
                            'success'
                        )
                        load()
                    }else{
                        swal.fire(
                            'Error al eliminar la marca',
                            '',
                            'error'
                        )
                    }
                }):api.delete("/marca/eliminar/" + marca.id).then(response => {
                    if(response.data === true){
                        swal.fire(
                            'Marca actualizada con éxito',
                            '',
                            'success'
                        )
                        load()
                    }else{
                        swal.fire(
                            'Error al actualizar la marca',
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
                            <TableCell style={{fontWeight:"bold",color:row.estado==1?"#3F51B5":"#F50057"}}>
                                {row.estado == 1 ? "ACTIVO" : "INACTIVO"}
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
                            <Tooltip title={row.estado == 1?"Inhabilitar":"Habilitar"}>
                                <Button color={row.estado == 1?"secondary":"primary"}
                                 onClick={()=>eliminar(row)}
                                 >
                                    {row.estado == 1?<DeleteIcon />:
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
            title={"Actualizar marca"}
            load={load}
            object={object}
            contentForm={BrandForm}
            toogleDialogo={setDialogoSesion} 
            open={openDialogoSesion}
        />}
        </>
    )
}

export default BrandTableBody
