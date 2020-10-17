import React, { Component } from "react";
import Header from "../../components/Icons/headers";
import FrontImage from "../../Assets/images/hero_2.jpg";
import { MDBView, MDBMask, MDBRow, MDBContainer, MDBCol } from "mdbreact";
import classes from "./Home.module.css";
import Clothes from "../../Cards/Clothes/Clothes";
import BabyProducts from "../../Cards/BabyProducts/BabyProducts";
import StaticCards from "../../Cards/StaticCards/StaticCards";
import Carousel from "../../components/carousel/carousel";
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
              <Carousel />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <Clothes />
        <BabyProducts />
        <StaticCards />
      </div>
    );
  }
}
export default Home;
