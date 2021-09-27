import React, { useState } from 'react'
import AppBarComponent from '../components/AppBarComponent'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, IconButton, InputAdornment, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Link } from 'react-router-dom';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import api from '../util/api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Redirect, useHistory } from 'react-router';
import { isLogin } from '../util/authentication';

const ChangePassword = (props) => {
    const swal = withReactContent(Swal)
    const history = useHistory()
    const token = props.match.params.token;
    const [showPassConfirmation, setShowPassConfirmation] = useState(false);
    const [showPass, setShowPass] = useState(false);
    
    const actualizarContrasena = objeto => {
        api.post("/usuario/restablecer/" + token, objeto).then(response => {
            if(response.data === true){
                swal.fire(
                    'Se ha restablecido la contraseña correctamente',
                    '',
                    'success'
                ).then(() => history.push("/"))
            }else{
                swal.fire(
                    'Error, el token ha caducado',
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
                    initialValues={{ password: '', passwordConfirmation: '' }}
                    validationSchema={Yup.object({
                        password: Yup.string().matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])/, "Contraseña requiere mínimo de una minúscula, mayúscula y un dígito").min(8, "Se requiere un mínimo de 8 caracteres").max(25,"Máximo 25 caracteres").required("Este campo no puede quedar vacío"),
                        passwordConfirmation: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Contraseñas deben ser similares')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            actualizarContrasena(values)
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ submitForm, isSubmitting }) => (
                        <Form>
                            {isSubmitting && <LinearProgress />}
                            <Grid
                                container
                            >
                                <h3>Cambiar contraseña</h3>
                                <Field
                                    component={TextField}
                                    variant="outlined"
                                    margin="dense"
                                    name="password"
                                    label="Contraseña nueva"
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
                                    variant="outlined"
                                    fullWidth />
                                <Field
                                    component={TextField}
                                    variant="outlined"
                                    margin="dense"
                                    name="passwordConfirmation"
                                    label="Confirmar contraseña"
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
                                <Grid container direction="row" justify="space-between" alignItems="center">
                                    <Link style={{ textDecoration: "none" }} to="/">Volver</Link>
                                    <Button
                                        style={{ marginTop: 10, fontWeight: "bold" }}
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

export default ChangePassword
