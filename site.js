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
const lightbox=document.querySelector('#design-lightbox');
if(lightbox){
 const expanded=lightbox.querySelector('img');
 const close=lightbox.querySelector('.lightbox-close');
 let lastFocus=null;
 const closeView=()=>{lightbox.hidden=true;document.body.style.overflow='';if(lastFocus)lastFocus.focus()};
 document.addEventListener('click',event=>{
  const button=event.target.closest('[data-design-view]');
  if(!button)return;
  const image=button.querySelector('img');
  lastFocus=button;expanded.src=button.dataset.designView;expanded.alt=image?.alt||'Graphic design work';
  lightbox.hidden=false;document.body.style.overflow='hidden';close.focus();
 });
 close.addEventListener('click',closeView);
 lightbox.addEventListener('click',event=>{if(event.target===lightbox)closeView()});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!lightbox.hidden)closeView()});
}


// Prefix-based image discovery: new files in /images are placed in their matching galleries automatically.
const imageIndexKey='portfolio-image-index-round9';
const getPortfolioImages=async()=>{
 try{const cached=JSON.parse(sessionStorage.getItem(imageIndexKey)||'null');if(cached&&Date.now()-cached.time<60000)return cached.files}catch{}
 try{
  const response=await fetch('https://api.github.com/repos/jjassavedo/jjassavedo.github.io/contents/images?ref=main',{headers:{Accept:'application/vnd.github+json'}});
  if(!response.ok)return null;
  const entries=await response.json();
  const files=entries.filter(entry=>entry.type==='file'&&/\.(?:jpe?g|png|webp|avif|gif)$/i.test(entry.name)).map(entry=>entry.name);
  try{sessionStorage.setItem(imageIndexKey,JSON.stringify({time:Date.now(),files}))}catch{}
  return files;
 }catch{return null}
};
const sortedPrefixed=(files,prefix)=>files.filter(name=>name.toLowerCase().startsWith(prefix.toLowerCase())).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true,sensitivity:'base'}));
const populatePrefixedImages=async()=>{
 const targets=[...document.querySelectorAll('[data-prefix-gallery]')];
 const previews=[...document.querySelectorAll('[data-prefix-image]')];
 if(!targets.length&&!previews.length)return;
 const files=await getPortfolioImages();if(!files)return;
 targets.forEach(container=>{
  const prefix=container.dataset.prefixGallery;
  const matches=sortedPrefixed(files,prefix);if(!matches.length)return;
  container.replaceChildren();
  matches.forEach((name,index)=>{
   const src='images/'+name;
   const image=document.createElement('img');image.src=src;image.alt=prefix==='design-'?'Graphic design work '+(index+1):'Grey with the Sign post '+(index+1);image.loading='lazy';
   if(prefix==='design-'){
    const button=document.createElement('button');button.type='button';button.className='design-tile';button.dataset.designView=src;button.setAttribute('aria-label','View graphic design work '+(index+1));
    const affordance=document.createElement('span');affordance.className='tile-open';affordance.setAttribute('aria-hidden','true');affordance.textContent='↗';button.append(image,affordance);container.append(button);
   }else if(prefix==='greywiththesign-'){
    const figure=document.createElement('figure');const caption=document.createElement('figcaption');caption.className='view-count';
    const base=name.replace(/\.[^.]+$/,'').toLowerCase();const count=greySignViewCounts[base];caption.textContent=count?count+' views':'Views pending';figure.append(image,caption);container.append(figure);
   }
  });
 });
 previews.forEach(image=>{
  const matches=sortedPrefixed(files,image.dataset.prefixImage);
  if(!matches.length)return;
  let current=0;
  image.src='images/'+matches[current];
  if(image.dataset.prefixRotate===undefined||matches.length<2)return;
  window.setInterval(()=>{
   current=(current+1)%matches.length;
   image.style.opacity='0';
   window.setTimeout(()=>{
    image.src='images/'+matches[current];
    image.onload=()=>{image.style.opacity='1'};
   },220);
  },3800);
 });
};
// Fill in each verified post count here as Jeffrey provides it, using the filename without its extension.
const greySignViewCounts={'greywiththesign-1':'61.9K','greywiththesign-2':'79.5K','greywiththesign-3':'359K','greywiththesign-4':'96.7K'};
populatePrefixedImages();

const navLinks=document.querySelector('.nav-links');
if(navLinks){
 const oval=document.createElement('span');oval.className='nav-hover-oval';oval.setAttribute('aria-hidden','true');navLinks.prepend(oval);
 const showOval=link=>{if(!link)return;const navRect=navLinks.getBoundingClientRect(),linkRect=link.getBoundingClientRect();navLinks.style.setProperty('--oval-x',(linkRect.left-navRect.left-10)+'px');navLinks.style.setProperty('--oval-y',(linkRect.top-navRect.top-6)+'px');navLinks.style.setProperty('--oval-w',(linkRect.width+20)+'px');navLinks.style.setProperty('--oval-h',(linkRect.height+12)+'px');oval.style.left='var(--oval-x)';oval.style.top='var(--oval-y)';oval.style.width='var(--oval-w)';oval.style.height='var(--oval-h)';navLinks.classList.add('has-hover-target')};
 navLinks.addEventListener('pointerover',event=>{if(event.pointerType==='touch')return;showOval(event.target.closest('a'))});
 navLinks.addEventListener('pointermove',event=>{if(event.pointerType==='touch')return;showOval(event.target.closest('a'))});
 navLinks.addEventListener('pointerleave',()=>navLinks.classList.remove('has-hover-target'));
 navLinks.addEventListener('focusin',event=>showOval(event.target.closest('a')));
 navLinks.addEventListener('focusout',event=>{if(!navLinks.contains(event.relatedTarget))navLinks.classList.remove('has-hover-target')});
}
