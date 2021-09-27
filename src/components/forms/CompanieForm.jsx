import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import api from '../../util/api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const CompanieForm = ({load,toogleDialogo, object}) => {

    const swal = withReactContent(Swal)

    const registrar = objeto =>{
        api.post("/compania/registrar", objeto).then(response => {
            if(response.data === true){
                swal.fire(
                    'Compañía registrada con éxito',
                    '',
                    'success'
                )
                load()
            }else{
                swal.fire(
                    'Error al registrar la compañía',
                    '',
                    'error'
                )
            }
        })
    }

    const actualizar = objeto => {
        api.put("/compania/actualizar", objeto).then(response => {
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
    
    return (
        <Formik
            initialValues={{ descripcion: object!==undefined?object.descripcion:'', rfc: object!==undefined?object.rfc:'', id: object !== undefined ? object.id : '', estado:true}}

            validationSchema={Yup.object({
                descripcion: Yup.string().matches(/^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]+$/g, "Este campo solo admite letras y números").max(50,"Máximo 50 caracteres").required("Este campo no puede quedar vacío"),
                rfc: Yup.string().matches(/^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]+$/g, "Este campo solo admite letras y números").min(12,"Este campo requiere mínimo 12 caracteres").max(15,"Máximo 13 caracteres").required("Este campo no puede quedar vacío")
                
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
                            autoFocus
                            margin="dense"
                            variant="outlined"
                            name="descripcion"
                            label="Nombre"
                            type="text"
                            fullWidth
                        />
                        <Field
                            component={TextField}
                            margin="dense"
                            name="rfc"
                            label="RFC"
                            variant="outlined"
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

export default CompanieForm
