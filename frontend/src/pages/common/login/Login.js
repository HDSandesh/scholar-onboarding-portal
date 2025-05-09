import React, { useState, useEffect } from "react";
import { Button, Card, Input, BusyIndicator, MessageStrip } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/hide.js"; // Import hide icon
import "@ui5/webcomponents-icons/dist/show.js"; // Import show icon
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/sap.svg";
import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!credentials.email || !credentials.password) {
      setError("Email and Password are required!");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/auth/login", credentials);
      localStorage.setItem("token", response.data.token.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data.token.user))
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <Card className="login-card-container">
        <div className="login-card">
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
          <div className="login-body">
            <div className="form-group">
              <label>Email</label>
              <Input
                className="form-control username"
                type="Text"
                name="email"
                value={credentials.email}
                onInput={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <Input
                className="form-control password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onInput={handleChange}
                icon={showPassword ? "hide" : "show"}
                onIconClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>
          <Button className="login-button" design="Emphasized" onClick={handleLogin} disabled={loading}>
            {loading ? <BusyIndicator active /> : "Sign In"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
