import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import api from '../../util/api';
import { useHistory } from 'react-router';

const PersonalForm = () => {
    const swal = withReactContent(Swal)
    const history = useHistory();
    const [enable, setEnable] = useState(true)
    const [usuario,] = useState(JSON.parse(localStorage.getItem("usuario")))
    const modifiedEnable =()=>{
        swal.fire({
            title: '¿Estás seguro de continuar?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continuar',
            cancelButtonText:"Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
              setEnable(false)
            }
          })
    }
    
    const actualizar = objeto => {
        api.put("/usuario/actualizar", objeto).then(response => {
            if(response.data !== null){
                swal.fire(
                    'Datos actualizados correctamente',
                    '',
                    'success'
                )
                localStorage.setItem("usuario", JSON.stringify(response.data))
                setEnable(true)
                history.push("/perfil")
            }else{
                swal.fire(
                    'Error al actualizar los datos',
                    '',
                    'error'
                )
            }
        })
    }

    return (
        <Formik
            initialValues={{ nombre: usuario.nombre, apellidos: usuario.apellidos, correo: usuario.correo, id: usuario.id, enabled: true }}

            validationSchema={Yup.object({
                nombre: Yup.string().matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g, "Este campo solo admite letras").max(70,"Máximo 70 caracteres").required("Este campo no puede quedar vacío"),
                apellidos: Yup.string().matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g, "Este campo solo admite letras").max(80,"Máximo 80 caracteres").required("Este campo no puede quedar vacío"),
                correo: Yup.string().email("Formato de correo electrónico invalido").required("Este campo no puede quedar vacío")
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    actualizar(values)
                    setSubmitting(false);

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
                            InputProps={{
                                readOnly: enable,
                            }}
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
                            InputProps={{
                                readOnly: enable,
                            }}
                            margin="dense"
                            name="apellidos"
                            label="Apellidos"
                            type="text"
                            fullWidth
                        />
                        <Field
                            component={TextField}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                            margin="dense"
                            name="correo"
                            label="Correo electrónico"
                            type="correo"
                            fullWidth
                        />
                        <Button
                            style={{ marginTop: 10,fontWeight: "bold" }}
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={enable?modifiedEnable:submitForm}
                        >
                            {enable ? "¿Desea cambiar sus datos?" : "Guardar"}
                        </Button>
                        {!enable&&<Button
                                style={{marginRight:5, marginTop:10,fontWeight: "bold"}}  
                                variant="contained"
                                color="secondary"
                                
                                onClick={()=>setEnable(true)}
                            >
                                Cancelar
                        </Button>}
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

export default PersonalForm
