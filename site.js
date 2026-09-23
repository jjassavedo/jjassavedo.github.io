document.querySelectorAll('.work-image img').forEach(image=>{const fail=()=>image.parentElement.classList.add('is-empty');if(image.complete&&!image.naturalWidth)fail();image.addEventListener('error',fail)});
const nav=document.querySelector('.site-nav'),hero=document.querySelector('.hero');
if(nav&&hero){const update=()=>nav.classList.toggle('is-solid',window.scrollY>=hero.offsetHeight-72);update();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update)}
const track=document.querySelector('.work-track');
if(track){
 let paused=false;
 const move=direction=>{const step=Math.max(260,track.clientWidth*.72);const end=track.scrollWidth-track.clientWidth;if(direction>0&&track.scrollLeft>=end-8)track.scrollTo({left:0,behavior:'smooth'});else if(direction<0&&track.scrollLeft<=8)track.scrollTo({left:end,behavior:'smooth'});else track.scrollBy({left:direction*step,behavior:'smooth'})};
 document.querySelectorAll('[data-slide]').forEach(button=>button.addEventListener('click',()=>move(Number(button.dataset.slide))));
 track.addEventListener('mouseenter',()=>paused=true);track.addEventListener('mouseleave',()=>paused=false);
 track.addEventListener('focusin',()=>paused=true);track.addEventListener('focusout',event=>{if(!track.contains(event.relatedTarget))paused=false});
 track.addEventListener('keydown',event=>{if(event.key==='ArrowRight')move(1);if(event.key==='ArrowLeft')move(-1)});
 window.setInterval(()=>{if(!paused&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)move(1)},4200);
}