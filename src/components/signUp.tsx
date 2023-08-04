import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { BACKEND } from "../../env";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Input, Row } from "reactstrap";
// import { useAuth } from "../context/AuthContext";

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login, authenticated } = useAuth();
  const navigate = useNavigate();
  console.log(authenticated);
  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BACKEND}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Erro ao efetuar reistro");
      }

      const data = await response.json();

      // login(data?.token);
      alert(data?.message);
      navigate("/");
      console.log("User", username);
    } catch (err: any) {
      alert(err?.message);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#242424",
        color: "rgba(255, 255, 255, 0.871)",
        height: "100vh",
      }}
      className="w-100 d-flex align-items-center justify-content-center flex-column"
    >
      <Row>
        <Col className="d-flex justify-content-start">
          <Link to={"/"} className="btn btn-info">
            Go back
          </Link>
        </Col>
      </Row>
      <form
        onSubmit={handleRegister}
        method="post"
        className="d-flex flex-column gap-2 border border-1 p-3 mt-4"
      >
        <h2>Login</h2>
        <Input
          type="text"
          placeholder="User"
          value={username}
          name={"username"}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          value={password}
          name={"password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          name={"confirmPassword"}
          style={{
            border: `${
              password != confirmPassword ||
              confirmPassword?.trim()?.length == 0
                ? "solid 3px red"
                : "solid 3px green"
            }`,
          }}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          color={`${
            password != confirmPassword || confirmPassword?.trim()?.length == 0
              ? "danger"
              : "success"
          }`}
          disabled={
            password != confirmPassword || confirmPassword?.trim()?.length == 0
          }
          outline
          type="submit"
        >
          Register
        </Button>
        <Row>
          <Col className="text-center">
            I <Link to={"/signup"}> don't have an account </Link>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default SignUpForm;
