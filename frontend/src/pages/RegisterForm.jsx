import { useState } from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import { toast } from "react-toastify";


export default function RegisterForm() {
  const [formData, setFormData] = useState({});

  const halfWidthTextfieldStyles = {
    width: "48%",
    height: "3.75rem",
  };

  const updateFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async () => {
    const response = await fetch("http://localhost:3000/api/v1/user/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.firstname + " " + formData.lastname,
        email: formData.email,
        password: formData.password,
      }),
    });

    const result = await response.json();
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
          Start Learning
        </h1>

        <div className="flex items-center justify-between rounded-lg">
          <TextField
            placeholder="First name"
            name="firstname"
            style={halfWidthTextfieldStyles}
            onChange={updateFormData}
          />
          <TextField
            placeholder="Last name"
            name="lastname"
            style={halfWidthTextfieldStyles}
            onChange={updateFormData}
          />
        </div>

        <TextField
          name="email"
          type="email"
          placeholder="Email addresses"
          onChange={updateFormData}
        />

        <TextField
          name="password"
          placeholder="Enter password"
          type="password"
          onChange={updateFormData}
        />

        <div className="flex items-center justify-between">
          <label
            htmlFor="joiningas"
            className="font-comfortaa text-2xl text-[#9A999F]"
          >
            I'm joining as a:
          </label>
          <Dropdown
            name="joiningas"
            options={[
              { value: "student", label: "Student" },
              { value: "teacher", label: "Teacher" },
            ]}
            onChange={updateFormData}
          />
        </div>

        <Button onClick={handleUserRegistration}>Register</Button>
      </div>
    </div>
  );
}
