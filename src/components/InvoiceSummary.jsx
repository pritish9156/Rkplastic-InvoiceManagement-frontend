function InvoiceSummary({

    subtotal,
    cgst,
    sgst,
    igst,
    grandTotal

}) {

    return (

        <div className="premium-card invoice-summary">

            <h4 className="mb-4">

                Invoice Summary

            </h4>

            <div className="summary-row">

                <span>
                    Subtotal
                </span>

                <strong>
                    ₹ {subtotal.toFixed(2)}
                </strong>

            </div>

            <div className="summary-row">

                <span>
                    CGST (9%)
                </span>

                <strong>
                    ₹ {cgst.toFixed(2)}
                </strong>

            </div>

            <div className="summary-row">

                <span>
                    SGST (9%)
                </span>

                <strong>
                    ₹ {sgst.toFixed(2)}
                </strong>

            </div>

            <div className="summary-row">

                <span>
                    IGST (18%)
                </span>

                <strong>
                    ₹ {igst.toFixed(2)}
                </strong>

            </div>

            <hr />

            <div className="summary-total">

                <span>
                    Grand Total
                </span>

                <strong>
                    ₹ {grandTotal.toFixed(2)}
                </strong>

            </div>

        </div>

    );

}

export default InvoiceSummary;