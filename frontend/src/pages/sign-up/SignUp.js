import React, { useState } from "react";
import "./SignUp.css";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const validateForm = yup.object().shape({
  fullname: yup
    .string()
    .min(4, "Must be more than 4 characters")
    .required(),
  email: yup.string().email("Invalid email address").required(),
  password: yup
  .string()
  .required('Please Enter your password')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
  confirmPassword: yup
    .string()
    .required()
    
});

export const SignUp = () => {
  const navigate = useNavigate();
  const navigateToSignInPage = () => {
    navigate("/sign-in");
  };

  const [formValues, setFormValues] = useState({
    fullname: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const handleSignUp = async (e) => {
    try {
      if (formValues.password !== formValues.confirmPassword) {
        // checks if password matches with confirmPassword
        setFormErrors({
          ...formErrors,
          confirmPassword: "Must match with the password",
        });
      } else if (
        // checks if any inputs are empty
        formValues.fullname === "" ||
        formValues.email === "" ||
        formValues.password === "" ||
        formValues.confirmPassword === "" 
      ) {
        setFormErrors({
          ...formErrors,
          required: "All inputs must be required",
        });
      } else if (
        // checks if there is any errors
        formErrors.fullname !== "" ||
        formErrors.email !== "" ||
        formErrors.password !== "" ||
        formErrors.confirmPassword !== "" 
      ) {
        setFormErrors({ ...formErrors, required: "All error must be cleared" });
      } else {
        const response = await axios.post(
          `http://localhost:8080/users/sign-up`,
          formValues
        );
        const user = await response.data;
        
        localStorage.setItem("user", JSON.stringify(user));
        
        setFormValues({ fullname: "", email: "", password: "", confirmPassword: "" });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setFormErrors({ ...formErrors, required: error.message });
    }
  };

  return (
    <div id="container">
      <div id="title">Get Started Now</div>
      <div id="inputContainer">
        <div className="inputNames">Fullname</div>
        <input
          className="inputs"
          placeholder="Enter your fullname"
          onChange={handleInput}
          value={formValues.fullname}
          name="fullname"
        />

        <div id="notification">{formErrors.fullname}</div>

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
        <div className="inputNames">Confirm Password</div>
        <input
          type="password"
          className="inputs"
          value={formValues.confirmPassword}
          placeholder="Confirm your password"
          onChange={handleInput}
          name="confirmPassword"
        />
        <div id="notification">{formErrors.confirmPassword}</div>
      </div>

      <div id="notification">{formErrors.required}</div>
      <div id="signUpContainer">
        <button id="signupButton" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>

      <div id="haveAccount">
        Have an account?
        <button className="signInandSignUp" onClick={navigateToSignInPage}>
          Sign In
        </button>
      </div>
    </div>
  );
};
