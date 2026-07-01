import {
    useEffect,
    useState
}
from "react";

import toast
from "react-hot-toast";

import MainLayout
from "../layouts/MainLayout";

import {

    getAllInvoices,
    deleteInvoice

}
from "../api/billApi";

import {
    Link
}
from "react-router-dom";

function InvoiceList() {

    const [
        search,
        setSearch
    ] = useState("");

    const [
        invoices,
        setInvoices
    ] = useState([]);

    useEffect(() => {

        loadInvoices();

    }, []);

    const loadInvoices =
        async () => {

            try {

                const response =
                    await getAllInvoices();

                setInvoices(
                    response.data
                );

            }
            catch {

                toast.error(
                    "Failed to load invoices"
                );

            }

        };

    const handleDelete =
        async (id) => {

            const confirmDelete =
                window.confirm(
                    "Delete Invoice ?"
                );

            if(!confirmDelete)
                return;

            try {

                await deleteInvoice(
                    id
                );

                toast.success(
                    "Invoice Deleted"
                );

                loadInvoices();

            }
            catch {

                toast.error(
                    "Delete Failed"
                );

            }

        };

    const downloadPdf =
        (id) => {

            window.open(

                `http://rkplastic-backend.onrender.com/api/bills/${id}/pdf`

            );

        };

    const filteredInvoices =

        invoices.filter(

            invoice =>

                invoice.billNo
                    ?.toString()
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                invoice.customer?.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

        );

    return (

        <MainLayout>

            <div className="premium-card">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h3>

                        Invoice Management

                    </h3>

                    <Link

                        to="/invoice/create"

                        className="btn btn-success"

                    >

                        + New Invoice

                    </Link>

                </div>

                <input

                    className="form-control mb-4"

                    placeholder="Search Bill No or Customer"

                    value={search}

                    onChange={(e)=>

                        setSearch(
                            e.target.value
                        )

                    }

                />

                <div className="table-responsive">

                    <table className="table premium-table">

                        <thead>

                            <tr>

                                <th>Bill No</th>

                                <th>Date</th>

                                <th>Customer</th>

                                <th>Total</th>

                                <th>Status</th>

                                <th width="300">

                                    Actions

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredInvoices.length === 0

                                ?

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center"
                                    >

                                        No Invoice Found

                                    </td>

                                </tr>

                                :

                                filteredInvoices.map(

                                    invoice =>

                                        <tr
                                            key={
                                                invoice.id
                                            }
                                        >

                                            <td>

                                                <strong>

                                                    {
                                                        invoice.billNo
                                                    }

                                                </strong>

                                            </td>

                                            <td>

                                                {
                                                    invoice.billDate
                                                }

                                            </td>

                                            <td>

                                                {
                                                    invoice.customer?.name
                                                }

                                            </td>

                                            <td>

                                                ₹ {

                                                    Number(
                                                        invoice.grandTotal || 0
                                                    )

                                                    .toLocaleString()

                                                }

                                            </td>

                                            <td>

                                                <span
                                                    className="badge bg-success"
                                                >

                                                    Generated

                                                </span>

                                            </td>

                                            <td>

                                                <div className="d-flex gap-2">

                                                    <button

                                                        className="btn btn-sm btn-danger"

                                                        onClick={()=>

                                                            downloadPdf(
                                                                invoice.id
                                                            )

                                                        }

                                                    >

                                                        PDF

                                                    </button>

                                                    <Link

                                                        to={`/invoice/${invoice.id}`}

                                                        className="btn btn-sm btn-info"

                                                    >

                                                        View

                                                    </Link>

                                                    <Link

                                                        to={`/invoice/edit/${invoice.id}`}

                                                        className="btn btn-sm btn-warning"

                                                    >

                                                        Edit

                                                    </Link>

                                                    <button

                                                        className="btn btn-sm btn-dark"

                                                        onClick={()=>

                                                            handleDelete(
                                                                invoice.id
                                                            )

                                                        }

                                                    >

                                                        Delete

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </MainLayout>

    );

}

export default InvoiceList;