import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import UserProfile from "./pages/user/userprofile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/profile" element={<UserProfile />} />

        <Route path="*" element={"Not Found. Go to /register"} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
