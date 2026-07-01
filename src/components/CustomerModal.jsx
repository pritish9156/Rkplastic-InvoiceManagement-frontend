import { useState } from "react";
import { createCustomer } from "../api/customerApi";
import toast from "react-hot-toast";

function CustomerModal({

    show,
    onClose,
    onCustomerCreated

}) {

    const [form,setForm]
        =
        useState({

            name:"",
            address:"",
            gstin:"",
            phone:""

        });

    const handleChange =
        (e)=>{

            setForm({

                ...form,

                [e.target.name]:
                    e.target.value

            });

        };

    const saveCustomer =
        async()=>{

            try{

                if(!form.name){

                    toast.error(
                        "Customer name required"
                    );

                    return;
                }

                const response =
                    await createCustomer(
                        form
                    );

                toast.success(
                    "Customer Created"
                );

                onCustomerCreated(
                    response.data.data
                );

                onClose();

            }
            catch{

                toast.error(
                    "Failed to create customer"
                );

            }

        };

    if(!show)
        return null;

    return (

        <div
            className="modal d-block"
            style={{
                background:
                "rgba(0,0,0,.5)"
            }}
        >

            <div className="modal-dialog modal-lg">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5>

                            Add Customer

                        </h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <div className="modal-body">

                        <input
                            name="name"
                            placeholder="Customer Name"
                            className="form-control mb-3"
                            onChange={handleChange}
                        />

                        <textarea
                            name="address"
                            placeholder="Address"
                            rows="4"
                            className="form-control mb-3"
                            onChange={handleChange}
                        />

                        <input
                            name="gstin"
                            placeholder="GSTIN"
                            className="form-control mb-3"
                            onChange={handleChange}
                        />

                        <input
                            name="phone"
                            placeholder="Phone"
                            className="form-control"
                            onChange={handleChange}
                        />

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn btn-premium"
                            onClick={saveCustomer}
                        >
                            Save Customer
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CustomerModal;