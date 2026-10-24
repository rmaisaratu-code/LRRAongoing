
(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var WA='2348168673193';
/* ---------- header dropdowns: one open at a time ---------- */
var dds=$$('header .dd');
function closeAll(x){dds.forEach(function(d){if(d!==x){d.classList.remove('open');d.firstElementChild.setAttribute('aria-expanded','false')}})}
dds.forEach(function(d){d.firstElementChild.addEventListener('click',function(e){e.stopPropagation();var o=!d.classList.contains('open');closeAll(d);d.classList.toggle('open',o);this.setAttribute('aria-expanded',String(o))})});
document.addEventListener('click',function(e){if(!e.target.closest('header .dd'))closeAll()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeAll();var c=$('#chat');if(c)c.classList.remove('open');closeGate();var l=$('#lb');if(l)l.classList.remove('open')}});
window.addEventListener('scroll',function(){closeAll()},{passive:true});window.addEventListener('resize',function(){closeAll()});
$$('header .panel a').forEach(function(a){a.addEventListener('click',function(){closeAll()})});
/* ---------- footer accordions ---------- */
var fas=$$('.fa');
fas.forEach(function(f){f.firstElementChild.addEventListener('click',function(){var o=!f.classList.contains('open');fas.forEach(function(x){x.classList.remove('open')});f.classList.toggle('open',o)})});
/* ---------- WhatsApp human check (once per visit) ---------- */
var gate=$('#wam'),pending=null,gateAt=0;
function human(){try{return sessionStorage.getItem('lrra_human')==='1'}catch(e){return false}}
function closeGate(){if(gate){gate.classList.remove('open');pending=null}}
function openWA(u){window.open(u,'_blank','noopener')}
document.addEventListener('click',function(e){
 var a=e.target.closest('a[href^="https://wa.me"]');if(!a)return;
 if(human())return;
 e.preventDefault();pending=a.href;gateAt=Date.now();
 if(gate){gate.classList.add('open');var t=$('#wam-t');if(t){t.checked=false;$('#wam-go').disabled=true}}
});
if(gate){
 var tick=$('#wam-t'),go=$('#wam-go');
 tick.addEventListener('change',function(){go.disabled=!tick.checked});
 go.addEventListener('click',function(){
  if($('#wam-hp').value||Date.now()-gateAt<700||!tick.checked)return;
  try{sessionStorage.setItem('lrra_human','1')}catch(e){}
  var u=pending;closeGate();if(u)openWA(u);
 });
 $('#wam-x').addEventListener('click',closeGate);
 gate.addEventListener('click',function(e){if(e.target===gate)closeGate()});
}
/* ---------- FAQ chat assistant ---------- */
var chat=$('#chat'),faq=window.LRRA_FAQ||[];
var STOP='the and for are you your with that this what when how does can have has our was were will from about they them their there into any who why which would should could not but all get its out too very also may more than then just like want need know please tell much many school learning royal academy yola'.split(' ');
function toks(s){return (s.toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(/\s+/)).filter(function(w){return w.length>2&&STOP.indexOf(w)<0}).map(function(w){return w.length>4?w.replace(/(ing|es|s)$/,''):w})}
faq.forEach(function(f){f._q=toks(f.q+' '+(f.k||''));f._a=toks(f.a+' '+f.c)});
function best(text){var qt=toks(text),top=null,ts=0;if(!qt.length)return null;
 faq.forEach(function(f){var s=0;qt.forEach(function(w){if(f._q.indexOf(w)>-1)s+=3;else if(f._a.indexOf(w)>-1)s+=1});if(s>ts){ts=s;top=f}});
 return ts>=3?top:null}
if(chat){
 var msgs=$('#msgs'),inp=$('#q'),chips=$('#chips');
 function add(c,t,h){var d=document.createElement('div');d.className='m '+c;if(h)d.innerHTML=h;else d.textContent=t;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight}
 function ask(text,item){add('u',text);item=item||best(text);setTimeout(function(){
  if(item)add('b',item.a);
  else add('b','',"I don’t have a ready answer for that one. <a href=\"https://wa.me/"+WA+"?text="+encodeURIComponent('Hello, I have a question: '+text)+"\">Send it to our staff on WhatsApp</a> and they will reply you.")},220)}
 ['How do I apply?','What are the school hours?','Is the school safe?','Are you hiring?','When does school resume?'].forEach(function(t){var b=document.createElement('button');b.textContent=t;b.type='button';b.onclick=function(){ask(t)};chips.appendChild(b)});
 function send(){var v=inp.value.trim();if(!v)return;inp.value='';ask(v)}
 $('#send').onclick=send;inp.addEventListener('keydown',function(e){if(e.key==='Enter')send()});
 $('#faqbtn').onclick=function(e){e.stopPropagation();chat.classList.toggle('open');if(chat.classList.contains('open'))inp.focus()};
 $('#cx').onclick=function(){chat.classList.remove('open')};
}
/* ---------- FAQ page ---------- */
$$('.qa>button').forEach(function(b){b.addEventListener('click',function(){b.parentNode.classList.toggle('open')})});
var fs=$('#faq-search');
if(fs){fs.addEventListener('input',function(){var t=fs.value.toLowerCase().trim(),n=0;
 $$('.qa').forEach(function(q){var ok=!t||q.textContent.toLowerCase().indexOf(t)>-1;q.style.display=ok?'':'none';if(ok)n++});
 $$('.faq-cat').forEach(function(c){var any=$$('.qa',c).some(function(q){return q.style.display!=='none'});c.style.display=any?'':'none'});
 var e=$('#faq-empty');if(e)e.style.display=n?'none':'block'});}
/* ---------- gallery filter + lightbox ---------- */
$$('.filters button').forEach(function(b){b.addEventListener('click',function(){$$('.filters button').forEach(function(x){x.classList.remove('on')});b.classList.add('on');var f=b.dataset.f;$$('.gal figure').forEach(function(g){g.style.display=(f==='all'||g.dataset.c===f)?'':'none'})})});
var lb=$('#lb');
$$('.gal figure').forEach(function(g){g.addEventListener('click',function(){var i=$('img',g);$('#lb-i').src=i.src;$('#lb-i').alt=i.alt;lb.classList.add('open')})});
if(lb){lb.addEventListener('click',function(e){if(e.target===lb||e.target.tagName==='BUTTON')lb.classList.remove('open')})}
/* ---------- date-aware status tags and calendar ---------- */
var now=new Date(),iso=now.getFullYear()+'-'+('0'+(now.getMonth()+1)).slice(-2)+'-'+('0'+now.getDate()).slice(-2);
$$('[data-start]').forEach(function(el){var s=el.dataset.start,e=el.dataset.end||s,t=$('.tag',el);
 if(el.classList.contains('wk')){if(iso>=s&&iso<=e)el.classList.add('cur');return}
 if(!t)return;if(iso>e){t.textContent='Completed';t.className='tag done'}else if(iso>=s){t.textContent='Happening now';t.className='tag now'}else{t.textContent='Upcoming';t.className='tag soon'}});
/* ---------- forms: tidy submit, file check ---------- */
$$('form[data-netlify]').forEach(function(f){
 f.addEventListener('submit',function(e){
  var file=$('input[type=file]',f);
  if(file&&file.files[0]){var x=file.files[0],ok=/\.(pdf|docx?|PDF|DOCX?)$/.test(x.name);
   if(!ok||x.size>5*1024*1024){e.preventDefault();alert('Please attach your CV as a PDF or Word file smaller than 5 MB.');return}}
  var b=$('button[type=submit]',f);if(b){b.disabled=true;b.textContent='Sending…'}
 });
});
/* ---------- install prompt ---------- */
var inst=$('#inst'),dp=null;
function seen(){try{var t=+localStorage.getItem('lrra_inst');return t&&Date.now()-t<30*864e5}catch(e){return false}}
function standalone(){return window.matchMedia('(display-mode: standalone)').matches||navigator.standalone}
window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();dp=e;if(inst&&!seen()&&!standalone()){setTimeout(function(){$('#inst-t').textContent='Install the Learning Roots app on your phone for quick access.';$('#inst-go').style.display='';inst.classList.add('open')},4000)}});
if(inst){
 $('#inst-go').addEventListener('click',function(){if(dp){dp.prompt();dp=null}inst.classList.remove('open');try{localStorage.setItem('lrra_inst',Date.now())}catch(e){}});
 $('#inst-no').addEventListener('click',function(){inst.classList.remove('open');try{localStorage.setItem('lrra_inst',Date.now())}catch(e){}});
 if(/iphone|ipad|ipod/i.test(navigator.userAgent)&&!standalone()&&!seen()){setTimeout(function(){$('#inst-t').innerHTML='To install: tap <b>Share</b>, then <b>Add to Home Screen</b>.';$('#inst-go').style.display='none';inst.classList.add('open')},5000)}
}
if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){})})}
})();
