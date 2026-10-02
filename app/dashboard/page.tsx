// frontend/app/dashboard/page.tsx

import Panel from "./components/Panel";

export default function DashboardHome() {
  return (
    <div className="p-6 space-y-6">

      {/* Welcome Panel */}
      <Panel title="Welcome Back, Jon">
        <p className="text-[#00ffff] opacity-90">
          MADAI is online and fully operational. Your systems are stable, your
          automations are running, and your dashboard is synced with the latest
          activity.
        </p>
      </Panel>

      {/* Quick Actions */}
      <Panel title="Quick Actions">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <a
            href="/dashboard/assistant"
            className="block px-6 py-4 rounded-xl bg-[#00e6e6] text-black font-bold text-center shadow-[0_0_20px_#00e6e6] hover:shadow-[0_0_35px_#00ffff] transition-all"
          >
            Open MADAI Assistant
          </a>

          <a
            href="/dashboard/shopmad"
            className="block px-6 py-4 rounded-xl border border-[#00e6e6] text-[#00e6e6] font-bold text-center hover:bg-[#00e6e6] hover:text-black transition-all"
          >
            Manage ShopMAD
          </a>

          <a
            href="/dashboard/logs"
            className="block px-6 py-4 rounded-xl border border-[#00e6e6] text-[#00e6e6] font-bold text-center hover:bg-[#00e6e6] hover:text-black transition-all"
          >
            View System Logs
          </a>

        </div>
      </Panel>

      {/* System Status */}
      <Panel title="System Status Overview">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          <StatusCard
            label="AI Engine"
            value="Operational"
            color="#00e6e6"
          />

          <StatusCard
            label="Backend API"
            value="Stable"
            color="#00ffff"
          />

          <StatusCard
            label="ShopMAD"
            value="Synced"
            color="#00e6e6"
          />

        </div>
      </Panel>

      {/* Recent Activity */}
      <Panel title="Recent Activity">
        <ul className="space-y-3 text-sm">
          <ActivityItem
            message="MADAI performed a system integrity check."
            time="Just now"
          />
          <ActivityItem
            message="Owner accessed the Control Center."
            time="5 minutes ago"
          />
          <ActivityItem
            message="ShopMAD inventory synced."
            time="22 minutes ago"
          />
          <ActivityItem
            message="Backend engine heartbeat stable."
            time="1 hour ago"
          />
        </ul>
      </Panel>

    </div>
  );
}

function StatusCard({ label, value, color }) {
  return (
    <div
      className="p-4 rounded-xl border shadow-[0_0_20px] text-center"
      style={{
        borderColor: color,
        boxShadow: `0 0 20px ${color}`,
      }}
    >
      <h4 className="text-xl font-bold" style={{ color }}>
        {label}
      </h4>
      <p className="text-[#00ffff] opacity-80 mt-2">{value}</p>
    </div>
  );
}

function ActivityItem({ message, time }) {
  return (
    <li className="flex justify-between border-b border-[#00e6e6]/30 pb-2">
      <span className="text-[#00ffff] opacity-90">{message}</span>
      <span className="text-[#00e6e6] opacity-60">{time}</span>
    </li>
  );
}

