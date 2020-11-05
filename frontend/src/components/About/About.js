import React, { Component } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBRow,
  MDBIcon,
} from "mdbreact";
import classes from "./About.module.css";
import Khem from "../../Assets/images/khem1.jpg";
import Rahul from "../../Assets/images/rahul1.jpg";
import awek from "../../Assets/images/awek1.jpg";
import fazil from "../../Assets/images/fazil1.jpg";

class About extends Component {
  render() {
    let img = ["card-img-top", classes.img];
    // let cardbody = ["text-center", classes.cardbody];
    const data = [
      { name: "Khemchand Patel", post: "President & Co-Founder", src: Khem },
      { name: "Mohammad Fazil", post: "President & Co-Founder", src: fazil },
      { name: "Rahul S Chauhan", post: "President & Co-Founder", src: Rahul },
      { name: "Awek Toppo", post: "President & Co-Founder", src: awek },
    ];
    let cards = [];
    for (let i = 0; i < 4; i++) {
      cards.push(
        <MDBCol>
          <MDBCard className={classes.card}>
            <MDBCardImage className="img-fluid" src={data[i].src} waves />
            <MDBCardBody className={classes.cardbody}>
              <MDBCardTitle className="card-title">
                <strong>{data[i].name}</strong>
              </MDBCardTitle>

              <p className="font-weight-bold blue-text">{data[i].post}</p>

              <MDBCardText>
                Sed ut perspiciatis unde omnis iste natus sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam.
              </MDBCardText>

              <MDBCol md="12" className="d-flex justify-content-center">
                <a href="!#" className="px-2 fa-lg li-ic">
                  <MDBIcon fab icon="linkedin-in"></MDBIcon>
                </a>

                <a href="!#" className="px-2 fa-lg tw-ic">
                  <MDBIcon fab icon="twitter"></MDBIcon>
                </a>

                <a href="!#" className="px-2 fa-lg fb-ic">
                  <MDBIcon fab icon="facebook-f"></MDBIcon>
                </a>
              </MDBCol>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      );
    }
    return (
      <div className={classes.maincontainer}>
        <div className={classes.container}>
          <img
            alt="img"
            src="https://mdbootstrap.com/img/Photos/Horizontal/People/6-col/img%20%283%29.jpg"
            className={classes.mainImg}
          />

          <div className={classes.disc}>
            <p className={classes.header}>About us</p>
            <p className={classes.article}>
              Shopping website(created By Team: Alpha_Bits). Website includes
              features for Searhing, Viewing, Buying and Selling various
              products such as clothes, smartphones, Laptop etc..
            </p>
            <p className={classes.prj}>Project includes : </p>
            <p className={classes.project}>
              Frontend - React.js, Bootstrap, Redux
            </p>
            <p className={classes.project2}>App - ReactNative(android&ios)</p>
            <p className={classes.project2}>Backend- Node.js</p>
          </div>
        </div>
        <p className={classes.heading}>Team Leadership</p>
        <div className={classes.cardcontainer}>
          <MDBRow>{cards}</MDBRow>
        </div>
      </div>
    );
  }
}
export default About;
