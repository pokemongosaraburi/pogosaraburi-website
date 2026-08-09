/*!
 * POGO SARABURI - COMPONENTS v4.2
 * Inject: Header, Footer
 * แก้ข้อความ nav และ social links ได้ที่ไฟล์นี้
 */
(function(){
  'use strict';

  // NAV LINKS
  const NAV_LINKS=[
    {href:'#events',label:'กิจกรรม'},
    {href:'#gallery',label:'แกลเลอรี่'},
    {href:'#join-steps',label:'เข้าร่วม'},
    {href:'#social',label:'ติดตาม'},
  ];

  // SOCIAL LINKS — อัพเดต v4.2 ใส่ลิงค์จริงครบทุกช่องทาง
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
    ph.outerHTML=[
      '<footer class="site-footer">',
        '<div class="footer-big">ออกล่าด้วยกัน<br>POGO SARABURI</div>',
        '<div class="footer-row">',
          '<div>',
            '<div class="footer-logo">POGO<em>SARABURI</em>.COM</div>',
            '<div class="footer-note">กลุ่ม Pokémon GO จังหวัดสระบุรี &middot; pogosaraburi.com</div>',
          '</div>',
          '<div class="footer-social">',
            '<a href="'+s.facebookPage+'" target="_blank" rel="noopener" aria-label="Facebook Page">FB Page</a>',
            '<a href="'+s.facebookGroup+'" target="_blank" rel="noopener" aria-label="Facebook Group">FB Group</a>',
            '<a href="'+s.instagram+'" target="_blank" rel="noopener" aria-label="Instagram">Instagram</a>',
            '<a href="'+s.threads+'" target="_blank" rel="noopener" aria-label="Threads">Threads</a>',
            '<a href="'+s.tiktok+'" target="_blank" rel="noopener" aria-label="TikTok">TikTok</a>',
            '<a href="'+s.line+'" target="_blank" rel="noopener" aria-label="LINE Open Chat">LINE</a>',
          '</div>',
        '</div>',
        '<div class="footer-dis">เว็บไซต์นี้จัดทำโดยแฟนคลับ ไม่มีส่วนเกี่ยวข้องกับ Niantic, Inc. หรือ The Pokémon Company</div>',
      '</footer>'
    ].join('');
  }

  document.addEventListener('DOMContentLoaded',function(){injectHeader();injectFooter();});
})();
