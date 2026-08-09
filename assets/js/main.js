/*!
 * POGO SARABURI - MAIN JS v4.2
 * Fixed: runEntrance() now animates ALL hero elements with opacity:0
 * Fixed: proper load-order guard for GSAP
 */
(function(){
'use strict';

// ============================================================
// 1. PRELOADER POKEBALL
// ============================================================
function runPreloader(onComplete){
  var tl=gsap.timeline({onComplete:function(){
    document.body.classList.remove('loading');
    if(typeof onComplete==='function')onComplete();
  }});
  tl.to('.preloader-text',{opacity:1,y:0,duration:0.7,ease:'power2.out'})
    .to('.preloader-ball',{opacity:1,duration:0.5,ease:'power2.out'},'+=0.3')
    .to('.preloader-pokeball',{rotation:360,duration:1.2,ease:'power1.inOut'},'<')
    .to('.preloader-text',{opacity:0,duration:0.25,delay:0.15})
    .to('.preloader-pokeball',{scale:280,rotation:'+=180',duration:0.75,ease:'power4.inOut'},'<')
    .to('.preloader',{opacity:0,display:'none',duration:0.3},'-=0.15');
  var visited=sessionStorage.getItem('pogo_visited');
  if(visited==='true')tl.timeScale(3);
  else sessionStorage.setItem('pogo_visited','true');
}

// ============================================================
// 2. HERO ENTRANCE — animate ALL elements that start opacity:0
// ============================================================
function runEntrance(){
  var T4='power4.inOut';
  var header=document.querySelector('.site-header');
  if(header)header.classList.add('ready');

  function splitChars(el){
    var txt=el.textContent;
    el.innerHTML='';
    el.style.perspective='1200px';
    el.style.whiteSpace='nowrap';
    return[...txt].map(function(c){
      var sp=document.createElement('span');
      sp.className='char';
      sp.textContent=c===' '?'\u00A0':c;
      sp.style.display='inline-block';
      el.appendChild(sp);
      return sp;
    });
  }

  var l1=document.getElementById('heroL1');
  var l2=document.getElementById('heroL2');
  var c1=l1?splitChars(l1):[];
  var c2=l2?splitChars(l2):[];

  gsap.set(c1,{rotationY:-90,z:500,x:-8,transformOrigin:'left center'});
  gsap.set(c2,{rotationY:-90,z:500,x:-8,transformOrigin:'left center'});

  var tl=gsap.timeline({delay:0.1});
  tl.to(c1,{rotationY:0,z:0,x:0,duration:1.2,ease:T4,stagger:{each:0.045,from:'start'}})
    .to(c2,{rotationY:0,z:0,x:0,duration:1.1,ease:T4,stagger:{each:0.04,from:'start'}},'-=0.85');

  // Fade in support elements
  ['.hero-eyebrow','.hero-swap-row','.hero-desc','.hero-actions','.beacon-col'].forEach(function(sel,i){
    var el=document.querySelector(sel);
    if(el) tl.to(el,{opacity:1,y:0,duration:0.6,ease:'power2.out'},0.6+(i*0.1));
  });

  var sl=document.getElementById('scrollLine');
  var slb=document.getElementById('scrollLabel');
  if(sl&&slb){
    gsap.to(sl,{scaleX:1,transformOrigin:'left',duration:.85,ease:T4,delay:1.5});
    gsap.to(slb,{opacity:1,duration:.6,ease:'power2.out',delay:1.9});
  }
}

// ============================================================
// 3. CURSOR
// ============================================================
function initCursor(){
  var cur=document.getElementById('cursor');
  var dot=document.getElementById('cursorDot');
  if(!cur||!dot)return;
  var mx=0,my=0,cx=0,cy=0,dx=0,dy=0;
  document.addEventListener('mousemove',function(e){
    mx=e.clientX;my=e.clientY;
    cur.classList.add('visible');dot.classList.add('visible');
  });
  document.addEventListener('mouseleave',function(){cur.classList.remove('visible');dot.classList.remove('visible');});
  document.addEventListener('mouseenter',function(){cur.classList.add('visible');dot.classList.add('visible');});
  document.addEventListener('mousedown',function(){cur.classList.add('clicking')});
  document.addEventListener('mouseup',function(){cur.classList.remove('clicking')});
  document.querySelectorAll('a,button,.event-card,.social-card,.gallery-slide').forEach(function(el){
    el.addEventListener('mouseenter',function(){cur.classList.add('hovering')});
    el.addEventListener('mouseleave',function(){cur.classList.remove('hovering')});
  });
  (function loop(){
    cx+=(mx-cx)*0.12;cy+=(my-cy)*0.12;
    dx+=(mx-dx)*0.65;dy+=(my-dy)*0.65;
    cur.style.left=cx+'px';cur.style.top=cy+'px';
    dot.style.left=dx+'px';dot.style.top=dy+'px';
    requestAnimationFrame(loop);
  })();
}

// ============================================================
// 4. WORD SWAP
// ============================================================
function initWordSwap(){
  var words=['RAID','COMMUNITY DAY','SPECIAL EVENT','TEAM BATTLE','POGO SARABURI'];
  var wi=0;
  var el=document.getElementById('swapWord');
  if(!el)return;
  el.style.transition='opacity .35s,transform .35s';
  setInterval(function(){
    el.style.opacity='0';el.style.transform='translateY(-10px)';
    setTimeout(function(){
      wi=(wi+1)%words.length;
      el.textContent=words[wi];
      el.style.opacity='1';el.style.transform='translateY(0)';
    },350);
  },2800);
}

// ============================================================
// 5. SCROLL INDICATOR
// ============================================================
function initScrollIndicator(){
  var lastY=0;
  window.addEventListener('scroll',function(){
    var sy=window.scrollY,h=sy>100;
    if((sy>100)!==(lastY>100)){
      gsap.to('#scrollIndicator',{opacity:h?0:1,y:h?12:0,duration:.4,ease:'power2.out'});
    }
    lastY=sy;
  },{passive:true});
}

// ============================================================
// 6. SCROLL REVEAL
// ============================================================
function initReveal(){
  document.querySelectorAll('.event-card,.social-card,.stat-item').forEach(function(el,i){
    el.classList.add('will-reveal');
    new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting) setTimeout(function(){el.classList.add('revealed');},(i%4)*80);
      });
    },{threshold:.1}).observe(el);
  });
  document.querySelectorAll('.reveal-line').forEach(function(el){
    new IntersectionObserver(function(entries){
      entries.forEach(function(en){if(en.isIntersecting)el.classList.add('visible');});
    },{threshold:.3}).observe(el);
  });
  var bw=document.querySelector('.big-cta-wrap');
  if(bw){
    new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        gsap.to('.big-cta-item',{color:en.isIntersecting?'rgba(255,215,0,.22)':'rgba(255,215,0,.07)',duration:.8,ease:'power2.out'});
      });
    },{threshold:.2}).observe(bw);
  }
}

// ============================================================
// 7. STEPS
// ============================================================
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

// ============================================================
// 8. AURORA ORBS
// ============================================================
function initAurora(){
  gsap.to('.hero-orb-1',{x:50,y:30,scale:1.12,duration:12,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to('.hero-orb-2',{x:-35,y:-25,scale:1.1,duration:15,repeat:-1,yoyo:true,ease:'sine.inOut',delay:3});
  gsap.to('.hero-orb-3',{x:25,y:45,scale:1.15,duration:18,repeat:-1,yoyo:true,ease:'sine.inOut',delay:7});
}

// ============================================================
// 9. SWIPERS
// ============================================================
function initSwipers(){
  if(typeof Swiper==='undefined')return;
  new Swiper('#swiperMarquee',{slidesPerView:'auto',spaceBetween:0,loop:true,centeredSlides:true,speed:25000,allowTouchMove:false,autoplay:{delay:0,disableOnInteraction:false}});
  new Swiper('#swiperGallery',{slidesPerView:'auto',spaceBetween:24,grabCursor:true,freeMode:{enabled:true},breakpoints:{320:{slidesPerView:1.3,spaceBetween:16},640:{slidesPerView:2.1,spaceBetween:20},1024:{slidesPerView:3.1,spaceBetween:24},1280:{slidesPerView:3.5,spaceBetween:24}}});
  new Swiper('#swiperBigCta',{slidesPerView:'auto',spaceBetween:0,loop:true,speed:50000,allowTouchMove:false,autoplay:{delay:false,disableOnInteraction:false}});
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded',function(){
  initCursor();
  initWordSwap();
  initSwipers();
  runPreloader(function(){
    runEntrance();
    initScrollIndicator();
    initReveal();
    initSteps();
    initAurora();
  });
});

})();
