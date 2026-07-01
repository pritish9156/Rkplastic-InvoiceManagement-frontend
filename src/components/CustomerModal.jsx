import { useEffect, useState } from "react";
import { createCustomer } from "../api/customerApi";
import toast from "react-hot-toast";
import "../styles/global.css";

function CustomerModal({

    show,
    onClose,
    onCustomerCreated

}) {

    const [loading, setLoading] =
        useState(false);

    const [form, setForm] =
        useState({

            name: "",
            address: "",
            gstin: "",
            phone: ""

        });

    useEffect(() => {

        if (!show) {

            setForm({

                name: "",
                address: "",
                gstin: "",
                phone: ""

            });

            setLoading(false);

        }

    }, [show]);

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]:
                e.target.value

        });

    };

    const saveCustomer = async () => {

        if (!form.name.trim()) {

            toast.error(
                "Customer name is required."
            );

            return;

        }

        try {

            setLoading(true);

            const response =
                await createCustomer(form);

            toast.success(
                "Customer created successfully."
            );

            onCustomerCreated(
                response.data.data
            );

            onClose();

        }
        catch {

            toast.error(
                "Unable to create customer."
            );

        }
        finally {

            setLoading(false);

        }

    };

    if (!show)
        return null;

    return (

        <div
            className="premium-modal-backdrop"
            onClick={onClose}
        >

            <div
                className="premium-modal"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="premium-modal-header">

                    <div>

                        <h4>

                            Add Customer

                        </h4>

                        <small>

                            Enter customer information.

                        </small>

                    </div>

                    <button
                        className="btn-close"
                        onClick={onClose}
                    />

                </div>

                <div className="premium-modal-body">

                    <div className="mb-3">

                        <label>

                            Customer Name

                        </label>

                        <input

                            type="text"

                            name="name"

                            value={form.name}

                            onChange={handleChange}

                            className="form-control premium-input"

                            placeholder="Enter customer name"

                        />

                    </div>

                    <div className="mb-3">

                        <label>

                            Address

                        </label>

                        <textarea

                            rows="4"

                            name="address"

                            value={form.address}

                            onChange={handleChange}

                            className="form-control premium-input"

                            placeholder="Enter address"

                        />

                    </div>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label>

                                GSTIN

                            </label>

                            <input

                                type="text"

                                name="gstin"

                                value={form.gstin}

                                onChange={handleChange}

                                className="form-control premium-input"

                                placeholder="GST Number"

                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label>

                                Phone

                            </label>

                            <input

                                type="text"

                                name="phone"

                                value={form.phone}

                                onChange={handleChange}

                                className="form-control premium-input"

                                placeholder="Phone Number"

                            />

                        </div>

                    </div>

                </div>

                <div className="premium-modal-footer">

                    <button

                        className="btn btn-light"

                        disabled={loading}

                        onClick={onClose}

                    >

                        Cancel

                    </button>

                    <button

                        className="btn btn-premium"

                        disabled={loading}

                        onClick={saveCustomer}

                    >

                        {

                            loading ?

                                <>

                                    <span className="spinner-border spinner-border-sm me-2"></span>

                                    Saving...

                                </>

                                :

                                "Save Customer"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default CustomerModal;