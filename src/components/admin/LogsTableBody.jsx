import React from 'react'
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { dateFormat, getComparator, stableSort } from '../../util/functionsTable';

const LogsTableBody = (props) => {
    
    const { rows, order, orderBy, page, rowsPerPage } = props
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    return (
        <>
        <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                    return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{row.accion}</TableCell>
                            <TableCell>{dateFormat(row.fechaRegistro)}</TableCell>
                            <TableCell>{row.host}</TableCell>
                            <TableCell>{row.tabla}</TableCell>
                            <TableCell>{row.usuario.nombre}</TableCell>
                            <TableCell>{row.antiguaInformacion}</TableCell>
                            <TableCell>{row.nuevaInformacion}</TableCell>

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

export default LogsTableBody
