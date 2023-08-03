import { Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import { useAuth } from './context/AuthContext';
import LoginForm from './components/login';

export default function AppRoutes() {

    return <>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path='*' element={<>PAGE NOT FOUND</>} />
        </Routes>
    </>
}

const Layout= ({ children }:any) => {
    const { authenticated } = useAuth();
  
    return authenticated ? children : <Navigate to="/" replace />;
  };