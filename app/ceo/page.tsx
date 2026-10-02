'use client';
import{useState,useEffect}from 'react';
import{useRouter}from 'next/navigation';
export default function CEO(){
const[pin,setPin]=useState('');
const[unlocked,setUnlocked]=useState(false);
const[tab,setTab]=useState('overview');
const router=useRouter();
useEffect(()=>{if(!localStorage.getItem('user'))router.push('/');},[]);
function unlock(){if(pin==='2024'||pin==='0000')setUnlocked(true);}
const gold='#d4af37';
if(!unlocked)return(
<main style={{minHeight:'100vh',background:'#000',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'monospace'}}>
<div style={{textAlign:'center',maxWidth:'360px',width:'100%',padding:'0 20px'}}>
<div style={{fontSize:'4rem',marginBottom:'16px'}}>👑</div>
<h1 style={{color:gold,fontSize:'1.5rem',letterSpacing:'0.3em',margin:'0 0 4px'}}>CEO MODE</h1>
<p style={{color:'#ffffff44',fontSize:'0.75rem',letterSpacing:'0.2em',marginBottom:'32px'}}>AUTHORIZED PERSONNEL ONLY</p>
<div style={{background:'rgba(255,255,255,0.03)',border:`1px solid ${gold}33`,borderRadius:'16px',padding:'32px'}}>
<input type="password" value={pin} onChange={e=>setPin(e.target.value)} onKeyDown={e=>e.key==='Enter'&&unlock()} placeholder="ENTER PIN" maxLength={4} style={{background:'rgba(255,255,255,0.05)',border:`1px solid ${gold}55`,color:gold,padding:'14px',borderRadius:'8px',width:'100%',fontSize:'1.5rem',textAlign:'center',letterSpacing:'0.5em',outline:'none',boxSizing:'border-box' as any}}/>
<button onClick={unlock} style={{marginTop:'16px',background:`linear-gradient(135deg,${gold},#f5d770)`,color:'#000',border:'none',padding:'12px 32px',borderRadius:'8px',fontWeight:'bold',letterSpacing:'0.2em',cursor:'pointer',width:'100%'}}>AUTHENTICATE</button>
</div>
</div>
</main>
);
const METRICS=[['DAILY REVENUE','$14,280','↑ 23.4%'],['ACTIVE ORDERS','247','↑ 18.2%'],['TOTAL USERS','1,842','↑ 31.7%'],['ENGINES LIVE','7/7','● ALL SYSTEMS'],['CONVERSION','8.4%','↑ 1.2%'],['AVG ORDER','$57.81','↑ 4.9%']];
const COMMANDS=[['PRICE MATRIX UPDATE','EXECUTED'],['EMAIL BLAST — VIP','SENT'],['FLASH SALE TRIGGER','ARMED'],['AI RESTOCK ORDER','SCHEDULED'],['CACHE FLUSH','CLEARED'],['ANALYTICS SYNC','LIVE']];
return(
<main style={{minHeight:'100vh',background:'#000',color:'#fff',fontFamily:'monospace'}}>
<nav style={{background:'rgba(255,255,255,0.03)',borderBottom:`1px solid ${gold}33`,padding:'16px 24px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<span style={{color:gold,fontWeight:'bold',letterSpacing:'0.2em'}}>👑 CEO COMMAND CENTER</span>
<div style={{display:'flex',gap:'10px'}}>
<button onClick={()=>router.push('/dashboard')} style={{background:'transparent',color:'#ffffff66',border:'1px solid #ffffff22',padding:'6px 14px',borderRadius:'6px',cursor:'pointer',fontSize:'0.75rem'}}>← DASHBOARD</button>
<button onClick={()=>{localStorage.clear();router.push('/');}} style={{background:'#ff003322',color:'#ff0033',border:'1px solid #ff0033',padding:'6px 14px',borderRadius:'6px',cursor:'pointer',fontSize:'0.75rem'}}>LOGOUT</button>
</div>
</nav>
<div style={{padding:'32px 24px',maxWidth:'1200px',margin:'0 auto'}}>
<div style={{display:'flex',gap:'8px',marginBottom:'32px'}}>
{['overview','commands','products'].map(t=>(
<button key={t} onClick={()=>setTab(t)} style={{background:tab===t?`${gold}22`:'transparent',color:tab===t?gold:'#ffffff44',border:`1px solid ${tab===t?gold:'#ffffff22'}`,padding:'8px 20px',borderRadius:'6px',cursor:'pointer',fontSize:'0.75rem',letterSpacing:'0.15em',textTransform:'uppercase' as any}}>{t}</button>
))}
</div>
{tab==='overview'&&<>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'12px',marginBottom:'32px'}}>
{METRICS.map(([l,v,c])=>(
<div key={l} style={{background:'rgba(255,255,255,0.03)',border:`1px solid ${gold}22`,borderRadius:'10px',padding:'16px'}}>
<p style={{color:'#ffffff44',fontSize:'0.6rem',letterSpacing:'0.2em',margin:'0 0 6px'}}>{l}</p>
<p style={{color:gold,fontSize:'1.4rem',fontWeight:'bold',margin:'0 0 4px'}}>{v}</p>
<p style={{color:'#00ff41',fontSize:'0.7rem',margin:0}}>{c}</p>
</div>
))}
</div>
<h2 style={{color:gold,fontSize:'0.85rem',letterSpacing:'0.3em',margin:'0 0 16px'}}>REVENUE BREAKDOWN</h2>
<div style={{background:'rgba(255,255,255,0.02)',border:`1px solid ${gold}22`,borderRadius:'12px',padding:'20px'}}>
{[['WOW DROP #47','$4,280',30],['VIP BUNDLE','$3,100',22],['FLASH SALE','$2,900',20],['AUTO SHIP','$2,400',17],['CEO SELECT','$1,600',11]].map(([name,rev,pct])=>(
<div key={String(name)} style={{marginBottom:'16px'}}>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
<span style={{fontSize:'0.8rem'}}>{name}</span><span style={{color:gold,fontSize:'0.8rem'}}>{rev}</span>
</div>
<div style={{background:'#ffffff11',borderRadius:'4px',height:'6px'}}>
<div style={{background:`linear-gradient(90deg,${gold},#f5d770)`,width:`${pct}%`,height:'100%',borderRadius:'4px'}}/>
</div>
</div>
))}
</div>
</> }
{tab==='commands'&&<div style={{background:'rgba(255,255,255,0.02)',border:`1px solid ${gold}22`,borderRadius:'12px',padding:'20px'}}>
{COMMANDS.map(([cmd,status])=>(
<div key={cmd} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 0',borderBottom:'1px solid #ffffff11'}}>
<span style={{fontSize:'0.85rem'}}>{cmd}</span>
<span style={{color:'#00ff41',border:'1px solid #00ff41',padding:'2px 10px',borderRadius:'4px',fontSize:'0.7rem'}}>● {status}</span>
</div>
))}
</div>}
{tab==='products'&&<div style={{background:'rgba(255,255,255,0.02)',border:`1px solid ${gold}22`,borderRadius:'12px',padding:'20px'}}>
<table style={{width:'100%',borderCollapse:'collapse' as any,fontSize:'0.8rem'}}>
<thead><tr style={{color:'#ffffff44',fontSize:'0.65rem',letterSpacing:'0.15em'}}>
<th style={{textAlign:'left' as any,paddingBottom:'12px'}}>PRODUCT</th><th style={{textAlign:'right' as any,paddingBottom:'12px'}}>REVENUE</th><th style={{textAlign:'right' as any,paddingBottom:'12px'}}>MARGIN</th>
</tr></thead>
<tbody>
{[['WOW Drop #47','$4,280','68%'],['VIP Bundle','$3,100','72%'],['Flash Sale Kit','$2,900','54%'],['Auto-Ship Box','$2,400','61%'],['CEO Select Pack','$1,600','79%']].map(([p,r,m])=>(
<tr key={p} style={{borderTop:'1px solid #ffffff11'}}>
<td style={{padding:'10px 0'}}>{p}</td><td style={{textAlign:'right' as any,color:gold}}>{r}</td><td style={{textAlign:'right' as any,color:'#00ff41'}}>{m}</td>
</tr>
))}
</tbody>
</table>
</div>}
</div>
</main>
);
}
