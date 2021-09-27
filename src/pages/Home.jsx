import React, { useState } from 'react'
import { Button, Grid } from '@material-ui/core'
import styled from 'styled-components/macro';
import Hero from '../components/home/Hero'
import { SliderData } from '../util/SliderData'
import AdvantagesComponent from '../components/home/AdvantagesComponent';
import RecommendationComponent from '../components/home/RecommendationComponent';
import DialogComponent from '../components/DialogComponent';
import RegisterForm from '../components/forms/RegisterForm';
import { isLogin } from '../util/authentication';
const HeroContent = styled.div`
    height:100%;
    position:relative;
    z-index:10;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    max-width:1600px;
    width: calc(100%-100px);
    color:black;
    

    h1{
        font-size:clamp(1rem, 8vw, 3.5rem);
        font-weight:bold;
        text-transform:uppercase;
        text-shadow: 0px 0px 20px rgba(0,0,0,0.2);
        text-align:center;
        margin-bottom:0.8rem;
    }

    p{
        margin-bottom:1.2rem;
        text-shadow: 0px 0px 20px rgba(0,0,0,0.4);
    }

    Button{
        
        font-weight:bold;
        margin:0.8rem;
    }
`

const Home = () => {
    const [openDialogoSesion, setDialogoSesion] = useState(false)
    return (
        <React.Fragment>
            
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Hero slides={SliderData} title={"BIENVENIDO"} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <HeroContent>
                        <h1>La tecnología al alcance de tus manos</h1>
                        {!isLogin() && <Button size="large" variant="contained" color="primary" onClick={() => setDialogoSesion(true)}>
                            REGISTRATE
                    </Button>}
                    </HeroContent>
                </Grid>
            </Grid>
            <RecommendationComponent />
            <AdvantagesComponent />
            
            {openDialogoSesion && <DialogComponent
                title={"Registro de usuario"}
                contentForm={RegisterForm}
                toogleDialogo={setDialogoSesion}
                open={openDialogoSesion}
            />}
        </React.Fragment>
    )
}

export default Home;
