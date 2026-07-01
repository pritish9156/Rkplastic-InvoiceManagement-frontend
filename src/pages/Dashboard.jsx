import { useEffect, useState }
from "react";

import MainLayout
from "../layouts/MainLayout";

import { Link }
from "react-router-dom";

import {
    getAllInvoices
}
from "../api/billApi";

function Dashboard() {

    const [
        totalInvoices,
        setTotalInvoices
    ] = useState(0);

    const [
        totalRevenue,
        setTotalRevenue
    ] = useState(0);

    useEffect(() => {

        loadData();

    }, []);

    const loadData =
        async () => {

            try {

                const response =
                    await getAllInvoices();

                const invoices =
                    response.data;

                setTotalInvoices(
                    invoices.length
                );

                const revenue =

                    invoices.reduce(

                        (
                            sum,
                            invoice
                        ) =>

                            sum +

                            Number(
                                invoice.grandTotal || 0
                            ),

                        0

                    );

                setTotalRevenue(
                    revenue
                );

            }
            catch (error) {

                console.log(error);

            }

        };

    return (

        <MainLayout>

            <div className="dashboard-header">

                <h2>

                    Dashboard

                </h2>

                <p>

                    RK Plastics Invoice Management

                </p>

            </div>

            <div className="row g-4">

                <div className="col-md-4">

                    <div className="stats-card blue-card">

                        <h6>

                            Total Invoices

                        </h6>

                        <h2>

                            {totalInvoices}

                        </h2>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="stats-card green-card">

                        <h6>

                            Revenue

                        </h6>

                        <h2>

                            ₹ {totalRevenue.toLocaleString()}

                        </h2>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="stats-card dark-card">

                        <h6>

                            Customers

                        </h6>

                        <h2>

                            Active

                        </h2>

                    </div>

                </div>

            </div>

            <div className="row mt-4">

                <div className="col-md-6">

                    <div className="premium-card">

                        <h4>

                            Create Invoice

                        </h4>

                        <p>

                            Generate a new GST invoice.

                        </p>

                        <Link

                            to="/invoice/create"

                            className="btn btn-success"

                        >

                            Create Now

                        </Link>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="premium-card">

                        <h4>

                            Manage Invoices

                        </h4>

                        <p>

                            View, edit and download invoices.

                        </p>

                        <Link

                            to="/invoices"

                            className="btn btn-primary"

                        >

                            Open

                        </Link>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default Dashboard;