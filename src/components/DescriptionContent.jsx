import React from 'react'
import { Button, Grid, TextField } from '@material-ui/core';

const DescriptionContent = ({ toogleDialogo, object }) => {
    return (
        <Grid
            container
            direction="row-reverse"
            justify="center"
        >
            <img
                height="100%"
                width="100%"
                src={object.imagen}
            />
            <TextField
                InputProps={{
                    readOnly: true,
                }}
                style={{marginTop:25}}
                value={object.descripcion}
                variant="outlined"
                margin="dense"
                name="descripcion"
                label="Descripción"
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

export default DescriptionContent