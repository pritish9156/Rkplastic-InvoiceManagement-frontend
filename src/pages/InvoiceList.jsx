import { useEffect, useMemo, useState } from "react";

import toast from "react-hot-toast";

import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {

    getAllInvoices,
    deleteInvoice

}
    from "../api/billApi";

import "../styles/global.css"

function InvoiceList() {

    const [

        invoices,

        setInvoices

    ] = useState([]);

    const [

        loading,

        setLoading

    ] = useState(true);

    const [

        deleting,

        setDeleting

    ] = useState(null);

    const [

        search,

        setSearch

    ] = useState("");

    useEffect(() => {

        loadInvoices();

    }, []);

    const loadInvoices =

        async () => {

            try {

                setLoading(true);

                const response =

                    await getAllInvoices();

                setInvoices(

                    response.data

                );

            }

            catch {

                toast.error(

                    "Failed to load invoices."

                );

            }

            finally {

                setLoading(false);

            }

        };

    const handleDelete =

        async (id) => {

            const confirmDelete =

                window.confirm(

                    "Delete this invoice?"

                );

            if (!confirmDelete)

                return;

            try {

                setDeleting(id);

                await deleteInvoice(id);

                toast.success(

                    "Invoice deleted successfully."

                );

                loadInvoices();

            }

            catch {

                toast.error(

                    "Delete failed."

                );

            }

            finally {

                setDeleting(null);

            }

        };

    const downloadPdf = (id) => {

        const link = document.createElement("a");

        link.href = `https://rkplastic-backend.onrender.com/api/bills/${id}/pdf`;

        link.target = "_blank";

        link.rel = "noopener noreferrer";

        document.body.appendChild(link);

        link.click();

        setTimeout(() => {

            document.body.removeChild(link);

        }, 100);

    };

    const filteredInvoices =

        useMemo(

            () => {

                return invoices.filter(

                    invoice => {

                        const keyword =

                            search.toLowerCase();

                        return (

                            invoice.billNo

                                ?.toString()

                                .includes(keyword)

                            ||

                            invoice.customer?.name

                                ?.toLowerCase()

                                .includes(keyword)

                        );

                    }

                );

            },

            [

                invoices,

                search

            ]

        );

    const totalRevenue =

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

    const latestInvoice =

        invoices.length

            ?

            Math.max(

                ...invoices.map(

                    invoice =>

                        invoice.billNo

                )

            )

            :

            "-";

    return (

        <MainLayout>

            {/* =============================
                PAGE HEADER
        ============================== */}

            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-4">

                <div>

                    <h2 className="page-title mb-1">

                        Invoice Management

                    </h2>

                    <p className="text-muted mb-0">

                        View, manage and download all invoices.

                    </p>

                </div>

                <Link

                    to="/invoice/create"

                    className="btn btn-premium mt-3 mt-lg-0"

                >

                    + Create Invoice

                </Link>

            </div>

            {/* =============================
                DASHBOARD CARDS
        ============================== */}

            <div className="row g-4 mb-4">

                <div className="col-lg-4">

                    <div className="premium-stat-card">

                        {

                            loading ?

                                <div className="placeholder-glow">

                                    <span className="placeholder col-8"></span>

                                </div>

                                :

                                <>

                                    <small>

                                        Total Invoices

                                    </small>

                                    <h2>

                                        {invoices.length}

                                    </h2>

                                </>

                        }

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="premium-stat-card success">

                        {

                            loading ?

                                <div className="placeholder-glow">

                                    <span className="placeholder col-8"></span>

                                </div>

                                :

                                <>

                                    <small>

                                        Total Revenue

                                    </small>

                                    <h2>

                                        ₹ {totalRevenue.toLocaleString()}

                                    </h2>

                                </>

                        }

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="premium-stat-card warning">

                        {

                            loading ?

                                <div className="placeholder-glow">

                                    <span className="placeholder col-8"></span>

                                </div>

                                :

                                <>

                                    <small>

                                        Latest Bill No

                                    </small>

                                    <h2>

                                        #{latestInvoice}

                                    </h2>

                                </>

                        }

                    </div>

                </div>

            </div>

            {/* =============================
                TABLE CARD
        ============================== */}

            <div className="premium-card">

                <div className="table-header">

                    <div>

                        <h4>

                            All Invoices

                        </h4>

                        <small>

                            Search invoices by Bill Number or Customer Name.

                        </small>

                    </div>

                    <div
                        style={{
                            maxWidth: "380px",
                            width: "100%"
                        }}
                    >

                        <input

                            className="form-control premium-input"

                            placeholder="🔍 Search Bill No / Customer"

                            value={search}

                            onChange={(e) =>

                                setSearch(

                                    e.target.value

                                )

                            }

                        />

                    </div>

                </div>

                {

                    loading ?

                        <>

                            {

                                [...Array(8)].map((_, index) =>

                                    <div

                                        key={index}

                                        className="placeholder-glow mb-3"

                                    >

                                        <span className="placeholder col-12 rounded"></span>

                                    </div>

                                )

                            }

                        </>

                        :

                        filteredInvoices.length === 0 ?

                            <div className="text-center py-5">

                                <img

                                    src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"

                                    width="90"

                                    alt="Empty"

                                />

                                <h4 className="mt-3">

                                    No Invoices Found

                                </h4>

                                <p className="text-muted">

                                    Try another search keyword.

                                </p>

                            </div>

                            :

                            <div className="d-none d-lg-block">

                                <div className="table-responsive">

                                    <table className="table premium-item-table align-middle">

                                        <thead>

                                            <tr>

                                                <th>

                                                    Bill No

                                                </th>

                                                <th>

                                                    Date

                                                </th>

                                                <th>

                                                    Customer

                                                </th>

                                                <th>

                                                    Amount

                                                </th>

                                                <th>

                                                    Status

                                                </th>

                                                <th width="320">

                                                    Actions

                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {

                                                filteredInvoices.map((invoice) => (

                                                    <tr key={invoice.id}>

                                                        <td>

                                                            <span className="fw-bold text-primary">

                                                                #{invoice.billNo}

                                                            </span>

                                                        </td>

                                                        <td>

                                                            {invoice.billDate}

                                                        </td>

                                                        <td>

                                                            <div>

                                                                <strong>

                                                                    {invoice.customer?.name}

                                                                </strong>

                                                                <br />

                                                                <small className="text-muted">

                                                                    {invoice.customer?.gstin || "No GST"}

                                                                </small>

                                                            </div>

                                                        </td>

                                                        <td>

                                                            <span className="fw-bold text-success">

                                                                ₹ {Number(invoice.grandTotal).toLocaleString()}

                                                            </span>

                                                        </td>

                                                        <td>

                                                            <span className="badge bg-success">

                                                                Generated

                                                            </span>

                                                        </td>

                                                        <td>

                                                            <div className="d-flex flex-wrap gap-2">

                                                                <button

                                                                    className="btn btn-danger btn-sm"

                                                                    onClick={() =>

                                                                        downloadPdf(invoice.id)

                                                                    }

                                                                >

                                                                    📄 PDF

                                                                </button>

                                                                <Link

                                                                    className="btn btn-info btn-sm"

                                                                    to={`/invoice/${invoice.id}`}

                                                                >

                                                                    👁 View

                                                                </Link>

                                                                <Link

                                                                    className="btn btn-warning btn-sm"

                                                                    to={`/invoice/edit/${invoice.id}`}

                                                                >

                                                                    ✏ Edit

                                                                </Link>

                                                                <button

                                                                    className="btn btn-dark btn-sm"

                                                                    disabled={

                                                                        deleting === invoice.id

                                                                    }

                                                                    onClick={() =>

                                                                        handleDelete(invoice.id)

                                                                    }

                                                                >

                                                                    {

                                                                        deleting === invoice.id ?

                                                                            <>

                                                                                <span className="spinner-border spinner-border-sm"></span>

                                                                            </>

                                                                            :

                                                                            "🗑 Delete"

                                                                    }

                                                                </button>

                                                            </div>

                                                        </td>

                                                    </tr>

                                                ))

                                            }

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                }

            </div>

            {/* ===========================
                MOBILE VIEW
        ============================ */}

            <div className="d-lg-none mt-4">

                {

                    !loading &&

                    filteredInvoices.map(invoice =>

                        <div

                            key={invoice.id}

                            className="premium-card mb-3"

                        >

                            <div className="d-flex justify-content-between">

                                <h5>

                                    #{invoice.billNo}

                                </h5>

                                <span className="badge bg-success">

                                    Generated

                                </span>

                            </div>

                            <p className="mb-1">

                                <strong>

                                    {invoice.customer?.name}

                                </strong>

                            </p>

                            <small className="text-muted">

                                {invoice.billDate}

                            </small>

                            <h5 className="mt-3 text-success">

                                ₹ {Number(invoice.grandTotal).toLocaleString()}

                            </h5>

                            <div className="d-grid gap-2 mt-3">

                                <button

                                    className="btn btn-danger"

                                    onClick={() =>

                                        downloadPdf(invoice.id)

                                    }

                                >

                                    Download PDF

                                </button>

                                <Link

                                    className="btn btn-info"

                                    to={`/invoice/${invoice.id}`}

                                >

                                    View

                                </Link>

                                <Link

                                    className="btn btn-warning"

                                    to={`/invoice/edit/${invoice.id}`}

                                >

                                    Edit

                                </Link>

                                <button

                                    className="btn btn-dark"

                                    disabled={

                                        deleting === invoice.id

                                    }

                                    onClick={() =>

                                        handleDelete(invoice.id)

                                    }

                                >

                                    {

                                        deleting === invoice.id

                                            ?

                                            "Deleting..."

                                            :

                                            "Delete"

                                    }

                                </button>

                            </div>

                        </div>

                    )

                }

            </div>

        </MainLayout>

    );

}

export default InvoiceList;