import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import { getAllInvoices } from "../api/billApi";

import "../styles/dashboard.css"

function Dashboard() {

    const [loading, setLoading] = useState(true);

    const [invoices, setInvoices] = useState([]);

    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            setLoading(true);

            const response = await getAllInvoices();

            const data = response.data;

            setInvoices(data);

            const revenue = data.reduce(

                (sum, invoice) =>

                    sum +

                    Number(invoice.grandTotal || 0),

                0

            );

            setTotalRevenue(revenue);

        }

        catch (e) {

            console.log(e);

        }

        finally {

            setLoading(false);

        }

    };

    const latestInvoices =

        [...invoices]

            .sort((a, b) => b.billNo - a.billNo)

            .slice(0, 5);

    return (

        <MainLayout>

            <div className="dashboard-header">

                <div>

                    <h2>

                        Welcome 👋

                    </h2>

                    <p>

                        RK Plastics Invoice Management Dashboard

                    </p>

                </div>

                <div>

                    <span className="badge bg-primary fs-6">

                        {

                            new Date().toLocaleDateString()

                        }

                    </span>

                </div>

            </div>

            {/* KPI */}

            <div className="row g-4">

                <div className="col-lg-4">

                    <div className="dashboard-stat-card blue">

                        <small>

                            Total Invoices

                        </small>

                        {

                            loading ?

                            <div className="placeholder-glow">

                                <span className="placeholder col-6"></span>

                            </div>

                            :

                            <h2>

                                {invoices.length}

                            </h2>

                        }

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="dashboard-stat-card green">

                        <small>

                            Revenue

                        </small>

                        {

                            loading ?

                            <div className="placeholder-glow">

                                <span className="placeholder col-8"></span>

                            </div>

                            :

                            <h2>

                                ₹ {totalRevenue.toLocaleString()}

                            </h2>

                        }

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="dashboard-stat-card purple">

                        <small>

                            Latest Invoice

                        </small>

                        <h2>

                            {

                                invoices.length

                                ?

                                invoices[invoices.length-1].billNo

                                :

                                "-"

                            }

                        </h2>

                    </div>

                </div>

            </div>

            {/* Quick Actions */}

            <div className="row mt-4 g-4">

                <div className="col-lg-6">

                    <div className="premium-card">

                        <h4>

                            Quick Actions

                        </h4>

                        <p className="text-muted">

                            Create invoices and manage customers quickly.

                        </p>

                        <div className="d-flex flex-wrap gap-3">

                            <Link

                                to="/invoice/create"

                                className="btn btn-premium"

                            >

                                Create Invoice

                            </Link>

                            <Link

                                to="/customers"

                                className="btn btn-outline-primary"

                            >

                                Customers

                            </Link>

                            <Link

                                to="/reports"

                                className="btn btn-outline-success"

                            >

                                Reports

                            </Link>

                        </div>

                    </div>

                </div>

                <div className="col-lg-6">

                    <div className="premium-card">

                        <h4>

                            Recent Invoices

                        </h4>

                        {

                            loading ?

                            <div className="placeholder-glow">

                                {

                                    [...Array(5)].map((_, i) =>

                                        <p key={i}>

                                            <span className="placeholder col-12"></span>

                                        </p>

                                    )

                                }

                            </div>

                            :

                            latestInvoices.length === 0 ?

                            <p className="text-muted">

                                No invoices available.

                            </p>

                            :

                            latestInvoices.map(invoice =>

                                <div

                                    key={invoice.id}

                                    className="recent-invoice"

                                >

                                    <div>

                                        <strong>

                                            Invoice #{invoice.billNo}

                                        </strong>

                                        <br/>

                                        <small>

                                            {invoice.customer?.name}

                                        </small>

                                    </div>

                                    <strong>

                                        ₹ {Number(invoice.grandTotal).toLocaleString()}

                                    </strong>

                                </div>

                            )

                        }

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default Dashboard;