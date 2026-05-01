import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AnalyticsCharts = () => {

    const [toolData, setToolData] = useState([
        { tool_used: "Malware Tool", total: Math.floor(Math.random() * 40) + 10 },
        { tool_used: "Email Analyzer", total: Math.floor(Math.random() * 40) + 10 },
        { tool_used: "Website Checker", total: Math.floor(Math.random() * 40) + 10 }
    ]);

    // OPTIONAL: try loading real data if it exists
    useEffect(() => {
        fetch("http://localhost:5000/api/feedback/analytics")
            .then((res) => res.json())
            .then((data) => {
                if (data.length > 0) {
                    setToolData(data);
                }
            })
            .catch(() => {
                console.log("Using demo analytics data");
            });
    }, []);

    const data = {
        labels: toolData.map((tool) => tool.tool_used),
        datasets: [
            {
                label: "Tool Usage this Month",
                data: toolData.map((tool) => tool.total),
                backgroundColor: [
                    "#6366f1",
                    "#22c55e",
                    "#f59e0b",
                    "#ef4444"
                ],
                borderRadius: 12
            }
        ]
    };

    const options = {
        responsive: true,
        animation: {
            duration: 1800
        },
        plugins: {
            legend: {
                labels: {
                    color: "#fff"
                }
            }
        },
        scales: {
            x: {
                ticks: { color: "#ccc" },
                grid: { display: false }
            },
            y: {
                ticks: { color: "#ccc" },
                grid: { color: "rgba(255,255,255,0.1)" }
            }
        }
    };

    return (
        <div className="analytics-container">
            <Bar data={data} options={options} />
        </div>
    );
};

export default AnalyticsCharts;