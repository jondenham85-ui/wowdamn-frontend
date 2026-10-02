'use client';
import{useState,useEffect}from 'react';
import{useRouter}from 'next/navigation';
const API=process.env.NEXT_PUBLIC_API_URL||'';
const teal='#00d4aa';
const MOCK=[
{id:'1',name:'WOW Drop #1',price:97,desc:'Limited-edition AI-curated bundle. Ships in 48h.',category:'bundle',stock:12,img:'📦'},
{id:'2',name:'CEO Intelligence Pack',price:197,desc:'Executive playbook + private AI briefings.',category:'digital',stock:999,img:'👑'},
{id:'3',name:'Viral Engine Access',price:47,desc:'30-day access to the Viral Engine automation suite.',category:'software',stock:99,img:'⚡'},
{id:'4',name:'Flash Drop Hoodie',price:89,desc:'Black-out hoodie. WOWDamn logo. Limited run.',category:'apparel',stock:6,img:'🖤'},
{id:'5',name:'Revenue Blueprint',price:27,desc:'The exact system used to build WOWDamn revenue.',category:'digital',stock:999,img:'💰'},
{id:'6',name:'AI Commerce Course',price:297,desc:'Build your own AI commerce OS from scratch.',category:'digital',stock:999,img:'🤖'},
];
export default function Shop(){
const[products,setProducts]=useState(MOCK);
const[cart,setCart]=useState<any[]>([]);
const[filter,setFilter]=useState('all');
const[added,setAdded]=useState<string|null>(null);
const router=useRouter();
useEffect(()=>{
const c=localStorage.getItem('wow_cart');
if(c)setCart(JSON.parse(c));
fetch(`${API}/api/products`,{headers:{'Authorization':`Bearer ${localStorage.getItem('token')||''}`}})
.then(r=>r.json()).then(d=>{if(Array.isArray(d)&&d.length)setProducts(d);}).catch(()=>{});
},[]);
function addToCart(p:any){
const c=[...cart];const idx=c.findIndex(x=>x.id===p.id);
if(idx>=0)c[idx].qty=(c[idx].qty||1)+1;else c.push({...p,qty:1});
setCart(c);localStorage.setItem('wow_cart',JSON.stringify(c));
setAdded(p.id);setTimeout(()=>setAdded(null),1500);
}
const filtered=filter==='all'?products:products.filter((p:any)=>p.category===filter);
const cartCount=cart.reduce((a:number,x:any)=>a+(x.qty||1),0);
return(
<div style={{minHeight:'100vh',background:'#030303',color:'#fff',fontFamily:'monospace'}}>
<nav style={{background:'rgba(0,0,0,0.85)',borderBottom:`1px solid ${teal}33`,padding:'16px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,zIndex:100,backdropFilter:'blur(20px)'}}>
<div style={{display:'flex',alignItems:'center',gap:'16px'}}>
<span onClick={()=>router.push('/')} style={{color:'#d4af37',fontWeight:'900',fontSize:'1.3rem',letterSpacing:'0.2em',cursor:'pointer'}}>⚡ WOWDAMN</span>
<span onClick={()=>router.push('/ai')} style={{color:teal,fontSize:'0.75rem',border:`1px solid ${teal}44`,padding:'4px 12px',borderRadius:'20px',cursor:'pointer'}}>✶ AI ADVISOR</span>
</div>
<button onClick={()=>router.push('/cart')} style={{background:`${teal}22`,color:teal,border:`1px solid ${teal}44`,padding:'8px 16px',borderRadius:'8px',cursor:'pointer',fontSize:'0.8rem',fontFamily:'monospace'}}>🛒 CART {cartCount>0&&<span style={{background:teal,color:'#000',borderRadius:'50%',padding:'0 6px',marginLeft:'6px',fontWeight:'bold'}}>{cartCount}</span>}</button>
</nav>
<div style={{padding:'0 24px',maxWidth:'1200px',margin:'0 auto'}}>
<div style={{textAlign:'center',padding:'60px 0 40px'}}>
<h1 style={{fontSize:'3rem',fontWeight:'900',margin:'0 0 12px'}}><span style={{color:'#d4af37'}}>WOW</span><span style={{color:'#fff'}}>Damn</span><span style={{color:teal}}> Store</span></h1>
<p style={{color:'#ffffff66',fontSize:'0.9rem'}}>AI-curated drops. Digital tools. Apparel.</p>
</div>
<div style={{display:'flex',gap:'8px',justifyContent:'center',marginBottom:'40px',flexWrap:'wrap'}}>
{['all','bundle','digital','software','apparel'].map(f=>(
<button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?teal:'rgba(255,255,255,0.05)',color:filter===f?'#000':'#fff',border:`1px solid ${filter===f?teal:'rgba(255,255,255,0.1)'}`,padding:'8px 20px',borderRadius:'20px',cursor:'pointer',fontSize:'0.75rem',fontFamily:'monospace',textTransform:'uppercase'}}>{f}</button>
))}
</div>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'20px',paddingBottom:'60px'}}>
{filtered.map((p:any)=>(
<div key={p.id} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',overflow:'hidden'}}>
<div style={{background:`linear-gradient(135deg,#0a0a0a,${teal}11)`,padding:'40px',textAlign:'center',fontSize:'3rem'}}>{p.img||'📦'}</div>
<div style={{padding:'20px'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'8px'}}>
<h3 style={{color:'#fff',fontSize:'1rem',fontWeight:'bold',margin:0}}>{p.name}</h3>
<span style={{color:'#d4af37',fontWeight:'900',fontSize:'1.1rem',marginLeft:'8px'}}>${p.price}</span>
</div>
<p style={{color:'#ffffff55',fontSize:'0.8rem',marginBottom:'16px',lineHeight:'1.5'}}>{p.desc}</p>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<span style={{color:p.stock<10?'#ff4444':teal,fontSize:'0.7rem',border:`1px solid ${p.stock<10?'#ff444433':teal+'33'}`,padding:'2px 8px',borderRadius:'4px'}}>{p.stock<10?`⚠ ${p.stock} LEFT`:'IN STOCK'}</span>
<button onClick={()=>addToCart(p)} style={{background:added===p.id?teal:`${teal}11`,color:added===p.id?'#000':teal,border:`1px solid ${teal}`,padding:'8px 20px',borderRadius:'8px',cursor:'pointer',fontSize:'0.75rem',fontFamily:'monospace',fontWeight:'bold'}}>{added===p.id?'✓ ADDED':'ADD TO CART'}</button>
</div>
</div>
</div>
))}
</div>
</div>
</div>
);
}
