import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css";
import "./login";
import validator from "validator";
const Signup = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const Senddata = async () => {
    if (
      data.password === data.confirmpassword &&
      data.password.length > 0 &&
      data.email.length > 0 &&
      validator.isEmail(data.email)
    ) {
      axios({
        url: "http://localhost:3005/signup",
        method: "POST",
        headers: {},
        data: {
          email: data.email,
          password: data.password,
          confirmpassword: data.confirmpassword,
        },
      }).then((res) => {
          res.send(alert(`${data.email} added successfully`));
        }).catch((res) => {
          Navigate("/")
          console.log(res);
        });
    } else {
      if (data.email.length === 0) {
        alert("email cannot be empty");
      } else if (!validator.isEmail(data.email)) {
        alert("email is not valid");
      } else if (data.password.length === 0) {
        alert("password cannot be empty");
      } else {
        alert("password and confirm password should be same");
      }
    }
  };

  return (
    <div>
      <div className="signup_container">
        <div className="signup">
          <div>
            <h1 className="h1logo">Logo</h1> <br />
            <p>Create New Account</p>
            <input
              type="email"
              name="email"
              placeholder="Mail ID"
              className="signupip"
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
            />{" "}
            <br />
            <input
              type="password"
              name="password"
              className="signupip"
              placeholder="Password"
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />{" "}
            <br />
            <input
              type="password"
              name="confirmpassword"
              className="signupip"
              placeholder="Confirm Password"
              onChange={(e) => {
                setData({ ...data, confirmpassword: e.target.value });
              }}
            />
            <button onClick={Senddata}>Sign Up</button> <br />
          </div>
        </div>
        <p
          className="signinfooter"
          onClick={() => {
            Navigate("/");
          }}
        >
          Sign in
        </p>
      </div>
    </div>
  );
};

export default Signup;
