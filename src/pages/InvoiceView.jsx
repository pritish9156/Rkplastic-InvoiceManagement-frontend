import {

    useEffect,
    useState

}
from "react";

import {

    useNavigate,
    useParams

}
from "react-router-dom";

import toast
from "react-hot-toast";

import MainLayout
from "../layouts/MainLayout";

import {

    getInvoice

}
from "../api/billApi";

import "../styles/invoice.css"

function InvoiceView() {

    const { id } =
        useParams();

    const navigate =
        useNavigate();

    const [

        invoice,

        setInvoice

    ] = useState(null);

    const [

        loading,

        setLoading

    ] = useState(true);

    useEffect(() => {

        loadInvoice();

    }, []);

    const loadInvoice =
        async()=>{

            try{

                setLoading(true);

                const response=

                    await getInvoice(id);

                setInvoice(

                    response.data

                );

            }

            catch{

                toast.error(

                    "Unable to load invoice."

                );

            }

            finally{

                setLoading(false);

            }

        };

    const downloadPdf = ()=>{

        if(!invoice)

            return;

        window.open(

            `https://rkplastic-backend.onrender.com/api/bills/${invoice.id}/pdf`

        );

    };

    const formatCurrency=(value)=>{

        return `₹ ${Number(

            value || 0

        ).toLocaleString(

            "en-IN",

            {

                minimumFractionDigits:2,

                maximumFractionDigits:2

            }

        )}`;

    };

    if(loading){

        return(

            <MainLayout>

                <div className="premium-card">

                    <div className="placeholder-glow">

                        <span className="placeholder col-12 mb-3"></span>

                        <span className="placeholder col-10 mb-3"></span>

                        <span className="placeholder col-8 mb-3"></span>

                        <span className="placeholder col-6"></span>

                    </div>

                </div>

            </MainLayout>

        );

    }

    if(!invoice){

        return(

            <MainLayout>

                <div className="premium-card text-center">

                    <h3>

                        Invoice Not Found

                    </h3>

                    <button

                        className="btn btn-premium mt-3"

                        onClick={()=>

                            navigate("/invoices")

                        }

                    >

                        Back to Invoices

                    </button>

                </div>

            </MainLayout>

        );

    }

    return (

    <MainLayout>

        {/* ===========================
                PAGE HEADER
        ============================ */}

        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-4">

            <div>

                <h2 className="page-title mb-1">

                    Invoice Details

                </h2>

                <p className="text-muted mb-0">

                    View complete invoice information.

                </p>

            </div>

            <div className="d-flex gap-2 mt-3 mt-lg-0">

                <button

                    className="btn btn-premium"

                    onClick={downloadPdf}

                >

                    📄 Download PDF

                </button>

                <button

                    className="btn btn-outline-secondary"

                    onClick={()=>

                        navigate("/invoices")

                    }

                >

                    ← Back

                </button>

            </div>

        </div>

        <div className="row g-4">

            {/* LEFT */}

            <div className="col-xl-8">

                {/* Customer */}

                <div className="premium-card">

                    <div className="customer-header">

                        <div>

                            <h4>

                                {invoice.customer?.name}

                            </h4>

                            <small>

                                GST Registered Customer

                            </small>

                        </div>

                        <span className="badge bg-success">

                            Active

                        </span>

                    </div>

                    <hr/>

                    <div className="row">

                        <div className="col-md-6">

                            <strong>

                                Address

                            </strong>

                            <p>

                                {invoice.customer?.address}

                            </p>

                        </div>

                        <div className="col-md-3">

                            <strong>

                                GSTIN

                            </strong>

                            <p>

                                {invoice.customer?.gstin}

                            </p>

                        </div>

                        <div className="col-md-3">

                            <strong>

                                Phone

                            </strong>

                            <p>

                                {

                                    invoice.customer?.phone ||

                                    "-"

                                }

                            </p>

                        </div>

                    </div>

                </div>

                {/* Invoice Information */}

                <div className="premium-card mt-4">

                    <h4>

                        Invoice Information

                    </h4>

                    <hr/>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <strong>

                                Bill Number

                            </strong>

                            <p>

                                #{invoice.billNo}

                            </p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>

                                Bill Date

                            </strong>

                            <p>

                                {invoice.billDate}

                            </p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>

                                Challan No

                            </strong>

                            <p>

                                {

                                    invoice.challanNoField ||

                                    "-"

                                }

                            </p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>

                                Customer Challan

                            </strong>

                            <p>

                                {

                                    invoice.custChallanNoField ||

                                    "-"

                                }

                            </p>

                        </div>

                        <div className="col-md-6">

                            <strong>

                                Order Code

                            </strong>

                            <p>

                                {

                                    invoice.orderCode ||

                                    "-"

                                }

                            </p>

                        </div>

                        <div className="col-md-6">

                            <strong>

                                Vendor Code

                            </strong>

                            <p>

                                {

                                    invoice.vendorCode ||

                                    "-"

                                }

                            </p>

                        </div>

                    </div>

                </div>

                {/* Items */}

                <div className="premium-card mt-4">

                    <h4>

                        Invoice Items

                    </h4>

                    <div className="table-responsive mt-3">

                        <table className="table premium-item-table">

                            <thead>

                            <tr>

                                <th>

                                    Description

                                </th>

                                <th>

                                    HSN/SAC

                                </th>

                                <th>

                                    Qty

                                </th>

                                <th>

                                    Rate

                                </th>

                                <th>

                                    Amount

                                </th>

                            </tr>

                            </thead>

                            <tbody>

                            {

                                invoice.items?.map(item=>

                                    <tr key={item.id}>

                                        <td>

                                            {item.description}

                                        </td>

                                        <td>

                                            {item.hsnSac}

                                        </td>

                                        <td>

                                            {item.qty}

                                        </td>

                                        <td>

                                            {formatCurrency(item.rate)}

                                        </td>

                                        <td>

                                            <strong>

                                                {

                                                    formatCurrency(

                                                        item.amount

                                                    )

                                                }

                                            </strong>

                                        </td>

                                    </tr>

                                )

                            }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            {/* RIGHT */}

            <div className="col-xl-4">

                <div className="sticky-summary">

                                        <div className="premium-card">

                        <h4 className="mb-4">

                            Invoice Summary

                        </h4>

                        <div className="summary-row">

                            <span>

                                Sub Total

                            </span>

                            <strong>

                                {

                                    formatCurrency(

                                        invoice.subtotal

                                    )

                                }

                            </strong>

                        </div>

                        <div className="summary-row">

                            <span>

                                CGST (9%)

                            </span>

                            <strong>

                                {

                                    formatCurrency(

                                        invoice.cgst

                                    )

                                }

                            </strong>

                        </div>

                        <div className="summary-row">

                            <span>

                                SGST (9%)

                            </span>

                            <strong>

                                {

                                    formatCurrency(

                                        invoice.sgst

                                    )

                                }

                            </strong>

                        </div>

                        <div className="summary-row">

                            <span>

                                IGST (18%)

                            </span>

                            <strong>

                                {

                                    formatCurrency(

                                        invoice.igst

                                    )

                                }

                            </strong>

                        </div>

                        <hr/>

                        <div className="summary-total">

                            <span>

                                Grand Total

                            </span>

                            <strong>

                                {

                                    formatCurrency(

                                        invoice.grandTotal

                                    )

                                }

                            </strong>

                        </div>

                    </div>

                    {/* Amount In Words */}

                    <div className="premium-card mt-4">

                        <h5>

                            Amount In Words

                        </h5>

                        <p className="mb-0 text-muted">

                            {

                                invoice.amountInWords ||

                                "-"

                            }

                        </p>

                    </div>

                    {/* GST Details */}

                    <div className="premium-card mt-4">

                        <h5 className="mb-3">

                            GST Information

                        </h5>

                        <div className="status-row">

                            <span>

                                Tax Type

                            </span>

                            <strong>

                                {

                                    invoice.igstApplied

                                    ?

                                    "IGST"

                                    :

                                    "CGST + SGST"

                                }

                            </strong>

                        </div>

                        <div className="status-row">

                            <span>

                                Invoice Status

                            </span>

                            <span className="badge bg-success">

                                Generated

                            </span>

                        </div>

                        <div className="status-row">

                            <span>

                                PDF

                            </span>

                            <span className="badge bg-primary">

                                Available

                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </MainLayout>

);

}

export default InvoiceView;