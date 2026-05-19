const SummaryModal = ({ open, onClose }) => {

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity">

      <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl w-[350px] shadow-2xl transform transition-transform">

        <h2 className="text-2xl font-bold mb-4 text-slate-100">
          Expenses Summary
        </h2>

        <p className="text-slate-400 mb-8 text-lg">
          Total Expenses: <span className="text-indigo-400 font-bold text-2xl">₹5000</span>
        </p>

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