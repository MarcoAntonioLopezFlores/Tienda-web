import React, { useState } from 'react'
import { Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import { Button, Grid,IconButton, InputAdornment, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { useHistory } from 'react-router';
import api from '../../util/api';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const LoginForm = ({toogleDialogo}) => {

    const history = useHistory();
    const swal = withReactContent(Swal)
    const [showPass, setShowPass] = useState(false);

    const iniciarSesion = values => {
      
      api.post("/usuario/login", values).then(response => {
        if(response.data.jwtToken === "false"){
          swal.fire(
            'Error al iniciar sesión',
            'Contraseña y/o usuario incorrecto',
            'error'
          )
        }else{
          let token = response.data.jwtToken
          localStorage.setItem("token", token)

          let usuario = decode(response.data.jwtToken);
          localStorage.setItem("usuario", JSON.stringify(usuario.perfil[0].usuario))

          if(usuario.perfil[0].rol.nombre === "ROLE_ADMIN"){
            history.push("/admin/productos")
          }else if(usuario.perfil[0].rol.nombre === "ROLE_CLIENTE"){
            history.push("/productos")
          }
        }
      }).catch(()=>
        
        swal.fire(
          'Error al iniciar sesión',
          'Contraseña y/o usuario incorrecto',
          'error'
        )
      )
    }

    return (
        <Formik
       initialValues={{ correo: '', password: '' }}
       validationSchema={Yup.object({
            correo:Yup.string().email("Formato de correo electrónico invalido").required("Este campo no puede quedar vacío"),
            password: Yup.string().required("Este campo no puede quedar vacío")
       })}
       onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          toogleDialogo(false);
          iniciarSesion(values)
        }, 400);
       }}
     >
       {({ submitForm,isSubmitting }) => (
           
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
                name="correo"
                label="Correo Electrónico"
                variant="outlined"
                type="email"
                fullWidth
              />           
           
           <Field 
                component={TextField} 
                margin="dense"
                name="password"
                variant="outlined"
                label="Contraseña"
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
           <Grid container direction="row" justify="space-between" alignItems="center" style={{marginTop:5}}>
             <Link style={{textDecoration:"none"}} to="/recuperar">¿Olvidaste tu contraseña?</Link>
           <Button
            style={{marginTop:10,fontWeight: "bold"}}
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Ingresar
          </Button>
          </Grid>     
          </Grid>
          
         </Form>
         
       )}
       
     </Formik>
    )
}

export default LoginForm
