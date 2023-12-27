import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import React, { useState } from "react";
import { url } from "./App";
import axios from "axios";


export const Auth = () => {
    return (
        <div className="auth">
            <Register />  <Login />
        </div>
    );
};


const Login = () => {

    const [, setCookies] = useCookies(["access_token"]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const result = await axios.post(`${url}/auth/login`, {
                username,
                password,
            });
            // console.log(result.config);
            setCookies("access_token", result.data.token);
            window.localStorage.setItem("userID", result.data.userID);
            console.log(`Logged in successfully!`);
            navigate("/");
        } catch (error) {
            console.log('Error occured :', error);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2 style={{ color: 'white', marginBottom: '2rem' }}>Login</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button className="submit" type="submit">Login</button>
            </form>
        </div>
    );
};

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${url}/auth/register`, {
                username,
                password,
            });
            alert("Registration Completed! Now login.");
            console.log('Registration Completed! Now login.');
        } catch (error) {
            console.log('Error occured :', error);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2 style={{ color: 'white', marginBottom: '2rem' }}>Register</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button className="submit" type="submit">Register</button>
            </form>
        </div>
    );
};