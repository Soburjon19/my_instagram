import React from 'react';
import NavBar from './NavBar';
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <NavBar/>
            <div className="content">
                <Outlet/>
            </div>
        </>
    );
};

export default Layout;
