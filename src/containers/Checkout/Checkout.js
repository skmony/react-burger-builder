import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

import { connect } from "react-redux";

class Checkout extends Component {
  CheckoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  CheckoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
    console.log(this.props);
  };
  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : "";
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.CheckoutCancelledHandler}
            checkoutContinued={this.CheckoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);