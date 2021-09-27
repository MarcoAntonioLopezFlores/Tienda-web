import React from 'react'
import styled from 'styled-components/macro';
import Grid from '@material-ui/core/Grid'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Typography from '@material-ui/core/Typography';
import { IconButton, Tooltip } from '@material-ui/core';
import { addComa } from '../../util/functionsTable';
import api from '../../util/api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ImageContent=styled.img`
    width:80%;
    height:80%;
`


    
const CardCarritoScreenComponent = ({product, listar}) => {    

    const swal = withReactContent(Swal)

    const eliminar = () => {
        swal.fire({
            title: '¿Desea eliminar el producto?',
            text: '',
            icon: 'warning',
            showCancelButton: true, 
            cancelButtonText: 'No, cancelar',
            confirmButtonText: 'Sí, aceptar'
        }).then(result => {
            if(result.isConfirmed){
                api.get("/carrito/eliminar/" + product.producto.id).then(response => {
                    if(response.data === true){
                        localStorage.setItem("carrito", localStorage.getItem("carrito") !== null ? parseInt(localStorage.getItem("carrito")) + 1 : 1)
                        swal.fire(
                        'Producto eliminado con exito',
                        '',
                        'success'
                        ).then(()=>{
                            listar()
                            window.location.reload()
                        })
                        
                    }else{
                        swal.fire(
                        'Error al eliminar el producto',
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
           <Grid container direction="row" justify="flex-start" alignItems="center">
                <Grid container direction="row" item xs={4} sm={4}>
                    <ImageContent
                        src={product.producto.imagen}
                        alt={product.producto.nombre} />
                </Grid>
                <Grid container direction="row" item xs={4} sm={8}>
                    <Grid container direction="row">
                        <Typography variant="inherit" color="initial" >{product.producto.nombre}</Typography>
                    </Grid>
                    <Grid container direction="row">
                        <Typography variant="inherit" color="initial" >{product.producto.descripcion}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid container direction="row" justify="flex-end" item xs={4} sm={6}>
                    <Grid container direction="row" justify="center">
                    <Typography variant="h6" color="initial" >Cantidad</Typography>                                         
                    </Grid>
                    <Grid container direction="row" justify="center">
                    <Typography  variant="h6" color="initial" >X{product.cantidad}</Typography>                                        
                    </Grid>
                    
                </Grid>  
                <Grid container direction="row" justify="flex-end" alignItems="center" item xs={4} sm={6}>
                        <Typography  variant="h6" color="initial" >${addComa(product.precio.toString())}</Typography>
                        <IconButton onClick={() => eliminar()}>
                            <Tooltip title="Eliminar productos">
                                <DeleteOutlineIcon color="secondary"/>
                            </Tooltip>
                        </IconButton>
                </Grid>                
            </Grid>                 
        </>
    )
}

export default CardCarritoScreenComponent

