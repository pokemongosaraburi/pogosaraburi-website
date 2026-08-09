/**
 * POGO SARABURI - MAIN JS (v5.1 - Lenis + GSAP + Live Countdown)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. LENIS SMOOTH SCROLL
  // ==========================================
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
  });

  lenis.stop();

  gsap.registerPlugin(ScrollTrigger);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);


  // ==========================================
  // 2. PRELOADER & HERO
  // ==========================================
  const tl = gsap.timeline({
    onComplete: () => {
      document.body.classList.remove('loading');
      lenis.start(); 
      initHeroAnimations();
    }
  });

  tl.to('.preloader-text', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
    .to('.preloader-ball', { opacity: 1, duration: 0.5, ease: 'power2.out' }, '+=0.3')
    .to('.preloader-pokeball', { rotation: 360, duration: 1.2, ease: 'power1.inOut' }, '<')
    .to('.preloader-text', { opacity: 0, duration: 0.25, delay: 0.15 })
    .to('.preloader-pokeball', { scale: 280, rotation: '+=180', duration: 0.75, ease: 'power4.inOut' }, '<')
    .to('.preloader', { opacity: 0, display: 'none', duration: 0.3 }, '-=0.15');

  function initHeroAnimations() {
    gsap.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    gsap.to('.hero-line-inner', { y: 0, duration: 1, stagger: 0.15, ease: 'power4.out', delay: 0.2 });
    gsap.to('.hero-bottom', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 });
    gsap.to('.hero-beacon-wrap', { opacity: 1, duration: 1, ease: 'power2.out', delay: 0.8 });
    gsap.to('.scroll-line', { scaleX: 1, duration: 0.8, ease: 'power3.out', delay: 1 });
    gsap.to('.scroll-label', { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 1.2 });
  }

  // ==========================================
  // 3. GSAP SCROLLTEXT & PARALLAX
  // ==========================================
  if (document.getElementById('parallax-bg')) {
    gsap.to('#parallax-bg', { yPercent: -40, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  }
  if (document.getElementById('scroll-txt-1')) {
    gsap.to('#scroll-txt-1', { x: -150, ease: "none", scrollTrigger: { trigger: ".big-cta-felix", start: "top bottom", end: "bottom top", scrub: 1 } });
    gsap.to('#scroll-txt-2', { x: 150, ease: "none", scrollTrigger: { trigger: ".big-cta-felix", start: "top bottom", end: "bottom top", scrub: 1 } });
  }

  // ==========================================
  // 4. LIVE RAID COUNTDOWN (นับถอยหลังสู่วันพุธ 18:00)
  // ==========================================
  function initCountdown() {
    const elDays = document.getElementById('cd-days');
    const elHours = document.getElementById('cd-hours');
    const elMins = document.getElementById('cd-mins');
    const elSecs = document.getElementById('cd-secs');
    
    if(!elDays) return;

    function getNextRaidHour() {
      const now = new Date();
      const targetDate = new Date(now.getTime());
      
      const targetDay = 3; // 3 = วันพุธ
      const currentDay = now.getDay();
      
      let daysUntil = (targetDay - currentDay + 7) % 7;
      
      // ถ้าวันนี้เป็นวันพุธ และเลยเวลา 18:00 ไปแล้ว ให้นับเป็นวันพุธหน้า
      if (daysUntil === 0 && now.getHours() >= 18) {
        daysUntil = 7;
      }
      
      targetDate.setDate(now.getDate() + daysUntil);
      targetDate.setHours(18, 0, 0, 0); // ตั้งเวลา 18:00:00
      return targetDate.getTime();
    }

    const targetTime = getNextRaidHour();

    setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance < 0) {
        elDays.innerText = "00"; elHours.innerText = "00"; elMins.innerText = "00"; elSecs.innerText = "00";
        return;
      }

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      elDays.innerText = d.toString().padStart(2, '0');
      elHours.innerText = h.toString().padStart(2, '0');
      elMins.innerText = m.toString().padStart(2, '0');
      elSecs.innerText = s.toString().padStart(2, '0');
    }, 1000);
  }
  
  initCountdown();

  // ==========================================
  // 5. CUSTOM CURSOR
  // ==========================================
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

  if (cursor && cursorDot && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (!cursor.classList.contains('visible')) { cursor.classList.add('visible'); cursorDot.classList.add('visible'); }
      cursorDot.style.left = `${mouseX}px`; cursorDot.style.top = `${mouseY}px`;
    });
    gsap.ticker.add(() => {
      cursorX += (mouseX - cursorX) * 0.15; cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = `${cursorX}px`; cursor.style.top = `${cursorY}px`;
    });
    const interactables = document.querySelectorAll('a, button, .team-btn, .event-row, .gallery-slide');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
    document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
    document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));
  }

  // ==========================================
  // 6. SWIPER CAROUSELS
  // ==========================================
  if (document.getElementById('swiperMarquee')) {
    new Swiper('#swiperMarquee', { slidesPerView: 'auto', spaceBetween: 0, loop: true, allowTouchMove: false, speed: 12000, autoplay: { delay: 0, disableOnInteraction: false } });
  }
  if (document.getElementById('swiperGallery')) {
    new Swiper('#swiperGallery', { slidesPerView: 'auto', spaceBetween: 24, grabCursor: true, freeMode: true, mousewheel: { forceToAxis: true } });
  }

  // ==========================================
  // 7. INTERSECTION OBSERVER (Fade-in เนื้อหา)
  // ==========================================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        const line = entry.target.querySelector('.reveal-line') || entry.target.previousElementSibling;
        if (line && line.classList.contains('reveal-line')) line.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
  document.querySelectorAll('.will-reveal, .reveal-line').forEach(el => observer.observe(el));

});
