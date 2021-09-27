import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import api from '../../util/api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const BrandForm = ({load,toogleDialogo, object}) => {

    const swal = withReactContent(Swal)
    
    const registrar = objeto => {
        api.post("/marca/registrar", objeto).then(response => {
            if(response.data === true){
                swal.fire(
                    'Marca registrada con éxito',
                    '',
                    'success'
                )
                load()
            }else{
                swal.fire(
                    'Error al registrar la marca',
                    '',
                    'error'
                )
            }
        })
    }

    const actualizar = objeto => {
        api.put("/marca/actualizar", objeto).then(response => {
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

    return (
        <Formik
            initialValues={{ id: object!==undefined?object.id:'', nombre: object!==undefined?object.nombre:'', descripcion: object!==undefined?object.descripcion:'', estado: true}}

            validationSchema={Yup.object({
                nombre: Yup.string().matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g, "Este campo solo admite letras").max(50,"Máximo 50 caracteres").required("Este campo no puede quedar vacío"),
                descripcion: Yup.string().matches(/^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]+$/g, "Este campo solo admite letras y números").max(150,"Máximo 150 caracteres").required("Este campo no puede quedar vacío"),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    if(values.id !== ''){
                        actualizar(values)
                    }else{
                        registrar(values)
                    }
                    setSubmitting(false);
                    toogleDialogo(false)
                }, 400);
            }}
        >
            {({ submitForm, isSubmitting }) => (

                <Form>
                    {isSubmitting && <LinearProgress />}
                    <Grid
                        container
                        direction="row-reverse"
                    >
                        <Field
                            variant="outlined"
                            component={TextField}
                            autoFocus
                            margin="dense"
                            name="nombre"
                            label="Nombre"
                            type="text"
                            fullWidth
                        />
                        <Field
                            component={TextField}
                            variant="outlined"
                            margin="dense"
                            name="descripcion"
                            label="Descripción"
                            type="text"
                            fullWidth
                        />
                        
                        <Button
                            style={{marginTop:10,fontWeight: "bold"}}
                            
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                        >
                            {object!==undefined?"Actualizar":'Registrar'}
                        </Button>
                        <Button
                                style={{marginRight:5, marginTop:10,fontWeight: "bold"}}  
                                variant="contained"
                                color="secondary"
                                
                                onClick={()=>toogleDialogo(false)}
                            >
                                Cancelar
                        </Button>
                        
                    </Grid>
                </Form>
            )}
        </Formik>

    )
}

export default BrandForm
