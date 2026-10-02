'use client';
import{useState,useEffect}from 'react';
import{useRouter}from 'next/navigation';
const teal='#00d4aa';
const API=process.env.NEXT_PUBLIC_API_URL||'';
export default function Checkout(){
const[cart,setCart]=useState<any[]>([]);
const[name,setName]=useState('');
const[email,setEmail]=useState('');
const[loading,setLoading]=useState(false);
const[error,setError]=useState('');
const router=useRouter();
useEffect(()=>{
const c=localStorage.getItem('wow_cart');
if(c){const parsed=JSON.parse(c);if(!parsed.length)router.push('/shop');else setCart(parsed);}
else router.push('/shop');
},[]);
const total=cart.reduce((a:number,x:any)=>a+(x.price||0)*(x.qty||1),0);
async function handleCheckout(e:any){
e.preventDefault();setError('');setLoading(true);
try{
const res=await fetch(`${API}/api/payments/create-session`,{method:'POST',headers:{'Content-Type':'application/json'},
body:JSON.stringify({items:cart.map((x:any)=>({id:x.id,name:x.name,price:x.price,quantity:x.qty||1})),email,name,
success_url:`${window.location.origin}/success`,cancel_url:`${window.location.origin}/cart`})});
const data=await res.json();
if(data.url)window.location.href=data.url;
else setError(data.error||'Something went wrong. Please try again.');
}catch(err){
setError('Connection error. Please try again.');
}
setLoading(false);
}
return(
<div style={{minHeight:'100vh',background:'#030303',color:'#fff',fontFamily:'monospace'}}>
<nav style={{background:'rgba(0,0,0,0.85)',borderBottom:`1px solid ${teal}33`,padding:'16px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,zIndex:100,backdropFilter:'blur(20px)'}}>
<span onClick={()=>router.push('/shop')} style={{color:'#d4af37',fontWeight:'900',fontSize:'1.3rem',letterSpacing:'0.2em',cursor:'pointer'}}>⚡ WOWDAMN</span>
<button onClick={()=>router.push('/cart')} style={{background:'transparent',color:`${teal}`,border:`1px solid ${teal}33`,padding:'6px 16px',borderRadius:'8px',cursor:'pointer',fontSize:'0.75rem',fontFamily:'monospace'}}>← BACK TO CART</button>
</nav>
<div style={{maxWidth:'900px',margin:'0 auto',padding:'40px 24px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'32px'}}>
<div>
<h2 style={{fontSize:'1.1rem',fontWeight:'bold',marginBottom:'20px',color:teal,letterSpacing:'0.15em'}}>ORDER SUMMARY</h2>
{cart.map((item:any)=>(
<div key={item.id} style={{display:'flex',justifyContent:'space-between',padding:'12px 0',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
<div><p style={{margin:0,fontWeight:'bold',fontSize:'0.85rem'}}>{item.name}</p><p style={{margin:0,color:'#ffffff44',fontSize:'0.75rem'}}>Qty: {item.qty||1}</p></div>
<span style={{color:'#d4af37',fontWeight:'bold'}}>${((item.price||0)*(item.qty||1)).toFixed(2)}</span>
</div>
))}
<div style={{marginTop:'20px',padding:'16px',background:`${teal}08`,border:`1px solid ${teal}22`,borderRadius:'8px'}}>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}><span style={{color:'#ffffff66'}}>Subtotal</span><span>${total.toFixed(2)}</span></div>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:'12px'}}><span style={{color:'#ffffff66'}}>Shipping</span><span style={{color:teal}}>FREE</span></div>
<div style={{display:'flex',justifyContent:'space-between',fontSize:'1.1rem',fontWeight:'900',borderTop:'1px solid rgba(255,255,255,0.1)',paddingTop:'12px'}}><span>Total</span><span style={{color:'#d4af37'}}>${total.toFixed(2)}</span></div>
</div>
<div style={{marginTop:'20px',display:'flex',gap:'8px',alignItems:'center'}}>
<span style={{fontSize:'1.2rem'}}>🔒</span><span style={{color:'#ffffff44',fontSize:'0.75rem'}}>SSL Encrypted · Powered by Stripe</span>
</div>
</div>
<div>
<h2 style={{fontSize:'1.1rem',fontWeight:'bold',marginBottom:'20px',letterSpacing:'0.15em'}}>YOUR DETAILS</h2>
<form onSubmit={handleCheckout}>
<div style={{marginBottom:'16px'}}>
<label style={{display:'block',color:'#ffffff66',fontSize:'0.7rem',letterSpacing:'0.2em',marginBottom:'6px'}}>FULL NAME</label>
<input value={name} onChange={e=>setName(e.target.value)} required placeholder='Your name' style={{width:'100%',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.15)',color:'#fff',padding:'12px 14px',borderRadius:'8px',outline:'none',fontFamily:'monospace',fontSize:'0.85rem',boxSizing:'border-box' as any}}/>
</div>
<div style={{marginBottom:'24px'}}>
<label style={{display:'block',color:'#ffffff66',fontSize:'0.7rem',letterSpacing:'0.2em',marginBottom:'6px'}}>EMAIL</label>
<input value={email} onChange={e=>setEmail(e.target.value)} required type='email' placeholder='your@email.com' style={{width:'100%',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.15)',color:'#fff',padding:'12px 14px',borderRadius:'8px',outline:'none',fontFamily:'monospace',fontSize:'0.85rem',boxSizing:'border-box' as any}}/>
</div>
{error&&<p style={{color:'#ff4444',fontSize:'0.8rem',marginBottom:'16px',padding:'10px',background:'rgba(255,68,68,0.1)',border:'1px solid rgba(255,68,68,0.2)',borderRadius:'6px'}}>{error}</p>}
<button type='submit' disabled={loading} style={{width:'100%',background:loading?`${teal}33`:`linear-gradient(135deg,${teal},#00a885)`,color:loading?teal:'#000',border:'none',padding:'16px',borderRadius:'10px',cursor:loading?'not-allowed':'pointer',fontSize:'0.9rem',fontFamily:'monospace',fontWeight:'900',letterSpacing:'0.05em'}}>
{loading?'REDIRECTING TO STRIPE...':'PAY SECURELY →'}
</button>
<p style={{color:'#ffffff22',fontSize:'0.65rem',textAlign:'center',marginTop:'12px'}}>You will be redirected to Stripe’s secure checkout.</p>
</form>
</div>
</div>
</div>
);
}
