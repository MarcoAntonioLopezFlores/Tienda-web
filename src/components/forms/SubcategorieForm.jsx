import React, {useState, useEffect} from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, LinearProgress, MenuItem, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import api from '../../util/api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const SubcategorieForm = ({load,toogleDialogo, object}) => {

    const swal = withReactContent(Swal)
    const [categorias, setCategorias] = useState([])
    const [imagen, setImagen] = useState(object !== undefined ? object.imagen : null)
    const [mostrar, setMostrar] = useState(object !== undefined ? true : false)
    const [actualizarArchivo, setActualizar] = useState(false)
    const [errorFile,setErrorFile]=useState(false)

    const convertirImagen = evento => {
        setImagen(object !== undefined ? object.imagen : null)
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
            setImagen(object !== undefined ? object.imagen : null)
            setErrorFile(false)
        }
    }

    const mostrarInput = () => {
        setActualizar(!actualizarArchivo)
    }

    const registrar = objeto => {
        api.post("/subcategoria/registrar", objeto).then(response => {
            if(response.data === true){
                swal.fire(
                    'Subcategoría registrada con éxito',
                    '',
                    'success'
                )
                load()
            }else{
                swal.fire(
                    'Error al registrar la subcategoría',
                    '',
                    'error'
                )
            }
        }).catch(()=>{
            swal.fire(
                'Error al registrar la subcategoría',
                '',
                'error'
            )
        })
    }

    const actualizar = objeto => {
        api.put("/subcategoria/actualizar", objeto).then(response => {
            if(response.data === true){
                swal.fire(
                    'Subcategoría actualizada con éxito',
                    '',
                    'success'
                )
                load()
            }else{
                swal.fire(
                    'Error al actualizar la subcategoría',
                    '',
                    'error'
                )
            }
        })
    }

    useEffect(() => {
        api.get("/categoria/listarDisponibles").then(response => {
            setCategorias(response.data)
        })
    }, [])

    return (
        <Formik
            initialValues={{ nombre: object!==undefined?object.nombre:'', id: object!==undefined?object.id:'', descripcion: object!==undefined?object.descripcion:'', categoria_id: object!==undefined?object.categoria.id:0, estado:true}}
            validationSchema={Yup.object({
                nombre: Yup.string().matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g, "Este campo solo admite letras").max(70,"Máximo 70 caracteres").required("Este campo no puede quedar vacío"),
                descripcion: Yup.string().matches(/^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]+$/g, "Este campo solo admite letras y numeros").max(100,"Máximo 100 caracteres").required("Este campo no puede quedar vacío"),
                categoria_id:Yup.number().min(1,"Es necesario seleccionar una categoría").required("Este campo no puede quedar vacio")
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    let datos = {
                        id: values.id,
                        nombre: values.nombre,
                        descripcion: values.descripcion,
                        imagen: imagen,
                        estado: values.estado,
                        categoria: {
                            id: values.categoria_id
                        }
                    }
                    if(values.id !== ''){
                        actualizar(datos)
                    }else{
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
                        direction="row-reverse"
                    >
                        <Field
                            component={TextField}
                            autoFocus
                            margin="dense"
                            variant="outlined"
                            name="nombre"
                            label="Nombre"
                            type="text"
                            fullWidth
                        />
                        <Field
                            component={TextField}
                            margin="dense"
                            variant="outlined"
                            name="descripcion"
                            label="Descripción"
                            type="text"
                            fullWidth
                        />
                        <Field
                            component={TextField}
                            select
                            variant="outlined"
                            margin="dense"
                            name="categoria_id"
                            label="Categoria"
                            fullWidth>
                                <MenuItem value={0} disabled>
                                    Seleccione una categoría
                                </MenuItem>
                                {categorias.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.nombre}
                                    </MenuItem>
                                ))}
                        </Field>
                        {!mostrar && <><Grid item xs={12} sm={12}><Field
                            component={TextField}
                            margin="dense"
                            error={errorFile}
                            name="file"
                            variant="outlined"
                            label="Imagen"
                            type="file"
                            InputLabelProps={{ shrink: true }}
                            onChange={evento => convertirImagen(evento.target.files[0])}
                            fullWidth
                        />{errorFile&&<Typography variant={"caption"} color={"error"}>Verifica la extensión de tu archivo</Typography>}</Grid></>}
                        
                        {mostrar && <Button
                            style={{marginBottom:5, marginTop:10,fontWeight: "bold"}}  
                            variant="contained"
                            color="inherit"
                            fullWidth
                            onClick={() => mostrarInput()}
                        >
                            Deseo cambiar la imagen
                        </Button>}
                        {actualizarArchivo && <><Grid item xs={12} sm={12}><Field
                            component={TextField}
                            margin="dense"
                            name="file"
                            variant="outlined"
                            error={errorFile}
                            InputLabelProps={{ shrink: true }}
                            label="Imagen"
                            type="file"
                            helperText={object!==undefined&&!errorFile?"En caso de no elegir una imagen se mantendrá la misma":""}
                            onChange={evento => convertirImagen(evento.target.files[0])}
                            fullWidth
                        />{errorFile&&<Typography variant={"caption"} color={"error"}>Verifica la extensión de tu archivo</Typography>}</Grid></>}
                        
                        <Button
                            style={{marginTop:10,fontWeight: "bold"}}
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={errorFile?null:submitForm}
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

export default SubcategorieForm
