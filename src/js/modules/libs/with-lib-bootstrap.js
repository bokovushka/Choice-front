import $ from 'jquery';
// import { createPopper } from '@popperjs/core';
import 'bootstrap';


$(document).on('click', '.i-info', function (e) {
	e.preventDefault();
	e.stopPropagation();

	// сховати всі інші
	$('.i-info').not(this).popover('hide');

	const isSmall = window.innerWidth <= 575; // перевірка для мобільних

	if (!$(this).data('bs.popover')) {
		$(this).popover({
			html: true,
			trigger: 'manual',
			placement: isSmall ? 'right' : 'top',
			container: '.benefits-partners',
			content: function () {
				return $($(this).data('target')).html();
			}
		}).popover('show');

		// на малих можна підправити позицію вручну, якщо потрібно
		if (isSmall) {
			const pop = $(this).data('bs.popover').tip;
			$(pop).css({ maxWidth: '200px' }); // наприклад, обмежуємо ширину
		}
	} else {
		$(this).popover('toggle');
	}
});

// закрити по кліку поза
$(document).on('click', function (e) {
	if (!$(e.target).closest('.popover, .i-info').length) {
		$('.i-info').popover('hide');
	}
});


// modal next open
document.addEventListener('DOMContentLoaded', function () {
	const buttons = document.querySelectorAll('[data-next-modal]');

	buttons.forEach(function (btn) {
		btn.addEventListener('click', function () {
			const nextModalSelector = btn.getAttribute('data-next-modal');

			// Знайти поточне відкрите модальне вікно (найближчий .modal)
			const currentModal = btn.closest('.modal');

			if (currentModal) {
				// Закрити поточне
				$(currentModal).modal('hide');

				// Коли поточне модальне вікно закриється, відкриваємо нове
				$(currentModal).on('hidden.bs.modal', function () {
					$(nextModalSelector).modal('show');

					// Очистити event listener щоб не дублювались
					$(currentModal).off('hidden.bs.modal');
				});
			}
		});
	});
});

//mobile-menu
$(document).ready(function () {
	const $body = $('body');
	const $popupBg = $('.popup-bg-body');
	const $header = $('.header');
	const $menu = $('#navbarSupportedContent');

	// ===== Відкриття головного меню =====
	$menu.on('show.bs.collapse', function (e) {
		if (e.target !== this) return; // ігноруємо аккордеони всередині
		$body.addClass('lock');
		$popupBg.addClass('open');
		$header.addClass('menu-open');
	});

	// ===== Закриття головного меню =====
	$menu.on('hide.bs.collapse', function (e) {
		if (e.target !== this) return; // ігноруємо аккордеони всередині
		// нічого не видаляємо поки меню не закриється
	});

	// ===== Після завершення анімації закриття =====
	$menu.on('hidden.bs.collapse', function (e) {
		if (e.target !== this) return;
		$body.removeClass('lock');
		$popupBg.removeClass('open');
		$header.removeClass('menu-open');
	});

	// ===== Клік поза меню закриває головне меню =====
	$(document).mouseup(function (e) {
		const $target = $(e.target);

		// ❗ якщо відкритий будь-який modal — НЕ закриваємо меню
		if ($('.modal.show').length) {
			return;
		}

		if (
			!$header.is($target) &&
			$header.has($target).length === 0 &&
			!$target.closest('#header-mob-select-city').length &&
			!$target.closest('.select2-container').length
		) {
			if ($menu.hasClass('show')) {
				$('.navbar-toggler').trigger('click');
			}
		}
	});


	// ===== Закриття меню при ресайзі на десктоп =====
	$(window).on('resize', function () {
		if (window.innerWidth >= 1024 && $menu.hasClass('show')) {
			$('.navbar-toggler').trigger('click');
		}
	});
});


//calc
// Розрахувати 
$(document).on('click', '.js-calc-btn', function (e) {
	e.preventDefault();

	const $wrap = $(this).closest('.form-inner');

	// ховаємо Нове / Вживане
	$wrap.find('.choose-radio').addClass('d-none');

	// ховаємо форму
	$wrap.find('.js-form-step').addClass('d-none');

	// показуємо результат
	$wrap.find('.js-step[data-step="result"]').removeClass('d-none');
});

// Назад 
$(document).on('click', '.js-back-btn', function (e) {
	e.preventDefault();

	const $wrap = $(this).closest('.form-inner');

	$wrap.find('.choose-radio').removeClass('d-none');

	$wrap.find('.js-form-step').removeClass('d-none');

	$wrap.find('.js-step[data-step="result"]').addClass('d-none');
});

// button more accordion

document.addEventListener('DOMContentLoaded', function () {
	const cards = document.querySelectorAll('#accordion-questions .card');
	const toggleBtn = document.getElementById('toggleAccordion');
	const visibleCount = 5;
	let expanded = false;

	if (cards.length <= visibleCount) return;

	cards.forEach((card, index) => {
		if (index >= visibleCount) {
			card.classList.add('accordion-hidden');
		} else {
			card.classList.add('accordion-visible');
		}
	});

	toggleBtn.classList.remove('d-none');

	toggleBtn.addEventListener('click', function () {
		expanded = !expanded;

		cards.forEach((card, index) => {
			if (index >= visibleCount) {
				card.classList.toggle('accordion-hidden', !expanded);
				card.classList.toggle('accordion-visible', expanded);
			}
		});

		this.textContent = expanded
			? 'Показати менше'
			: 'Показати більше';
	});
});




//popup
let openModalsCount = 0;

// коли будь-яка модалка відкрилась
$(document).on('shown.bs.modal', '.modal', function () {
	openModalsCount++;
	document.body.classList.add('modal-open');
});

// коли будь-яка модалка закрилась
$(document).on('hidden.bs.modal', '.modal', function () {
	openModalsCount = Math.max(0, openModalsCount - 1);

	if (openModalsCount > 0) {
		document.body.classList.add('modal-open');
	} else {
		document.body.classList.remove('modal-open');
	}
});