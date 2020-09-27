import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import jelly from '../../Assets/images/Jellyfish.jpg'
import flower from '../../Assets/images/Tulips.jpg'
import penguins from '../../Assets/images/Penguins.jpg'
import classes from './carousel.module.css';

const caRousel = () =>{
    return (
        <Carousel className={classes.Carousel} interval="2000">
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={jelly}
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={penguins}
      alt="Third slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={flower}
      alt="Third slide"
    />
  </Carousel.Item>
</Carousel>
    )
}
export default caRousel;