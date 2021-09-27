import React, { useState } from 'react'
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Button } from "@material-ui/core";
import { getComparator, stableSort } from '../../util/functionsTable';
import DialogComponent from '../DialogComponent';
import SubcategorieForm from '../forms/SubcategorieForm';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CardMedia from '@material-ui/core/CardMedia';
import api from '../../util/api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Tooltip from '@material-ui/core/Tooltip';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
const SubcategorieTableBody = (props) => {
    const swal = withReactContent(Swal)
    const [object, setObject] = useState(null)
    const [openDialogoSesion, setDialogoSesion] = useState(false)
    const [openDialogo, setDialogo] = useState(false)
    const [imagen, setImagen] = useState(null)

    const {load,rows, order, orderBy,page,rowsPerPage} = props
    const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const eliminar = subcategoria => {
        swal.fire({
            title: subcategoria.estado?'¿Desea inhabilitar la sucategoría?':'¿Desea habilitar la sucategoría?',
            text: '',
            icon: 'warning',
            showCancelButton: true, 
            cancelButtonText: 'No, cancelar',
            confirmButtonText: 'Sí, aceptar'
        }).then(result => {
            if(result.isConfirmed){
                const auxEstado=subcategoria.estado
                subcategoria.estado=!subcategoria.estado
                auxEstado?api.delete('/subcategoria/eliminar/' + subcategoria.id).then(response =>{
                    if(response.data === true){
                        swal.fire(
                            'Subategoría eliminada con éxito',
                            '',
                            'success'
                        )
                        load()
                    }else{
                        swal.fire(
                            'Error al eliminar la subcategoría',
                            '',
                            'error'
                        )
                    }
                }):api.delete("/subcategoria/eliminar/" + subcategoria.id).then(response => {
                    if(response.data === true){
                        swal.fire(
                            'Subcategoría actualizada con éxito',
                            '',
                            'success'
                        )
                        load()
                    }else{
                        swal.fire(
                            'Error al actualizar la subcategoría',
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
                            <TableCell>{row.categoria.nombre}</TableCell>
                            <TableCell style={{fontWeight:"bold",color:row.estado==1?"#3F51B5":"#F50057"}}>
                                {row.estado == 1 ? "ACTIVO" : "INACTIVO"}
                            </TableCell>
                            <TableCell>
                                <Tooltip title="Ver imagen">
                                <span>
                                <Button disabled={row.estado!=1} color="primary" onClick={()=> {setDialogo(true); setImagen(row.imagen);}}>
                                    <VisibilityIcon/>
                                </Button>
                                </span>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Tooltip title="Actualizar">
                                <span>
                                <Button disabled={row.estado!=1} color="primary" onClick={()=>{ setObject(row); setDialogoSesion(true)}} disabled={!row.estado}>
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
            title={"Actualizar subcategoría"}
            object={object}
            load={load}
            contentForm={SubcategorieForm}
            toogleDialogo={setDialogoSesion} 
            open={openDialogoSesion}
        />}
        {openDialogo && (
            <Dialog
                fullWidth={true}
                maxWidth={"md"} 
                open={openDialogo}
                onClick= {() => setDialogo(false)}>
            <DialogContent>
                <CardMedia
                    component="img"
                    alt="Imagen"
                    height="auto"
                    width="auto"
                    image={imagen}
                />
            </DialogContent>
            </Dialog>
        )}
        </>
    )
}

export default SubcategorieTableBody
