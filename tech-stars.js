(()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const canvas=document.createElement('canvas');canvas.className='tech-stars';canvas.setAttribute('aria-hidden','true');document.body.prepend(canvas);
 const ctx=canvas.getContext('2d');if(!ctx)return;
 let w=0,h=0,points=[],meteors=[],frame=0,last=0,next=0,bursts=[],nextBurst=0;
 const random=(a,b)=>a+Math.random()*(b-a);
 let exclusion=[];
 function blockedPoint(p){return exclusion.some(r=>p.x>r.left-15&&p.x<r.right+15&&p.y>r.top-15&&p.y<r.bottom+15)}
 function blockedLine(a,b){return exclusion.some(r=>Math.max(a.x,b.x)>r.left-15&&Math.min(a.x,b.x)<r.right+15&&Math.max(a.y,b.y)>r.top-15&&Math.min(a.y,b.y)<r.bottom+15)}
 function resize(){w=innerWidth;h=innerHeight;const d=Math.min(devicePixelRatio||1,2);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);points=Array.from({length:w<700?18:30},()=>({x:random(0,w),y:random(0,h),vx:random(-5,5),vy:random(-4,4),r:random(1,2.2),phase:random(0,6.28)}));meteors=[]}
 function draw(time){frame=0;if(document.hidden||reduce.matches)return;const dt=Math.min((time-last)/1000,.04)||.016;last=time;ctx.clearRect(0,0,w,h);exclusion=[...document.querySelectorAll(".portrait img,.about img")].map(e=>e.getBoundingClientRect());
 if(time>next){next=time+random(2800,5000);meteors.push({x:random(-80,w*.65),y:random(-30,h*.35),life:0})}
 meteors=meteors.filter(m=>m.life<1.5);for(const m of meteors){m.life+=dt;m.x+=780*dt;m.y+=330*dt;const alpha=Math.sin(Math.PI*m.life/1.5)*.68;const g=ctx.createLinearGradient(m.x-110,m.y-46,m.x,m.y);g.addColorStop(0,'rgba(151,116,67,0)');g.addColorStop(1,`rgba(151,116,67,${Math.max(0,alpha)})`);ctx.strokeStyle=g;ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(m.x-110,m.y-46);ctx.lineTo(m.x,m.y);ctx.stroke();ctx.fillStyle=`rgba(151,116,67,${Math.max(0,alpha)})`;ctx.beginPath();ctx.arc(m.x,m.y,2,0,Math.PI*2);ctx.fill()}
 if(time>nextBurst){nextBurst=time+random(14000,23000);const x=random(w*.15,w*.85),y=random(h*.2,h*.55);for(let i=0;i<42;i++){const angle=Math.PI*2*i/42;const speed=random(45,100);bursts.push({x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life:0,color:["31,102,221","132,44,205","218,28,87","0,145,128","215,66,22","64,61,193","189,32,174"][i%7]})}}
 bursts=bursts.filter(b=>b.life<1.9);for(const b of bursts){b.life+=dt;b.x+=b.vx*dt;b.y+=b.vy*dt;b.vy+=20*dt;const alpha=Math.max(0,(1-b.life/1.9)*.9);ctx.fillStyle=`rgba(${b.color},${alpha})`;ctx.beginPath();ctx.arc(b.x,b.y,2.2,0,Math.PI*2);ctx.fill()}
 frame=requestAnimationFrame(draw)}
 function start(){cancelAnimationFrame(frame);ctx.clearRect(0,0,w,h);if(!reduce.matches&&!document.hidden){last=0;next=performance.now()+1200;nextBurst=performance.now()+9000;bursts=[];frame=requestAnimationFrame(draw)}}
 addEventListener('resize',resize,{passive:true});document.addEventListener('visibilitychange',start);reduce.addEventListener('change',start);resize();start();
})();
