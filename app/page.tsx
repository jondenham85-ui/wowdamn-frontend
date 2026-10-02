// app/page.tsx or pages/index.tsx

import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">

      {/* Neon Grid Background */}
      <div className="absolute inset-0 opacity-20 animate-pulse pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(#00e6e6 1px, transparent 1px),
            linear-gradient(90deg, #00e6e6 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      {/* Hologram Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ffff22] to-transparent blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 text-center px-6 py-20">
        <h1 className="text-6xl font-extrabold tracking-wide text-[#00e6e6] drop-shadow-[0_0_15px_#00e6e6]">
          MADAI
        </h1>

        <p className="mt-6 text-xl text-[#00ffff] opacity-90 drop-shadow-[0_0_10px_#00ffff]">
          Your holographic AI COO — automated, futuristic, and damn impressive.
        </p>

        {/* Animated Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="/assistant"
            className="px-8 py-4 rounded-xl bg-[#00e6e6] text-black font-bold shadow-[0_0_20px_#00e6e6] hover:shadow-[0_0_35px_#00ffff] transition-all duration-300"
          >
            Chat with MADAI
          </a>

          <a
            href="/shopmad"
            className="px-8 py-4 rounded-xl border border-[#00e6e6] text-[#00e6e6] font-bold hover:bg-[#00e6e6] hover:text-black transition-all duration-300"
          >
            Enter ShopMAD
          </a>
        </div>
      </section>

      {/* Floating Hologram */}
      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-[#00ffff33] blur-xl animate-pulse pointer-events-none" />

    </main>
  );
}

