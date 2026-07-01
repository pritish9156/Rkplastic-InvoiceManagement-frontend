import {
    useEffect,
    useState
}
from "react";

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

function EditInvoice() {

    const { id } =
        useParams();

    const navigate =
        useNavigate();

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
        async () => {

            try {

                const response =
                    await getInvoice(id);

                const bill =
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
            catch {

                toast.error(
                    "Failed To Load Invoice"
                );

            }

        };

    const subtotal =

        items.reduce(

            (
                sum,
                item
            ) =>

                sum +

                (
                    Number(item.qty || 0)
                    *
                    Number(item.rate || 0)
                ),

            0

        );

    const interstate =

        customer?.gstin

            ?

            customer.gstin
                .substring(0, 2)

            !==

            "27"

            :

            false;

    const cgst =
        interstate
            ? 0
            : subtotal * 0.09;

    const sgst =
        interstate
            ? 0
            : subtotal * 0.09;

    const igst =
        interstate
            ? subtotal * 0.18
            : 0;

    const grandTotal =

        subtotal +

        cgst +

        sgst +

        igst;

    const saveChanges =
        async () => {

            try {

                const payload = {

                    billNo,

                    billDate,

                    customerId:
                        customer.id,

                    challanNoField,

                    custChallanNoField,

                    orderCode,

                    vendorCode,

                    items: items.map(item => ({

                        description: item.description,

                        hsnSac: item.hsnSac,

                        qty: item.qty,

                        rate: item.rate

                    }))

                };

                await updateInvoice(

                    id,
                    payload

                );

                toast.success(
                    "Invoice Updated"
                );

                navigate(
                    "/invoices"
                );

            }
            catch {

                toast.error(
                    "Update Failed"
                );

            }

        };

    return (

        <MainLayout>

            <div className="row">

                <div className="col-lg-8">

                    <div className="premium-card">

                        <h3>

                            Edit Invoice

                        </h3>

                        <hr />

                        <div className="row">

                            <div className="col-md-6">

                                <label>

                                    Bill No

                                </label>

                                <input

                                    className="form-control"

                                    value={billNo}

                                    onChange={(e)=>

                                        setBillNo(
                                            e.target.value
                                        )

                                    }

                                />

                            </div>

                            <div className="col-md-6">

                                <label>

                                    Bill Date

                                </label>

                                <input

                                    type="date"

                                    className="form-control"

                                    value={billDate}

                                    onChange={(e)=>

                                        setBillDate(
                                            e.target.value
                                        )

                                    }

                                />

                            </div>

                        </div>

                        <br />

                        <CustomerSearch

                            onCustomerSelect={
                                setCustomer
                            }

                        />

                        <br />

                        {

                            customer &&

                            <div className="card p-3">

                                <h5>

                                    {customer.name}

                                </h5>

                                <p>

                                    {customer.address}

                                </p>

                                <p>

                                    GSTIN :
                                    {customer.gstin}

                                </p>

                            </div>

                        }

                        <br />

                        <div className="row">

                            <div className="col-md-6">

                                <label>

                                    Challan No

                                </label>

                                <input

                                    className="form-control"

                                    value={challanNoField}

                                    onChange={(e)=>

                                        setChallanNoField(
                                            e.target.value
                                        )

                                    }

                                />

                            </div>

                            <div className="col-md-6">

                                <label>

                                    Customer Challan

                                </label>

                                <input

                                    className="form-control"

                                    value={custChallanNoField}

                                    onChange={(e)=>

                                        setCustChallanNoField(
                                            e.target.value
                                        )

                                    }

                                />

                            </div>

                        </div>

                        <br />

                        <div className="row">

                            <div className="col-md-6">

                                <label>

                                    Order Code

                                </label>

                                <input

                                    className="form-control"

                                    value={orderCode}

                                    onChange={(e)=>

                                        setOrderCode(
                                            e.target.value
                                        )

                                    }

                                />

                            </div>

                            <div className="col-md-6">

                                <label>

                                    Vendor Code

                                </label>

                                <input

                                    className="form-control"

                                    value={vendorCode}

                                    onChange={(e)=>

                                        setVendorCode(
                                            e.target.value
                                        )

                                    }

                                />

                            </div>

                        </div>

                        <br />

                        <ItemTable

                            items={items}

                            setItems={setItems}

                        />

                    </div>

                </div>

                <div className="col-lg-4">

                    <InvoiceSummary

                        subtotal={subtotal}
                        cgst={cgst}
                        sgst={sgst}
                        igst={igst}
                        grandTotal={grandTotal}

                    />

                    <br />

                    <button

                        className="btn btn-success w-100"

                        onClick={
                            saveChanges
                        }

                    >

                        Update Invoice

                    </button>

                </div>

            </div>

        </MainLayout>

    );

}

export default EditInvoice;