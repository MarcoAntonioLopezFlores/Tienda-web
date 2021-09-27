import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, LinearProgress, makeStyles } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import api from '../../util/api';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    }
}));
const CardForm = ({ load, toogleDialogo }) => {
    const classes = useStyles()
    const swal = withReactContent(Swal)

    const registrar = objeto => {
        if((objeto.mes <5 && objeto.anio==21)|| objeto.anio<21){
            swal.fire(
                'Tarjeta no valida',
                '',
                'warning'
            )
        }else{
            api.post("/tarjeta/registrar", objeto).then(response => {
                if(response.data === true){
                    swal.fire(
                        'Tarjeta registrada con éxito',
                        '',
                        'success'
                    )
                    load()
                }else{
                    swal.fire(
                        'Error al registrar la tarjeta',
                        '',
                        'error'
                    )
                }
            })
        }
    }

    return (
        <Formik
            initialValues={{ nombre: '', descripcion: '', mes: '', anio: '', cvv: '', estado: true }}

            validationSchema={Yup.object({
                nombre: Yup.string().matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g, "Este campo solo admite letras").max(50,"Máximo 50 caracteres").required("Este campo no puede quedar vacío"),
                descripcion: Yup.string().matches(/^[0-9\u00f1\u00d1]+(\s*[0-9\u00f1\u00d1]*)*[0-9\u00f1\u00d1]+$/g, "Este campo solo admite números").min(16, "Mínimo 16 dígitos").max(16, "Máximo 16 dígitos").required("Este campo no puede quedar vacío"),
                mes: Yup.number().typeError("El campo admite solo números").positive("El valor debe ser positivo").max(12, "El valor máximo es 12").required("Este campo no puede quedar vacío"),
                anio: Yup.string().matches(/^[0-9\u00f1\u00d1]+(\s*[0-9\u00f1\u00d1]*)*[0-9\u00f1\u00d1]+$/g, "Este campo solo admite números").min(2, "Mínimo 2 dígitos").max(2, "Máximo 2 dígitos").required("Este campo no puede quedar vacío"),
                cvv: Yup.string().matches(/^[0-9\u00f1\u00d1]+(\s*[0-9\u00f1\u00d1]*)*[0-9\u00f1\u00d1]+$/g, "Este campo solo admite números").min(3, "Mínimo 3 dígitos").max(3, "Máximo 3 dígitos").required("Este campo no puede quedar vacío")
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    registrar(values)
                    setSubmitting(false);
                    if(toogleDialogo !== undefined){
                        toogleDialogo(false)
                    }
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
                            className={classes.margin}
                            autoFocus
                            margin="dense"
                            name="nombre"
                            label="Nombre del titular"
                            type="text"
                            fullWidth
                        />
                        <Field
                        variant="outlined"
                            component={TextField}
                            className={classes.margin}
                            margin="dense"
                            name="descripcion"
                            label="Ingresa los digitos de tu tarjeta"
                            type="text"
                            fullWidth
                        />
                        <Grid container direction="row">
                            <Grid item sm={3} xs={4}>
                                <Field
                                variant="outlined"
                                    component={TextField}
                                    className={classes.margin}
                                    margin="dense"
                                    name="mes"
                                    label="Mes"
                                    type="text"
                                />
                                
                            </Grid>
                            
                            <Grid item sm={3} xs={4}>
                                <Field
                                variant="outlined"
                                    component={TextField}
                                    className={classes.margin}
                                    margin="dense"
                                    name="anio"
                                    label="Año"
                                    type="text"
                                />
                            </Grid>
                            <Grid item sm={6} xs={4}>
                                <Field
                                variant="outlined"
                                    component={TextField}
                                    className={classes.margin}
                                    margin="dense"
                                    name="cvv"
                                    label="CVV"
                                    type="text"
                                />
                            </Grid>
                        </Grid>

                        <Button
                            style={{marginTop:10,fontWeight: "bold"}}
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                        >
                            Registrar
                        </Button>
                        {toogleDialogo!==undefined&&<Button
                                style={{marginRight:5, marginTop:10,fontWeight: "bold"}}  
                                variant="contained"
                                color="secondary"
                                
                                onClick={()=>{toogleDialogo(false)}}
                            >
                                Cancelar
                        </Button>}
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

export default CardForm
