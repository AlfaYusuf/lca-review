import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

// Mock Data
const mockData = {
    150: {
        optimizedLCA: 120,
        reason: "Replaced foam type X with foam type Y, reducing material emissions",
    },
    160: {
        optimizedLCA: 130,
        reason: "Changed supplier with better CO₂e footprint",
    },
    170: {
        optimizedLCA: 135,
        reason: "Redesigned crate for efficient material usage",
    },
};

const CrateReviewCard = () => {
    const [originalLCAs, setOriginalLCAs] = useState([]);
    const [selectedOriginal, setSelectedOriginal] = useState(null);
    const [status, setStatus] = useState("idle");

    useEffect(() => {
        // Simulate fetching keys (original LCAs) from API
        setTimeout(() => {
            const keys = Object.keys(mockData).map(Number);
            setOriginalLCAs(keys);
            setSelectedOriginal(keys[0]); // default select
        }, 500);
    }, []);

    const handleAction = (action) => {
        setStatus("loading");
        setTimeout(() => {
            setStatus("idle");
            toast.success(`Suggestion ${action === "approve" ? "approved" : "rejected"} successfully!`);
        }, 1000);
    };

    if (!selectedOriginal) {
        return <div className="text-center py-10 text-gray-600">Loading crate options...</div>;
    }

    const { optimizedLCA, reason } = mockData[selectedOriginal];
    const reductionPercent = (
        ((selectedOriginal - optimizedLCA) / selectedOriginal) *
        100
    ).toFixed(1);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-100 space-y-5">
            <Toaster position="top-right" />

            <h2 className="text-xl font-semibold text-blue-800">LCA Optimization Review</h2>

            <div className="flex items-center justify-between gap-3">
                <label className="text-sm text-gray-700 font-medium whitespace-nowrap">
                    Original Crate LCA:
                </label>
                <div className="relative w-full">
                    <select
                        className="block w-full appearance-none bg-white border border-gray-300 rounded-md py-1.5 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={selectedOriginal}
                        onChange={(e) => setSelectedOriginal(Number(e.target.value))}
                    >
                        {originalLCAs.map((lca) => (
                            <option key={lca} value={lca}>
                                {lca} kg CO₂e
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>



            <div className="text-gray-800 space-y-1">
                <p><strong>AI-Suggested LCA:</strong> {optimizedLCA} kg CO₂e</p>
                <p><strong>Reason:</strong> {reason}</p>
                <p className="text-green-600 font-bold">Reduction: 🔽 {reductionPercent}%</p>
            </div>

            <div className="flex gap-4 pt-2">
                <button
                    onClick={() => handleAction("approve")}
                    className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                    disabled={status === "loading"}
                >
                    Approve
                </button>
                <button
                    onClick={() => handleAction("reject")}
                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                    disabled={status === "loading"}
                >
                    Reject
                </button>
            </div>
        </div>
    );
};

export default CrateReviewCard;
