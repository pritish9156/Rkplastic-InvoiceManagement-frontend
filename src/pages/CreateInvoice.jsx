import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";

import CustomerSearch from "../components/CustomerSearch";
import CustomerModal from "../components/CustomerModal";
import ItemTable from "../components/ItemTable";
import InvoiceSummary from "../components/InvoiceSummary";

import "../styles/create-invoice.css";

import {
    getNextBillNo,
    createInvoice
}
from "../api/billApi";

function CreateInvoice() {

    const [loadingBillNo, setLoadingBillNo] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [showCustomerModal,
        setShowCustomerModal] =
        useState(false);

    const [billNo,
        setBillNo] =
        useState("");

    const [billDate,
        setBillDate] =
        useState("");

    const [customer,
        setCustomer] =
        useState(null);

    const [challanNoField,
        setChallanNoField] =
        useState("");

    const [custChallanNoField,
        setCustChallanNoField] =
        useState("");

    const [orderCode,
        setOrderCode] =
        useState("");

    const [vendorCode,
        setVendorCode] =
        useState("");

    const [items,
        setItems] =
        useState([
            {
                description: "",
                hsnSac: "",
                qty: 1,
                rate: 0
            }
        ]);

    useEffect(() => {

        loadBillNo();

        setBillDate(

            new Date()
                .toISOString()
                .split("T")[0]

        );

    }, []);

    const loadBillNo =
        async () => {

            try {

                setLoadingBillNo(true);

                const response =
                    await getNextBillNo();

                setBillNo(
                    response.data.billNo
                );

            }
            catch {

                toast.error(
                    "Unable to load Bill Number."
                );

            }
            finally{

                setLoadingBillNo(false);

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

    const resetForm = ()=>{

        setCustomer(null);

        setItems([

            {

                description:"",

                hsnSac:"",

                qty:1,

                rate:0

            }

        ]);

        setChallanNoField("");

        setCustChallanNoField("");

        setOrderCode("");

        setVendorCode("");

    };

    const saveInvoice =
        async()=>{

            if(!customer){

                toast.error(

                    "Please select customer."

                );

                return;

            }

            if(

                items.some(

                    item=>

                    !item.description ||

                    Number(item.qty)<=0

                )

            ){

                toast.error(

                    "Please complete all invoice items."

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

                    items

                };

                const response=

                    await createInvoice(

                        payload

                    );

                toast.success(

                    "Invoice Created Successfully"

                );

                const billId=

                    response.data.data.id;

                window.open(

                    `https://rkplastic-backend.onrender.com/api/bills/${billId}/pdf`

                );

                resetForm();

                loadBillNo();

            }
            catch(error){

                console.log(error);

                toast.error(

                    "Failed to create invoice."

                );

            }
            finally{

                setSaving(false);

            }

        };

    return (

    <MainLayout>

        <div className="row g-4">

            {/* ==========================
                    LEFT SIDE
            =========================== */}

            <div className="col-xl-8">

                <div className="premium-card">

                    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mb-4">

                        <div>

                            <h2 className="page-title mb-1">

                                Create Invoice

                            </h2>

                            <p className="text-muted mb-0">

                                Generate GST Invoice for Customer

                            </p>

                        </div>

                        <button

                            className="btn btn-premium mt-3 mt-lg-0"

                            onClick={()=>

                                setShowCustomerModal(true)

                            }

                        >

                            + New Customer

                        </button>

                    </div>

                    {/* Invoice Information */}

                    <div className="premium-section">

                        <h5 className="section-title">

                            Invoice Information

                        </h5>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label>

                                    Bill Number

                                </label>

                                {

                                    loadingBillNo ?

                                    <div className="placeholder-glow">

                                        <span className="placeholder col-12 rounded"></span>

                                    </div>

                                    :

                                    <input

                                        className="form-control premium-input"

                                        value={billNo}

                                        onChange={(e)=>

                                            setBillNo(

                                                e.target.value

                                            )

                                        }

                                    />

                                }

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

                    </div>

                    {/* Customer */}

                    <div className="premium-section mt-4">

                        <div className="d-flex justify-content-between align-items-center mb-3">

                            <h5 className="section-title mb-0">

                                Customer Details

                            </h5>

                        </div>

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

                                <hr />

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

                    {/* Extra Details */}

                    <div className="premium-section mt-4">

                        <h5 className="section-title">

                            Additional Information

                        </h5>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label>

                                    Our Challan No

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

                                    Customer Challan No

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

                    {/* Item Table */}

                    <div className="mt-4">

                        <ItemTable

                            items={items}

                            setItems={setItems}

                        />

                    </div>

                </div>

            </div>

                        {/* ==========================
                    RIGHT SIDE
            =========================== */}

            <div className="col-xl-4">

                <div className="sticky-summary">

                    {/* Invoice Summary */}

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

                                Total Items

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

                                Invoice Amount

                            </span>

                            <strong className="text-success">

                                ₹ {grandTotal.toFixed(2)}

                            </strong>

                        </div>

                    </div>

                    {/* Save Button */}

                    <div className="premium-card mt-4">

                        <button

                            className="btn btn-premium btn-lg w-100"

                            disabled={saving}

                            onClick={saveInvoice}

                        >

                            {

                                saving ?

                                <>

                                    <span

                                        className="spinner-border spinner-border-sm me-2"

                                    ></span>

                                    Creating Invoice...

                                </>

                                :

                                <>

                                    💾 Save Invoice

                                </>

                            }

                        </button>

                        <small className="text-muted d-block mt-3 text-center">

                            Invoice PDF will be generated automatically after saving.

                        </small>

                    </div>

                </div>

            </div>

        </div>

        <CustomerModal

            show={showCustomerModal}

            onClose={()=>

                setShowCustomerModal(false)

            }

            onCustomerCreated={(customer)=>{

                setCustomer(customer);

                setShowCustomerModal(false);

            }}

        />

    </MainLayout>

);

}

export default CreateInvoice;