import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";

const SummaryModal = ({ open, onClose, memberCount = 4 }) => {
    const [total, setTotal] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            const fetchTotal = async () => {
                setLoading(true);
                const { data, error } = await supabase
                    .from("expenses")
                    .select("amount, description, expense_date");

                if (error) console.error(error);

                if (data) {
                    setExpenses(data);
                    const sum = data.reduce((acc, curr) => {
                        return acc + parseFloat(curr.amount || 0);  // parseFloat is safer
                    }, 0);
                    setTotal(sum);
                }
                setLoading(false);
            };

            fetchTotal();
        }
    }, [open]);

    if (!open) return null;

    const perPerson = memberCount > 0 ? (total / memberCount).toFixed(2) : 0;

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl w-[380px] shadow-2xl">

                {/* Header */}
                <h2 className="text-2xl font-bold mb-6 text-slate-100">
                    🧾 Expenses Summary
                </h2>

                {/* Expense List */}
                <div className="space-y-2 mb-4 max-h-[180px] overflow-y-auto pr-1">
                    {expenses.map((exp, index) => {
                        const amount = parseFloat(exp.amount) || 0;
                        const split = memberCount > 0 ? (amount / memberCount).toFixed(2) : 0;
                        
                        return (
                            <div key={index} className="flex justify-between items-center text-sm text-slate-400 bg-white/5 px-3 py-2 rounded-lg">
                                <span className="truncate pr-2">{exp.description || "Expense"}</span>
                                <div className="text-right flex-shrink-0">
                                    <div className="text-slate-200 font-medium">₹{amount.toFixed(2)}</div>
                                    <div className="text-xs text-indigo-400 mt-0.5">₹{split} / person</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <hr className="border-white/10 mb-4" />

                {/* Summary */}
                <div className="text-slate-300 space-y-3 mb-8">
                    <div className="flex justify-between items-center text-lg">
                        <span>Total Spent</span>
                        <span className="text-indigo-400 font-bold text-2xl">
                            {loading ? "..." : `₹${total.toFixed(2)}`}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                        <span>Total Members</span>
                        <span className="font-bold text-xl">{memberCount}</span>
                    </div>

                    <hr className="border-white/20" />

                    <div className="flex justify-between items-center text-xl text-white">
                        <span>Each Person Owes</span>
                        <span className="text-emerald-400 font-bold text-3xl">
                            {loading ? "..." : `₹${perPerson}`}
                        </span>
                    </div>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                    Close
                </button>

            </div>
        </div>
    );
};

export default SummaryModal;