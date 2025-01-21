import React from "react";
import { Button, Card, Input } from "@ui5/webcomponents-react";
import logo from "../../../assets/sap.svg"
import "./Login.css";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="login">
    <Card className="login-card-container">
      <div className="login-card">
        <div className="logo">
            <img src={logo} width="100" alt="logo"></img>
        </div>
        <div className="login-body">
          <div className="form-group">
            <label htmlFor="">Username</label>
            <Input
              className="form-control username"
              type="Text"
              valueState="None"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Password</label>
            <Input
              className="form-control password"
              type="Password"
              valueState="None"
            />
          <Link to="forget-password" className="forget-password">Forget Password?</Link>
          </div>
        </div>
        <Button className="login-button" design="Emphasized">
          Sign In
        </Button>
      </div>
    </Card>
    </div>
  );
};

export default Login;
