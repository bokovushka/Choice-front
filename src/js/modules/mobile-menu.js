// import $ from 'jquery';

// $(document).ready(function () {
// 	let body_lock = document.querySelector('body');
// 	let menuBtn = document.querySelector('.navbar-toggler');
// 	let bgBody = document.querySelector('.popup-bg-body');
// 	let header = document.querySelector('.header');
// 	let isMenuEnabled = true;

// 	menuBtn.addEventListener('click', function (event) {
// 		if (!isMenuEnabled) {
// 			event.preventDefault();
// 			return;
// 		}

// 		isMenuEnabled = false; // блокуємо подальші кліки одразу

// 		if (!body_lock.classList.contains('lock')) {
// 			body_lock.classList.add('lock');
// 			bgBody.classList.add('open');
// 			header.classList.add('menu-open');
// 		} else {
// 			body_lock.classList.remove('lock');
// 			bgBody.classList.remove('open');
// 			header.classList.remove('menu-open');
// 		}

// 		setTimeout(function () {
// 			isMenuEnabled = true; // через 1 секунду знову можна клікти
// 		}, 3000);
// 	});

// 	// решта твого коду
// });


// //? закриття меню поза областю
// $(document).mouseup(function (e) {
// 	const $target = $(e.target);

// 	if (
// 		!$(".header").is($target) &&
// 		$(".header").has($target).length === 0 &&
// 		!$target.closest('#header-mob-select-city').length &&
// 		!$target.closest('.select2-container').length
// 	) {
// 		$('.popup-bg-body').removeClass("open");
// 		$('body').removeClass("lock");
// 		$('.header').removeClass("menu-open");
// 	}
// });


// //? закриття popup-bg-body і мобільного меню при поворотах наприклад на планшетці
// setInterval(function () {
// 	if (window.innerWidth >= 1024) {
// 		if ($(".navbar-collapse").hasClass("show")) {
// 			$('.navbar-toggler').click();
// 			$('.header').removeClass("menu-open");
// 		}
// 	}
// }, 1000);
