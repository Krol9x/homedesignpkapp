import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';

const OfferSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const sliderStyles = {
        height: "80vh",
        position: "relative",
        
    };

    const slideStyles = {
        width: "100%",
        height: "100%",
        backgroundPosition: "center",
        backgroundSize: "cover",
        
    };
    
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((newIndex) => {
                if (newIndex < slides.length - 1) {
                    return newIndex + 1;
                }
                return 0;
            });
        }, 2000);
        return () => clearInterval(intervalId);
    }, []);

    const dotsContainerStyles = {
        display: "flex",
        justifyContent: "center",
        zIndex: "200"
    };

    const dotStyles = {
        margin: "0 3px",
        cursor: "pointer",
        fontSize: "34px"
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div style={sliderStyles}>
            <div className="leftArrowStyles" onClick={goToPrevious}>⇋</div>
            <div className="rightArrowStyles" onClick={goToNext}>⇌</div>
            <div style={slideStyles}></div>
            <div style={dotsContainerStyles}>
                {slides.map((slide, slideIndex) => (
                    <div className="dotStyles" key={slideIndex} onClick={() => goToSlide(slideIndex)}>•</div>
                ))}
            </div>
    </div>
    )
}

export default OfferSlider