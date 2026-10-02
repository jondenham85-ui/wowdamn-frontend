'use client';
import{useState,useEffect}from 'react';
import{useRouter}from 'next/navigation';
const teal='#00d4aa';
const CASHAPP='$MadMadisonAI';
const PRODUCTS=[
{id:'1',name:'WOW Drop #1',price:97,desc:'Limited-edition AI-curated bundle. Delivered within 24h of payment.',category:'bundle',stock:12,img:'📦',hot:true},
{id:'2',name:'CEO Intelligence Pack',price:197,desc:'Executive playbook + private AI briefings. Digital delivery.',category:'digital',stock:999,img:'👑',hot:true},
{id:'3',name:'Viral Engine Access',price:47,desc:'30-day access to the Viral Engine automation suite.',category:'software',stock:99,img:'⚡',hot:false},
{id:'4',name:'Flash Drop Hoodie',price:89,desc:'Black-out hoodie. WOWDamn logo. Limited run of 20.',category:'apparel',stock:6,img:'🖤',hot:false},
{id:'5',name:'Revenue Blueprint',price:27,desc:'The exact system used to build WOWDamn. PDF + video.',category:'digital',stock:999,img:'💰',hot:false},
{id:'6',name:'AI Commerce Course',price:297,desc:'Build your own AI commerce OS from scratch. 8 modules.',category:'digital',stock:999,img:'🤖',hot:true},
];
function cashLink(amount:number,note:string){
return `https://cash.app/${CASHAPP}/${amount}?note=${encodeURIComponent(note)}`;
}
export default function Shop(){
const[filter,setFilter]=useState('all');
const router=useRouter();
const filtered=filter==='all'?PRODUCTS:PRODUCTS.filter(p=>p.category===filter);
return(
<div style={{minHeight:'100vh',background:'#030303',color:'#fff',fontFamily:'monospace'}}>
<div style={{position:'fixed',inset:0,pointerEvents:'none',backgroundImage:`linear-gradient(rgba(0,212,170,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,170,0.025) 1px,transparent 1px)`,backgroundSize:'50px 50px'}}/>
<nav style={{position:'sticky',top:0,zIndex:100,background:'rgba(0,0,0,0.9)',borderBottom:`1px solid ${teal}22`,backdropFilter:'blur(20px)',padding:'14px 20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<div style={{display:'flex',alignItems:'center',gap:'12px'}}>
<span onClick={()=>router.push('/')} style={{color:'#d4af37',fontWeight:'900',fontSize:'1.2rem',letterSpacing:'0.15em',cursor:'pointer'}}>⚡ WOWDAMN</span>
<button onClick={()=>router.push('/subscribe')} style={{background:`${teal}11`,color:teal,border:`1px solid ${teal}33`,padding:'4px 12px',borderRadius:'20px',cursor:'pointer',fontSize:'0.7rem',fontFamily:'monospace'}}>★ SUBSCRIBE</button>
</div>
<button onClick={()=>router.push('/ai')} style={{background:'rgba(212,175,55,0.1)',color:'#d4af37',border:'1px solid rgba(212,175,55,0.3)',padding:'6px 14px',borderRadius:'8px',cursor:'pointer',fontSize:'0.75rem',fontFamily:'monospace'}}>✦ AI ADVISOR</button>
</nav>
<div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 20px'}}>
<div style={{textAlign:'center',padding:'50px 0 36px'}}>
<div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:`${teal}11`,border:`1px solid ${teal}33`,borderRadius:'20px',padding:'5px 16px',marginBottom:'16px'}}>
<span style={{width:'6px',height:'6px',borderRadius:'50%',background:teal,display:'inline-block'}}/>
<span style={{color:teal,fontSize:'0.65rem',letterSpacing:'0.3em'}}>STORE IS OPEN · PAY WITH CASHAPP</span>
</div>
<h1 style={{fontSize:'2.8rem',fontWeight:'900',margin:'0 0 10px',letterSpacing:'-0.02em'}}>
<span style={{color:'#d4af37'}}>WOW</span><span style={{color:'#fff'}}>Damn</span><span style={{color:teal}}> Store</span>
</h1>
<p style={{color:'#ffffff55',fontSize:'0.85rem',margin:'0 0 8px'}}>No accounts. No checkout. Tap the button, pay via CashApp, done.</p>
<div style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'rgba(0,0,0,0.6)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'8px',padding:'6px 14px'}}>
<span style={{fontSize:'1rem'}}>💚</span>
<span style={{color:'#ffffff88',fontSize:'0.75rem',fontFamily:'monospace'}}>Send to <span style={{color:'#00d632',fontWeight:'bold'}}>{CASHAPP}</span> on CashApp</span>
</div>
</div>
<div style={{display:'flex',gap:'8px',justifyContent:'center',marginBottom:'32px',flexWrap:'wrap'}}>
{['all','bundle','digital','software','apparel'].map(f=>(
<button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?teal:'rgba(255,255,255,0.04)',color:filter===f?'#000':'#ffffff88',border:`1px solid ${filter===f?teal:'rgba(255,255,255,0.1)'}`,padding:'6px 18px',borderRadius:'20px',cursor:'pointer',fontSize:'0.7rem',fontFamily:'monospace',textTransform:'uppercase',letterSpacing:'0.1em'}}>{f}</button>
))}
</div>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:'20px',paddingBottom:'60px'}}>
{filtered.map(p=>(
<div key={p.id} style={{background:'rgba(255,255,255,0.03)',border:`1px solid ${p.hot?teal+'33':'rgba(255,255,255,0.07)'}`,borderRadius:'16px',overflow:'hidden',position:'relative'}}>
{p.hot&&<div style={{position:'absolute',top:'12px',right:'12px',background:teal,color:'#000',fontSize:'0.6rem',fontWeight:'900',padding:'2px 8px',borderRadius:'4px',letterSpacing:'0.15em'}}>🔥 HOT</div>}
{p.stock<10&&<div style={{position:'absolute',top:'12px',left:'12px',background:'rgba(255,68,68,0.9)',color:'#fff',fontSize:'0.6rem',fontWeight:'bold',padding:'2px 8px',borderRadius:'4px'}}>⚠ {p.stock} LEFT</div>}
<div style={{background:`linear-gradient(135deg,#080808,${teal}0a)`,padding:'36px',textAlign:'center',fontSize:'2.8rem',borderBottom:`1px solid rgba(255,255,255,0.05)`}}>{p.img}</div>
<div style={{padding:'20px'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'8px'}}>
<h3 style={{color:'#fff',fontSize:'0.95rem',fontWeight:'bold',margin:0,flex:1}}>{p.name}</h3>
<span style={{color:'#d4af37',fontWeight:'900',fontSize:'1.2rem',marginLeft:'10px'}}>${p.price}</span>
</div>
<p style={{color:'#ffffff44',fontSize:'0.75rem',lineHeight:'1.5',marginBottom:'16px'}}>{p.desc}</p>
<a href={cashLink(p.price,`WOWDamn - ${p.name}`)} target="_blank" rel="noopener noreferrer" style={{display:'block',textAlign:'center',background:`linear-gradient(135deg,#00d632,#00a827)`,color:'#fff',padding:'12px',borderRadius:'10px',textDecoration:'none',fontWeight:'900',fontSize:'0.85rem',letterSpacing:'0.1em',boxShadow:'0 4px 20px rgba(0,214,50,0.25)'}}>
💚 PAY ${p.price} WITH CASHAPP
</a>
<p style={{textAlign:'center',color:'#ffffff22',fontSize:'0.6rem',marginTop:'8px'}}>Opens CashApp · Include your email in the note</p>
</div>
</div>
))}
</div>
<div style={{background:'rgba(0,214,50,0.04)',border:'1px solid rgba(0,214,50,0.15)',borderRadius:'12px',padding:'24px',marginBottom:'40px',textAlign:'center'}}>
<p style={{color:'#00d632',fontWeight:'bold',marginBottom:'8px',fontSize:'0.9rem'}}>💚 How to Buy</p>
<p style={{color:'#ffffff66',fontSize:'0.8rem',lineHeight:'1.8',margin:0}}>
1. Tap the green button on any product<br/>
2. CashApp opens pre-filled with the amount, send to <strong style={{color:'#00d632'}}>{CASHAPP}</strong><br/>
3. <strong>Include your email in the note</strong> so we can send your order<br/>
4. Digital products delivered within 1 hour · Physical within 48h
</p>
</div>
</div>
</div>
);
}
