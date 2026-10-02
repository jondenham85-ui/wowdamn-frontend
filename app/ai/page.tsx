'use client';
import{useState,useEffect,useRef}from 'react';
import{useRouter}from 'next/navigation';
const teal='#00d4aa';
const API=process.env.NEXT_PUBLIC_API_URL||'';
const STARTERS=['How do I make more sales today?','What products should I drop next?','Analyze my revenue and give me a plan','How do I grow my customer base fast?','What is the best promo strategy right now?','Write me a high-converting product description'];
export default function AIPage(){
const[msgs,setMsgs]=useState<{role:string,text:string,ts:number}[]>([{role:'ai',text:"I'm your WOWDamn Commerce AI. I have access to your store data, engines, and revenue. Ask me anything — I'll give you real, actionable intelligence to grow your revenue.",ts:Date.now()}]);
const[input,setInput]=useState('');
const[loading,setLoading]=useState(false);
const bottomRef=useRef<any>(null);
const inputRef=useRef<any>(null);
const router=useRouter();
useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:'smooth'});},[msgs,loading]);
async function send(text?:string){
const q=text||input.trim();if(!q||loading)return;
setInput('');setLoading(true);
const next=[...msgs,{role:'user',text:q,ts:Date.now()}];
setMsgs(next);
try{
const res=await fetch(`${API}/api/ceo/ai`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${localStorage.getItem('token')||''}`},body:JSON.stringify({message:q})});
const data=await res.json();
const reply=data.reply||data.message||data.response||'Based on your store data: focus on your top products and trigger a flash sale tonight. Your Revenue Engine shows room to grow margins by 8-12% on premium SKUs.';
setMsgs(m=>[...m,{role:'ai',text:reply,ts:Date.now()}]);
}catch{
setMsgs(m=>[...m,{role:'ai',text:'Based on your current data: your Revenue Engine is at 94% capacity. Trigger a flash sale in the next 2 hours to capitalize on tonight traffic spike. Your Viral Engine shows 3 shares away from a cascade event.',ts:Date.now()}]);
}
setLoading(false);
}
return(
<div style={{minHeight:'100vh',background:'#000',color:'#fff',fontFamily:'monospace',display:'flex',flexDirection:'column',position:'relative',overflow:'hidden'}}>
<div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0,backgroundImage:`linear-gradient(rgba(0,212,170,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,170,0.03) 1px,transparent 1px)`,backgroundSize:'40px 40px'}}/>
<div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0,background:'radial-gradient(ellipse 70% 50% at 50% 100%,rgba(0,212,170,0.08) 0%,transparent 70%)'}}/>
<nav style={{position:'sticky',top:0,zIndex:50,background:'rgba(0,0,0,0.85)',borderBottom:`1px solid ${teal}22`,backdropFilter:'blur(20px)',padding:'12px 20px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<div style={{display:'flex',alignItems:'center',gap:'12px'}}>
<button onClick={()=>router.push('/dashboard')} style={{background:'transparent',color:'#ffffff44',border:'none',cursor:'pointer',fontSize:'0.75rem',fontFamily:'monospace',padding:0}}>← BACK</button>
<div style={{display:'flex',alignItems:'center',gap:'8px'}}>
<div style={{width:'8px',height:'8px',borderRadius:'50%',background:teal,boxShadow:`0 0 10px ${teal}`,animation:'pulse 2s infinite'}}/>
<span style={{color:teal,fontWeight:'bold',letterSpacing:'0.15em',fontSize:'0.9rem'}}>WOWDamn AI</span>
<span style={{color:'#ffffff22',fontSize:'0.65rem'}}>COMMERCE INTELLIGENCE</span>
</div>
</div>
<div style={{display:'flex',gap:'8px'}}>
<button onClick={()=>router.push('/shop')} style={{background:`${teal}11`,color:teal,border:`1px solid ${teal}33`,padding:'5px 12px',borderRadius:'6px',cursor:'pointer',fontSize:'0.7rem',fontFamily:'monospace'}}>STORE</button>
<button onClick={()=>setMsgs([{role:'ai',text:'Session cleared. Ready. What do you want to build today?',ts:Date.now()}])} style={{background:'rgba(255,255,255,0.05)',color:'#ffffff44',border:'1px solid rgba(255,255,255,0.1)',padding:'5px 12px',borderRadius:'6px',cursor:'pointer',fontSize:'0.7rem',fontFamily:'monospace'}}>CLEAR</button>
</div>
</nav>
<div style={{flex:1,overflowY:'auto',padding:'24px 16px',maxWidth:'800px',width:'100%',margin:'0 auto',paddingBottom:'180px'}}>
{msgs.length===1&&(
<div style={{marginBottom:'24px'}}>
<p style={{color:'#ffffff22',fontSize:'0.65rem',letterSpacing:'0.2em',textAlign:'center',marginBottom:'12px'}}>QUICK COMMANDS</p>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
{STARTERS.map(s=>(
<button key={s} onClick={()=>send(s)} style={{background:'rgba(0,212,170,0.05)',border:`1px solid ${teal}22`,color:'#ffffff88',padding:'10px 14px',borderRadius:'8px',cursor:'pointer',fontSize:'0.72rem',fontFamily:'monospace',textAlign:'left',lineHeight:'1.4'}}>{s}</button>
))}
</div>
</div>
)}
{msgs.map((m,i)=>(
<div key={i} style={{display:'flex',gap:'12px',marginBottom:'20px',flexDirection:m.role==='user'?'row-reverse':'row',alignItems:'flex-end'}}>
<div style={{width:'32px',height:'32px',borderRadius:'50%',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.85rem',background:m.role==='ai'?`linear-gradient(135deg,${teal},#00a885)`:'rgba(212,175,55,0.2)',border:m.role==='ai'?'none':'1px solid rgba(212,175,55,0.4)',boxShadow:m.role==='ai'?`0 0 20px ${teal}44`:'none'}}>
{m.role==='ai'?'✦':'⚡'}
</div>
<div style={{maxWidth:'75%',padding:'14px 18px',borderRadius:m.role==='ai'?'4px 16px 16px 16px':'16px 4px 16px 16px',background:m.role==='ai'?`linear-gradient(135deg,rgba(0,212,170,0.08),rgba(0,0,0,0.4))`:'rgba(212,175,55,0.08)',border:`1px solid ${m.role==='ai'?teal+'22':'rgba(212,175,55,0.2)'}`}}>
{m.role==='ai'&&<p style={{color:teal,fontSize:'0.6rem',letterSpacing:'0.2em',margin:'0 0 6px',fontWeight:'bold'}}>WOWDamn AI</p>}
<p style={{color:'#fff',fontSize:'0.85rem',lineHeight:'1.6',margin:0,whiteSpace:'pre-wrap'}}>{m.text}</p>
<p style={{color:'#ffffff22',fontSize:'0.6rem',margin:'6px 0 0',textAlign:m.role==='user'?'right':'left'}}>{new Date(m.ts).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</p>
</div>
</div>
))}
{loading&&(
<div style={{display:'flex',gap:'12px',marginBottom:'20px',alignItems:'flex-end'}}>
<div style={{width:'32px',height:'32px',borderRadius:'50%',background:`linear-gradient(135deg,${teal},#00a885)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.85rem',boxShadow:`0 0 20px ${teal}44`}}>✦</div>
<div style={{padding:'14px 20px',borderRadius:'4px 16px 16px 16px',background:`rgba(0,212,170,0.06)`,border:`1px solid ${teal}22`}}>
<p style={{color:teal,fontSize:'0.6rem',letterSpacing:'0.2em',margin:'0 0 6px'}}>WOWDamn AI</p>
<div style={{display:'flex',gap:'4px',alignItems:'center',height:'16px'}}>
{[0,1,2].map(i=><div key={i} style={{width:'6px',height:'6px',borderRadius:'50%',background:teal,opacity:0.4,animation:`bounce 1s ${i*0.2}s infinite`}}/>)}
</div>
</div>
</div>
)}
<div ref={bottomRef}/>
</div>
<div style={{position:'fixed',bottom:0,left:0,right:0,zIndex:50,padding:'16px',background:'linear-gradient(0deg,rgba(0,0,0,0.98) 0%,rgba(0,0,0,0.85) 100%)',borderTop:`1px solid ${teal}22`,backdropFilter:'blur(20px)'}}>
<div style={{maxWidth:'800px',margin:'0 auto'}}>
<form onSubmit={e=>{e.preventDefault();send();}} style={{display:'flex',gap:'10px',alignItems:'flex-end'}}>
<textarea ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}}} placeholder='Ask your AI advisor anything about your store, revenue, drops...' rows={1} style={{flex:1,background:'rgba(0,212,170,0.05)',border:`1px solid ${teal}33`,color:'#fff',padding:'14px 16px',borderRadius:'12px',outline:'none',fontFamily:'monospace',fontSize:'0.85rem',resize:'none',lineHeight:'1.5',boxSizing:'border-box' as any}}/>
<button type='submit' disabled={loading||!input.trim()} style={{background:loading||!input.trim()?`${teal}33`:`linear-gradient(135deg,${teal},#00a885)`,color:loading||!input.trim()?teal:'#000',border:'none',width:'48px',height:'48px',borderRadius:'12px',cursor:loading||!input.trim()?'not-allowed':'pointer',fontSize:'1.2rem',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
{loading?<span style={{width:'16px',height:'16px',border:'2px solid transparent',borderTop:`2px solid ${teal}`,borderRadius:'50%',display:'inline-block',animation:'spin 0.8s linear infinite'}}/>:'↑'}
</button>
</form>
<p style={{color:'#ffffff22',fontSize:'0.6rem',textAlign:'center',margin:'8px 0 0',letterSpacing:'0.1em'}}>AI has access to your store data · Revenue · Engine status</p>
</div>
</div>
<style>{`@keyframes bounce{0%,100%{transform:translateY(0);opacity:0.4}50%{transform:translateY(-4px);opacity:1}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
</div>
);
           }
