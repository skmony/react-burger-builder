import React from "react";

import classes from "./Logo.css";
import burgerLogo from "../../assests/images/burger.png";

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default logo;
