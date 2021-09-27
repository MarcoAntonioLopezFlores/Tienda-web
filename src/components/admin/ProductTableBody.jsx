import React, { useState } from 'react'
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Button, lighten } from "@material-ui/core";
import { addComa, getComparator, stableSort } from '../../util/functionsTable';
import DialogComponent from '../DialogComponent';
import ProductForm from '../forms/ProductForm';
import ProductDescription from '../DescriptionContent';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import api from '../../util/api';
import Tooltip from '@material-ui/core/Tooltip';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';

const ProductTableBody = (props) => {
    
    const swal = withReactContent(Swal)
    const [openDialogoDescription, setDialogoDescription] = useState(false)
    const [object, setObject] = useState(null)
    const [openDialogoSesion, setDialogoSesion] = useState(false)
    const {load,rows, order, orderBy,page,rowsPerPage} = props
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const eliminar = objeto => {
        swal.fire({
            title: objeto.estado?'¿Desea inhabilitar el producto?':'¿Desea habilitar el producto?',
            text: '',
            icon: 'warning',
            showCancelButton: true, 
            cancelButtonText: 'No, cancelar',
            confirmButtonText: 'Sí, aceptar'
        }).then(result => {
            if(result.isConfirmed){
                const auxEstado=objeto.estado
                objeto.estado=!objeto.estado
                auxEstado?api.delete('/producto/eliminar/' + objeto.id).then(response =>{
                    if(response.data === true){
                        swal.fire(
                            'Producto eliminado con éxito',
                            '',
                            'success'
                        )
                        load()
                    }else{
                        swal.fire(
                            'Error al eliminar el producto',
                            '',
                            'error'
                        )
                    }
                }):api.delete("/producto/eliminar/" + objeto.id).then(response => {
                    if(response.data === true){
                        swal.fire(
                            'Producto actualizado con éxito',
                            '',
                            'success'
                        )
                        load()
                    }else{
                        swal.fire(
                            'Error al actualizar el producto',
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
                        <TableRow style={{backgroundColor:row.existencia<=3?lighten("#df6464", 0.5):""}} hover tabIndex={-1} key={row.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.nombre}</TableCell>
                            <TableCell>{row.modelo}</TableCell>
                            <TableCell>${addComa(row.precio.toString())}</TableCell>
                            <TableCell>{row.existencia}</TableCell>
                            <TableCell>{row.color}</TableCell>
                            <TableCell style={{fontWeight:"bold",color:row.estado==1?"#3F51B5":"#F50057"}}>
                                {row.estado == 1 ? "ACTIVO" : "INACTIVO"}
                            </TableCell>
                            <TableCell>
                                <Tooltip title="Ver descripción">
                                <span>
                                <Button disabled={row.estado!=1} color="primary" onClick={()=>{ setObject(row); setDialogoDescription(true)}}>
                                    <VisibilityIcon/>
                                </Button>
                                </span>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title="Actualizar">
                                <span>
                                <Button disabled={row.estado!=1} color="primary" onClick={()=>{ setObject(row); setDialogoSesion(true)}}>
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
        
        {openDialogoDescription && <DialogComponent
            title={"Descripción producto"}
            object={object}
            enableClick={false}
            contentForm={ProductDescription}
            toogleDialogo={setDialogoDescription} 
            open={openDialogoDescription}
        />}
        {openDialogoSesion && <DialogComponent
            title={"Actualizar producto"}
            object={object}
            load={load}
            contentForm={ProductForm}
            toogleDialogo={setDialogoSesion} 
            open={openDialogoSesion}
        />}
        </>
    )
}

export default ProductTableBody
