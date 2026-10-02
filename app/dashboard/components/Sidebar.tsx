export default function Sidebar() {
  return (
    <div className="h-full bg-black border-r border-[#00e6e6] text-[#00e6e6] shadow-[0_0_20px_#00e6e6] p-6">
      <h2 className="text-3xl font-bold drop-shadow-[0_0_10px_#00ffff] mb-8">
        MADAI
      </h2>

      <nav className="flex flex-col gap-6 text-lg">
        <a href="/dashboard" className="hover:text-[#00ffff] transition-all">Dashboard Home</a>
        <a href="/dashboard/assistant" className="hover:text-[#00ffff] transition-all">MADAI Assistant</a>
        <a href="/dashboard/shopmad" className="hover:text-[#00ffff] transition-all">ShopMAD Manager</a>
        <a href="/dashboard/logs" className="hover:text-[#00ffff] transition-all">System Logs</a>
        <a href="/dashboard/settings" className="hover:text-[#00ffff] transition-all">Owner Settings</a>
      </nav>
    </div>
  );
}
