'use client';
import{useState,useEffect}from 'react';
import{useRouter}from 'next/navigation';
const teal='#00d4aa';
export default function Cart(){
const[cart,setCart]=useState<any[]>([]);
const router=useRouter();
useEffect(()=>{
const c=localStorage.getItem('wow_cart');
if(c)setCart(JSON.parse(c));
},[]);
function updateQty(id:string,delta:number){
const c=cart.map(x=>x.id===id?{...x,qty:Math.max(1,(x.qty||1)+delta)}:x);
setCart(c);localStorage.setItem('wow_cart',JSON.stringify(c));
}
function remove(id:string){
const c=cart.filter(x=>x.id!==id);
setCart(c);localStorage.setItem('wow_cart',JSON.stringify(c));
}
const subtotal=cart.reduce((a:number,x:any)=>a+(x.price||0)*(x.qty||1),0);
return(
<div style={{minHeight:'100vh',background:'#030303',color:'#fff',fontFamily:'monospace'}}>
<nav style={{background:'rgba(0,0,0,0.85)',borderBottom:`1px solid ${teal}33`,padding:'16px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,zIndex:100,backdropFilter:'blur(20px)'}}>
<span onClick={()=>router.push('/shop')} style={{color:'#d4af37',fontWeight:'900',fontSize:'1.3rem',letterSpacing:'0.2em',cursor:'pointer'}}>⚡ WOWDAMN</span>
<button onClick={()=>router.push('/shop')} style={{background:'transparent',color:`${teal}`,border:`1px solid ${teal}33`,padding:'6px 16px',borderRadius:'8px',cursor:'pointer',fontSize:'0.75rem',fontFamily:'monospace'}}>← CONTINUE SHOPPING</button>
</nav>
<div style={{maxWidth:'800px',margin:'0 auto',padding:'40px 24px'}}>
<h1 style={{fontSize:'2rem',fontWeight:'900',marginBottom:'32px'}}>🛒 Your Cart</h1>
{cart.length===0?(
<div style={{textAlign:'center',padding:'80px 0'}}>
<p style={{fontSize:'3rem',marginBottom:'16px'}}>🛒</p>
<p style={{color:'#ffffff44',marginBottom:'24px'}}>Your cart is empty.</p>
<button onClick={()=>router.push('/shop')} style={{background:teal,color:'#000',border:'none',padding:'12px 32px',borderRadius:'8px',cursor:'pointer',fontSize:'0.9rem',fontFamily:'monospace',fontWeight:'bold'}}>SHOP NOW</button>
</div>
):(
<>
<div style={{display:'flex',flexDirection:'column',gap:'16px',marginBottom:'32px'}}>
{cart.map((item:any)=>(
<div key={item.id} style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'12px',padding:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'16px'}}>
<div style={{flex:1}}>
<p style={{fontWeight:'bold',marginBottom:'4px'}}>{item.name}</p>
<p style={{color:'#d4af37',fontWeight:'900'}}>${item.price}</p>
</div>
<div style={{display:'flex',alignItems:'center',gap:'8px'}}>
<button onClick={()=>updateQty(item.id,-1)} style={{background:'rgba(255,255,255,0.08)',color:'#fff',border:'none',width:'32px',height:'32px',borderRadius:'6px',cursor:'pointer',fontSize:'1rem'}}>-</button>
<span style={{width:'24px',textAlign:'center'}}>{item.qty||1}</span>
<button onClick={()=>updateQty(item.id,1)} style={{background:'rgba(255,255,255,0.08)',color:'#fff',border:'none',width:'32px',height:'32px',borderRadius:'6px',cursor:'pointer',fontSize:'1rem'}}>+</button>
</div>
<span style={{color:'#fff',fontWeight:'bold',minWidth:'64px',textAlign:'right'}}>${((item.price||0)*(item.qty||1)).toFixed(2)}</span>
<button onClick={()=>remove(item.id)} style={{background:'rgba(255,68,68,0.1)',color:'#ff4444',border:'1px solid rgba(255,68,68,0.2)',width:'32px',height:'32px',borderRadius:'6px',cursor:'pointer',fontSize:'0.8rem'}}>×</button>
</div>
))}
</div>
<div style={{background:'rgba(0,212,170,0.05)',border:`1px solid ${teal}22`,borderRadius:'12px',padding:'24px'}}>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}><span style={{color:'#ffffff66'}}>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:'16px'}}><span style={{color:'#ffffff66'}}>Shipping</span><span style={{color:teal}}>FREE</span></div>
<div style={{borderTop:'1px solid rgba(255,255,255,0.1)',paddingTop:'16px',display:'flex',justifyContent:'space-between',fontSize:'1.2rem',fontWeight:'900'}}><span>Total</span><span style={{color:'#d4af37'}}>${subtotal.toFixed(2)}</span></div>
<button onClick={()=>router.push('/checkout')} style={{width:'100%',marginTop:'20px',background:`linear-gradient(135deg,${teal},#00a885)`,color:'#000',border:'none',padding:'16px',borderRadius:'10px',cursor:'pointer',fontSize:'0.9rem',fontFamily:'monospace',fontWeight:'900',letterSpacing:'0.1em'}}>CHECKOUT — SECURE PAYMENT →</button>
</div>
</>
)}
</div>
</div>
);
}
