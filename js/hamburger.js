const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});

// // 點選連結自動收起選單
// document.querySelectorAll('.mobile-nav a').forEach(link => {
//   link.addEventListener('click', () => {
//     hamburger.classList.remove('active');
//     mobileMenu.classList.remove('open');
//   });
// });


