'use client';
import{useState,useEffect}from 'react';
import{useRouter}from 'next/navigation';
const ENG=[{name:'Revenue Engine',status:'LIVE',pct:94},{name:'Drop Engine',status:'ARMED',pct:78},{name:'CEO Engine',status:'LIVE',pct:99},{name:'Promo Engine',status:'ONLINE',pct:85},{name:'Viral Engine',status:'LIVE',pct:91},{name:'Stock Engine',status:'SCHEDULED',pct:62},{name:'Flash Engine',status:'LIVE',pct:88}];
export default function Dashboard(){
const[user,setUser]=useState<any>(null);
const router=useRouter();
useEffect(()=>{const u=localStorage.getItem('user');if(!u){router.push('/');return;}setUser(JSON.parse(u));},[]);
function logout(){localStorage.clear();router.push('/');}
const gold='#d4af37';
return(
<main style={{minHeight:'100vh',background:'#000',color:'#fff',fontFamily:'monospace'}}>
<nav style={{background:'rgba(255,255,255,0.03)',borderBottom:`1px solid ${gold}33`,padding:'16px 24px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<span style={{color:gold,fontWeight:'bold',fontSize:'1.1rem',letterSpacing:'0.2em'}}>⚡ WOWDAMN</span>
<div style={{display:'flex',gap:'10px',alignItems:'center'}}>
<span style={{background:'#00ff4133',color:'#00ff41',border:'1px solid #00ff41',padding:'2px 8px',borderRadius:'4px',fontSize:'0.7rem'}}>● LIVE</span>
{(user?.role==='ceo'||user?.role==='admin')&&<button onClick={()=>router.push('/ceo')} style={{background:`${gold}22`,color:gold,border:`1px solid ${gold}`,padding:'6px 14px',borderRadius:'6px',cursor:'pointer',fontSize:'0.75rem'}}>👑 CEO MODE</button>}
<button onClick={()=>router.push('/engines')} style={{background:'rgba(255,255,255,0.05)',color:'#fff',border:'1px solid rgba(255,255,255,0.2)',padding:'6px 14px',borderRadius:'6px',cursor:'pointer',fontSize:'0.75rem'}}>⚡ ENGINES</button>
<button onClick={logout} style={{background:'#ff003322',color:'#ff0033',border:'1px solid #ff0033',padding:'6px 14px',borderRadius:'6px',cursor:'pointer',fontSize:'0.75rem'}}>LOGOUT</button>
</div>
</nav>
<div style={{padding:'32px 24px',maxWidth:'1200px',margin:'0 auto'}}>
<h1 style={{color:gold,fontSize:'1.5rem',letterSpacing:'0.3em',margin:'0 0 4px'}}>COMMERCE DASHBOARD</h1>
<p style={{color:'#ffffff44',fontSize:'0.7rem',letterSpacing:'0.2em',marginBottom:'32px'}}>ALL SYSTEMS NOMINAL — 7/7 ENGINES LIVE</p>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'16px',marginBottom:'40px'}}>
{[['REVENUE','$14,280','↑ 23.4%'],['ORDERS','247','↑ 18.2%'],['USERS','1,842','↑ 31.7%'],['ENGINES','7 / 7','● LIVE']].map(([label,val,change])=>(
<div key={label} style={{background:'rgba(255,255,255,0.03)',border:`1px solid ${gold}33`,borderRadius:'12px',padding:'20px'}}>
<p style={{color:'#ffffff44',fontSize:'0.65rem',letterSpacing:'0.25em',margin:'0 0 8px'}}>{label}</p>
<p style={{color:gold,fontSize:'1.75rem',fontWeight:'bold',margin:'0 0 4px'}}>{val}</p>
<p style={{color:'#00ff41',fontSize:'0.75rem',margin:0}}>{change}</p>
</div>
))}
</div>
<h2 style={{color:gold,fontSize:'0.85rem',letterSpacing:'0.3em',margin:'0 0 16px'}}>ENGINE STATUS</h2>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'12px',marginBottom:'40px'}}>
{ENG.map(e=>(
<div key={e.name} style={{background:'rgba(255,255,255,0.03)',border:`1px solid ${gold}22`,borderRadius:'10px',padding:'16px'}}>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:'10px'}}>
<span style={{fontSize:'0.85rem'}}>{e.name}</span>
<span style={{color:e.status==='LIVE'?'#00ff41':e.status==='ARMED'?gold:'#8888ff',border:'1px solid currentColor',padding:'2px 8px',borderRadius:'4px',fontSize:'0.7rem'}}>● {e.status}</span>
</div>
<div style={{background:'#ffffff11',borderRadius:'4px',height:'6px'}}>
<div style={{background:`linear-gradient(90deg,${gold},#f5d770)`,width:`${e.pct}%`,height:'100%',borderRadius:'4px'}}/>
</div>
<p style={{color:'#ffffff44',fontSize:'0.7rem',margin:'6px 0 0'}}>{e.pct}% CAPACITY</p>
</div>
))}
</div>
<h2 style={{color:gold,fontSize:'0.85rem',letterSpacing:'0.3em',margin:'0 0 16px'}}>SYSTEM HEALTH</h2>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'12px'}}>
{[['API LATENCY','42ms'],['DB RESPONSE','18ms'],['CDN CACHE','94%'],['UPTIME','99.97%']].map(([label,val])=>(
<div key={label} style={{background:'rgba(255,255,255,0.03)',border:'1px solid #00ff4133',borderRadius:'10px',padding:'16px',textAlign:'center'}}>
<p style={{color:'#ffffff44',fontSize:'0.65rem',letterSpacing:'0.2em',margin:'0 0 8px'}}>{label}</p>
<p style={{color:'#00ff41',fontSize:'1.3rem',fontWeight:'bold',margin:0}}>{val}</p>
</div>
))}
</div>
</div>
</main>
);
}
