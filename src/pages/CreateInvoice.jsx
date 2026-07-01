import {
    useEffect,
    useState
}
    from "react";

import toast
    from "react-hot-toast";

import Navbar
    from "../components/Navbar";

import CustomerSearch
    from "../components/CustomerSearch";

import CustomerModal
    from "../components/CustomerModal";

import ItemTable
    from "../components/ItemTable";

import InvoiceSummary
    from "../components/InvoiceSummary";

import {

    getNextBillNo,
    createInvoice

}
    from "../api/billApi";

function CreateInvoice() {

    const [
        showCustomerModal,
        setShowCustomerModal
    ] = useState(false);

    const [
        billNo,
        setBillNo
    ] = useState("");

    const [
        billDate,
        setBillDate
    ] = useState("");

    const [
        customer,
        setCustomer
    ] = useState(null);

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
    ] = useState([
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

                const response =
                    await getNextBillNo();

                setBillNo(
                    response.data.billNo
                );

            }
            catch {

                toast.error(
                    "Failed to load bill number"
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

    const saveInvoice =
        async () => {

            try {

                if (!customer) {

                    toast.error(
                        "Please select customer"
                    );

                    return;
                }

                if (items.length === 0) {

                    toast.error(
                        "Add at least one item"
                    );

                    return;
                }

                const payload = {

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

                const response =

                    await createInvoice(
                        payload
                    );

                toast.success(
                    "Invoice Created"
                );

                const billId =

                    response.data
                        .data.id;

                window.open(

                    `http://localhost:8080/Rkplastic-InvoiceManagement/api/bills/${billId}/pdf`

                );

                loadBillNo();

            }
            catch (error) {

                console.log(error);

                toast.error(
                    "Failed to save invoice"
                );
            }
        };

    return (

        <>

            <Navbar />

            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center">

                    <h2 className="page-title">

                        Create Invoice

                    </h2>

                    <button

                        className="btn btn-primary"

                        onClick={() =>

                            setShowCustomerModal(
                                true
                            )

                        }

                    >

                        + Customer

                    </button>

                </div>

                <div className="row">

                    <div className="col-lg-8">

                        <div className="premium-card invoice-form">

                            <div className="row">

                                <div className="col-md-4">

                                    <label>

                                        Bill No

                                    </label>

                                    <input
                                        className="form-control"
                                        value={billNo}
                                        onChange={(e) =>

                                            setBillNo(
                                                e.target.value
                                            )

                                        }
                                    />

                                </div>

                                <div className="col-md-4">

                                    <label>

                                        Bill Date

                                    </label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        value={billDate}
                                        onChange={(e) =>

                                            setBillDate(
                                                e.target.value
                                            )

                                        }
                                    />

                                </div>

                            </div>

                            <hr />

                            <CustomerSearch
                                onCustomerSelect={
                                    setCustomer
                                }
                            />

                            <br />

                            {
                                customer &&

                                <div
                                    className="card p-3"
                                >

                                    <h5>

                                        {customer.name}

                                    </h5>

                                    <div>

                                        {customer.address}

                                    </div>

                                    <div>

                                        GSTIN :
                                        {customer.gstin}

                                    </div>

                                    <div>

                                        Phone :
                                        {customer.phone}

                                    </div>

                                </div>
                            }

                            <br />

                            <div className="row">

                                <div className="col-md-6">

                                    <label>

                                        Our Challan No

                                    </label>

                                    <input
                                        className="form-control"
                                        value={challanNoField}
                                        onChange={(e) =>

                                            setChallanNoField(
                                                e.target.value
                                            )

                                        }
                                    />

                                </div>

                                <div className="col-md-6">

                                    <label>

                                        Customer Challan No

                                    </label>

                                    <input
                                        className="form-control"
                                        value={custChallanNoField}
                                        onChange={(e) =>

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
                                        onChange={(e) =>

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
                                        onChange={(e) =>

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

                            onClick={saveInvoice}

                        >

                            Save Invoice

                        </button>

                    </div>

                </div>

            </div>

            <CustomerModal

                show={
                    showCustomerModal
                }

                onClose={() =>

                    setShowCustomerModal(
                        false
                    )

                }

                onCustomerCreated={
                    (customer) => {

                        setCustomer(
                            customer
                        );

                    }
                }

            />

        </>

    );

}

export default CreateInvoice;