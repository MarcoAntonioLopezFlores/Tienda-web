import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, IconButton, InputAdornment, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import api from '../../util/api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const RegisterForm = ({ toogleDialogo }) => {
    const [showPassConfirmation, setShowPassConfirmation] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const swal = withReactContent(Swal)

    const registrar = values => {
        
        api.post("/usuario/registrar?rol=ROLE_CLIENTE", values).then(response => {
            if(response.data === true){
                swal.fire(
                    'Usuario registrado con éxito',
                    '',
                    'success'
                )
            }else{
                swal.fire(
                    'Error al registrar al usuario',
                    '',
                    'error'
                )
            }
        })
    }

    return (
        <Formik
            initialValues={{ nombre: '', apellidos: '', correo: '', password: '', passwordConfirmation: '', enabled: true}}

            validationSchema={Yup.object({
                nombre: Yup.string().matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g, "Este campo solo admite letras").max(70,"Máximo 70 caracteres").required("Este campo no puede quedar vacío"),
                apellidos: Yup.string().matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g, "Este campo solo admite letras").max(80,"Máximo 80 caracteres").required("Este campo no puede quedar vacío"),
                correo: Yup.string().email("Formato de correo invalido").max(80,"Máximo 80 caracteres").required("Este campo no puede quedar vacío"),
                password: Yup.string().matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])/, "Contraseña requiere mínimo de una minúscula, mayúscula y un dígito").min(8, "Se requiere un mínimo de 8 caracteres").max(25,"Máximo 25 caracteres").required("Este campo no puede quedar vacío"),
                passwordConfirmation: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Contraseñas deben ser similares')
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    registrar(values)
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
                            name="apellidos"
                            label="Apellidos"
                            type="text"
                            fullWidth
                        />
                        <Field
                            component={TextField}
                            margin="dense"
                            variant="outlined"
                            name="correo"
                            label="Correo electrónico"
                            type="correo"
                            fullWidth
                        />

                        <Field
                            component={TextField}
                            margin="dense"
                            name="password"
                            variant="outlined"
                            label="Contraseña"
                            type={showPass ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPass(!showPass)}
                                            edge="end"
                                        >
                                            {showPass ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            fullWidth />
                        <Field
                            component={TextField}
                            margin="dense"
                            name="passwordConfirmation"
                            label="Contraseña"
                            variant="outlined"
                            type={showPassConfirmation ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassConfirmation(!showPassConfirmation)}
                                            edge="end"
                                        >
                                            {showPassConfirmation ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            fullWidth />
                        <Button
                            style={{ marginTop: 10, fontWeight: "bold" }}
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                        >
                            Registrar
          </Button>
                        <Button
                            style={{ marginRight: 5, marginTop: 10, fontWeight: "bold" }}
                            variant="contained"
                            color="secondary"

                            onClick={() => toogleDialogo(false)}
                        >
                            Cancelar
                        </Button>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

export default RegisterForm
