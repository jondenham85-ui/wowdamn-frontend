// app/signup/page.tsx

export default function OwnerSignUp() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-black border border-[#00e6e6] rounded-2xl p-8 shadow-[0_0_35px_#00e6e6]">

        <h1 className="text-4xl font-extrabold text-center text-[#00e6e6] drop-shadow-[0_0_15px_#00ffff] mb-8">
          Create MADAI Owner Account
        </h1>

        {/* Name */}
        <div className="mb-6">
          <label className="block text-[#00e6e6] font-bold mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-black border border-[#00e6e6] text-[#00ffff] focus:outline-none focus:border-[#00ffff]"
          />
        </div>

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
            Create Password
          </label>
          <input
            type="password"
            placeholder="Create a password"
            className="w-full p-3 rounded-lg bg-black border border-[#00e6e6] text-[#00ffff] focus:outline-none focus:border-[#00ffff]"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-[#00e6e6] font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full p-3 rounded-lg bg-black border border-[#00e6e6] text-[#00ffff] focus:outline-none focus:border-[#00ffff]"
          />
        </div>

        {/* Sign Up Button */}
        <button className="w-full px-6 py-3 rounded-xl bg-[#00e6e6] text-black font-bold shadow-[0_0_20px_#00e6e6] hover:shadow-[0_0_35px_#00ffff] transition-all">
          Create Account
        </button>

        <p className="text-center text-[#00ffff] opacity-60 mt-6 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-[#00e6e6] hover:text-[#00ffff] font-bold">
            Log In
          </a>
        </p>

      </div>
    </div>
  );
}

