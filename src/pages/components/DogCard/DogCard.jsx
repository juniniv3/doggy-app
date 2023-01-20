import { React, useState, useRef, useEffect } from 'react';
import { FastAverageColor } from 'fast-average-color';
import './DogCard.scss';

export const DogCard = (props) => {

  const [loaded, setLoaded] = useState(false);
  const [cardColor, setCardColor] = useState("#000000");
  const imageRef = useRef(null);

  useEffect(() => {
    putElementIntoView();
  }, [loaded])

  const putElementIntoView = () => {
    imageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  };

  const getAverangeColor = async (htmlElement) => {
    const fac = new FastAverageColor();
    return fac.getColorAsync(htmlElement , {
      ignoredColor: [
          [255, 255, 255, 255], // white
          [0, 0, 0, 255] // black
      ]
  })
      .then(color => {
        return Promise.resolve(color.hex);
      })
      .catch(e => {
        return Promise.reject(e);
      });
  }

  const imageLoad = async() => {
    const color = await getAverangeColor(imageRef.current)
    setCardColor(color);
    setLoaded(true);
  }

  return (
    <div className='dogCard' 
      style={{backgroundColor: cardColor}}>
        <img 
          crossOrigin="anonymous"
          ref={imageRef}
          className='dogCard__img' 
          src={props.urlLink} alt=""
          style={loaded ? {} : { display: 'none' }}
          onLoad={imageLoad}
        />
    </div>
  )
}

export default DogCard;