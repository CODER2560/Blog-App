import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";        

const Header: React.FC = () => {
    return (
        <div className="header">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className="header-title">
                        Blog App
                    </Typography>
                    <div className="header-links">
                        <Link to="/">Home</Link>
                        <Link to="/register">Register</Link>
                        <Link to="/">Login</Link>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;