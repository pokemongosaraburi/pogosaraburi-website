/*!
 * POGO SARABURI - COMPONENTS v4.0
 * Inject: Header, Footer
 * แก้ข้อความ nav และ social links ได้ที่ไฟล์นี้
 */
(function(){
  'use strict';

  // NAV LINKS — แก้ได้ที่นี่
  const NAV_LINKS=[
    {href:'#events',label:'กิจกรรม'},
    {href:'#gallery',label:'แกลเลอรี่'},
    {href:'#join-steps',label:'เข้าร่วม'},
    {href:'#social',label:'ติดตาม'},
  ];

  // SOCIAL LINKS — แก้ได้ที่นี่
  const SOCIAL={
    facebook:'https://www.facebook.com/groups/pokemongosaraburi',
    instagram:'#',tiktok:'#',line:'#',
  };

  function injectHeader(){
    const ph=document.getElementById('header-placeholder');
    if(!ph)return;
    const links=NAV_LINKS.map(l=>'<li><a href="'+l.href+'">'+l.label+'</a></li>').join('');
    ph.outerHTML='<header class="site-header" id="siteHeader"><a class="nav-logo" href="/">POGO<em>SARABURI</em></a><nav aria-label="Main navigation"><ul class="nav-links">'+links+'</ul></nav><a class="nav-cta" href="#join"><span class="nav-cta-icon">&#x2197;</span>เข้าร่วมกลุ่ม</a></header>';
  }

  function injectFooter(){
    const ph=document.getElementById('footer-placeholder');
    if(!ph)return;
    ph.outerHTML='<footer class="site-footer"><div class="footer-big">ออกล่าด้วยกัน<br>POGO SARABURI</div><div class="footer-row"><div><div class="footer-logo">POGO<em>SARABURI</em>.COM</div><div class="footer-note">กลุ่ม Pokémon GO จังหวัดสระบุรี &middot; pogosaraburi.com</div></div><div style="text-align:right"><div class="footer-note"><a href="'+SOCIAL.facebook+'" target="_blank" rel="noopener">Facebook</a> &middot; <a href="'+SOCIAL.instagram+'" target="_blank" rel="noopener">Instagram</a> &middot; <a href="'+SOCIAL.tiktok+'" target="_blank" rel="noopener">TikTok</a> &middot; <a href="'+SOCIAL.line+'" target="_blank" rel="noopener">LINE</a></div></div></div><div class="footer-dis">เว็บไซต์นี้จัดทำโดยแฟนคลับ ไม่มีส่วนเกี่ยวข้องกับ Niantic, Inc. หรือ The Pokémon Company</div></footer>';
  }

  document.addEventListener('DOMContentLoaded',function(){injectHeader();injectFooter();});
})();
