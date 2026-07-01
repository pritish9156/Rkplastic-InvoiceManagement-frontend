import { useState } from "react";
import { searchCustomers } from "../api/customerApi";

function CustomerSearch({

    onCustomerSelect

}) {

    const [keyword,setKeyword]
        =
        useState("");

    const [customers,
        setCustomers]
        =
        useState([]);

    const handleSearch =
        async(value)=>{

            setKeyword(value);

            if(value.length < 2){

                setCustomers([]);

                return;
            }

            const response =
                await searchCustomers(
                    value
                );

            setCustomers(
                response.data
            );
        };

    return (

        <div
            className="position-relative"
        >

            <input
                className="form-control"
                placeholder="Search Customer..."
                value={keyword}
                onChange={(e)=>
                    handleSearch(
                        e.target.value
                    )
                }
            />

            {

                customers.length > 0 &&

                <div className="search-dropdown">

                    {

                        customers.map(

                            customer=>

                                <div

                                    key={
                                        customer.id
                                    }

                                    className=
                                    "search-item"

                                    onClick={()=>{

                                        onCustomerSelect(
                                            customer
                                        );

                                        setKeyword(
                                            customer.name
                                        );

                                        setCustomers(
                                            []
                                        );

                                    }}

                                >

                                    {customer.name}

                                </div>

                        )

                    }

                </div>

            }

        </div>

    );

}

export default CustomerSearch;