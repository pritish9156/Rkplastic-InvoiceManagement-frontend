import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
    getDashboardReport,
    getGSTSummary,
    getInvoicesBetweenDates,
    downloadAllPdf,
    downloadDatePdf,
    downloadExcel
} from "../api/reportApi";

import {
    FileText,
    Download,
    Calendar,
    IndianRupee,
    Receipt,
    BadgePercent
} from "lucide-react";

import "../styles/reports.css";

import SalesChart
    from "../components/reports/SalesChart";

import GSTChart
    from "../components/reports/GSTChart";

import { getMonthlySales } from "../api/reportApi";



function Reports() {

    const [dashboard, setDashboard] = useState({});

    const [gst, setGst] = useState({});

    const [reports, setReports] = useState([]);

    const [startDate, setStartDate] = useState("");

    const [endDate, setEndDate] = useState("");

    const [monthlySales,
        setMonthlySales]

        =
        useState([]);

    useEffect(() => {

        loadDashboard();

        loadGST();

        loadMonthlySales();

    }, []);

    const loadDashboard = async () => {

        const res = await getDashboardReport();

        setDashboard(res.data);

    };

    const loadGST = async () => {

        const res = await getGSTSummary();

        setGst(res.data);

    };

    const searchReport = async () => {

        if (!startDate || !endDate) {

            alert("Select Start & End Date");

            return;

        }

        const res = await getInvoicesBetweenDates(
            startDate,
            endDate
        );

        setReports(res.data);

    };

    const loadMonthlySales =
        async()=>{

        const res=

        await getMonthlySales();

        setMonthlySales(

        res.data

        );

    };

    return (

        <MainLayout>

            <div className="reports-page">

                <h2 className="page-title">

                    Reports Dashboard

                </h2>

                <div className="report-cards">

                    <div className="report-card">

                        <Receipt size={34} />

                        <h5>Total Invoices</h5>

                        <h2>{dashboard.totalInvoices}</h2>

                    </div>

                    <div className="report-card">

                        <IndianRupee size={34} />

                        <h5>Today's Sales</h5>

                        <h2>₹ {dashboard.todaySales}</h2>

                    </div>

                    <div className="report-card">

                        <Calendar size={34} />

                        <h5>Monthly Sales</h5>

                        <h2>₹ {dashboard.monthlySales}</h2>

                    </div>

                    <div className="report-card">

                        <BadgePercent size={34} />

                        <h5>GST Collected</h5>

                        <h2>₹ {dashboard.gstCollected}</h2>

                    </div>

                </div>

                <div className="premium-card mt-4">

                    <h4>

                        Invoice Report

                    </h4>

                    <div className="row mt-3">

                        <div className="col-md-4">

                            <label>

                                Start Date

                            </label>

                            <input

                                type="date"

                                className="form-control"

                                value={startDate}

                                onChange={(e) =>

                                    setStartDate(e.target.value)

                                }

                            />

                        </div>

                        <div className="col-md-4">

                            <label>

                                End Date

                            </label>

                            <input

                                type="date"

                                className="form-control"

                                value={endDate}

                                onChange={(e) =>

                                    setEndDate(e.target.value)

                                }

                            />

                        </div>

                        <div className="col-md-4 d-flex align-items-end">

                            <button

                                className="btn btn-primary w-100"

                                onClick={searchReport}

                            >

                                Search Report

                            </button>

                        </div>

                    </div>

                    <div className="mt-4 d-flex gap-3 flex-wrap">

                        <button

                            className="btn btn-success"

                            onClick={downloadAllPdf}

                        >

                            <Download size={18} />

                            Download All PDF

                        </button>

                        <button

                            className="btn btn-warning"

                            onClick={() =>

                                downloadDatePdf(

                                    startDate,

                                    endDate

                                )

                            }

                        >

                            <FileText size={18} />

                            Download Date PDF

                        </button>

                        <button

                            className="btn btn-dark"

                            onClick={downloadExcel}

                        >

                            Export Excel

                        </button>

                    </div>

                </div>

                <div className="premium-card mt-4">

                    <table className="table table-hover">

                        <thead>

                            <tr>

                                <th>Bill No</th>

                                <th>Date</th>

                                <th>Customer</th>

                                <th>Total</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                reports.map(

                                    bill =>

                                        <tr key={bill.id}>

                                            <td>

                                                {bill.billNo}

                                            </td>

                                            <td>

                                                {bill.billDate}

                                            </td>

                                            <td>

                                                {bill.customer?.name}

                                            </td>

                                            <td>

                                                ₹ {bill.grandTotal}

                                            </td>

                                        </tr>

                                )

                            }

                        </tbody>

                    </table>

                </div>

                <div className="row mt-4">

                    <div className="col-lg-8">

                        <SalesChart

                            monthlyData={monthlySales}

                        />

                    </div>

                    <div className="col-lg-4">

                        <GSTChart

                            gst={gst}

                        />

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default Reports;