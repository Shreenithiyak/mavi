import { FaUsers } from "react-icons/fa";

const GroupCard = () => {
    return (

        <div className="bg-linear-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 backdrop-blur-md p-5 rounded-2xl shadow-lg w-[300px] hover:scale-105 transition-transform duration-300">

            <div className="flex items-center gap-4">

                <div className="p-3 bg-linear-to-br from-yellow-400 to-orange-500 rounded-xl shadow-inner">
                    <FaUsers className="text-3xl text-white drop-shadow-md" />
                </div>

                <div>

                    <h2 className="text-xl font-bold text-slate-100">
                        CSK Cricket Team
                    </h2>

                    <p className="text-slate-400 font-medium">
                        Ticket Fees
                    </p>

                </div>

            </div>

        </div>
    );
};

export default GroupCard;