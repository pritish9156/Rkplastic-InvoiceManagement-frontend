import {
    useEffect,
    useState
}
from "react";

import {
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

function InvoiceView() {

    const { id } =
        useParams();

    const [
        invoice,
        setInvoice
    ] = useState(null);

    useEffect(() => {

        loadInvoice();

    }, []);

    const loadInvoice =
        async () => {

            try {

                const response =
                    await getInvoice(id);

                setInvoice(
                    response.data
                );

            }
            catch {

                toast.error(
                    "Failed To Load Invoice"
                );

            }

        };

    const downloadPdf =
        () => {

            window.open(

                `http://rkplastic-backend.onrender.com/api/bills/${invoice.id}/pdf`

            );

        };

    if (!invoice) {

        return (

            <MainLayout>

                <div className="premium-card">

                    Loading...

                </div>

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>

                    Invoice Details

                </h2>

                <button

                    className="btn btn-danger"

                    onClick={
                        downloadPdf
                    }

                >

                    Download PDF

                </button>

            </div>

            <div className="row">

                <div className="col-lg-6">

                    <div className="premium-card">

                        <h4>

                            Customer Details

                        </h4>

                        <hr />

                        <p>

                            <strong>

                                Name :

                            </strong>

                            {" "}

                            {invoice.customer?.name}

                        </p>

                        <p>

                            <strong>

                                GSTIN :

                            </strong>

                            {" "}

                            {invoice.customer?.gstin}

                        </p>

                        <p>

                            <strong>

                                Phone :

                            </strong>

                            {" "}

                            {invoice.customer?.phone}

                        </p>

                        <p>

                            <strong>

                                Address :

                            </strong>

                            {" "}

                            {invoice.customer?.address}

                        </p>

                    </div>

                </div>

                <div className="col-lg-6">

                    <div className="premium-card">

                        <h4>

                            Invoice Information

                        </h4>

                        <hr />

                        <p>

                            <strong>

                                Bill No :

                            </strong>

                            {" "}

                            {invoice.billNo}

                        </p>

                        <p>

                            <strong>

                                Bill Date :

                            </strong>

                            {" "}

                            {invoice.billDate}

                        </p>

                        <p>

                            <strong>

                                Challan No :

                            </strong>

                            {" "}

                            {invoice.challanNoField}

                        </p>

                        <p>

                            <strong>

                                Customer Challan :

                            </strong>

                            {" "}

                            {invoice.custChallanNoField}

                        </p>

                        <p>

                            <strong>

                                Order Code :

                            </strong>

                            {" "}

                            {invoice.orderCode}

                        </p>

                        <p>

                            <strong>

                                Vendor Code :

                            </strong>

                            {" "}

                            {invoice.vendorCode}

                        </p>

                    </div>

                </div>

            </div>

            <div className="premium-card mt-4">

                <h4>

                    Invoice Items

                </h4>

                <table className="table">

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

                            invoice.items?.map(

                                item =>

                                    <tr
                                        key={
                                            item.id
                                        }
                                    >

                                        <td>

                                            {
                                                item.description
                                            }

                                        </td>

                                        <td>

                                            {
                                                item.hsnSac
                                            }

                                        </td>

                                        <td>

                                            {
                                                item.qty
                                            }

                                        </td>

                                        <td>

                                            {
                                                item.rate
                                            }

                                        </td>

                                        <td>

                                            {
                                                item.amount
                                            }

                                        </td>

                                    </tr>

                            )

                        }

                    </tbody>

                </table>

            </div>

            <div className="row mt-4">

                <div className="col-lg-4 ms-auto">

                    <div className="premium-card">

                        <h4>

                            Invoice Summary

                        </h4>

                        <hr />

                        <div className="summary-row">

                            <span>

                                Sub Total

                            </span>

                            <strong>

                                ₹ {invoice.subtotal}

                            </strong>

                        </div>

                        <div className="summary-row">

                            <span>

                                CGST

                            </span>

                            <strong>

                                ₹ {invoice.cgst}

                            </strong>

                        </div>

                        <div className="summary-row">

                            <span>

                                SGST

                            </span>

                            <strong>

                                ₹ {invoice.sgst}

                            </strong>

                        </div>

                        <div className="summary-row">

                            <span>

                                IGST

                            </span>

                            <strong>

                                ₹ {invoice.igst}

                            </strong>

                        </div>

                        <hr />

                        <div className="summary-total">

                            <span>

                                Grand Total

                            </span>

                            <strong>

                                ₹ {invoice.grandTotal}

                            </strong>

                        </div>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default InvoiceView;