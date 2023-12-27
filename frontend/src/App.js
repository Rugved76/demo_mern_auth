import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./Authentication";
import { Navbar } from './Navbar';
import { Home } from "./Home";
import './App.css';

export const url = `http://localhost:4000`

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
