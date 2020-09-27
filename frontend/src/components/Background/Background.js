import React from 'react';
import classes from './Background.module.css'
import Carousel from '../carousel/carousel';

const Background = () =>{
    return <div className={classes.Back}>
          <Carousel />
    </div>
}

export default Background;