(function(html) {
'use strict';
const cfg = {

mailChimpURL : 'https://facebook.us1.list-manage.com/subscribe/post?u=1abf75f6981256963a47d197a&amp;id=37c6d8f4d6'
};

const ssPreloader = function() {
const siteBody = document.querySelector('body');
const preloader = document.querySelector('#preloader');
if (!preloader) return;
html.classList.add('ss-preload');

window.addEventListener('load', function() {
html.classList.remove('ss-preload');
html.classList.add('ss-loaded');

preloader.addEventListener('transitionend', function afterTransition(e) {
if (e.target.matches('#preloader')) {
siteBody.classList.add('ss-show');
e.target.style.display = 'none';
preloader.removeEventListener(e.type, afterTransition);
}
});
});
};

const ssMobileMenu = function() {
const toggleButton = document.querySelector('.s-header__menu-toggle');
const mainNavWrap = document.querySelector('.s-header__nav');
const siteBody = document.querySelector('body');
if (!(toggleButton && mainNavWrap)) return;
toggleButton.addEventListener('click', function(e) {
e.preventDefault();
toggleButton.classList.toggle('is-clicked');
siteBody.classList.toggle('menu-is-open');
});
mainNavWrap.querySelectorAll('.s-header__nav a').forEach(function(link) {
link.addEventListener("click", function(event) {

if (window.matchMedia('(max-width: 900px)').matches) {
toggleButton.classList.toggle('is-clicked');
siteBody.classList.toggle('menu-is-open');
}
});
});
window.addEventListener('resize', function() {

if (window.matchMedia('(min-width: 901px)').matches) {
if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
if (toggleButton.classList.contains('is-clicked')) toggleButton.classList.remove('is-clicked');
}
});
};

const ssSwiper = function() {
if (typeof Swiper === 'undefined') return;
if (document.querySelector('.home-slider')) {
new Swiper('.home-slider', {
slidesPerView: 1,
pagination: { el: '.swiper-pagination', clickable: true },
breakpoints: {
401: { slidesPerView: 1, spaceBetween: 20 },
801: { slidesPerView: 2, spaceBetween: 40 },
1331: { slidesPerView: 3, spaceBetween: 48 },
1774: { slidesPerView: 4, spaceBetween: 48 }
}
});
}
if (document.querySelector('.page-slider')) {
new Swiper('.page-slider', {
slidesPerView: 1,
pagination: { el: '.swiper-pagination', clickable: true },
breakpoints: {
401: { slidesPerView: 1, spaceBetween: 20 },
801: { slidesPerView: 2, spaceBetween: 40 },
1241: { slidesPerView: 3, spaceBetween: 48 }
}
});
}
};

const ssMailChimpForm = function() {
const mcForm = document.querySelector('#mc-form');
if (!mcForm) return;

mcForm.setAttribute('novalidate', true);

function hasError(field) {

if (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return;

let validity = field.validity;

if (validity.valid) return;

if (validity.valueMissing) return 'Please enter an email address.';

if (validity.typeMismatch) {
if (field.type === 'email') return 'Please enter a valid email address.';
}

if (validity.patternMismatch) {

if (field.hasAttribute('title')) return field.getAttribute('title');

return 'Please match the requested format.';
}

return 'The value you entered for this field is invalid.';
};

function showError(field, error) {

let id = field.id || field.name;
if (!id) return;
let errorMessage = field.form.querySelector('.mc-status');

errorMessage.classList.remove('success-message');
errorMessage.classList.add('error-message');
errorMessage.innerHTML = error;
};

window.displayMailChimpStatus = function (data) {

if (!data.result || !data.msg || !mcStatus ) return;

mcStatus.innerHTML = data.msg;

if (data.result === 'error') {
mcStatus.classList.remove('success-message');
mcStatus.classList.add('error-message');
return;
}

mcStatus.classList.remove('error-message');
mcStatus.classList.add('success-message');
};

function submitMailChimpForm(form) {
let url = cfg.mailChimpURL;
let emailField = form.querySelector('#mce-EMAIL');
let serialize = '&' + encodeURIComponent(emailField.name) + '=' + encodeURIComponent(emailField.value);
if (url == '') return;
url = url.replace('/post?u=', '/post-json?u=');
url += serialize + '&c=displayMailChimpStatus';

var ref = window.document.getElementsByTagName( 'script' )[ 0 ];
var script = window.document.createElement( 'script' );
script.src = url;

window.mcStatus = form.querySelector('.mc-status');
window.mcStatus.classList.remove('error-message', 'success-message')
window.mcStatus.innerText = 'Submitting...';

ref.parentNode.insertBefore( script, ref );

script.onload = function () {
this.remove();
};
};

mcForm.addEventListener('submit', function (event) {
event.preventDefault();
let emailField = event.target.querySelector('#mce-EMAIL');
let error = hasError(emailField);
if (error) {
showError(emailField, error);
emailField.focus();
return;
}
submitMailChimpForm(this);
}, false);
};

const ssAlertBoxes = function() {
const boxes = document.querySelectorAll('.alert-box');

boxes.forEach(function(box){
box.addEventListener('click', function(e) {
if (e.target.matches('.alert-box__close')) {
e.stopPropagation();
e.target.parentElement.classList.add('hideit');
setTimeout(function() {
box.style.display = 'none';
}, 500)
}
});
})
};

const ssBackToTop = function() {
const pxShow = 900;
const goTopButton = document.querySelector(".ss-go-top");
if (!goTopButton) return;

if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");
window.addEventListener('scroll', function() {
if (window.scrollY >= pxShow) {
if(!goTopButton.classList.contains('link-is-visible')) goTopButton.classList.add("link-is-visible")
} else {
goTopButton.classList.remove("link-is-visible")
}
});
};

const ssMoveTo = function() {
const triggers = document.querySelectorAll('.smoothscroll');

const easeInOutCubic = function(t) {
return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const smoothScrollTo = function(targetY, duration) {
duration = duration || 900;
const startY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
const diff = targetY - startY;
if (Math.abs(diff) < 2) return;
const startTime = performance.now();

function step(currentTime) {
const elapsed = currentTime - startTime;
const progress = Math.min(elapsed / duration, 1);
const ease = easeInOutCubic(progress);
window.scrollTo(0, startY + diff * ease);
if (progress < 1) {
window.requestAnimationFrame(step);
}
}
window.requestAnimationFrame(step);
};

triggers.forEach(function(trigger) {
trigger.addEventListener('click', function(e) {
const targetId = this.getAttribute('href');
if (!targetId || targetId === '#') return;

e.preventDefault();

if (targetId === '#top') {
smoothScrollTo(0, 900);
} else {
const target = document.querySelector(targetId);
if (target) {
const topPos = target.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || document.documentElement.scrollTop);
smoothScrollTo(topPos, 900);
}
}

if (history.pushState) {
history.pushState(null, null, targetId);
} else {
window.location.hash = targetId;
}
});
});
};

(function ssInit() {
ssPreloader();
ssMobileMenu();
ssSwiper();
ssMailChimpForm();
ssAlertBoxes();
ssMoveTo();
ssBackToTop();
})();
})(document.documentElement);
// Dynamic copyright year
(function(){var e=document.getElementById('yr');if(e)e.textContent=new Date().getFullYear();})();
