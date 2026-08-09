/*!
 * POGO SARABURI - COMPONENTS v4.2
 * Inject: Header, Footer
 */
(function(){
  'use strict';

  const NAV_LINKS=[
    {href:'#events',label:'กิจกรรม'},
    {href:'#gallery',label:'แกลเลอรี่'},
    {href:'#join-steps',label:'เข้าร่วม'},
    {href:'#social',label:'ติดตาม'},
  ];

  const SOCIAL={
    facebookPage:'https://www.facebook.com/share/18wuZwxUEF/',
    facebookGroup:'https://www.facebook.com/share/g/1DQUFR5M1h/',
    instagram:'https://www.instagram.com/pokemongosaraburi',
    threads:'https://www.threads.com/@pokemongosaraburi',
    tiktok:'https://www.tiktok.com/@pokemongosaraburi',
    line:'https://line.me/ti/g2/e-L12AlI2SK0hQsW0tpkf64O2puVVGG0-1ZBng',
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
    const s=SOCIAL;
    const socialLinks=[
      {href:s.facebookPage, label:'FB Page'},
      {href:s.facebookGroup, label:'FB Group'},
      {href:s.instagram, label:'Instagram'},
      {href:s.threads, label:'Threads'},
      {href:s.tiktok, label:'TikTok'},
      {href:s.line, label:'LINE'},
    ].map(l=>'<a href="'+l.href+'" target="_blank" rel="noopener" style="display:inline-block;margin:0 0 8px 0;">'+l.label+'</a>').join('<span style="color:rgba(255,215,0,.3);margin:0 10px">&middot;</span>');
    ph.outerHTML=[
      '<footer class="site-footer">',
        '<div class="footer-big">ออกล่าด้วยกัน<br>POGO SARABURI</div>',
        '<div class="footer-row">',
          '<div>',
            '<div class="footer-logo">POGO<em>SARABURI</em>.COM</div>',
            '<div class="footer-note">กลุ่ม Pokémon GO จังหวัดสระบุรี &middot; pogosaraburi.com</div>',
          '</div>',
          '<div class="footer-note" style="text-align:right;line-height:2">',
            socialLinks,
          '</div>',
        '</div>',
        '<div class="footer-dis">เว็บไซต์นี้จัดทำโดยแฟนคลับ ไม่มีส่วนเกี่ยวข้องกับ Niantic, Inc. หรือ The Pokémon Company</div>',
      '</footer>'
    ].join('');
  }

  document.addEventListener('DOMContentLoaded',function(){injectHeader();injectFooter();});
})();
