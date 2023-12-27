import { ToastContainer, toast } from 'react-toastify';
import React, { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import './App.css';

export const Home = () => {
    const [cookies] = useCookies(["access_token"]);
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = () => {
            // Decode the JWT and extract the username
            if (cookies.access_token) {
                const decodedToken = jwtDecode(cookies.access_token);
                console.log({ "jwt_token": cookies.access_token });
                console.log('jwt token verified!');
                setUsername(decodedToken.username);

                // Show a toast notification
                toast(`Welcome, ${decodedToken.username}!`, { autoClose: 3000 });
            } else {
                // If there's no access_token, navigate to the /auth page
                console.log('No jwt token');
                navigate("/auth");
            }
        };

        checkAuthentication();
    }, [cookies.access_token, navigate]);

    return (
        <div className="home-container">
            <h1 className="welcome-text">Welcome to the Secret Page, {username}</h1>
            <ToastContainer />
        </div>
    );
};
