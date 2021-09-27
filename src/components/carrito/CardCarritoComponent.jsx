import React from 'react'
import styled, { css } from 'styled-components/macro';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import TextField from '@material-ui/core/TextField';
import { Tooltip } from '@material-ui/core';
import { addComa } from '../../util/functionsTable';
import api from '../../util/api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const CardContent=styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:row;
`

const ImageContent=styled.img`
    width:28%;
    height:30%;
    margin:1%;
`
const QuantityProductContent=styled.div`
    width:40%;
    height:50%;
    margin-right:5%;
`
const ProductPriceContent=styled.div`
    width:20%;
    height:50%;
    flex-direction:row;
`

const arrowButtons = css`
    width: 18px;
    height: 18px;
    color: black;
    cursor: pointer;
    background: #fff;
    border-radius: 100px;
    padding: 10px;
    user-select:none;
    transition:0.3s;

    &:hover{
        
        background: #F2F2F2;
        transform: scale(1.05);
    }
`
const DeleteButton = styled(DeleteOutlineIcon)`
    ${arrowButtons}
`
const CardCarritoComponent = ({product, listar}) => {
    
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
        <CardContent>
            
            <ImageContent 
                src={product.producto.imagen} 
                alt={product.producto.nombre}/>
            <QuantityProductContent>
                <h5>{product.producto.nombre}</h5>
                <div style={{display:"flex",flexDirection:"row"}}>
                
                <TextField 
                    InputProps={{
                        readOnly: true,
                    }}
                    value={product.cantidad}
                    type="number"
                    label="Cantidad" 
                    variant="outlined" 
                    size="small" 
                    />
                   
                </div>
            </QuantityProductContent>
            <ProductPriceContent>
                ${addComa(product.producto.precio.toString())}
                <h4>${addComa((product.precio).toString())}</h4>
                <Tooltip title="Eliminar productos">
                    <DeleteButton onClick={() => eliminar()} />
                </Tooltip>
            </ProductPriceContent>
        </CardContent>
    )
}

export default CardCarritoComponent