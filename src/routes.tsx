import { Routes, Route } from "react-router-dom";
import App from "./App";
import LoginForm from "./components/login";
import SignUpForm from "./components/signUp";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="*" element={<>PAGE NOT FOUND</>} />
      </Routes>
    </>
  );
}
