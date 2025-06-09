import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Input,
  BusyIndicator,
  MessageStrip,
  Icon,
  Label,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/hide.js";
import "@ui5/webcomponents-icons/dist/show.js";
import axios from "../../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/sap.svg";
import "./SetPassword.css";

const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from query params
  const token = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing token.");
    }
  }, [token]);

  const handleSetPassword = async () => {
    if (!password) {
      setError("Password is required!");
      return;
    }

    if(password!=confirmPassword){
        setError("Password didn't match!")
        return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post("/users/set-password", {
        token,
        password,
      });

      setSuccess("Password set successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="set-password">
    <Card className="set-password-card-container">
      <div className="set-password-card">
        <div className="logo">
          <img src={logo} width="100" alt="logo" />
        </div>
        <div className="error-container">
          {error && (
            <MessageStrip design="Negative" onClose={() => setError("")}>
              {error}
            </MessageStrip>
          )}
        </div>
        <div className="set-password-body">
          <div className="form-group">
            <Label>New Password</Label>
            <Input
                type={showPassword ? "Text" : "Password"}
                name="password"
                value={password}
                className="form-control username"
                onInput={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                icon={
                    <Icon
                    name={showPassword ? "hide" : "show"}
                    clickable
                    onClick={() => setShowPassword(!showPassword)}
                    />
                }
            />
          </div>
          <div className="form-group">
            <Label>Confirm Password</Label>
            <Input
              className="form-control password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password again"
              value={confirmPassword}
              onInput={(e)=> setConfirmPassword(e.target.value)}
              icon={showPassword ? "hide" : "show"}
              onIconClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
        <Button className="set-password-button" design="Emphasized" onClick={handleSetPassword} disabled={loading}>
          {loading ? <BusyIndicator active /> : "Set Password"}
        </Button>
      </div>
    </Card>
  </div>
  
  );
};

export default SetPassword;

    // <div className="set-password-container">
    //   <Card className="set-password-card">
    //     <img src={logo} alt="SAP Logo" className="sap-logo" />

    //     <h2>Set New Password</h2>

    //     {error && (
    //       <MessageStrip design="Negative" hideCloseButton>
    //         {error}
    //       </MessageStrip>
    //     )}
    //     {success && (
    //       <MessageStrip design="Positive" hideCloseButton>
    //         {success}
    //       </MessageStrip>
    //     )}

    //     <Input
    //       type={showPassword ? "Text" : "Password"}
    //       name="password"
    //       value={password}
    //       onInput={(e) => setPassword(e.target.value)}
    //       placeholder="Enter new password"
    //       icon={
    //         <Icon
    //           name={showPassword ? "hide" : "show"}
    //           clickable
    //           onClick={() => setShowPassword(!showPassword)}
    //         />
    //       }
    //       style={{ marginBottom: "1rem" }}
    //     />

    //     <Button onClick={handleSetPassword} design="Emphasized" disabled={loading}>
    //       {loading ? <BusyIndicator size="Small" /> : "Set Password"}
    //     </Button>
    //   </Card>
    // </div>