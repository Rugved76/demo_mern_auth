import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import './App.css'

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.clear();
        navigate("/auth");
    };

    return (
        <div className="navbar">
            <Link className="nav-item" to='/'>
                <h3 className="logo">Authentication</h3>
            </Link>
            <div className="asl">
                {!cookies.access_token ? (
                    <Link className='nav-item' to="/auth">Login</Link>
                ) : (
                    <div>
                        <button className="submit" onClick={logout}> Logout </button>
                    </div>
                )}
            </div>
        </div>
    );
};
