import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import jelly from '../../Assets/images/Jellyfish.jpg'
import flower from '../../Assets/images/Tulips.jpg'
import penguins from '../../Assets/images/Penguins.jpg'
import classes from './carousel.module.css';

const caRousel = () =>{
    return (
        <Carousel className={classes.Carousel}>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={jelly}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={penguins}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={flower}
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    )
}
export default caRousel;