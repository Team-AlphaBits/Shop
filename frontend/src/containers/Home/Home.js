import React, { Component } from "react";
import Header from "../../components/Icons/headers";
import { MDBRow, MDBContainer, MDBCol } from "mdbreact";
// import classes from "./Home.module.css";
import { connect } from "react-redux";
import * as actions from "../../Store/Action/index";
import Clothes from "../../Cards/Clothes/Clothes";
import BabyProducts from "../../Cards/BabyProducts/BabyProducts";
import StaticCards from "../../Cards/StaticCards/StaticCards";
import Carousel from "../../components/carousel/carousel";
import classes from "./Home.module.css";
class Home extends Component {
  componentDidMount() {
    this.props.onFetchData();
    this.props.authCheckout();
  }
 AddedtoCart = (id) =>{
 this.props.addTocart(id)
 }
  changeUrl = (id) =>{
    this.props.history.push({
      pathname: "/details",
      hash: "#items",
      search: "?" + id,
    });
  };
  render() {
    return (
      <div style={{ backgroundColor: "#eeeef0" }}>
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
        <p className={classes.headcloth}>
          Great Deals on Clothings up-to 30-40% off :
        </p>
        <Clothes data={this.props.Data} change={this.changeUrl} cartAdd = {this.AddedtoCart}/>
        <p className={classes.headcloth}>Special Offers on Gaming Devices</p>
        <BabyProducts data={this.props.Data} change={this.changeUrl} />
        <p className={classes.headcloth}>Crazy Deals on Books :</p>
        <StaticCards data={this.props.Data} change={this.changeUrl} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    signedUp: state.Login.signuped,
    Data: state.Login.Data,
    success: state.Login.FetchSuccess,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchData: () => dispatch(actions.getData()),
    authCheckout: () => dispatch(actions.authCheckState()),
    addTocart: (id) => dispatch(actions.addToCart(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
