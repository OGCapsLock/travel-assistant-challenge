import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
const queryClient = new QueryClient();
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "./routes.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthContextProvider>
          <AppRoutes />
        </AuthContextProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
