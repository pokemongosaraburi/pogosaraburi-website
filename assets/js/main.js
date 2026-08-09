(function(){
'use strict';
function runPreloader(onComplete){
  var tl=gsap.timeline({onComplete:function(){
    document.body.classList.remove('loading');
    if(typeof onComplete==='function')onComplete();
  }});
  tl.to('.preloader-text',{opacity:1,y:0,duration:.7,ease:'power2.out'})
    .to('.preloader-ball',{opacity:1,duration:.5,ease:'power2.out'},'+=0.3')
    .to('.preloader-pokeball',{rotation:360,duration:1.2,ease:'power1.inOut'},'<')
    .to('.preloader-text',{opacity:0,duration:.25,delay:.15})
    .to('.preloader-pokeball',{scale:280,rotation:'+=180',duration:.75,ease:'power4.inOut'},'<')
    .to('.preloader',{opacity:0,display:'none',duration:.3},'-=0.15');
  var visited=sessionStorage.getItem('pogo_visited');
  if(visited==='true')tl.timeScale(3);
  else sessionStorage.setItem('pogo_visited','true');
}
function runEntrance(){
  var header=document.querySelector('.site-header');
  if(header)header.classList.add('ready');
  var tl=gsap.timeline({delay:.1});
  var ey=document.querySelector('.hero-eyebrow');
  if(ey)tl.to(ey,{opacity:1,y:0,duration:.7,ease:'power3.out'},0);
  var lines=document.querySelectorAll('.hero-line-inner');
  lines.forEach(function(line,i){tl.to(line,{y:'0%',duration:1.1,ease:'power4.out'},0.1+(i*0.12));});
  var hb=document.querySelector('.hero-bottom');
  if(hb)tl.to(hb,{opacity:1,y:0,duration:.8,ease:'power3.out'},0.5);
  var bw=document.querySelector('.hero-beacon-wrap');
  if(bw)tl.to(bw,{opacity:1,scale:1,duration:1,ease:'power3.out'},0.6);
  var sl=document.getElementById('scrollLine');
  var slb=document.getElementById('scrollLabel');
  if(sl)gsap.to(sl,{scaleX:1,transformOrigin:'left',duration:.85,ease:'power4.inOut',delay:1.4});
  if(slb)gsap.to(slb,{opacity:1,duration:.6,ease:'power2.out',delay:1.8});
}
function initCursor(){
  var cur=document.getElementById('cursor');
  var dot=document.getElementById('cursorDot');
  if(!cur||!dot)return;
  var mx=0,my=0,cx=0,cy=0,dx=0,dy=0;
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;cur.classList.add('visible');dot.classList.add('visible');});
  document.addEventListener('mouseleave',function(){cur.classList.remove('visible');dot.classList.remove('visible');});
  document.addEventListener('mousedown',function(){cur.classList.add('clicking')});
  document.addEventListener('mouseup',function(){cur.classList.remove('clicking')});
  document.querySelectorAll('a,button,.event-row,.social-item-felix,.gallery-slide').forEach(function(el){
    el.addEventListener('mouseenter',function(){cur.classList.add('hovering')});
    el.addEventListener('mouseleave',function(){cur.classList.remove('hovering')});
  });
  (function loop(){cx+=(mx-cx)*0.12;cy+=(my-cy)*0.12;dx+=(mx-dx)*0.65;dy+=(my-dy)*0.65;cur.style.left=cx+'px';cur.style.top=cy+'px';dot.style.left=dx+'px';dot.style.top=dy+'px';requestAnimationFrame(loop);})();
}
function initScrollIndicator(){
  var lastY=0;
  window.addEventListener('scroll',function(){
    var sy=window.scrollY;
    if((sy>100)!==(lastY>100)){gsap.to('#scrollIndicator',{opacity:sy>100?0:1,y:sy>100?12:0,duration:.4,ease:'power2.out'});}
    lastY=sy;
  },{passive:true});
}
function initReveal(){
  document.querySelectorAll('.event-row,.social-item-felix,.stat-item,.step').forEach(function(el,i){
    el.classList.add('will-reveal');
    new IntersectionObserver(function(entries){
      entries.forEach(function(en){if(en.isIntersecting)setTimeout(function(){el.classList.add('revealed');},(i%4)*70);});
    },{threshold:.1}).observe(el);
  });
  document.querySelectorAll('.reveal-line').forEach(function(el){
    new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting)el.classList.add('visible');});},{threshold:.3}).observe(el);
  });
  var bw=document.querySelector('.big-cta-felix');
  if(bw){
    new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        document.querySelectorAll('.bcf-line').forEach(function(l){l.style.color=en.isIntersecting?'rgba(255,215,0,.15)':'rgba(255,215,0,.08)';});
        var g=document.querySelector('.bcf-line.gold');
        if(g)g.style.color=en.isIntersecting?'rgba(255,215,0,.25)':'rgba(255,215,0,.12)';
      });
    },{threshold:.3}).observe(bw);
  }
}
function initSteps(){
  var steps=document.querySelectorAll('.step');
  steps.forEach(function(s){
    new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){steps.forEach(function(x){x.classList.remove('active')});en.target.classList.add('active');}
      });
    },{threshold:.55,rootMargin:'-15% 0px -15% 0px'}).observe(s);
  });
}
function initAurora(){
  gsap.to('.hero-orb-1',{x:40,y:25,scale:1.1,duration:12,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to('.hero-orb-2',{x:-30,y:-20,scale:1.08,duration:15,repeat:-1,yoyo:true,ease:'sine.inOut',delay:3});
}
function initSwipers(){
  if(typeof Swiper==='undefined')return;
  new Swiper('#swiperMarquee',{slidesPerView:'auto',spaceBetween:0,loop:true,centeredSlides:true,speed:25000,allowTouchMove:false,autoplay:{delay:0,disableOnInteraction:false}});
  new Swiper('#swiperGallery',{slidesPerView:'auto',spaceBetween:24,grabCursor:true,freeMode:{enabled:true},breakpoints:{320:{slidesPerView:1.3,spaceBetween:16},640:{slidesPerView:2.1,spaceBetween:20},1024:{slidesPerView:3.1,spaceBetween:24}}});
}
document.addEventListener('DOMContentLoaded',function(){
  initCursor();
  initSwipers();
  runPreloader(function(){runEntrance();initScrollIndicator();initReveal();initSteps();initAurora();});
});
})();
