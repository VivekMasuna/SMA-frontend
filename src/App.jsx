import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import { AuthContext } from './utils/authContext';

import Home from './pages/Home/index';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Experiments from './pages/Experiments/Experiments';
import AboutPage from './pages/AboutPage/AboutPage';
import NotFound from './components/NotFound';
import ExperimentPage from './pages/ExperimentPage/ExperimentPage';

function App() {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="app">
            <Navbar />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Home user={user} />} />
                    <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                    <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
                    <Route path="/exp" element={user ? <Experiments user={user} /> : <Navigate to="/login" />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/exp/:no" element={user ? <ExperimentPage /> : <Navigate to="/login" />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
