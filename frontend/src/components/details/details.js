import React, { Component } from "react";
// import Carousel from "../../components/carousel/carousel";
import classes from "./details.module.css";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBContainer,
} from "mdbreact";
class Details extends Component {
  render() {
    let cls = ["z-depth-1", classes.car];
    let img = ["d-block w-100", classes.car];
    return (
      <div className={classes.container}>
        <div className={classes.carousel_ctrl}>
          <MDBContainer>
            <MDBCarousel
              activeItem={1}
              length={3}
              showControls={true}
              showIndicators={true}
              className={cls.join(" ")}
            >
              <MDBCarouselInner>
                <MDBCarouselItem itemId="1">
                  <MDBView>
                    <img
                      className={img.join(" ")}
                      src="https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg"
                      alt="First slide"
                    />
                  </MDBView>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="2">
                  <MDBView>
                    <img
                      className={img.join(" ")}
                      src="https://mdbootstrap.com/img/Photos/Slides/img%20(129).jpg"
                      alt="Second slide"
                    />
                  </MDBView>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="3">
                  <MDBView>
                    <img
                      className={img.join(" ")}
                      src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg"
                      alt="Third slide"
                    />
                  </MDBView>
                </MDBCarouselItem>
              </MDBCarouselInner>
            </MDBCarousel>
          </MDBContainer>
        </div>
        <div className={classes.disc}>
          <p className={classes.heading}>
            Samsung Galaxy Tab A7 (10.4 inch, RAM 3 GB, ROM 32 GB, Wi-Fi-only),
            Gold{" "}
          </p>
          <p className={classes.oldprc}>
            M.R.P.: <strike>₹ 20,999.00</strike>
          </p>
          <p className={classes.amount}>
            Deal of the Day: <b className={classes.price}>₹ 16,999.00</b>
          </p>
          <p className={classes.price2}>
            You Save: <b className={classes.price}> ₹ 4,000.00 (19%) </b>
          </p>
          <b>Inclusive of all taxes</b>
          <p>
            Delivery by: <b>Monday, Oct 26</b> Details
          </p>
          <p className={classes.avl}>In stock.</p>
          <button className={classes.cartBtn}>Add to Cart</button>
          <button className={classes.buyBtn}>Buy Now</button>
          <p>
            Sold by <b className={classes.sold}>Appario Retail Private Ltd</b>{" "}
            and Fulfilled by <b className={classes.sold}>Shop</b>.{" "}
          </p>

          <ul className={classes.discription}>
            <li>
              10.4 inch ( 26.31 cms) Immersive Display (2000 X 1200 pixels
              resolution ) with symetric bezel for un-interrupted visual
              experience for gaming, watching videos, multi-tasking and more
            </li>
            <li>Quad Stereo Sound - more lively movies and music </li>
            <li>
              Seamless apps and gaming experience with Qualcomm Snapdragon 662
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Details;
