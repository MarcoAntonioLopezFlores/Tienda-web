import React, { useState, useEffect }  from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, LinearProgress, makeStyles, Typography} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import api from '../../util/api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const useStyles = makeStyles((theme) => ({
    root:{
        padding:5
    },
    margin: {
        
        marginTop: theme.spacing(2)
    },
    title: {
        flex: "1 1 100%"
    }
}));

const ProductForm = ({ load,toogleDialogo, object }) => {

    const swal = withReactContent(Swal)
    const classes = useStyles()
    const [marcas, setMarcas] = useState([])
    const [subcategorias, setSubcategorias] = useState([])
    const [imagen, setImagen] = useState(object !== undefined ? object.imagen : "")
    const [errorFile,setErrorFile]=useState(false)
    const convertirImagen = evento => {
        setImagen(object !== undefined ? object.imagen : "")
        if(evento!==undefined){
            if(["image/png", "image/jpg", "image/jpeg"].includes(evento.type)){                
                setErrorFile(false)
                var reader = new FileReader();
                reader.readAsDataURL(evento);
                reader.onload = function(){
                    setImagen(reader.result);
                };
            }else{
                setErrorFile(true)
            }    
        }else{
            setErrorFile(false)
            setImagen(object !== undefined ? object.imagen : null)
        }
    }
    const updateStatusImage=()=>{
        setImagen(null)
    }

    useEffect(() => {
        api.get("/marca/listarDisponibles").then(response => {
            setMarcas(response.data)
        })
    }, [])

    useEffect(() => {
        api.get("/subcategoria/listarDisponibles").then(response => {
            setSubcategorias(response.data)
        })
    }, [])

    const registrar = objeto => {
        objeto.marca.id = objeto.marca_id
        objeto.subcategoria.id = objeto.subcategoria_id
        objeto.imagen = imagen
        api.post("/producto/registrar", objeto).then(response => {
            if(response.data === true){
                swal.fire(
                    'Producto registrado con ??xito',
                    '',
                    'success'
                )
                load()
            }else{
                swal.fire(
                    'Error al registrar el producto',
                    '',
                    'error'
                )
            }
        })
    }

    const actualizar = objeto => {
        objeto.marca.id = objeto.marca_id
        objeto.subcategoria.id = objeto.subcategoria_id
        objeto.imagen = imagen
        api.put("/producto/actualizar", objeto).then(response => {
            if(response.data === true){
                swal.fire(
                    'Producto actualizado con ??xito',
                    '',
                    'success'
                )
                load()
            }else{
                swal.fire(
                    'Error al actualizar el producto',
                    '',
                    'error'
                )
            }
        })
    }

    
    return (
        <>
            <Formik
                initialValues={{ id: object!== undefined ? object.id : '', nombre: object !== undefined ? object.nombre : '', descripcion: object !== undefined ? object.descripcion : '', modelo: object !== undefined ? object.modelo : '', precio: object !== undefined ? object.precio : '', existencia: object !== undefined ? object.existencia : '', color: object !== undefined ? object.color : '', marca_id: object !== undefined ? object.marca.id : 0, subcategoria_id: object !== undefined ? object.subcategoria.id : 0 , estado:true, imagen:'', marca:{id:''}, subcategoria:{id:''}}}
                validationSchema={Yup.object({
                    nombre: Yup.string().matches(/^[a-zA-Z??-??0-9\u00f1\u00d1]+(\s*[a-zA-Z??-??0-9\u00f1\u00d1]*)*[a-zA-Z??-??0-9\u00f1\u00d1]+$/g, "Este campo solo admite letras y n??meros").max(50,"M??ximo 50 caracteres").required("Este campo no puede quedar vac??o"),
                    descripcion: Yup.string().max(150,"M??ximo 150 caracteres").required("Este campo no puede quedar vac??o"),
                    modelo: Yup.string().matches(/^[a-zA-Z??-??0-9\u00f1\u00d1]+(\s*[a-zA-Z??-??0-9\u00f1\u00d1]*)*[a-zA-Z??-??0-9\u00f1\u00d1]+$/g, "Este campo solo admite letras y n??meros").max(15,"M??ximo 15 caracteres").required("Este campo no puede quedar vac??o"),
                    color: Yup.string().matches(/^[a-zA-Z??-??\u00f1\u00d1]+(\s*[a-zA-Z??-??\u00f1\u00d1]*)*[a-zA-Z??-??\u00f1\u00d1]+$/g, "Este campo solo admite letras").max(20,"M??ximo 20 caracteres").required("Este campo no puede quedar vac??o"),
                    precio: Yup.number().typeError("El campo admite solo n??meros").positive("El valor debe ser positivo").max(99999,"L??mite de precio: $99,999.00").required("Este campo no puede quedar vacio"),
                    existencia: Yup.number().typeError("El campo admite solo n??meros").integer("El valor debe ser entero").positive("El valor debe ser positivo").max(99999,"L??mite de n??mero: 99999").required("Este campo no puede quedar vac??o"),
                    marca_id: Yup.number().min(1,"Es necesario seleccionar una marca").required("Este campo no puede quedar vac??o"),
                    subcategoria_id: Yup.number().min(1,"Es necesario seleccionar una subcategor??a").required("Este campo no puede quedar vac??o"),
                })}
                onSubmit={(values, { setSubmitting }) => {                    
                    setTimeout(() => {
                        if (values.id !== '') {
                            setSubmitting(false);
                            toogleDialogo(false)
                            actualizar(values)
                        } else {
                            setSubmitting(false);
                            toogleDialogo(false)
                            registrar(values)                                 
                        }
                    }, 400);
                }}
            >
                {({ submitForm, isSubmitting }) => (

                    <Form>
                        {isSubmitting && <LinearProgress />}
                        <Grid
                            container
                            justify="space-evenly"
                        >
                            <Grid item className={classes.root} sm={12} xs={12}>
                                <Field
                                    fullWidth
                                    
                                    component={TextField}
                                    className={classes.margin}
                                    autoFocus
                                    margin="dense"
                                    name="nombre"
                                    label="Nombre"
                                    type="text"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item className={classes.root} sm={12} xs={12}>
                                <Field
                                    component={TextField}
                                    className={classes.margin}
                                    variant="outlined"
                                    fullWidth
                                    margin="dense"
                                    name="descripcion"
                                    label="Descripci??n"
                                    type="text"
                                />
                            </Grid>
                            <Grid item className={classes.root} sm={6} xs={6}>
                                <Field
                                    component={TextField}
                                    className={classes.margin}
                                    margin="dense"
                                    name="modelo"
                                    variant="outlined"
                                    label="Modelo"
                                    type="text"
                                    fullWidth />
                            </Grid>
                            <Grid item className={classes.root} sm={6} xs={6}>
                                <Field
                                    component={TextField}
                                    className={classes.margin}
                                    margin="dense"
                                    name="color"
                                    variant="outlined"
                                    label="Color"
                                    type="text"
                                    fullWidth />
                            </Grid>
                            <Grid item className={classes.root} sm={6} xs={6}>
                                <Field
                                    component={TextField}
                                    className={classes.margin}
                                    margin="dense"
                                    name="precio"
                                    variant="outlined"
                                    label="Precio"
                                    type="text"
                                    fullWidth />
                            </Grid>
                            <Grid item className={classes.root} sm={6} xs={6}>
                                <Field
                                    component={TextField}
                                    className={classes.margin}
                                    margin="dense"
                                    name="existencia"
                                    variant="outlined"
                                    label="Existencia"
                                    type="text"
                                    fullWidth />
                            </Grid>
                            <Grid item className={classes.root} sm={12} xs={12}>
                                <Field
                                    error={errorFile || imagen==null}
                                    component={TextField}
                                    className={classes.margin}
                                    margin="dense"
                                    name="file"
                                    InputLabelProps={{ shrink: true }}
                                    onChange={evento => convertirImagen(evento.target.files[0])}
                                    variant="outlined"
                                    label="Imagen"
                                    helperText={object!==undefined&&!errorFile?"En caso de no elegir una imagen se mantendr?? la misma":""}
                                    type="file"
                                    fullWidth
                                />
                                {errorFile&&<Typography variant={"caption"} color={"error"}>Verifica la extensi??n de tu archivo</Typography>}
                                {imagen==null&&<Typography variant={"caption"} color={"error"}>Este campo no puede quedar vac??o</Typography>}
                            </Grid>
                            <Grid item className={classes.root} sm={6} xs={12}>
                                <Field
                                    component={TextField}
                                    className={classes.margin}
                                    select
                                    margin="dense"
                                    variant="outlined"
                                    name="marca_id"
                                    label="Marca"
                                    fullWidth>
                                    <MenuItem value={0} disabled>
                                        Seleccione una marca
                                    </MenuItem>
                                    {marcas.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.nombre}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>
                            <Grid item className={classes.root} sm={6} xs={12}>
                                <Field
                                    component={TextField}
                                    className={classes.margin}
                                    select
                                    margin="dense"
                                    variant="outlined"
                                    name="subcategoria_id"
                                    label="Subcategor??a"
                                    fullWidth>
                                    <MenuItem value={0} disabled>
                                        Seleccione una subcategor??a
                                    </MenuItem>
                                    {subcategorias.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.nombre}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Grid>
                            <Grid
                                container
                                direction="row-reverse"
                            >
                                <Button
                                    style={{ marginTop: 10,fontWeight: "bold" }}
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={()=>{
                                        if(errorFile||imagen==null){
                                            return null
                                        }else if(imagen!==""){
                                            submitForm()
                                        }else{
                                            submitForm()
                                            updateStatusImage();
                                        }}}
                                >
                                    {object!==undefined?"Actualizar":'Registrar'}
                        </Button>
                                <Button
                                    style={{ marginRight: 5, marginTop: 10,fontWeight: "bold"}}
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
        </>
    )
}

export default ProductForm
