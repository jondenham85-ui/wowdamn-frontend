import Panel from "../components/Panel";

export default function AssistantPage() {
  return (
    <div className="p-6 space-y-6">

      <Panel title="MADAI Assistant">
        <p className="text-[#00ffff] opacity-90 mb-4">
          Your holographic AI COO is ready to assist with operations, automation,
          system insights, and more.
        </p>

        <textarea
          placeholder="Type your command for MADAI..."
          className="w-full h-40 p-4 rounded-xl bg-black border border-[#00e6e6] text-[#00ffff] focus:outline-none focus:border-[#00ffff]"
        />

        <button className="mt-4 px-6 py-3 rounded-xl bg-[#00e6e6] text-black font-bold shadow-[0_0_20px_#00e6e6] hover:shadow-[0_0_35px_#00ffff] transition-all">
          Send to MADAI
        </button>
      </Panel>

    </div>
  );
}
