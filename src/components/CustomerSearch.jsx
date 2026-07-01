import { useEffect, useRef, useState } from "react";
import { searchCustomers } from "../api/customerApi";
import "../styles/global.css";

function CustomerSearch({

    onCustomerSelect

}) {

    const [keyword, setKeyword] =
        useState("");

    const [customers, setCustomers] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const timeoutRef =
        useRef();

    useEffect(() => {

        clearTimeout(timeoutRef.current);

        if (keyword.trim().length < 2) {

            setCustomers([]);

            return;

        }

        timeoutRef.current =
            setTimeout(async () => {

                try {

                    setLoading(true);

                    const response =
                        await searchCustomers(keyword);

                    setCustomers(
                        response.data
                    );

                }
                finally {

                    setLoading(false);

                }

            }, 400);

        return () =>
            clearTimeout(timeoutRef.current);

    }, [keyword]);

    return (

        <div className="customer-search">

            <div className="position-relative">

                <input

                    className="form-control premium-input"

                    placeholder="🔍 Search customer by name..."

                    value={keyword}

                    onChange={(e) =>

                        setKeyword(
                            e.target.value
                        )

                    }

                />

                {

                    loading &&

                    <div className="search-loader">

                        <div className="spinner-border spinner-border-sm text-primary"></div>

                    </div>

                }

            </div>

            {

                customers.length > 0 &&

                <div className="customer-dropdown">

                    {

                        customers.map(customer =>

                            <div

                                key={customer.id}

                                className="customer-card"

                                onClick={() => {

                                    onCustomerSelect(customer);

                                    setKeyword(customer.name);

                                    setCustomers([]);

                                }}

                            >

                                <div>

                                    <h6>

                                        {customer.name}

                                    </h6>

                                    <small>

                                        GSTIN :
                                        {" "}
                                        {

                                            customer.gstin ||

                                            "N/A"

                                        }

                                    </small>

                                </div>

                                <small className="customer-phone">

                                    {

                                        customer.phone ||

                                        ""

                                    }

                                </small>

                            </div>

                        )

                    }

                </div>

            }

            {

                !loading &&

                keyword.length >= 2 &&

                customers.length === 0 &&

                <div className="customer-empty">

                    No customer found.

                </div>

            }

        </div>

    );

}

export default CustomerSearch;