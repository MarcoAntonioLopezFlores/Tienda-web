import React, {useState} from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, IconButton, InputAdornment, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import api from '../../util/api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useHistory } from "react-router-dom";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const ChangePassForm = () => {

    const history = useHistory()
    const swal = withReactContent(Swal)
    const [, setAnchorEl] = useState(null);
    const [showPassCurrent, setShowPassCurrent] = useState(false);
    const [showPassConfirmation, setShowPassConfirmation] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const comprobar = objeto => {
        if(objeto.currentPassword === objeto.password){
            swal.fire(
                'La contraseña ingresada es igual a la actual',
                '',
                'error'
            )
        }else{
            let usuario = JSON.parse(localStorage.getItem("usuario"))
            let datos = {
                correo: usuario.correo,
                password: objeto.currentPassword
            }
            api.post("/usuario/login", datos).then(response => {
                if(response.data.jwtToken === "false"){
                    swal.fire(
                        'La contraseña actual no es correcta',
                        '',
                        'error'
                    )
                }else{
                    cambiar(objeto.password)
                }
            })
        }
    }

    const cambiar = contrasenia => {
        api.get("usuario/cambiarContrasenia/" + contrasenia).then(response => {
            if(response.data === true){
                swal.fire(
                    'Se cambió la contraseña correctamente',
                    '',
                    'success'
                )
                localStorage.clear();
                handleMenuClose();
                history.push('/');
            }else{
                swal.fire(
                    'Ocurrió un error al cambiar la contraseña',
                    '',
                    'error'
                )
            }
        })
    }

    return (
        <Formik
        initialValues={{ currentPassword:'', password: '', passwordConfirmation: '', correo: '' }}

        validationSchema={Yup.object({
            currentPassword: Yup.string().required("Este campo no puede quedar vacío"),
            password: Yup.string().matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])/, "Contraseña requiere mínimo de una minúscula, mayúscula y un dígito").min(8, "Se requiere un mínimo de 8 caracteres").max(25,"Máximo 25 caracteres").required("Este campo no puede quedar vacío"),
            passwordConfirmation: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Contraseñas deben ser similares').required("Este campo no puede quedar vacío")
        })}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                comprobar(values)
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
                        margin="dense"
                        name="currentPassword"
                        label="Contraseña actual"
                        type={showPassCurrent ?"text":"password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={()=>setShowPassCurrent(!showPassCurrent)}
                                    edge="end"
                                  >
                                    {showPassCurrent ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
                            )
                        }}
                        
                        
                        fullWidth />
                    <Field
                        component={TextField}
                        variant="outlined"
                        margin="dense"
                        name="password"
                        label="Contraseña nueva"
                        type={showPass ?"text":"password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={()=>setShowPass(!showPass)}
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
                        variant="outlined"
                        margin="dense"
                        name="passwordConfirmation"
                        label="Confirmar contraseña"
                        type={showPassConfirmation ?"text":"password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={()=>setShowPassConfirmation(!showPassConfirmation)}
                                    edge="end"
                                  >
                                    {showPassConfirmation ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
                            )
                        }}
                        fullWidth />
                    <Button
                        style={{ marginTop: 10,fontWeight: "bold" }}
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        onClick={submitForm}
                    >
                        Guardar
      </Button>
                </Grid>
            </Form>
        )}
    </Formik>
    )
}

export default ChangePassForm