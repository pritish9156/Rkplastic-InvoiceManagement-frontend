import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";

import {

    FileText,
    Download,
    Calendar,
    IndianRupee,
    Receipt,
    BadgePercent

}
from "lucide-react";

import "../styles/reports.css";

import SalesChart
from "../components/reports/SalesChart";

import GSTChart
from "../components/reports/GSTChart";

import {

    getDashboardReport,
    getGSTSummary,
    getInvoicesBetweenDates,
    downloadAllPdf,
    downloadDatePdf,
    downloadExcel,
    getMonthlySales

}
from "../api/reportApi";

import "../styles/reports.css"

function Reports() {

    const [

        dashboard,

        setDashboard

    ] = useState({});

    const [

        gst,

        setGst

    ] = useState({});

    const [

        reports,

        setReports

    ] = useState([]);

    const [

        monthlySales,

        setMonthlySales

    ] = useState([]);

    const [

        startDate,

        setStartDate

    ] = useState("");

    const [

        endDate,

        setEndDate

    ] = useState("");

    const [

        loading,

        setLoading

    ] = useState(true);

    const [

        searching,

        setSearching

    ] = useState(false);

    const [

        exporting,

        setExporting

    ] = useState(false);

    useEffect(() => {

        loadDashboardData();

    }, []);

    const loadDashboardData =

        async()=>{

            try{

                setLoading(true);

                const [

                    dashboardRes,

                    gstRes,

                    monthlyRes

                ] = await Promise.all([

                    getDashboardReport(),

                    getGSTSummary(),

                    getMonthlySales()

                ]);

                setDashboard(

                    dashboardRes.data

                );

                setGst(

                    gstRes.data

                );

                setMonthlySales(

                    monthlyRes.data

                );

            }

            catch{

                toast.error(

                    "Unable to load reports."

                );

            }

            finally{

                setLoading(false);

            }

        };

    const searchReport =

        async()=>{

            if(

                !startDate ||

                !endDate

            ){

                toast.error(

                    "Select Start & End Date"

                );

                return;

            }

            try{

                setSearching(true);

                const response=

                    await getInvoicesBetweenDates(

                        startDate,

                        endDate

                    );

                setReports(

                    response.data

                );

            }

            catch{

                toast.error(

                    "Search failed."

                );

            }

            finally{

                setSearching(false);

            }

        };

    const handleDownloadAll =

        async()=>{

            try{

                setExporting(true);

                await downloadAllPdf();

            }

            finally{

                setExporting(false);

            }

        };

    const handleDownloadDate =

        async()=>{

            if(

                !startDate ||

                !endDate

            ){

                toast.error(

                    "Please select date range."

                );

                return;

            }

            try{

                setExporting(true);

                await downloadDatePdf(

                    startDate,

                    endDate

                );

            }

            finally{

                setExporting(false);

            }

        };

    const handleExcel =

        async()=>{

            try{

                setExporting(true);

                await downloadExcel();

            }

            finally{

                setExporting(false);

            }

        };

        return (

    <MainLayout>

        <div className="reports-page">

            {/* ===================================
                    HEADER
            ==================================== */}

            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-4">

                <div>

                    <h2 className="page-title mb-1">

                        Reports Dashboard

                    </h2>

                    <p className="text-muted mb-0">

                        Analytics, GST Reports & Business Insights

                    </p>

                </div>

                <div className="mt-3 mt-lg-0">

                    <span className="badge bg-primary fs-6">

                        {

                            new Date()

                            .toLocaleDateString()

                        }

                    </span>

                </div>

            </div>

            {/* ===================================
                    KPI CARDS
            ==================================== */}

            <div className="row g-4">

                <div className="col-lg-3 col-md-6">

                    <div className="report-card blue-card">

                        <Receipt size={36} />

                        {

                            loading ?

                            <div className="placeholder-glow mt-3">

                                <span className="placeholder col-8"></span>

                            </div>

                            :

                            <>

                                <h5>

                                    Total Invoices

                                </h5>

                                <h2>

                                    {dashboard.totalInvoices}

                                </h2>

                            </>

                        }

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="report-card green-card">

                        <IndianRupee size={36} />

                        {

                            loading ?

                            <div className="placeholder-glow mt-3">

                                <span className="placeholder col-8"></span>

                            </div>

                            :

                            <>

                                <h5>

                                    Today's Sales

                                </h5>

                                <h2>

                                    ₹ {

                                        Number(

                                            dashboard.todaySales || 0

                                        ).toLocaleString()

                                    }

                                </h2>

                            </>

                        }

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="report-card purple-card">

                        <Calendar size={36} />

                        {

                            loading ?

                            <div className="placeholder-glow mt-3">

                                <span className="placeholder col-8"></span>

                            </div>

                            :

                            <>

                                <h5>

                                    Monthly Sales

                                </h5>

                                <h2>

                                    ₹ {

                                        Number(

                                            dashboard.monthlySales || 0

                                        ).toLocaleString()

                                    }

                                </h2>

                            </>

                        }

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="report-card orange-card">

                        <BadgePercent size={36} />

                        {

                            loading ?

                            <div className="placeholder-glow mt-3">

                                <span className="placeholder col-8"></span>

                            </div>

                            :

                            <>

                                <h5>

                                    GST Collected

                                </h5>

                                <h2>

                                    ₹ {

                                        Number(

                                            dashboard.gstCollected || 0

                                        ).toLocaleString()

                                    }

                                </h2>

                            </>

                        }

                    </div>

                </div>

            </div>

            {/* ===================================
                    FILTER CARD
            ==================================== */}

            <div className="premium-card mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h4>

                            Invoice Report

                        </h4>

                        <small className="text-muted">

                            Filter invoices using a custom date range.

                        </small>

                    </div>

                </div>

                <div className="row g-3">

                    <div className="col-lg-4">

                        <label>

                            Start Date

                        </label>

                        <input

                            type="date"

                            className="form-control premium-input"

                            value={startDate}

                            onChange={(e)=>

                                setStartDate(

                                    e.target.value

                                )

                            }

                        />

                    </div>

                    <div className="col-lg-4">

                        <label>

                            End Date

                        </label>

                        <input

                            type="date"

                            className="form-control premium-input"

                            value={endDate}

                            onChange={(e)=>

                                setEndDate(

                                    e.target.value

                                )

                            }

                        />

                    </div>

                    <div className="col-lg-4 d-flex align-items-end">

                        <button

                            className="btn btn-premium w-100"

                            disabled={searching}

                            onClick={searchReport}

                        >

                            {

                                searching ?

                                <>

                                    <span className="spinner-border spinner-border-sm me-2"></span>

                                    Searching...

                                </>

                                :

                                "Search Report"

                            }

                        </button>

                    </div>

                </div>

                {/* =============================
                        EXPORT BUTTONS
                ============================== */}

                <div className="d-flex flex-wrap gap-3 mt-4">

                    <button

                        className="btn btn-success"

                        disabled={exporting}

                        onClick={handleDownloadAll}

                    >

                        <Download size={18}/>

                        <span className="ms-2">

                            All PDF

                        </span>

                    </button>

                    <button

                        className="btn btn-warning"

                        disabled={exporting}

                        onClick={handleDownloadDate}

                    >

                        <FileText size={18}/>

                        <span className="ms-2">

                            Date PDF

                        </span>

                    </button>

                    <button

                        className="btn btn-dark"

                        disabled={exporting}

                        onClick={handleExcel}

                    >

                        {

                            exporting ?

                            <>

                                <span className="spinner-border spinner-border-sm me-2"></span>

                                Exporting...

                            </>

                            :

                            "Export Excel"

                        }

                    </button>

                </div>

            </div>

            {/* ===========================================
                REPORT RESULT
=========================================== */}

<div className="premium-card mt-4">

    <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

            <h4>

                Search Results

            </h4>

            <small className="text-muted">

                {

                    reports.length

                } invoices found

            </small>

        </div>

    </div>

    {

        searching ?

        <>

            {

                [...Array(6)].map((_,index)=>

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

        reports.length===0 ?

        <div className="empty-state">

            <Receipt

                size={70}

                className="text-secondary"

            />

            <h4 className="mt-3">

                No Reports Found

            </h4>

            <p>

                Search using a date range to generate invoice reports.

            </p>

        </div>

        :

        <>

            {/* ==========================
                    DESKTOP TABLE
            ========================== */}

            <div className="table-responsive d-none d-lg-block">

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

                            GSTIN

                        </th>

                        <th>

                            Grand Total

                        </th>

                        <th>

                            Status

                        </th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        reports.map(bill=>

                            <tr key={bill.id}>

                                <td>

                                    <strong>

                                        #{bill.billNo}

                                    </strong>

                                </td>

                                <td>

                                    {

                                        bill.billDate

                                    }

                                </td>

                                <td>

                                    {

                                        bill.customer?.name

                                    }

                                </td>

                                <td>

                                    {

                                        bill.customer?.gstin

                                    }

                                </td>

                                <td>

                                    <strong className="text-success">

                                        ₹ {

                                            Number(

                                                bill.grandTotal

                                            )

                                            .toLocaleString()

                                        }

                                    </strong>

                                </td>

                                <td>

                                    <span className="badge bg-success">

                                        Generated

                                    </span>

                                </td>

                            </tr>

                        )

                    }

                    </tbody>

                </table>

            </div>

            {/* ==========================
                    MOBILE VIEW
            ========================== */}

            <div className="d-lg-none">

                {

                    reports.map(bill=>

                        <div

                            key={bill.id}

                            className="premium-card report-mobile-card mb-3"

                        >

                            <div className="d-flex justify-content-between">

                                <h5>

                                    Invoice #{bill.billNo}

                                </h5>

                                <span className="badge bg-success">

                                    Generated

                                </span>

                            </div>

                            <hr/>

                            <p>

                                <strong>

                                    Customer

                                </strong>

                                <br/>

                                {

                                    bill.customer?.name

                                }

                            </p>

                            <p>

                                <strong>

                                    Date

                                </strong>

                                <br/>

                                {

                                    bill.billDate

                                }

                            </p>

                            <p>

                                <strong>

                                    GSTIN

                                </strong>

                                <br/>

                                {

                                    bill.customer?.gstin

                                }

                            </p>

                            <h4 className="text-success mt-3">

                                ₹ {

                                    Number(

                                        bill.grandTotal

                                    )

                                    .toLocaleString()

                                }

                            </h4>

                        </div>

                    )

                }

            </div>

        </>

    }

</div>

{/* ===========================================
                ANALYTICS
=========================================== */}

<div className="row mt-4 g-4">

    {/* ===========================
            SALES CHART
    ============================ */}

    <div className="col-xl-8">

        <div className="premium-card h-100">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h4>

                        Monthly Sales Analytics

                    </h4>

                    <small className="text-muted">

                        Revenue generated month-wise

                    </small>

                </div>

                <span className="badge bg-primary">

                    Sales

                </span>

            </div>

            {

                loading ?

                <div className="chart-loader">

                    <div className="placeholder-glow">

                        <span className="placeholder col-12"></span>

                    </div>

                </div>

                :

                monthlySales.length===0 ?

                <div className="empty-state">

                    <Calendar

                        size={60}

                        className="text-secondary"

                    />

                    <h5 className="mt-3">

                        No Sales Data

                    </h5>

                    <p>

                        Sales chart will appear here once invoices are available.

                    </p>

                </div>

                :

                <SalesChart

                    monthlyData={monthlySales}

                />

            }

        </div>

    </div>

    {/* ===========================
            GST CHART
    ============================ */}

    <div className="col-xl-4">

        <div className="premium-card h-100">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h4>

                        GST Distribution

                    </h4>

                    <small className="text-muted">

                        CGST • SGST • IGST

                    </small>

                </div>

                <span className="badge bg-success">

                    GST

                </span>

            </div>

            {

                loading ?

                <div className="chart-loader">

                    <div className="placeholder-glow">

                        <span className="placeholder col-12"></span>

                    </div>

                </div>

                :

                <GSTChart

                    gst={gst}

                />

            }

            <hr/>

            <div className="mt-3">

                <div className="summary-row">

                    <span>

                        CGST

                    </span>

                    <strong>

                        ₹ {

                            Number(

                                gst.totalCGST || 0

                            ).toLocaleString()

                        }

                    </strong>

                </div>

                <div className="summary-row">

                    <span>

                        SGST

                    </span>

                    <strong>

                        ₹ {

                            Number(

                                gst.totalSGST || 0

                            ).toLocaleString()

                        }

                    </strong>

                </div>

                <div className="summary-row">

                    <span>

                        IGST

                    </span>

                    <strong>

                        ₹ {

                            Number(

                                gst.totalIGST || 0

                            ).toLocaleString()

                        }

                    </strong>

                </div>

                <hr/>

                <div className="summary-total">

                    <span>

                        Total GST

                    </span>

                    <strong>

                        ₹ {

                            Number(

                                (gst.totalCGST || 0)

                                +

                                (gst.totalSGST || 0)

                                +

                                (gst.totalIGST || 0)

                            ).toLocaleString()

                        }

                    </strong>

                </div>

            </div>

        </div>

    </div>

</div>

</div>

</MainLayout>

);

}

export default Reports;