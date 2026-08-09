/*!
 * POGO SARABURI - MAIN JS v4.0
 * Preloader Pokeball + GSAP + Cursor + Swiper
 */
(function(){
'use strict';

// ============================================================
// 1. PRELOADER POKEBALL — LOCKED (อย่าแก้ sequence)
// ============================================================
function runPreloader(onComplete){
  var tl=gsap.timeline({onComplete:function(){
    document.body.classList.remove('loading');
    if(typeof onComplete==='function')onComplete();
  }});
  // Step 1: "POKEMON GO SARABURI" fade in
  tl.to('.preloader-text',{opacity:1,y:0,duration:0.7,ease:'power2.out'})
  // Step 2: Pokeball ปรากฏ + spin
  .to('.preloader-ball',{opacity:1,duration:0.5,ease:'power2.out'},'+=0.3')
  .to('.preloader-pokeball',{rotation:360,duration:1.2,ease:'power1.inOut'},'<')
  // Step 3: Text fade out
  .to('.preloader-text',{opacity:0,duration:0.25,delay:0.15})
  // Step 4: Pokeball scale เต็มจอ แบบ Plutotechx X
  .to('.preloader-pokeball',{scale:280,rotation:'+=180',duration:0.75,ease:'power4.inOut'},'<')
  // Step 5: Wipe ออก
  .to('.preloader',{opacity:0,display:'none',duration:0.3},'-=0.15');
  // Smart skip — session ที่ 2 เร็วขึ้น x3
  var visited=sessionStorage.getItem('pogo_visited');
  if(visited==='true')tl.timeScale(3);
  else sessionStorage.setItem('pogo_visited','true');
}

// ============================================================
// 2. PAGE ENTRANCE — หลัง preloader จบ
// ============================================================
function runEntrance(){
  var T4='power4.inOut',T3='power3.out';
  var header=document.querySelector('.site-header');
  if(header)header.classList.add('ready');
  // 3D Text reveal — Baunfire style
  function splitChars(el){
    var txt=el.textContent;el.innerHTML='';el.style.perspective='1200px';
    return[...txt].map(function(c){
      var sp=document.createElement('span');
      sp.className='char';sp.textContent=c===' '?'\u00A0':c;
      sp.style.display='inline-block';el.appendChild(sp);return sp;
    });
  }
  var l1=document.getElementById('heroL1'),l2=document.getElementById('heroL2');
  var c1=l1?splitChars(l1):[],c2=l2?splitChars(l2):[];
  gsap.set([c1,c2],{opacity:0,rotationY:-90,z:800,x:-8,transformOrigin:'left center'});
  var tl=gsap.timeline({delay:0.1});
  tl.to(c1,{opacity:1,rotationY:0,z:0,x:0,duration:1.2,ease:T4,stagger:{each:0.045,from:'start'}})
    .to(c2,{opacity:1,rotationY:0,z:0,x:0,duration:1.1,ease:T4,stagger:{each:0.04,from:'start'}},'-=0.85')
    .to('.hero-eyebrow',{opacity:1,x:0,duration:.8,ease:T3},0.1)
    .to('.hero-swap-row',{opacity:1,y:0,duration:.7,ease:'power2.out'},1.0)
    .to('.hero-desc',{opacity:1,y:0,duration:.9,ease:'power2.out'},1.1)
    .to('.hero-actions',{opacity:1,y:0,duration:.9,ease:'power2.out'},1.25)
    .to('.beacon-col',{opacity:1,scale:1,duration:1.3,ease:T4},0.25);
  // Scroll indicator
  var sl=document.getElementById('scrollLine'),slb=document.getElementById('scrollLabel');
  if(sl&&slb){
    gsap.to(sl,{scaleX:1,transformOrigin:'left',duration:.85,ease:T4,delay:1.7});
    gsap.to(slb,{opacity:1,duration:.6,ease:'power2.out',delay:2.1});
  }
}

// ============================================================
// 3. CURSOR — lerp TweenMax style
// ============================================================
function initCursor(){
  var cur=document.getElementById('cursor'),dot=document.getElementById('cursorDot');
  if(!cur||!dot)return;
  var mx=0,my=0,cx=0,cy=0,dx=0,dy=0;
  document.addEventListener('mousemove',function(e){
    mx=e.clientX;my=e.clientY;
    cur.classList.add('visible');dot.classList.add('visible');
  });
  document.addEventListener('mouseleave',function(){cur.classList.remove('visible');dot.classList.remove('visible')});
  document.addEventListener('mouseenter',function(){cur.classList.add('visible');dot.classList.add('visible')});
  document.addEventListener('mousedown',function(){cur.classList.add('clicking')});
  document.addEventListener('mouseup',function(){cur.classList.remove('clicking')});
  document.querySelectorAll('a,button,.event-card,.social-card,.gallery-slide,.nav-cta').forEach(function(el){
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
  var wi=0,el=document.getElementById('swapWord');
  if(!el)return;
  el.style.transition='opacity .35s,transform .35s';
  setInterval(function(){
    el.style.opacity='0';el.style.transform='translateY(-10px)';
    setTimeout(function(){
      wi=(wi+1)%words.length;el.textContent=words[wi];
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
      gsap.to('#scrollIndicator',{opacity:h?0:1,y:h?12:0,duration:.45,ease:'power2.out'});
    }
    lastY=sy;
  },{passive:true});
}

// ============================================================
// 6. SCROLL REVEAL
// ============================================================
function initReveal(){
  document.querySelectorAll('.event-card,.social-card,.stat-item').forEach(function(el,i){
    gsap.set(el,{opacity:0,y:32});
    new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting)gsap.to(el,{opacity:1,y:0,duration:.65,delay:(i%4)*.08,ease:'power2.out'});
      });
    },{threshold:.15}).observe(el);
  });
  document.querySelectorAll('.section-title,.section-label,.section-desc').forEach(function(el,i){
    gsap.set(el,{opacity:0,y:18});
    new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting)gsap.to(el,{opacity:1,y:0,duration:.75,delay:i*.04,ease:'power3.out'});
      });
    },{threshold:.25}).observe(el);
  });
  document.querySelectorAll('.reveal-line').forEach(function(el){
    new IntersectionObserver(function(entries){
      entries.forEach(function(en){if(en.isIntersecting)el.classList.add('visible')});
    },{threshold:.4}).observe(el);
  });
  var bw=document.querySelector('.big-cta-wrap');
  if(bw)new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      gsap.to('.big-cta-item',{color:en.isIntersecting?'rgba(255,215,0,.22)':'rgba(255,215,0,.07)',duration:.8,ease:'power2.out'});
    });
  },{threshold:.2}).observe(bw);
}

// ============================================================
// 7. STICKY STEPS
// ============================================================
function initSteps(){
  var steps=document.querySelectorAll('.step');
  steps.forEach(function(s){
    new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){
          steps.forEach(function(x){x.classList.remove('active')});
          en.target.classList.add('active');
        }
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
// 9. SWIPER
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
