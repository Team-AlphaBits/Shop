import React, { Component } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCol,
  MDBRow,
  MDBIcon,
} from "mdbreact";
import classes from "./About.module.css";
import Khem from "../../Assets/images/pic3.jpeg";
import Rahul from "../../Assets/images/rahul1.jpg";
import awek from "../../Assets/images/awek1.jpg";
import fazil from "../../Assets/images/fazil1.jpg";
import cook from "../../Assets/images/cook2.jpg";
import { connect } from "react-redux";
import * as actions from "../../Store/Action/index";
import mainImage from '../../Assets/images/detailsImage-1.jpg'

class About extends Component {
  render() {
    let img = ["card-img-top", classes.img];
    // let cardbody = ["text-center", classes.cardbody];
    const data = [
      {
        name: "Khemchand Patel",
        post: "President & Co-Founder",
        src: Khem,
        linkedin: "https://www.linkedin.com/in/khemchand-patel-7b60991b2/",
        cc: "https://www.codechef.com/users/kn8rider",
        skill:
          "Full Stack Web Developer , Android App Developer & Competetive Programmer.",
      },
      {
        name: "Mohammad Fazil",
        post: "President & Co-Founder",
        src: fazil,
        linkedin: "https://www.linkedin.com/in/mohammad-fazil-2200991b2/",
        cc: "https://www.codechef.com/users/mohammad_fazil",
        skill: "Full Stack M.E.R.N Developer & Competetive Programmer.",
      },
      {
        name: "Rahul S Chauhan",
        post: "President & Co-Founder",
        src: Rahul,
        linkedin: "https://www.linkedin.com/in/rahul-s-chauhan-005223199",
        cc: "https://www.codechef.com/users/rahulschauhan",
        skill:
          "Full Stack Web Developer , Android App Developer & Competetive Programmer.",
      },
      {
        name: "Awek Toppo",
        post: "President & Co-Founder",
        src: awek,
        linkedin: "https://www.linkedin.com/in/awek-toppo-0574801a0",
        cc: "https://www.codechef.com/users/dezx20",
        skill: "Full Stack M.E.A.N Developer & Competetive Programmer.",
      },
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

              <p className={classes.skill}>{data[i].skill}</p>

              <MDBCol md="12" className="d-flex justify-content-center">
                <a href={data[i].linkedin} className="px-2 fa-lg li-ic">
                  <MDBIcon fab icon="linkedin-in"></MDBIcon>
                </a>

                <a href={data[i].cc} className="px-2 fa-lg tw-ic">
                  <img src={cook} className={classes.cook} alt="some"/>
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
          <img alt="img" src={mainImage} className={classes.mainImg} />

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
const mapDispatchToprops = (dispatch) => {
  return {
    authCheckout: () => dispatch(actions.authCheckState()),
  };
};
export default connect(null,mapDispatchToprops)(About);
