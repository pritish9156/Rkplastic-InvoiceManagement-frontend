import {
    Line
} from "react-chartjs-2";

import {

    Chart as ChartJS,

    CategoryScale,

    LinearScale,

    PointElement,

    LineElement,

    Tooltip,

    Legend,

    Filler

}
from "chart.js";

ChartJS.register(

    CategoryScale,

    LinearScale,

    PointElement,

    LineElement,

    Tooltip,

    Legend,

    Filler

);

function SalesChart({

    monthlyData = []

}) {

    const data = {

        labels:

        monthlyData.map(

            m => m.month

        ),

        datasets: [

            {

                label:

                "Monthly Sales",

                data:

                monthlyData.map(

                    m => m.amount

                ),

                borderColor:

                "#2563eb",

                backgroundColor:

                "rgba(37,99,235,.15)",

                fill:true,

                tension:.4,

                pointRadius:5

            }

        ]

    };

    const options = {

        responsive:true,

        plugins:{

            legend:{

                display:false

            }

        }

    };

    return(

        <div className="premium-card">

            <h4>

                Monthly Sales

            </h4>

            <Line

                data={data}

                options={options}

            />

        </div>

    );

}

export default SalesChart;