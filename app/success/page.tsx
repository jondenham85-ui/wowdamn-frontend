'use client';
import{useEffect}from 'react';
import{useRouter}from 'next/navigation';
const teal='#00d4aa';
export default function Success(){
const router=useRouter();
useEffect(()=>{localStorage.removeItem('wow_cart');},[]);
return(
<div style={{minHeight:'100vh',background:'#030303',color:'#fff',fontFamily:'monospace',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'40px 24px'}}>
<div style={{position:'relative',marginBottom:'32px'}}>
<div style={{width:'100px',height:'100px',borderRadius:'50%',background:`${teal}11`,border:`2px solid ${teal}33`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'3rem',boxShadow:`0 0 60px ${teal}44`}}>✓</div>
<div style={{position:'absolute',inset:'-8px',borderRadius:'50%',border:`1px solid ${teal}22`,animation:'spin 4s linear infinite'}}/>
</div>
<div style={{background:`${teal}11`,border:`1px solid ${teal}33`,borderRadius:'6px',padding:'4px 16px',marginBottom:'20px'}}>
<span style={{color:teal,fontSize:'0.65rem',letterSpacing:'0.3em'}}>PAYMENT CONFIRMED</span>
</div>
<h1 style={{fontSize:'2.5rem',fontWeight:'900',marginBottom:'12px',letterSpacing:'-0.02em'}}>ORDER <span style={{color:teal}}>CONFIRMED</span></h1>
<p style={{color:'#ffffff66',maxWidth:'440px',lineHeight:'1.7',marginBottom:'8px'}}>Your payment was successful. Check your email for a confirmation and delivery details.</p>
<p style={{color:'#ffffff33',fontSize:'0.75rem',marginBottom:'40px'}}>Thank you for your order.</p>
<div style={{display:'flex',gap:'12px',flexWrap:'wrap',justifyContent:'center'}}>
<button onClick={()=>router.push('/shop')} style={{background:`linear-gradient(135deg,${teal},#00a885)`,color:'#000',border:'none',padding:'12px 28px',borderRadius:'8px',cursor:'pointer',fontSize:'0.85rem',fontFamily:'monospace',fontWeight:'bold'}}>SHOP MORE</button>
<button onClick={()=>router.push('/ai')} style={{background:`${teal}11`,color:teal,border:`1px solid ${teal}44`,padding:'12px 28px',borderRadius:'8px',cursor:'pointer',fontSize:'0.85rem',fontFamily:'monospace'}}>TALK TO AI ADVISOR</button>
</div>
<style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
</div>
);
}
