import {
    Link,
    useLocation
}
    from "react-router-dom";

import logo from "../assets/logo.ico";


function Navbar() {

    const location =
        useLocation();

    return (

        <nav className="premium-navbar">

            <div className="container-fluid">

                <Link to="/" style={{textDecoration: "none"}}>

                <div className="logo-section">

                    <img
                        src={logo}
                        alt="RK Plastics Logo"
                        width="50"
                        height="50"
                    />

                    <div>

                        <h4 className="mb-0">
                            RK Plastics And Enterprises
                        </h4>

                        <small>
                            Invoice Management
                        </small>

                    </div>

                </div>

                </Link>

                <div className="nav-links">

                    <Link

                        className={

                            location.pathname === "/"

                                ?

                                "nav-link active"

                                :

                                "nav-link"

                        }

                        to="/"

                    >

                        Dashboard

                    </Link>

                    <Link

                        className={

                            location.pathname === "/invoice/create"

                                ?

                                "nav-link active"

                                :

                                "nav-link"

                        }

                        to="/invoice/create"

                    >

                        Create Invoice

                    </Link>

                    <Link

                        className={

                            location.pathname === "/invoices"

                                ?

                                "nav-link active"

                                :

                                "nav-link"

                        }

                        to="/invoices"

                    >

                        Invoices

                    </Link>

                    <Link

                        className={

                            location.pathname === "/customers"

                                ?

                                "nav-link active"

                                :

                                "nav-link"

                        }

                        to="/customers"

                    >

                        Customers

                    </Link>

                    <Link
                        className="nav-link"
                        to="/reports"
                    >
                        Reports
                    </Link>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;