import React from 'react'
import AppBarComponent from '../components/AppBarComponent'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Link } from 'react-router-dom';
import api from '../util/api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Redirect, useHistory } from 'react-router';
import { isLogin } from '../util/authentication';

const PasswordRecovery = () => {

    const swal = withReactContent(Swal)
    const history = useHistory()

    const enviar = correo => {
        api.get("/usuario/enviar/" + correo).then(response => {
            if(response.data === true){
                swal.fire(
                    'Correo enviado correctamente',
                    '',
                    'success'
                ).then(() => history.push("/"))
            }else{ 
                swal.fire(
                    'El correo no está registrado o se encuentra inactivo',
                    '',
                    'error'
                )
            }
        })
    }

    return (
        <>
            <AppBarComponent />
            {
            !isLogin()?
            <Grid style={{ padding: "5%" }} container direction="column" justify="center" alignContent="center">
                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string().email("Formato de correo electrónico invalido").max(80,"Máximo 80 caracteres").required("Este campo no puede quedar vacío")
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            enviar(values.email)
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ submitForm, isSubmitting }) => (
                        <Form>
                            {isSubmitting && <LinearProgress />}
                            <Grid container>
                                <h3>Recuperar contraseña</h3>
                                <Field
                                    component={TextField}
                                    autoFocus
                                    variant="outlined"
                                    margin="dense"
                                    name="email"
                                    label="Correo electrónico registrado"
                                    type="email"
                                    fullWidth
                                />
                                <Grid container direction="row" justify="space-between" alignItems="center">
                                    <Link style={{ textDecoration: "none" }} to="/">Volver</Link>
                                    <Button
                                        style={{ marginTop: 10,fontWeight: "bold"}}
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        onClick={submitForm}
                                    >
                                        Continuar
                                </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Grid>:<Redirect to={"/"}/>}
        </>
    )
}

export default PasswordRecovery
