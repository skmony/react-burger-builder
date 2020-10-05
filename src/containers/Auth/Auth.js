import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinners from "../../components/UI/Spinners/Spinners";
import { checkValidity } from "../../shared/checkvalidity";

import classes from "./Auth.css";

import * as actions from "../../store/actions/";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
        valueType: "E-Mail",
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 8,
          maxLength: 15,
        },
        valid: false,
        touched: false,
        valueType: "password",
      },
    },
    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.building && this.props.authRedirect !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }
  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };
  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };
  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return {
        isSignup: !prevState.isSignup,
      };
    });
  };
  render() {
    const formElementsArray = [];

    for (let item in this.state.controls) {
      formElementsArray.push({
        key: item,
        config: this.state.controls[item],
      });
    }

    const form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.key}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        touched={formElement.config.touched}
        shouldValidate={formElement.config.validation}
        valueType={formElement.config.valueType}
        changed={(event) => this.inputChangedHandler(event, formElement.key)}
      />
    ));
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirect} />;
    }
    const displayData = this.props.loading ? (
      <Spinners />
    ) : (
      <div className={classes.Auth}>
        {authRedirect}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          Switch to {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
    return displayData;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    isAuthenticated: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirect: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    omSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
