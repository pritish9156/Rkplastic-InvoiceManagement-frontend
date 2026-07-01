import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.ico";
import "../styles/global.css";

function Navbar() {

    const location = useLocation();

    const [expanded, setExpanded] = useState(false);

    const closeMenu = () => setExpanded(false);

    return (

        <nav className="navbar navbar-expand-lg premium-navbar sticky-top">

            <div className="container-fluid">

                <Link
                    to="/"
                    className="navbar-brand d-flex align-items-center text-decoration-none"
                    onClick={closeMenu}
                >

                    <img
                        src={logo}
                        alt="RK Plastics Logo"
                        className="navbar-logo"
                    />

                    <div className="ms-3">

                        <h5 className="brand-title mb-0">

                            RK Plastics & Enterprises

                        </h5>

                        <small className="brand-subtitle">

                            Invoice Management System

                        </small>

                    </div>

                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setExpanded(!expanded)}
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div
                    className={
                        expanded
                            ? "collapse navbar-collapse show"
                            : "collapse navbar-collapse"
                    }
                >

                    <ul className="navbar-nav ms-auto align-items-lg-center">

                        <li className="navbar-item">

                            <Link
                                to="/"
                                onClick={closeMenu}
                                className={
                                    location.pathname === "/"
                                        ? "navbar-link active-nav"
                                        : "navbar-link"
                                }
                            >

                                Dashboard

                            </Link>

                        </li>

                        <li className="navbar-item">

                            <Link
                                to="/invoice/create"
                                onClick={closeMenu}
                                className={
                                    location.pathname === "/invoice/create"
                                        ? "navbar-link active-nav"
                                        : "navbar-link"
                                }
                            >

                                Create Invoice

                            </Link>

                        </li>

                        <li className="navbar-item">

                            <Link
                                to="/invoices"
                                onClick={closeMenu}
                                className={
                                    location.pathname === "/invoices"
                                        ? "navbar-link active-nav"
                                        : "navbar-link"
                                }
                            >

                                Invoices

                            </Link>

                        </li>

                        <li className="navbar-item">

                            <Link
                                to="/customers"
                                onClick={closeMenu}
                                className={
                                    location.pathname === "/customers"
                                        ? "navbar-link active-nav"
                                        : "navbar-link"
                                }
                            >

                                Customers

                            </Link>

                        </li>

                        <li className="navbar-item">

                            <Link
                                to="/reports"
                                onClick={closeMenu}
                                className={
                                    location.pathname === "/reports"
                                        ? "navbar-link active-nav"
                                        : "navbar-link"
                                }
                            >

                                Reports

                            </Link>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;