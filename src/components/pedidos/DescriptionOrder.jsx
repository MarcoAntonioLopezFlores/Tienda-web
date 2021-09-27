import React from 'react'
import { Button, Grid, TextField } from '@material-ui/core';
import { addComa } from '../../util/functionsTable';
const DescriptionOrder = ({ toogleDialogo, object }) => {
    return (
        <Grid
            container
            direction="row-reverse"
            justify="center"
        >
            <TextField
                InputProps={{
                    readOnly: true,
                }}
                value={object.codigo}
                variant="outlined"
                margin="dense"
                name="Código de rastreo"
                label="Código de rastreo"
                type="text"
                fullWidth
            />
            <TextField
                InputProps={{
                    readOnly: true,
                }}
                style={{marginTop:25}}
                value={"$"+addComa((object.carrito.total+ 200).toString())}
                variant="outlined"
                margin="dense"
                name="total"
                label="Total"
                type="text"
                fullWidth
            />
            <TextField
                InputProps={{
                    readOnly: true,
                }}
                style={{marginTop:25}}
                value={object.direccion.calle + " " + object.direccion.numeroExterior + ", " + object.direccion.tipoAsentamiento + " " + object.direccion.asentamiento + ", " + object.direccion.codigoPostal + ", " + object.direccion.municipio + ", " + object.direccion.entidadFederativa}
                variant="outlined"
                margin="dense"
                name="dirección"
                label="Dirección"
                multiline
                type="text"
                fullWidth
            />
            <Button
                style={{ marginRight: 5, marginTop: 10 }}
                variant="contained"
                color="primary"
                onClick={() => toogleDialogo(false)}
            >
                Regresar
                        </Button>
        </Grid>
    )
}

export default DescriptionOrder
