import React, { useState } from 'react'
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Button } from "@material-ui/core";
import { dateFormat, getComparator, stableSort } from '../../util/functionsTable';
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DialogComponent from '../DialogComponent';
import DescriptionOrder from '../pedidos/DescriptionOrder';
import api from '../../util/api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const PurchaseTableBody = (props) => {

    const swal = withReactContent(Swal) 
    const [openDialogoDescription, setDialogoDescription] = useState(false)
    const [object, setObject] = useState(null)
    
    const { load,rows, order, orderBy, page, rowsPerPage } = props
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

        
    const actualizar = objeto => {
        swal.fire({
            title: '¿Desea cambiar el estado del pedido?',
            text: '',
            icon: 'warning',
            showCancelButton: true, 
            cancelButtonText: 'No, cancelar',
            confirmButtonText: 'Sí, aceptar'
        }).then(result => {
            if(result.isConfirmed){
                if (objeto.estado === "Por enviar"){
                    objeto.estado = "En tránsito"
                }else{
                    objeto.estado = "Entregado"
                }
                api.put("/compra/actualizar", objeto).then(response => {
                    if(response.data === true){
                        swal.fire(
                            'Pedido actualizado con éxito',
                            '',
                            'success'
                        )
                        load()
                    }else{
                        swal.fire(
                            'Error al actualizar el pedido',
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
                            <TableCell>{row.carrito.usuario.nombre}</TableCell>
                            <TableCell>{row.carrito.usuario.correo}</TableCell>
                            <TableCell>{dateFormat(row.fechaPago)}</TableCell>
                            <TableCell align="center">{row.companiaEnvio.descripcion}</TableCell>
                            <TableCell>
                                <Tooltip title="Ver más detalles">
                                <Button color="primary" onClick={()=>{ setObject(row); setDialogoDescription(true)}}>
                                    <VisibilityIcon/>
                                </Button>
                                </Tooltip>
                            </TableCell>
                            <TableCell style={{fontWeight:"bold",color:row.estado === "Por enviar"?"#F50057":row.estado === "En tránsito"?"#3F51B5":"#469A49"}}>
                                {row.estado}
                            </TableCell>
                            <TableCell>
                                <Tooltip title={row.estado === "Por enviar"?"Actualizar a enviado":row.estado === "En tránsito"?"Actualizar a entregado":""}>
                                <span>
                                <Button disabled={row.estado === "Entregado"?true:false} color={row.estado === "Por enviar"?"secondary":"primary"} onClick={()=>actualizar(row)} >
                                    <ArrowForwardIosIcon />
                                </Button>
                                </span>
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
            title={"Detalles del pedido"}
            object={object}
            contentForm={DescriptionOrder}
            enableClick={false}
            toogleDialogo={setDialogoDescription} 
            open={openDialogoDescription}
        />}
        </>
    )
}

export default PurchaseTableBody
