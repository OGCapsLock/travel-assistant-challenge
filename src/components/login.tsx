import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { BACKEND } from "../../env";
import { useNavigate } from "react-router-dom";
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
      className="w-100"
      style={{
        backgroundColor: "#242424",
        color: "rgba(255, 255, 255, 0.871)",
        height: "100vh",
      }}
    >
      <h2>Formulário de Login</h2>
      <form onSubmit={handleLogin} method="post">
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          name={"username"}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          name={"password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
