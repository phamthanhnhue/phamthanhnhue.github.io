(()=>{
 const motion=matchMedia('(prefers-reduced-motion:reduce)');
 const colors=['#168f8a','#d95579','#8662c4'];
 const lizards=colors.map((color,i)=>{const el=document.createElement('a');el.className='playful-gecko';el.href='https://vuminhhien.vn/';el.target='_blank';el.rel='noopener noreferrer';el.setAttribute('aria-label','Mở website Vũ Minh Hiền qua thạch thùng '+(i+1));el.title='Vũ Minh Hiền — bấm để mở website';el.innerHTML=`<svg viewBox="0 0 90 55" width="52" height="34" xmlns="http://www.w3.org/2000/svg"><g fill="${color}" stroke="${color}" stroke-linecap="round"><path d="M38 28 Q14 40 7 18 Q3 8 15 10" fill="none" stroke-width="5"/><path d="M44 24 L35 13 L26 10 M43 31 L32 44 L24 47 M56 24 L62 12 L70 8 M57 31 L66 43 L74 46" fill="none" stroke-width="3"/><ellipse cx="48" cy="28" rx="16" ry="8" stroke="none"/><ellipse cx="69" cy="27" rx="12" ry="10" stroke="none"/></g><circle cx="74" cy="22" r="3" fill="white"/><circle cx="74" cy="32" r="3" fill="white"/><circle cx="75" cy="22" r="1.5" fill="#213735"/><circle cx="75" cy="32" r="1.5" fill="#213735"/></svg>`;document.body.append(el);return el});
 let frame=0,start=0,last=0;
 function position(t,i){const w=innerWidth,h=innerHeight;const phase=t*.00017-i*.22;return{x:w*.5+Math.sin(phase)*w*.37,y:h*.5+Math.sin(phase*2+.5)*h*.35}}
 function draw(now){frame=0;if(motion.matches||document.hidden)return;if(!start)start=now;const t=now-start;lizards.forEach((el,i)=>{if(el.matches(':hover,:focus-visible'))return;const a=position(t,i),b=position(t+80,i);const angle=Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI;el.style.transform=`translate(${a.x-26}px,${a.y-17}px) rotate(${angle}deg)`});frame=requestAnimationFrame(draw)}
 function resume(){cancelAnimationFrame(frame);lizards.forEach(el=>el.hidden=motion.matches);if(!motion.matches&&!document.hidden)frame=requestAnimationFrame(draw)}
 motion.addEventListener('change',resume);document.addEventListener('visibilitychange',resume);resume();
})();
