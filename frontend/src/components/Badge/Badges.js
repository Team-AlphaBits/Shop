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

export default function CustomizedBadges() {
  return (
    <IconButton aria-label="cart" className={classes.icon}>
      <StyledBadge badgeContent={1} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}
