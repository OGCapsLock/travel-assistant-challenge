import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { BACKEND } from "../../env";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Input, Row } from "reactstrap";
// import { useAuth } from "../context/AuthContext";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, authenticated } = useAuth();
  const navigate = useNavigate();
  console.log(authenticated);
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BACKEND}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Erro ao efetuar login");
      }

      const data = await response.json();

      login(data?.token);
      navigate("/");
      console.log("User", username);
    } catch (err) {
      alert("Nao foi possivel concluir o login, tente novamente");
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
        onSubmit={handleLogin}
        method="post"
        className="d-flex flex-column gap-2 border border-1 p-3 mt-4"
      >
        <h2>Login</h2>
        <Input
          type="text"
          placeholder="Usuário"
          value={username}
          name={"username"}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          name={"password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button color="success" outline type="submit">
          Login
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

export default LoginForm;
