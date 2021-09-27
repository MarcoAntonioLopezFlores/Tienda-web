import React, { useState, useEffect }  from 'react'
import Carousel from "react-elastic-carousel";
import { Divider } from '@material-ui/core'
import CardProductComponent from '../products/CardProductComponent'
import api from '../../util/api';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
];

const RecommendationComponent = () => {

    const [productos, setProductos] = useState([])

    const listar = () => {
        api.get("/producto/listarNuevos").then(response => {
            setProductos(response.data)
        })
    }

    useEffect(() => {        
        listar()
    },[])

    return (
        <div>
            <h2 style={{margin:10}}>Te recomendamos</h2>
            <Divider/>
            <Carousel breakPoints={breakPoints}>
                {productos.map((product,index)=>{
                    return( 
                        <CardProductComponent key={index} product={product}/>
                    )
                })}                
            </Carousel>
        </div>
    )
}

export default RecommendationComponent
