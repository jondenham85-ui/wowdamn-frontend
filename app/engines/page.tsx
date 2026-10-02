'use client';
import{useState,useEffect}from 'react';
import{useRouter}from 'next/navigation';
const ENG=[
{id:'revenue',name:'Revenue Engine',status:'LIVE',pct:94,desc:'AI-optimized pricing and upsell matrix. Adjusts prices in real-time based on demand signals.',metrics:[['DAILY REV','$14,280'],['CONVERSION','8.4%'],['AOV','$57.81']]},
{id:'drop',name:'Drop Engine',status:'ARMED',pct:78,desc:'Scarcity-driven product drop scheduler with email and SMS coordination.',metrics:[['NEXT DROP','6h 42m'],['WAITLIST','3,847'],['EST REV','$28,500']]},
{id:'ceo',name:'CEO Engine',status:'LIVE',pct:99,desc:'Executive intelligence layer aggregating all engine data into real-time CEO briefings.',metrics:[['COMMANDS','247'],['AUTO-EXEC','18'],['BRIEFINGS','12/day']]},
{id:'promo',name:'Promo Engine',status:'ONLINE',pct:85,desc:'Discount and coupon orchestration with A/B testing across customer segments.',metrics:[['ACTIVE PROMOS','7'],['REDEMPTIONS','1,203'],['LIFT','23.4%']]},
{id:'viral',name:'Viral Engine',status:'LIVE',pct:91,desc:'Social amplification system that triggers viral distribution sequences.',metrics:[['SHARES TODAY','4,280'],['REACH','847K'],['VIRAL COEFF','2.3x']]},
{id:'stock',name:'Stock Engine',status:'SCHEDULED',pct:62,desc:'Inventory intelligence and auto-reorder system. Predicts stockouts 14 days out.',metrics:[['SKUs TRACKED','342'],['LOW STOCK','8'],['REORDERS','3 PENDING']]},
{id:'flash',name:'Flash Engine',status:'LIVE',pct:88,desc:'Lightning sale executor with real-time countdown and urgency triggers.',metrics:[['FLASH SALES','23'],['AVG LIFT','67%'],['NEXT FLASH','4h 18m']]},
];
export default function Engines(){
const[sel,setSel]=useState(ENG[0]);
const router=useRouter();
useEffect(()=>{if(!localStorage.getItem('user'))router.push('/');},[]);
const gold='#d4af37';
const sc=(s:string)=>s==='LIVE'?'#00ff41':s==='ARMED'?gold:s==='SCHEDULED'?'#8888ff':'#ff9944';
return(
<main style={{minHeight:'100vh',background:'#000',color:'#fff',fontFamily:'monospace',display:'flex',flexDirection:'column'}}>
<nav style={{background:'rgba(255,255,255,0.03)',borderBottom:`1px solid ${gold}33`,padding:'16px 24px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<span style={{color:gold,fontWeight:'bold',letterSpacing:'0.2em'}}>⚡ ENGINE BAY</span>
<div style={{display:'flex',gap:'8px'}}>
<button onClick={()=>router.push('/dashboard')} style={{background:'transparent',color:'#ffffff66',border:'1px solid #ffffff22',padding:'6px 14px',borderRadius:'6px',cursor:'pointer',fontSize:'0.75rem'}}>← DASHBOARD</button>
<button onClick={()=>{localStorage.clear();router.push('/');}} style={{background:'#ff003322',color:'#ff0033',border:'1px solid #ff0033',padding:'6px 14px',borderRadius:'6px',cursor:'pointer',fontSize:'0.75rem'}}>LOGOUT</button>
</div>
</nav>
<div style={{display:'flex',flex:1}}>
<aside style={{width:'220px',flexShrink:0,borderRight:`1px solid ${gold}22`,padding:'16px'}}>
<p style={{color:'#ffffff33',fontSize:'0.6rem',letterSpacing:'0.2em',marginBottom:'12px'}}>SELECT ENGINE</p>
{ENG.map(e=>(
<button key={e.id} onClick={()=>setSel(e)} style={{display:'block',width:'100%',textAlign:'left' as any,background:sel.id===e.id?`${gold}11`:'transparent',border:`1px solid ${sel.id===e.id?gold+'44':'transparent'}`,color:sel.id===e.id?gold:'#ffffff88',padding:'10px 12px',borderRadius:'6px',marginBottom:'4px',cursor:'pointer',fontSize:'0.75rem'}}>
<span style={{color:sc(e.status),marginRight:'6px'}}>●</span>{e.name.replace(' Engine','')}
</button>
))}
</aside>
<div style={{flex:1,padding:'32px'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'24px'}}>
<div>
<h1 style={{color:gold,fontSize:'1.4rem',letterSpacing:'0.2em',margin:'0 0 6px'}}>{sel.name.toUpperCase()}</h1>
<p style={{color:'#ffffff55',fontSize:'0.8rem',maxWidth:'480px',margin:0}}>{sel.desc}</p>
</div>
<span style={{color:sc(sel.status),border:`1px solid ${sc(sel.status)}`,padding:'6px 14px',borderRadius:'6px',fontSize:'0.8rem',letterSpacing:'0.15em',flexShrink:0}}>● {sel.status}</span>
</div>
<div style={{background:'rgba(255,255,255,0.02)',border:`1px solid ${gold}22`,borderRadius:'12px',padding:'20px',marginBottom:'20px'}}>
<p style={{color:'#ffffff33',fontSize:'0.65rem',letterSpacing:'0.2em',margin:'0 0 12px'}}>ENGINE OUTPUT</p>
<div style={{background:'#ffffff08',borderRadius:'6px',height:'8px',marginBottom:'6px'}}>
<div style={{background:`linear-gradient(90deg,${gold},#f5d770)`,width:`${sel.pct}%`,height:'100%',borderRadius:'6px',transition:'width 0.5s'}}/>
</div>
<p style={{color:'#ffffff44',fontSize:'0.7rem',margin:0}}>{sel.pct}% CAPACITY UTILIZED</p>
</div>
<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px'}}>
{sel.metrics.map(([l,v])=>(
<div key={l} style={{background:'rgba(255,255,255,0.03)',border:`1px solid ${gold}22`,borderRadius:'10px',padding:'16px',textAlign:'center' as any}}>
<p style={{color:'#ffffff44',fontSize:'0.6rem',letterSpacing:'0.2em',margin:'0 0 8px'}}>{l}</p>
<p style={{color:gold,fontSize:'1.1rem',fontWeight:'bold',margin:0}}>{v}</p>
</div>
))}
</div>
</div>
</div>
</main>
);
}
