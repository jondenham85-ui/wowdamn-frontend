'use client';
import{useState}from 'react';
import{useRouter}from 'next/navigation';
export default function Login(){
const[email,setEmail]=useState('');
const[pass,setPass]=useState('');
const[err,setErr]=useState('');
const[loading,setLoading]=useState(false);
const router=useRouter();
async function submit(e:any){
e.preventDefault();setErr('');setLoading(true);
try{
const r=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password:pass})});
const d=await r.json();
if(!r.ok)throw new Error(d.message||'Login failed');
localStorage.setItem('token',d.token);
localStorage.setItem('user',JSON.stringify(d.user));
if(d.user.role==='ceo'||d.user.role==='admin')router.push('/ceo');
else router.push('/dashboard');
}catch(e:any){setErr(e.message);}
setLoading(false);
}
return(
<main style={{minHeight:'100vh',background:'radial-gradient(ellipse at center,#0a0a1a 0%,#000 100%)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'monospace'}}>
<div style={{width:'100%',maxWidth:'420px',padding:'20px'}}>
<div style={{textAlign:'center',marginBottom:'32px'}}>
<div style={{width:'80px',height:'80px',margin:'0 auto 16px',borderRadius:'50%',background:'conic-gradient(from 0deg,#d4af37,#f5d770,#d4af37)',boxShadow:'0 0 40px rgba(212,175,55,0.6)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2rem'}}>⚡</div>
<h1 style={{color:'#d4af37',fontSize:'2rem',fontWeight:'900',letterSpacing:'0.2em',textShadow:'0 0 20px rgba(212,175,55,0.8)',margin:0}}>WOWDamn</h1>
<p style={{color:'rgba(212,175,55,0.6)',fontSize:'0.7rem',letterSpacing:'0.3em',marginTop:'4px'}}>HOLOGRAPHIC COMMERCE OS</p>
</div>
<div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(212,175,55,0.2)',backdropFilter:'blur(20px)',borderRadius:'16px',padding:'32px'}}>
<h2 style={{color:'#fff',textAlign:'center',marginBottom:'24px',letterSpacing:'0.2em',fontSize:'1rem'}}>SYSTEM ACCESS</h2>
{err&&<div style={{background:'rgba(255,0,51,0.15)',border:'1px solid rgba(255,0,51,0.4)',color:'#ff6680',borderRadius:'8px',padding:'10px',marginBottom:'16px',fontSize:'0.8rem'}}>{err}</div>}
<form onSubmit={submit}>
<div style={{marginBottom:'16px'}}>
<label style={{color:'rgba(212,175,55,0.7)',fontSize:'0.65rem',letterSpacing:'0.25em',display:'block',marginBottom:'8px'}}>EMAIL</label>
<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="operator@wowdamn.com" style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(212,175,55,0.3)',color:'#fff',padding:'12px 16px',borderRadius:'8px',width:'100%',outline:'none',boxSizing:'border-box',fontSize:'0.9rem'}}/>
</div>
<div style={{marginBottom:'24px'}}>
<label style={{color:'rgba(212,175,55,0.7)',fontSize:'0.65rem',letterSpacing:'0.25em',display:'block',marginBottom:'8px'}}>PASSWORD</label>
<input type="password" value={pass} onChange={e=>setPass(e.target.value)} required placeholder="••••••••••••" style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(212,175,55,0.3)',color:'#fff',padding:'12px 16px',borderRadius:'8px',width:'100%',outline:'none',boxSizing:'border-box',fontSize:'0.9rem'}}/>
</div>
<button type="submit" disabled={loading} style={{background:'linear-gradient(135deg,#d4af37,#f5d770)',color:'#000',border:'none',padding:'14px',borderRadius:'8px',width:'100%',fontWeight:'bold',letterSpacing:'0.2em',cursor:'pointer',fontSize:'0.85rem'}}>
{loading?'AUTHENTICATING...':'INITIALIZE SESSION'}
</button>
</form>
<p style={{textAlign:'center',color:'rgba(212,175,55,0.25)',fontSize:'0.6rem',letterSpacing:'0.15em',marginTop:'24px',marginBottom:0}}>WOWDAMN COMMERCE INTELLIGENCE SYSTEM v2.0</p>
</div>
</div>
</main>
);
}
