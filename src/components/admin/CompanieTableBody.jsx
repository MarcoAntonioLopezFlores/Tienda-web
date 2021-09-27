import React, { useState } from 'react'
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";
import { getComparator, stableSort } from '../../util/functionsTable';
import DialogComponent from '../DialogComponent';
import CompanieForm from '../forms/CompanieForm';
import { useHistory } from 'react-router';
import api from '../../util/api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Tooltip from '@material-ui/core/Tooltip';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
const CompanieTableBody = (props) => {

    const history = useHistory();
    const swal = withReactContent(Swal)
    const [object, setObject] = useState(null)
    const [openDialogoSesion, setDialogoSesion] = useState(false)
    const {load,rows, order, orderBy,page,rowsPerPage} = props
    const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const eliminar = compania => {
        swal.fire({
            title: compania.estado?'¿Desea inhabilitar la compañía?':'¿Desea habilitar la compañía?',
            text: '',
            icon: 'warning',
            showCancelButton: true, 
            cancelButtonText: 'No, cancelar',
            confirmButtonText: 'Sí, aceptar'
        }).then(result => {
            if(result.isConfirmed){
                const auxEstado=compania.estado
                compania.estado=!compania.estado
                auxEstado?api.delete('/compania/bajalogica/' + compania.id).then(response =>{
                    if(response.data === true){
                        swal.fire(
                            'Compañía eliminada con éxito',
                            '',
                            'success'
                        )
                        load()
                    }else{
                        swal.fire(
                            'Error al eliminar la compañía',
                            '',
                            'error'
                        )
                    }
                }):api.delete("/compania/bajalogica/" + compania.id).then(response => {
                    if(response.data === true){
                        swal.fire(
                            'Compañía actualizada con éxito',
                            '',
                            'success'
                        )
                        load()
                    }else{
                        swal.fire(
                            'Error al actualizar la compañía',
                            '',
                            'error'
                        )
                    }
                })
            }
        })
    }

    const verDirecciones = compania => {
        localStorage.setItem("compania", JSON.stringify(compania))
        history.push("/admin/companias/direccion")
    }

    return (
        <>
        <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                    return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.descripcion}</TableCell>
                            <TableCell>{row.rfc}</TableCell>
                            <TableCell style={{fontWeight:"bold",color:row.estado==1?"#3F51B5":"#F50057"}}>
                                {row.estado == 1 ? "ACTIVO" : "INACTIVO"}
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="primary" disabled={!row.estado} onClick={()=>verDirecciones(row)}>
                                    Direcciones
                                </Button>
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
            title={"Actualizar compañía"}
            object={object}
            load={load}
            contentForm={CompanieForm}
            toogleDialogo={setDialogoSesion} 
            open={openDialogoSesion}
        />}
        </>
    )
}

export default CompanieTableBody
