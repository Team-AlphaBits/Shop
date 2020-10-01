import React, { Component } from "react";
import Carousel from "../../components/carousel/carousel";
import Header from "../../components/Icons/headers";
import FrontImage from "../../Assets/images/hero_2.jpg";
import { MDBView, MDBMask, MDBRow, MDBContainer, MDBCol } from "mdbreact";
import classes from "./Home.module.css";
import Clothes from "../../Cards/Clothes/Clothes";
import BabyProducts from "../../Cards/BabyProducts/BabyProducts";
class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        {/* <MDBView src={FrontImage} >
            <MDBMask overlay="black-light" className="flex-center flex-column text-white text-center">
            </MDBMask>
          </MDBView> */}
        <MDBContainer className="mt-5">
          <MDBRow>
            <MDBCol lg="19" md="14" className="mb-4">
              <img
                src="https://mdbootstrap.com/img/Photos/Others/img%20(50).jpg"
                className="img-fluid z-depth-5"
                alt=""
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <Clothes />
        <BabyProducts />
      </div>
    );
  }
}
export default Home;
