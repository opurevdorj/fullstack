import React, { useState } from "react";
import "./SignIn.css";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const validateForm = yup.object().shape({
  email: yup.string().email("Invalid email address").required(),
  password: yup.string().required(),

  checkbox: yup.boolean().oneOf([true], "Must check the box").required(),
});

export const SignIn = () => {
  const navigate = useNavigate();
  const navigateToSignUpPage = () => {
    navigate("/sign-up");
  };

  const [formValues, setFormValues] = useState({
    password: "",
    email: "",
    checkbox: "",
  });

  const [formErrors, setFormErrors] = useState({
    checkbox: true,
    email: "",
    password: "",
    required: "",
  });

  const handleInput = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    yup
      .reach(validateForm, name)
      .validate(value)
      .then((res) => {
        setFormValues({ ...formValues, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.message });
      });

    setFormValues({ ...formValues, [name]: value });
  };

  const handleSignIn = async (e) => {
    if (
      // checks if any inputs are empty
      formValues.email === "" ||
      formValues.password === "" ||
      formValues.checkbox === false
    ) {
      setFormErrors({ ...formErrors, required: "All inputs must be required" });
    } else if (
      // checks if there is any errors
      formErrors.email !== "" ||
      formErrors.password !== "" ||
      formErrors.checkbox !== ""
    ) {
      setFormErrors({ ...formErrors, required: "All error must be cleared" });
    } else {
      setFormErrors({ ...formErrors, required: "" })
        //   await signInWithEmailAndPassword(
        //     auth,
        //     formValues.email,
        //     formValues.password
        //   )
        .then((response) => {
          console.log(response);
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
          setFormErrors({ ...formErrors, required: error.message });
        });
    }
  };

  return (
    <div id="container">
      <div id="title">Welcome </div>

      <div id="inputContainer">
        <div className="inputNames">Email address</div>
        <input
          className="inputs"
          value={formValues.email}
          placeholder="Enter your email address"
          onChange={handleInput}
          name="email"
        />
        <div id="notification">{formErrors.email}</div>

        <div className="inputNames">Password</div>

        <input
          type="password"
          className="inputs"
          value={formValues.password}
          placeholder="Enter your password"
          onChange={handleInput}
          name="password"
        />
        <div id="notification">{formErrors.password}</div>
      </div>
      <div id="notification">{formErrors.checkbox}</div>
      <div id="notification">{formErrors.required}</div>
      <div id="signUpContainer">
        <button id="signupButton" onClick={handleSignIn}>
          Sign In
        </button>
      </div>
      <div id="haveAccount">
        Don't have an account?
        <button className="signInandSignUp" onClick={navigateToSignUpPage}>
          Sign Up
        </button>
      </div>
    </div>
  );
};
