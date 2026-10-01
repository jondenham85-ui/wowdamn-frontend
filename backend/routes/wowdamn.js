/**
 * WOWDamn Backend - Complete API Routes
 * ======================================
 * Mount in app.js: app.use('/api', require('./routes/wowdamn'));
 * Install: npm install express jsonwebtoken bcryptjs
 */

const express = require("express");
const jwt     = require("jsonwebtoken");
const router  = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "wowdamn-secret-change-me";

// ---- JWT Auth Middleware ----
function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token  = header.replace("Bearer ", "").trim();
  if (!token) return res.status(401).json({ error: "No token provided" });
  try { req.user = jwt.verify(token, JWT_SECRET); next(); }
  catch { return res.status(401).json({ error: "Invalid or expired token" }); }
}

// ---- 1. AUTH ----
// POST /api/auth/login => { user: User, token }
// role: owner|ceo|admin|member  tier: spark|blaze|inferno|titan|omega
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });
    // TODO: replace with real DB + bcrypt.compare
    const mockUser = { id: "u-001", email, name: email.split("@")[0],
      role: "owner", tier: "omega", verified: true, createdAt: new Date().toISOString() };
    const token = jwt.sign({ id: mockUser.id, email: mockUser.email, role: mockUser.role }, JWT_SECRET, { expiresIn: "24h" });
    res.json({ user: mockUser, token });
  } catch (err) { res.status(500).json({ error: "Authentication failed", detail: err.message }); }
});

// GET /api/auth/me
router.get("/auth/me", auth, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email,
    name: req.user.email?.split("@")[0] || "User",
    role: req.user.role || "member", tier: req.user.tier || "spark",
    verified: true, createdAt: new Date().toISOString() });
});

// ---- 2. ENGINE STATUS & CONTROL ----
// In-memory state -- replace with DB/Redis in production
let engineState = [
  { id: "product",  name: "Product Engine",  status: "online",   power: 87, throughput: 2840, errorRate: 0.1,  lastPing: new Date().toISOString(), version: "v2.4" },
  { id: "revenue",  name: "Revenue Engine",  status: "online",   power: 94, throughput: 1120, errorRate: 0.04, lastPing: new Date().toISOString(), version: "v3.1" },
  { id: "workflow", name: "Workflow Engine", status: "degraded", power: 72, throughput: 560,  errorRate: 1.8,  lastPing: new Date().toISOString(), version: "v1.8" },
  { id: "tier",     name: "Tier Engine",     status: "online",   power: 81, throughput: 330,  errorRate: 0.2,  lastPing: new Date().toISOString(), version: "v2.0" },
];

// GET /api/engines/status -- EngineControl[], polled every 10s
router.get("/engines/status", auth, (req, res) => {
  const live = engineState.map(e => ({
    ...e,
    throughput: Math.round(e.throughput * (0.95 + Math.random() * 0.1)),
    errorRate:  parseFloat((e.errorRate * (0.9 + Math.random() * 0.2)).toFixed(3)),
    lastPing:   new Date().toISOString(),
  }));
  res.json(live);
});

// PATCH /api/engines/power -- { id, power (0-100) }
router.patch("/engines/power", auth, (req, res) => {
  const { id, power } = req.body;
  if (!id || power === undefined) return res.status(400).json({ error: "id and power required" });
  const engine = engineState.find(e => e.id === id);
  if (!engine) return res.status(404).json({ error: `Engine '${id}' not found` });
  engine.power = Math.min(100, Math.max(0, Number(power)));
  engine.lastPing = new Date().toISOString();
  res.json(engine);
});

// POST /api/engines/control -- { id, action: start|stop|restart }
router.post("/engines/control", auth, (req, res) => {
  const { id, action } = req.body;
  if (!id || !action) return res.status(400).json({ error: "id and action required" });
  if (!["start","stop","restart"].includes(action))
    return res.status(400).json({ error: "action must be start|stop|restart" });
  const engine = engineState.find(e => e.id === id);
  if (!engine) return res.status(404).json({ error: `Engine '${id}' not found` });
  if (action === "stop")    engine.status = "offline";
  if (action === "start")   engine.status = "online";
  if (action === "restart") { engine.status = "online"; engine.errorRate = 0; engine.power = Math.max(engine.power, 70); }
  engine.lastPing = new Date().toISOString();
  res.json(engine);
});

// ---- 3. ENGINE STATS ----
// GET /api/engines/product/stats
router.get("/engines/product/stats", auth, async (req, res) => {
  // TODO: replace with Product.aggregate([...])
  res.json({ totalProducts: 1247, activeProducts: 983, draftProducts: 264,
    totalRevenue: 2847320, avgPrice: 64.80, topSellers: [],
    conversionRate: 4.7, viewsToday: 14830 });
});

// GET /api/engines/revenue/stats
router.get("/engines/revenue/stats", auth, async (req, res) => {
  // TODO: replace with Order.aggregate([...])
  res.json({ totalRevenue: 18472910, monthlyRevenue: 1284330, dailyRevenue: 42780,
    revenueGrowth: 14.3, avgOrderValue: 87.50, refundRate: 1.2,
    projectedMonthly: 1410760, chartData: [] });
});

// GET /api/engines/workflow/stats
router.get("/engines/workflow/stats", auth, async (req, res) => {
  // TODO: replace with Workflow.aggregate([...])
  res.json({ totalWorkflows: 148, activeWorkflows: 89, runningNow: 7,
    completedToday: 412, avgSuccessRate: 97.4, avgDuration: 4820 });
});

// ---- 4. SYSTEM METRICS ----
// GET /api/system/metrics -- SystemMetrics, polled every 5s
router.get("/system/metrics", auth, (req, res) => {
  const os = require("os");
  const memUsage = parseFloat(((1 - os.freemem() / os.totalmem()) * 100).toFix
// ---- 5. CEO MODE ----
// GET /api/ceo/dashboard -- CEODashboardData, polled every 8s
router.get("/ceo/dashboard", auth, (req, res) => {
  res.json({
    systemHealth:         98.7,
    revenueToday:         42780,
    activeEngines:        engineState.filter(e => e.status === "online").length,
    pendingVerifications: 3,
    criticalAlerts:       1,
    commandHistory:       [],
    engines:              engineState,
    metrics: { cpuUsage: 38, memoryUsage: 61, apiLatency: 18, errorRate: 0.08,
               requestsPerMin: 4820, uptime: 99.97, activeUsers: 2341,
               queueDepth: 14, cacheHitRate: 94.2, dbConnections: 47 },
  });
});

// POST /api/ceo/command -- { command, target? } => CEOCommand
router.post("/ceo/command", auth, async (req, res) => {
  const { command, target = "system" } = req.body;
  if (!command) return res.status(400).json({ error: "command is required" });
  const cmd = command.trim().toLowerCase();
  let result = "";
  if (cmd === "status all") {
    result = `${engineState.filter(e=>e.status==="online").length}/4 engines online. System health: 98.7%.`;
  } else if (cmd.startsWith("boost")) {
    const [,engineId,,pwr] = cmd.split(" "); const power = parseInt(pwr)||100;
    if (engineId === "all") { engineState.forEach(e=>{e.power=power;}); result=`All engines boosted to ${power}%.`; }
    else { const e=engineState.find(x=>x.id===engineId); if(e){e.power=power;result=`${e.name} power set to ${power}%.`;} else result=`Engine '${engineId}' not found.`; }
  } else if (cmd.startsWith("restart")) {
    const [,eid] = cmd.split(" "); const e=engineState.find(x=>x.id===eid);
    if(e){e.status="online";e.errorRate=0;e.lastPing=new Date().toISOString();result=`${e.name} restarted. Error rate reset.`;}
    else result=`Engine '${eid}' not found.`;
  } else if (cmd==="flush cache --scope all") {
    result="Cache flushed. Rebuilding (est. 2 mins).";
  } else if (cmd.startsWith("export revenue")) {
    result="Revenue export queued. CSV emailed to owner within 5 minutes.";
  } else if (cmd.startsWith("run diagnostics")) {
    result="CPU 38% | Memory 61% | DB 47 conns | Queue 14 | Latency 18ms. All within thresholds.";
  } else if (cmd==="help") {
    result="status all | boost <engine|all> --power <0-100> | restart <engine> | flush cache --scope all | export revenue | run diagnostics";
  } else {
    result=`Command '${command}' dispatched to WOWDamn OS.`;
  }
  res.json({ id:`cmd-${Date.now()}`, command, target, executedAt:new Date().toISOString(), result, status:"success" });
});

// ---- 6. VERIFICATIONS ----
// GET /api/verifications/pending
router.get("/verifications/pending", auth, async (req, res) => {
  // TODO: Verification.find({ status: { $in: ['pending','reviewing'] } })
  res.json([
    { id:"vr-001", userId:"u-101", userName:"Sarah Mitchell", userEmail:"sarah@example.com",  type:"identity",     status:"pending",   documents:["id_front.jpg","id_back.jpg"], submittedAt:new Date(Date.now()-7200000).toISOString() },
    { id:"vr-002", userId:"u-102", userName:"Marcus Chen",    userEmail:"marcus@example.com", type:"business",     status:"reviewing", documents:["biz_license.pdf"],            submittedAt:new Date(Date.now()-18000000).toISOString(), notes:"License expires soon" },
    { id:"vr-003", userId:"u-103", userName:"Aisha Okafor",   userEmail:"aisha@example.com",  type:"tier_upgrade", status:"pending",   documents:["revenue_proof.pdf"],          submittedAt:new Date(Date.now()-3600000).toISOString() },
  ]);
});

// POST /api/verifications/:id/approve
router.post("/verifications/:id/approve", auth, async (req, res) => {
  // TODO: Verification.findByIdAndUpdate(req.params.id, { status:'approved', reviewedAt:new Date() })
  res.json({ id:req.params.id, status:"approved", reviewedAt:new Date().toISOString(), notes:req.body.notes||"-" });
});

// POST /api/verifications/:id/reject
router.post("/verifications/:id/reject", auth, async (req, res) => {
  // TODO: Verification.findByIdAndUpdate(req.params.id, { status:'rejected', reviewedAt:new Date() })
  res.json({ id:req.params.id, status:"rejected", reviewedAt:new Date().toISOString(), notes:req.body.notes||"-" });
});

// ---- 7. USERS ----
// GET /api/users
// IMPORTANT field names: role (not role_id), tier (string slug not object), verified (not isVerified)
router.get("/users", auth, async (req, res) => {
  // TODO: User.find({}).select('-passwordHash')
  res.json([
    { id:"u-101", name:"Alex Mercer",  email:"alex@ex.com",   role:"admin",  tier:"omega",   verified:true,  createdAt:new Date(Date.now()-864000000*7).toISOString() },
    { id:"u-102", name:"Sophia Chen",  email:"sophia@ex.com", role:"member", tier:"titan",   verified:true,  createdAt:new Date(Date.now()-864000000*14).toISOString() },
    { id:"u-103", name:"Marcus Davis", email:"marcus@ex.com", role:"member", tier:"inferno", verified:true,  createdAt:new Date(Date.now()-864000000*21).toISOString() },
    { id:"u-104", name:"Priya Patel",  email:"priya@ex.com",  role:"member", tier:"blaze",   verified:false, createdAt:new Date(Date.now()-864000000*28).toISOString() },
    { id:"u-105", name:"James Wilson", email:"james@ex.com",  role:"admin",  tier:"inferno", verified:true,  createdAt:new Date(Date.now()-864000000*35).toISOString() },
  ]);
});

// ---- HEALTH CHECK (Render pings this to confirm service alive) ----
router.get("/health", (req, res) => {
  res.json({ status:"ok", service:"wowdamn-backend", version:"2.0.0",
    timestamp:new Date().toISOString(),
    engines:engineState.map(e=>({ id:e.id, status:e.status })) });
});

module.exports = router;
ed(1));
  res.json({
    cpuUsage:       parseFloat((Math.random() * 20 + 30).toFixed(1)),
    memoryUsage:    memUsage,
    apiLatency:     Math.round(Math.random() * 10 + 14),
    errorRate:      parseFloat((Math.random() * 0.1).toFixed(3)),
    requestsPerMin: Math.round(Math.random() * 400 + 4600),
    uptime:         parseFloat((99.9 + Math.random() * 0.09).toFixed(3)),
    activeUsers:    Math.round(Math.random() * 50 + 2310),
    queueDepth:     Math.round(Math.random() * 10 + 8),
    cacheHitRate:   parseFloat((93 + Math.random() * 3).toFixed(1)),
    dbConnections:  Math.round(Math.random() * 10 + 42),
  });
});
