import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import api from '../../util/api';

const PhoneForm = ({load,toogleDialogo,object}) => {

    const swal = withReactContent(Swal)

    const registrar = objeto => {
        api.post("/telefono/registrar", objeto).then(response => {
            if(response.data === true){
                swal.fire(
                    'Teléfono registrado con éxito',
                    '',
                    'success'
                )
                load()
            }else{
                swal.fire(
                    'Error al registrar el teléfono',
                    '',
                    'error'
                )
            }
        })
    }

    const actualizar = objeto => {
        api.put("/telefono/actualizar", objeto).then(response => {
            if(response.data === true){
                swal.fire(
                    'Teléfono actualizado con éxito',
                    '',
                    'success'
                )
                load()
            }else{
                swal.fire(
                    'Error al actualizar el teléfono',
                    '',
                    'error'
                )
            }
        })
    }

    return (
        <Formik
            initialValues={{ id: object!==undefined?object.id:'', descripcion: object!==undefined?object.descripcion:''}}

            validationSchema={Yup.object({
                descripcion: Yup.string().matches(/^[0-9\u00f1\u00d1]+(\s*[0-9\u00f1\u00d1]*)*[0-9\u00f1\u00d1]+$/g, "Este campo solo admite números").min(10,"El telefono debe contar con 10 dígitos").max(20,"El telefono debe contar máximo con 20 dígitos").required("Este campo no puede quedar vacío"),
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

export default PhoneForm
