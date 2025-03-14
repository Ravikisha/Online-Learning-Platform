import { useState } from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { toast } from "react-toastify";

// import "./RegisterForm.css";

export default function LoginForm() {
  const [formData, setFormData] = useState({});

  const updateFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async () => {
    const response = await fetch("http://localhost:3000/api/v1/user/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log(response);
    // console.log(result);
    if (!result.success) {
      throw new Error(result.message);
    }

    return result;
  };

  const handleUserRegistration = async () => {
    toast.promise(registerUser, {
      loading: "Registering user...",
      success: { render: ({ data }) => data.message },
      error: { render: ({ data }) => data.message },
    });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-[80vh] w-[40vw] flex-col gap-8 rounded-2xl bg-white px-28 py-8">
        <h1 className="font-roboto my-4 text-center text-5xl font-bold text-[#3B3C44]">
          Login
        </h1>

        <TextField
          name="email"
          type="email"
          placeholder="Email address"
          onChange={updateFormData}
        />

        <TextField
          name="password"
          placeholder="Enter password"
          type="password"
          onChange={updateFormData}
        />

        <Button onClick={handleUserRegistration}>Login</Button>
      </div>
    </div>
  );
}
