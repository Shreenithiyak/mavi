import { useState } from "react";
import { supabase } from "../supabase/supabaseClient";

const ExpenseForm = () => {

    const [formData, setFormData] = useState({ amount: "", description: "", date: "",});

    const isFormValid =
        formData.amount > 0 &&
        formData.description.trim() !== "";

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async () => {

        const { error } = await supabase
            .from("expenses")
            .insert([
                {
                    amount: formData.amount,
                    description: formData.description,
                    expense_date: formData.date,
                },
            ]);

        if (error) {
            console.log(error);
        } else {
            alert("Expense Added");
            setFormData({ amount: "", description: "", date: "", });
        }
    };

    return (

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl mt-6 w-full max-w-[500px]">

            <h2 className="text-2xl font-bold mb-6 text-slate-100">
                Additional Expenses
            </h2>

            <div className="space-y-5">

                <input type="number" name="amount" placeholder="Amount" value={formData.amount}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 text-slate-100 placeholder-slate-400 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-colors" />

                <input type="text"name="description"placeholder="Description"value={formData.description}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 text-slate-100 placeholder-slate-400 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-colors"
                />

                <input type="date"name="date"value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 text-slate-100 placeholder-slate-400 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-colors scheme-dark"
                />
                <button onClick={handleSubmit} disabled={!isFormValid}
                    className={`w-full py-4 rounded-xl text-white font-bold tracking-wide transition-all duration-300 shadow-lg ${isFormValid
                            ? "bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-95"
                            : "bg-white/10 text-white/40 cursor-not-allowed"
                        }`} >
                    Add Expense
                </button>
            </div>

        </div>
    );
};

export default ExpenseForm;