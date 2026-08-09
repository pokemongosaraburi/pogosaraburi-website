/**
 * POGO SARABURI - MAIN JS (v5.0 - Lenis + GSAP ScrollTrigger)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. LENIS SMOOTH SCROLL (เนยละลาย)
  // ==========================================
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing แบบนุ่มนวล
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // หยุด scroll ไว้ก่อนจนกว่า Preloader จะโหลดเสร็จ
  lenis.stop();

  // เชื่อมต่อ Lenis เข้ากับ GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);


  // ==========================================
  // 2. PRELOADER & START ANIMATIONS
  // ==========================================
  const tl = gsap.timeline({
    onComplete: () => {
      document.body.classList.remove('loading');
      lenis.start(); // ปล่อยให้ผู้ใช้เริ่มเลื่อนจอได้
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
    
    // Fade in เมนู Header (ถ้ามี components)
    const header = document.querySelector('.site-header');
    if (header) setTimeout(() => header.classList.add('ready'), 500);
  }


  // ==========================================
  // 3. GSAP SCROLLTEXT & PARALLAX
  // ==========================================
  // 3.1 ตัวอักษร POGO ใหญ๋ๆ ด้านหลัง (เคลื่อนที่ขึ้นช้าๆ ตอนเลื่อนจอ)
  if (document.getElementById('parallax-bg')) {
    gsap.to('#parallax-bg', {
      yPercent: -40,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }

  // 3.2 แอนิเมชันตัวหนังสือวิ่งสวนทางกัน (Cinematic Text Scroll)
  if (document.getElementById('scroll-txt-1')) {
    gsap.to('#scroll-txt-1', {
      x: -150, // เลื่อนไปซ้าย
      ease: "none",
      scrollTrigger: {
        trigger: ".big-cta-felix",
        start: "top bottom",
        end: "bottom top",
        scrub: 1 // หน่วงเวลาให้สมูท
      }
    });
    gsap.to('#scroll-txt-2', {
      x: 150, // เลื่อนไปขวา
      ease: "none",
      scrollTrigger: {
        trigger: ".big-cta-felix",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
  }


  // ==========================================
  // 4. CUSTOM CURSOR
  // ==========================================
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

  if (cursor && cursorDot && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!cursor.classList.contains('visible')) {
        cursor.classList.add('visible');
        cursorDot.classList.add('visible');
      }
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    // วงกลมใหญ่ตามเมาส์แบบหน่วงๆ (Lag effect)
    gsap.ticker.add(() => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
    });

    // Hover Effects
    const interactables = document.querySelectorAll('a, button, .team-btn, .event-row, .gallery-slide');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
    document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
    document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));
  }


  // ==========================================
  // 5. SWIPER CAROUSELS
  // ==========================================
  if (document.getElementById('swiperMarquee')) {
    new Swiper('#swiperMarquee', {
      slidesPerView: 'auto',
      spaceBetween: 0,
      loop: true,
      allowTouchMove: false,
      speed: 12000,
      autoplay: { delay: 0, disableOnInteraction: false }
    });
  }

  if (document.getElementById('swiperGallery')) {
    new Swiper('#swiperGallery', {
      slidesPerView: 'auto',
      spaceBetween: 24,
      grabCursor: true,
      freeMode: true,
      mousewheel: { forceToAxis: true }
    });
  }


  // ==========================================
  // 6. INTERSECTION OBSERVER (Fade-in เนื้อหา)
  // ==========================================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // เปิดไฟเส้น Reveal Line
        const line = entry.target.querySelector('.reveal-line') || entry.target.previousElementSibling;
        if (line && line.classList.contains('reveal-line')) line.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll('.will-reveal, .reveal-line').forEach(el => {
    observer.observe(el);
  });

});
