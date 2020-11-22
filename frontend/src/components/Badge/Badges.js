import React from "react";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import classes from "./Badges.module.css";
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 0,
    // border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

export default function CustomizedBadges(props) {
let content = '0';
  if(props.cart){
    if(props.cart.length){
      content = props.cart.length
    }
  }
  else if(props.cartLogin){
    if(props.cartLogin.length){
      content = props.cartLogin.length
    }
  }

  return (
    <IconButton aria-label="cart" className={classes.icon}>
      <StyledBadge badgeContent={content} color="secondary" style={{color: "white"}}>
        <ShoppingCartIcon/>
      </StyledBadge>
    </IconButton>
  );
}
