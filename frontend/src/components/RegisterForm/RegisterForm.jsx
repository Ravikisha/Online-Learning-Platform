import { useState, useEffect } from "react";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";

import "./LoginForm.css";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const halfWidthTextfieldStyles = {
    width: "14rem",
  };
  return (
    <div className="main">
      <div className="login-form">
        <h1 className="login-heading">Start Learning</h1>

        <div
          style={{
            width: "65%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TextField
            placeholder="First name"
            onChange={(e) => setUsername(e.target.value)}
            style={halfWidthTextfieldStyles}
          />
          <TextField
            placeholder="Last name"
            onChange={(e) => setUsername(e.target.value)}
            style={halfWidthTextfieldStyles}
          />
        </div>

        <TextField
          placeholder="Email addresses"
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          placeholder="Enter password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={() => console.log(username, password)}>Login</Button>
      </div>
    </div>
  );
}
