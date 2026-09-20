const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu'); nav.classList.toggle('open', open); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Mở menu'); }));
document.addEventListener('keydown', e => { if(e.key==='Escape'){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');} });
const photos = [...document.querySelectorAll('.gallery-item img')];
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
let currentPhoto = 0;
function showPhoto(index) { currentPhoto = (index + photos.length) % photos.length; lightboxImage.src = photos[currentPhoto].src; lightboxImage.alt = photos[currentPhoto].alt; document.querySelector('#lightbox-caption').textContent = `Sa Mu – Yên Bái · ${currentPhoto + 1} / ${photos.length}`; }
document.querySelectorAll('.gallery-item').forEach((button, index) => button.addEventListener('click', () => { showPhoto(index); lightbox.showModal(); document.body.style.overflow='hidden'; }));
document.querySelector('#close-lightbox').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('close', () => { document.body.style.overflow=''; });
lightbox.addEventListener('click', e => {if(e.target === lightbox){const box=lightbox.getBoundingClientRect();if(e.clientX<box.left||e.clientX>box.right||e.clientY<box.top||e.clientY>box.bottom)lightbox.close();}});
document.querySelector('#previous-photo').addEventListener('click', () => showPhoto(currentPhoto - 1));
document.querySelector('#next-photo').addEventListener('click', () => showPhoto(currentPhoto + 1));
lightbox.addEventListener('keydown', e => { if(e.key==='ArrowLeft')showPhoto(currentPhoto-1); if(e.key==='ArrowRight')showPhoto(currentPhoto+1); });
