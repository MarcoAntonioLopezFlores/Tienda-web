import React, {useState} from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, LinearProgress, makeStyles, MenuItem } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import api from '../../util/api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { asentamientos } from '../../util/SliderData';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(3)
    }
}));

const AddressForm = ({load, toogleDialogo, object}) => {

    const swal = withReactContent(Swal)
    const classes = useStyles()
    const [sucursal,] = useState(JSON.parse(localStorage.getItem("compania")))

    const registrar = objeto => {
        if(sucursal !== null){
            api.post("/sucursalcompania/registrar", objeto).then(response => {
                if(response.data === true){
                    swal.fire(
                        'Dirección registrada con éxito',
                        '',
                        'success'
                    )
                    load()
                }else{
                    swal.fire(
                        'Error al registrar la dirección',
                        '',
                        'error'
                    )
                }
            })
        }else{
            api.post("/direccionusuario/registrar", objeto).then(response => {
                if(response.data === true){
                    swal.fire(
                        'Dirección registrada con éxito',
                        '',
                        'success'
                    )
                    load()
                }else{
                    swal.fire(
                        'Error al registrar la dirección',
                        '',
                        'error'
                    )
                }
            })
        }
    }

    const actualizar = objeto => {
        if(sucursal !== null){
            api.put("/sucursalcompania/actualizar", objeto).then(response => {
                if(response.data === true){
                    swal.fire(
                        'Dirección actualizada con éxito',
                        '',
                        'success'
                    )
                    load()
                }else{
                    swal.fire(
                        'Error al actualizar la dirección',
                        '',
                        'error'
                    )
                }
            })
        }else{
            api.put("/direccionusuario/actualizar", objeto).then(response => {
                if(response.data === true){
                    swal.fire(
                        'Dirección actualizada con éxito',
                        '',
                        'success'
                    )
                    load()
                }else{
                    swal.fire(
                        'Error al actualizar la dirección',
                        '',
                        'error'
                    )
                }
            })
    
        }
    }

    return (
        <Formik
            initialValues={{ id: object!== undefined ? object.id : '', entidadFederativa: object!== undefined ? object.direccion.entidadFederativa :  '', municipio: object!== undefined ? object.direccion.municipio :  '', 
            codigoPostal: object!== undefined ? object.direccion.codigoPostal : '', asentamiento: object!== undefined ? object.direccion.asentamiento : '', calle: object!== undefined ? object.direccion.calle : '', 
            numeroExterior: object!== undefined ? object.direccion.numeroExterior : '', tipoAsentamiento: object!== undefined ? object.direccion.tipoAsentamiento : 0, usuario: object !== undefined && object.usuario !== undefined ? object.usuario.id : ''}}
            validationSchema={Yup.object({
                entidadFederativa: Yup.string().matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g, "Este campo solo admite letras").max(50,"Máximo 50 caracteres").required("Este campo no puede quedar vacío"),
                municipio: Yup.string().matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g, "Este campo solo admite letras").max(50,"Máximo 50 caracteres").required("Este campo no puede quedar vacío"),
                codigoPostal: Yup.string().matches(/^[0-9\u00f1\u00d1]+(\s*[0-9\u00f1\u00d1]*)*[0-9\u00f1\u00d1]+$/g, "Este campo solo admite numeros").min(5,"Mínimo 5 dígitos").max(10,"Máximo 10 dígitos").required("Este campo no puede quedar vacío"),
                asentamiento: Yup.string().matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g, "Este campo solo admite letras").max(100,"Máximo 100 caracteres").required("Este campo no puede quedar vacío"),
                calle: Yup.string().matches(/^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]+$/g, "Este campo solo admite letras y números").max(70,"Máximo 70 caracteres").required("Este campo no puede quedar vacío"),
                numeroExterior: Yup.number().typeError("El campo admite solo números").integer("El valor debe ser entero").positive("El valor debe ser positivo").max(1000,"Límite de número: 1000").required("Este campo no puede quedar vacío"),
                tipoAsentamiento: Yup.string().matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g, "Este campo solo admite letras").required("Este campo no puede quedar vacío"),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    let datos = {}
                    if(sucursal !== null){
                        datos = {
                            id: values.id,
                            companiaEnvio: {id: sucursal.id},
                            direccion:{
                                asentamiento: values.asentamiento,
                                calle: values.calle,
                                codigoPostal: values.codigoPostal,
                                entidadFederativa: values.entidadFederativa,
                                municipio: values.municipio,
                                numeroExterior: values.numeroExterior,
                                tipoAsentamiento: values.tipoAsentamiento,
                            }
                        }
                    }else{
                        datos = {
                            id: values.id,
                            usuario: {id: values.usuario},
                            direccion:{
                                asentamiento: values.asentamiento,
                                calle: values.calle,
                                codigoPostal: values.codigoPostal,
                                entidadFederativa: values.entidadFederativa,
                                municipio: values.municipio,
                                numeroExterior: values.numeroExterior,
                                tipoAsentamiento: values.tipoAsentamiento,
                            }
                        }
                    }
                    if (values.id !== '') {
                        actualizar(datos)
                    } else {
                        registrar(datos)
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
                    >
                        <Field
                            className={classes.margin}
                            component={TextField}
                            autoFocus
                            variant="outlined"
                            margin="dense"
                            name="entidadFederativa"
                            label="Entidad federativa"
                            type="text"
                            fullWidth
                        />
                        <Field
                            component={TextField}
                            className={classes.margin}
                            margin="dense"
                            variant="outlined"
                            name="municipio"
                            label="Municipio"
                            type="text"
                            fullWidth
                        />
                        <Field
                            component={TextField}
                            className={classes.margin}
                            margin="dense"
                            variant="outlined"
                            name="asentamiento"
                            label="Colonia"
                            type="text"
                            fullWidth />
                        <Field
                            component={TextField}
                            className={classes.margin}
                            margin="dense"
                            variant="outlined"
                            name="calle"
                            label="Calle"
                            type="text"
                            fullWidth />
                        <Grid container direction="row">
                        <Grid item sm={6}>
                        <Field
                            component={TextField}
                            className={classes.margin}
                            margin="dense"
                            variant="outlined"
                            name="numeroExterior"
                            label="Número exterior"
                            type="text"
                             />
                            </Grid>
                            <Grid item sm={6}>
                        <Field
                            component={TextField}
                            className={classes.margin}
                            margin="dense"
                            variant="outlined"
                            name="codigoPostal"
                            label="C.P."
                            type="text"
                             />
                             </Grid>
                        </Grid>
                        <Field
                            component={TextField}
                            select
                            variant="outlined"
                            margin="dense"
                            className={classes.margin}
                            name="tipoAsentamiento"
                            label="Tipo de asentamiento"
                            fullWidth>
                                <MenuItem key={0} value={0} disabled={true}>
                                    Seleccione un tipo...
                                </MenuItem>
                                {asentamientos.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.value}
                                    </MenuItem>
                                ))}
                        </Field>
                        
                        <Grid
                            container
                            direction="row-reverse"
                        >
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
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

export default AddressForm
