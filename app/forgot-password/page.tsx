// frontend/app/forgot-password/page.tsx

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-black border border-[#00e6e6] rounded-2xl p-8 shadow-[0_0_35px_#00e6e6]">

        <h1 className="text-4xl font-extrabold text-center text-[#00e6e6] drop-shadow-[0_0_15px_#00ffff] mb-8">
          Reset Password
        </h1>

        <p className="text-[#00ffff] opacity-80 text-center mb-6">
          Enter your email and MADAI will send you a secure reset link.
        </p>

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

        {/* Reset Button */}
        <button className="w-full px-6 py-3 rounded-xl bg-[#00e6e6] text-black font-bold shadow-[0_0_20px_#00e6e6] hover:shadow-[0_0_35px_#00ffff] transition-all">
          Send Reset Link
        </button>

        {/* Back to Login */}
        <p className="text-center text-[#00ffff] opacity-60 mt-6 text-sm">
          Remember your password?{" "}
          <a href="/login" className="text-[#00e6e6] hover:text-[#00ffff] font-bold">
            Log In
          </a>
        </p>

      </div>
    </div>
  );
}
