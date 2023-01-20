import React, { useEffect, useState, useRef } from 'react'
import { dogApi, controllerDogApi } from '../../api/DogApi'
import DogCard from '../components/DogCard/DogCard'
import GetButton from '../components/GetButton/GetButton'
import './DogsPage.scss'

export const DogsPage = () => {

    const [dogImgs, setDogImgs] = useState([])
    const [imgRequest, setImgRequest] = useState(0)
    const cardContainerRef = useRef(null);

    useEffect(() => {
        if (imgRequest === 0 ) {
            getRandomDogImg();
        }
        return () =>{
            
        }
    }, []);
    
    const getRandomDogImg = async () => {
        try {
            const response = await dogApi.get("https://dog.ceo/api/breeds/image/random");
            const partialDogImgs = dogImgs
            partialDogImgs.push(response.data.message);
            setDogImgs(partialDogImgs)
            setImgRequest(imgRequest + 1);
        } catch (error) {

        }
      
    }

    const move = (direction) => {
        const containerElement = cardContainerRef.current;
        let leftPosition;
        if (direction === "left") {
            leftPosition = containerElement.scrollLeft - 200;
        }

        if (direction === "right") {
            leftPosition = containerElement.scrollLeft  + 200;
        }

        containerElement.scroll({
            top: 0,
            left: leftPosition,
            behavior: 'smooth'
        });
    }

    const containerIsFullScrolled = () => {
        const containerElement = cardContainerRef.current;
        return parseInt(containerElement.scrollWidth - containerElement.scrollLeft) - containerElement.clientWidth < 10
    }
    
    const moveLeft = () => {
        move("left")
    }

    const moveRight = () => {
        if (containerIsFullScrolled()) {
            getRandomDogImg();
            return;
        }
        move("right");
    }

  return (
    <div className='dogsPage'>
    <GetButton  clickFunction={moveLeft} direction="left" ></GetButton>
        <div className='dogsPage__dogCardContainer' ref={cardContainerRef}>
            {
                dogImgs.map( (img , index) =>{
                    return <DogCard 
                                urlLink = {img} 
                                key = {index}
                            />
                })
            }
        </div>
    <GetButton  clickFunction={moveRight} direction="right" ></GetButton>
    </div>
  )
}
