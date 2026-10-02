// frontend/app/login/page.tsx

export default function OwnerLogin() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-black border border-[#00e6e6] rounded-2xl p-8 shadow-[0_0_35px_#00e6e6]">

        {/* MADAI Logo */}
        <h1 className="text-4xl font-extrabold text-center text-[#00e6e6] drop-shadow-[0_0_15px_#00ffff] mb-8">
          MADAI Owner Access
        </h1>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-[#00e6e6] font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="owner@example.com"
            className="w-full p-3 rounded-lg bg-black border border-[#00e6e6] text-[#00ffff] focus:outline-none focus:border-[#00ffff]"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-[#00e6e6] font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-3 rounded-lg bg-black border border-[#00e6e6] text-[#00ffff] focus:outline-none focus:border-[#00ffff]"
          />
        </div>

        {/* Login Button */}
        <button className="w-full px-6 py-3 rounded-xl bg-[#00e6e6] text-black font-bold shadow-[0_0_20px_#00e6e6] hover:shadow-[0_0_35px_#00ffff] transition-all">
          Log In
        </button>

        {/* Sign Up + Forgot Password */}
        <div className="flex justify-between mt-6 text-sm">

          <a
            href="/signup"
            className="text-[#00e6e6] hover:text-[#00ffff] transition-all font-bold"
          >
            Create Account
          </a>

          <a
            href="/forgot-password"
            className="text-[#00e6e6] hover:text-[#00ffff] transition-all font-bold"
          >
            Forgot Password
          </a>

        </div>

        {/* Footer */}
        <p className="text-center text-[#00ffff] opacity-60 mt-6 text-sm">
          Authorized owners only.  
          MADAI Control Center access is restricted.
        </p>

      </div>
    </div>
  );
}
