export default function Panel({ title, children }) {
  return (
    <div className="bg-black border border-[#00e6e6] rounded-xl p-6 shadow-[0_0_20px_#00e6e6] hover:shadow-[0_0_35px_#00ffff] transition-all mb-6">
      <h3 className="text-xl font-bold text-[#00e6e6] mb-3">
        {title}
      </h3>

      <div className="text-[#00ffff] opacity-80">
        {children}
      </div>
    </div>
  );
}
