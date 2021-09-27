import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components/macro';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const HeroSection = styled.section`
    height: 50vh;
    max-height: 1100 px;
    position: relative;
    overflow: hidden;
`;

const HeroWrapper = styled.div`
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    overflow: hidden;
    position: relative;
`;

const HeroSlide = styled.div` 
    z-index:1;
    width:100%;
    height:100%;
`
const HeroSlider = styled.div`
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:flex-start;

    &::before{
        content: '',
        position: absolute;
        z-index: 2;
        width:100%;
        height:100vh;
        bottom:0vh;
        left:0;
        overflow:hidden;
        opacity:0.4;
        background: linear-gradient(
            0deg, 
            rgba(0,0,0,0.2) 0%,
            rgba(0,0,0,0.2) 50%,
            rgba(0,0,0,0.6) 100%
        )
    }
`

const SliderButtons = styled.div`
    position: absolute;
    bottom: 50px;
    right:50px;
    display: flex;
    z-index:1;
`

const arrowButtons = css`
    width: 30px;
    height: 30px;
    color: #fff;
    cursor: pointer;
    background: #3F51B5;
    border-radius: 100px;
    padding: 10px;
    margin-right: 1rem;
    user-select:none;
    transition:0.3s;

    &:hover{
        background: #000d1a;
        transform: scale(1.05);
    }
`

const PrevArrow = styled(ArrowBackIcon)`
    ${arrowButtons}
`

const NextArrow = styled(ArrowForwardIcon)`
    ${arrowButtons}
`

const Hero = ({ slides,title }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length
    const timeout = useRef(null)

    useEffect(
        () => {
            const nextSlide =()=> {
                setCurrent(current=>(current===length-1?0:current+1))
            }
            
            timeout.current = setTimeout(nextSlide,3000)

            return function(){
                if(timeout.current){
                    clearTimeout(timeout.current)
                }
            }
        }, [current,length]
    )

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    }

    return (
        <HeroSection>
            <HeroWrapper>
                {slides.map((slide, index) => {
                    return (
                        <HeroSlide key={index}>
                            {index === current && (
                                <HeroSlider>
                                    <div style={{height:"100%",width:"100%",backgroundRepeat:"no-repeat",backgroundImage:`url(${slide.image})`,backgroundSize: "cover"}}>
                                        <div style={{backgroundColor:"#3F51B5", width:230, justifyContent:"center",borderRadius:50,margin:15,textAlign:"center"}}>
                                            <h1 style={{color:"white"}}>{title}</h1>
                                        </div>
                                    </div>                            
                                </HeroSlider>
                            )}
                        </HeroSlide>
                    )
                })}
                <SliderButtons>
                    <PrevArrow onClick={prevSlide} />
                    <NextArrow onClick={nextSlide} />
                </SliderButtons>
            </HeroWrapper>
        </HeroSection>
    )
}
export default Hero;
