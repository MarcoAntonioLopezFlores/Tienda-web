import React from 'react'
import styled from 'styled-components';

const FooterSection = styled.section`
    margin-top:50px;
    height: 8vh;
    width:100%;
    
    z-index:10;
    background-color:#3F51B5;
    color:white;
    position: fixed;
   left: 0;
   bottom: 0;
   
    p{
        font-size:80%;
        font-weight:bold;
        text-align:center;
    }
`;

const FooterComponent = () => {
    return (
        <div style={{marginTop:80}}>
        <FooterSection>
           <p>Precios y ofertas sujetos a cambios sin previo aviso. ©2021 Tech. Todos los derechos reservados. </p>
        </FooterSection>
        </div>
    )
}

export default FooterComponent;
