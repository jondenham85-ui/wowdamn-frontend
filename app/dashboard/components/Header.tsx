export default function Header() {
  return (
    <header className="w-full bg-black border-b border-[#00e6e6] py-4 px-6 flex justify-between items-center shadow-[0_0_15px_#00e6e6]">
      <h1 className="text-3xl font-bold text-[#00e6e6] drop-shadow-[0_0_10px_#00ffff]">
        MADAI Control Center
      </h1>

      <div className="text-[#00ffff] opacity-80">
        Owner: Jon Denham
      </div>
    </header>
  );
}
