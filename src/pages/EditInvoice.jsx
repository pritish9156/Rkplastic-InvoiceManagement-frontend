import { useEffect, useState } from "react";

import {
    useParams,
    useNavigate
}
from "react-router-dom";

import toast
from "react-hot-toast";

import MainLayout
from "../layouts/MainLayout";

import CustomerSearch
from "../components/CustomerSearch";

import ItemTable
from "../components/ItemTable";

import InvoiceSummary
from "../components/InvoiceSummary";

import {

    getInvoice,
    updateInvoice

}
from "../api/billApi";

import "../styles/create-invoice.css"

function EditInvoice() {

    const { id } =
        useParams();

    const navigate =
        useNavigate();

    const [

        loading,

        setLoading

    ] = useState(true);

    const [

        saving,

        setSaving

    ] = useState(false);

    const [

        customer,

        setCustomer

    ] = useState(null);

    const [

        billNo,

        setBillNo

    ] = useState("");

    const [

        billDate,

        setBillDate

    ] = useState("");

    const [

        challanNoField,

        setChallanNoField

    ] = useState("");

    const [

        custChallanNoField,

        setCustChallanNoField

    ] = useState("");

    const [

        orderCode,

        setOrderCode

    ] = useState("");

    const [

        vendorCode,

        setVendorCode

    ] = useState("");

    const [

        items,

        setItems

    ] = useState([]);

    useEffect(() => {

        loadInvoice();

    }, []);

    const loadInvoice =

        async()=>{

            try{

                setLoading(true);

                const response=

                    await getInvoice(id);

                const bill=

                    response.data;

                setBillNo(

                    bill.billNo

                );

                setBillDate(

                    bill.billDate

                );

                setCustomer(

                    bill.customer

                );

                setItems(

                    bill.items || []

                );

                setChallanNoField(

                    bill.challanNoField || ""

                );

                setCustChallanNoField(

                    bill.custChallanNoField || ""

                );

                setOrderCode(

                    bill.orderCode || ""

                );

                setVendorCode(

                    bill.vendorCode || ""

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

    const subtotal =

        items.reduce(

            (sum,item)=>

                sum+

                Number(item.qty||0)

                *

                Number(item.rate||0),

            0

        );

    const interstate =

        customer?.gstin

            ?

            customer.gstin.substring(0,2)!=="27"

            :

            false;

    const cgst =

        interstate

            ?

            0

            :

            subtotal*0.09;

    const sgst =

        interstate

            ?

            0

            :

            subtotal*0.09;

    const igst =

        interstate

            ?

            subtotal*0.18

            :

            0;

    const grandTotal =

        subtotal+

        cgst+

        sgst+

        igst;

    const saveChanges =

        async()=>{

            if(!customer){

                toast.error(

                    "Please select customer."

                );

                return;

            }

            try{

                setSaving(true);

                const payload={

                    billNo,

                    billDate,

                    customerId:

                    customer.id,

                    challanNoField,

                    custChallanNoField,

                    orderCode,

                    vendorCode,

                    items:items.map(item=>({

                        description:

                        item.description,

                        hsnSac:

                        item.hsnSac,

                        qty:

                        item.qty,

                        rate:

                        item.rate

                    }))

                };

                await updateInvoice(

                    id,

                    payload

                );

                toast.success(

                    "Invoice Updated Successfully"

                );

                navigate(

                    "/invoices"

                );

            }

            catch{

                toast.error(

                    "Update failed."

                );

            }

            finally{

                setSaving(false);

            }

        };

        return (

    <MainLayout>

        <div className="row g-4">

            {/* ===========================
                    LEFT SECTION
            ============================ */}

            <div className="col-xl-8">

                <div className="premium-card">

                    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-4">

                        <div>

                            <h2 className="page-title mb-1">

                                Edit Invoice

                            </h2>

                            <p className="text-muted mb-0">

                                Update existing GST Invoice

                            </p>

                        </div>

                        <span className="badge bg-warning fs-6 mt-3 mt-lg-0">

                            Invoice #{billNo}

                        </span>

                    </div>

                    {/* Invoice Information */}

                    <div className="premium-section">

                        <h5 className="section-title">

                            Invoice Information

                        </h5>

                        {

                            loading ?

                            <div className="placeholder-glow">

                                <span className="placeholder col-12 rounded"></span>

                            </div>

                            :

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label>

                                        Bill Number

                                    </label>

                                    <input

                                        className="form-control premium-input"

                                        value={billNo}

                                        onChange={(e)=>

                                            setBillNo(

                                                e.target.value

                                            )

                                        }

                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>

                                        Bill Date

                                    </label>

                                    <input

                                        type="date"

                                        className="form-control premium-input"

                                        value={billDate}

                                        onChange={(e)=>

                                            setBillDate(

                                                e.target.value

                                            )

                                        }

                                    />

                                </div>

                            </div>

                        }

                    </div>

                    {/* Customer */}

                    <div className="premium-section mt-4">

                        <h5 className="section-title">

                            Customer

                        </h5>

                        <CustomerSearch

                            onCustomerSelect={

                                setCustomer

                            }

                        />

                        {

                            customer &&

                            <div className="customer-preview mt-4">

                                <div className="customer-header">

                                    <div>

                                        <h5>

                                            {customer.name}

                                        </h5>

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

                                            {customer.address}

                                        </p>

                                    </div>

                                    <div className="col-md-3">

                                        <strong>

                                            GSTIN

                                        </strong>

                                        <p>

                                            {customer.gstin}

                                        </p>

                                    </div>

                                    <div className="col-md-3">

                                        <strong>

                                            Phone

                                        </strong>

                                        <p>

                                            {

                                                customer.phone ||

                                                "-"

                                            }

                                        </p>

                                    </div>

                                </div>

                            </div>

                        }

                    </div>

                    {/* Additional Information */}

                    <div className="premium-section mt-4">

                        <h5 className="section-title">

                            Additional Details

                        </h5>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label>

                                    Challan No

                                </label>

                                <input

                                    className="form-control premium-input"

                                    value={challanNoField}

                                    onChange={(e)=>

                                        setChallanNoField(

                                            e.target.value

                                        )

                                    }

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>

                                    Customer Challan

                                </label>

                                <input

                                    className="form-control premium-input"

                                    value={custChallanNoField}

                                    onChange={(e)=>

                                        setCustChallanNoField(

                                            e.target.value

                                        )

                                    }

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>

                                    Order Code

                                </label>

                                <input

                                    className="form-control premium-input"

                                    value={orderCode}

                                    onChange={(e)=>

                                        setOrderCode(

                                            e.target.value

                                        )

                                    }

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>

                                    Vendor Code

                                </label>

                                <input

                                    className="form-control premium-input"

                                    value={vendorCode}

                                    onChange={(e)=>

                                        setVendorCode(

                                            e.target.value

                                        )

                                    }

                                />

                            </div>

                        </div>

                    </div>

                    <div className="mt-4">

                        <ItemTable

                            items={items}

                            setItems={setItems}

                        />

                    </div>

                                    </div>

            </div>

            {/* ===========================
                    RIGHT SIDE
            ============================ */}

            <div className="col-xl-4">

                <div className="sticky-summary">

                    <InvoiceSummary

                        subtotal={subtotal}

                        cgst={cgst}

                        sgst={sgst}

                        igst={igst}

                        grandTotal={grandTotal}

                    />

                    {/* Invoice Status */}

                    <div className="premium-card mt-4">

                        <h5 className="mb-3">

                            Invoice Status

                        </h5>

                        <div className="status-row">

                            <span>

                                Customer

                            </span>

                            <strong>

                                {

                                    customer

                                    ?

                                    customer.name

                                    :

                                    "Not Selected"

                                }

                            </strong>

                        </div>

                        <div className="status-row">

                            <span>

                                Items

                            </span>

                            <strong>

                                {items.length}

                            </strong>

                        </div>

                        <div className="status-row">

                            <span>

                                Tax Type

                            </span>

                            <strong>

                                {

                                    interstate

                                    ?

                                    "IGST"

                                    :

                                    "CGST + SGST"

                                }

                            </strong>

                        </div>

                        <div className="status-row">

                            <span>

                                Grand Total

                            </span>

                            <strong className="text-success">

                                ₹ {grandTotal.toFixed(2)}

                            </strong>

                        </div>

                    </div>

                    {/* Update Button */}

                    <div className="premium-card mt-4">

                        <button

                            className="btn btn-premium btn-lg w-100"

                            disabled={saving}

                            onClick={saveChanges}

                        >

                            {

                                saving ?

                                <>

                                    <span className="spinner-border spinner-border-sm me-2"></span>

                                    Updating Invoice...

                                </>

                                :

                                <>

                                    💾 Update Invoice

                                </>

                            }

                        </button>

                        <button

                            className="btn btn-outline-secondary w-100 mt-3"

                            disabled={saving}

                            onClick={()=>

                                navigate("/invoices")

                            }

                        >

                            ← Back to Invoices

                        </button>

                        <small className="text-muted d-block text-center mt-3">

                            Changes will update the invoice and regenerate the latest PDF.

                        </small>

                    </div>

                </div>

            </div>

        </div>

    </MainLayout>

);

}

export default EditInvoice;