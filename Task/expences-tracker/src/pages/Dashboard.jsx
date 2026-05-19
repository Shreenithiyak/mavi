import { useState } from "react";

import GroupCard from "../components/GroupCard";
import ExpenseForm from "../components/ExpenseForm";
import SummaryModal from "../components/SummaryModal";

import Profile from "../components/Profile";
const Dashboard = () => {

    const [open, setOpen] = useState(false);

    return (

        <div className="bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100 min-h-screen py-10 px-4 md:px-10">

            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl">

                    <Profile />

                    <div className="flex items-center gap-6">
                        <GroupCard />
                        <button onClick={() => setOpen(true)} className="bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105 active:scale-95">
                            Expenses Summary
                        </button>
                    </div>

                </div>

                {/* Main Content */}
                <div className="flex justify-center">
                    <ExpenseForm />
                </div>

                <SummaryModal
                    open={open}
                    onClose={() => setOpen(false)}
                />

            </div>

        </div>
    );
};

export default Dashboard;