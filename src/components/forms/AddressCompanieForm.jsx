import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, LinearProgress, makeStyles} from '@material-ui/core';
import { TextField } from 'formik-material-ui';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(3)
    }
}));

const AddressCompanieForm = ({ toogleDialogo }) => {
    const classes = useStyles()
    return (
        <Formik
            initialValues={{ entidad_federativa: '', municipio: '', codigo_postal: '', asentamiento: '', calle: '', numero_exterior: '', tipo_asentamiento: '' }}
            validationSchema={Yup.object({
                entidad_federativa: Yup.string().matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g, "Este campo solo admite letras").max(50,"Máximo 50 caracteres").required("Este campo no puede quedar vacío"),
                municipio: Yup.string().matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g, "Este campo solo admite letras").max(50,"Máximo 50 caracteres").required("Este campo no puede quedar vacío"),
                codigo_postal: Yup.string().matches(/^[0-9\u00f1\u00d1]+(\s*[0-9\u00f1\u00d1]*)*[0-9\u00f1\u00d1]+$/g, "Este campo solo admite números").min(5, "Mínimo 5 dígitos").max(10,"Máximo 10 dígitos").required("Este campo no puede quedar vacío"),
                asentamiento: Yup.string().matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g, "Este campo solo admite letras").max(70,"Máximo 70 caracteres").required("Este campo no puede quedar vacío"),
                calle: Yup.string().matches(/^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]+$/g, "Este campo solo admite letras y números").max(100,"Máximo 100 caracteres").required("Este campo no puede quedar vacío"),
                numero_exterior: Yup.number().typeError("El campo admite solo números").integer("El valor debe ser entero").positive("El valor debe ser positivo").max(1000,"Límite de número: 1000").required("Este campo no puede quedar vacío"),
                tipo_asentamiento: Yup.string().matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g, "Este campo solo admite letras").required("Este campo no puede quedar vacío"),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values));
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
                        <Field
                            className={classes.margin}
                            component={TextField}
                            autoFocus
                            margin="dense"
                            variant="outlined"
                            name="entidad_federativa"
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
                                    name="numero_exterior"
                                    label="Numero exterior"
                                    type="text"
                                />
                            </Grid>
                            <Grid item sm={6}>
                                <Field
                                    component={TextField}
                                    className={classes.margin}
                                    margin="dense"
                                    variant="outlined"
                                    name="codigo_postal"
                                    label="C.P."
                                    type="text"
                                />
                            </Grid>
                        </Grid>
                        <Field
                            component={TextField}
                            className={classes.margin}
                            margin="dense"
                            variant="outlined"
                            name="tipo_asentamiento"
                            label="Tipo de asentamiento"
                            type="text"
                            fullWidth
                        />
                        <Grid
                            container
                            direction="row-reverse"
                        >

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
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

export default AddressCompanieForm

