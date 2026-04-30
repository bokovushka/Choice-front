//? ||====== tabs ======||

document.querySelectorAll('.tabs-custom').forEach((tabs) => {
	const buttons = tabs.querySelectorAll('.btn-tabs-custom');
	const panes = tabs.querySelectorAll('.tabs-custom__pane');

	buttons.forEach((btn) => {
		btn.addEventListener('click', () => {
			const target = btn.dataset.tab;

			// кнопки
			buttons.forEach((b) => b.classList.remove('is-active'));
			btn.classList.add('is-active');

			// контент
			panes.forEach((pane) => {
				pane.classList.toggle(
					'is-active',
					pane.dataset.tabContent === target
				);
			});
		});
	});
});

//? ||====== multi step ckeckout  ======||

document.addEventListener('DOMContentLoaded', () => {
	const parts = document.querySelectorAll('.checkout-part');
	let currentStep = 0;
	let maxStepReached = 0;

	function initStepper() {
		parts.forEach((part, index) => {
			const isActive = index === currentStep;
			const isDone = index <= maxStepReached && !isActive;

			part.classList.toggle('active', isActive);
			part.classList.toggle('hide', !isActive);
			part.classList.toggle('is-done', isDone);
		});
	}

	function goToStep(step) {
		if (step < 0 || step >= parts.length) return;

		// 🔥 головний фікс
		maxStepReached = Math.max(maxStepReached, currentStep);

		currentStep = step;
		initStepper();

		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	document.addEventListener('click', (e) => {

		if (e.target.closest('.btn-checkout__next')) {
			goToStep(currentStep + 1);
		}

		if (e.target.closest('.btn-checkout__prev')) {
			goToStep(currentStep - 1);
		}

		if (e.target.closest('.btn-edit')) {
			const part = e.target.closest('.checkout-part');
			const index = [...parts].indexOf(part);

			if (index !== -1) {
				goToStep(index);
			}
		}
	});

	initStepper();
});

//? ||====== checkbox-who-delivery ======||
//показує форму якщо активний

$(document).ready(function () {

	$('#checkbox-who-delivery').on('change', function () {

		const $wrap = $(this).closest('.choose-delivery');

		if ($(this).is(':checked')) {
			$wrap.addClass('is-active');
		} else {
			$wrap.removeClass('is-active');
		}

	});

});

//? ||====== radio button payment-group ======||
//показує вкладені групи radio button якщо такі наявні

$(document).ready(function () {

	$('.payment-group').on('change', 'input[type="radio"]', function () {

		const $input = $(this);
		const $option = $input.closest('.payment__option');
		const $group = $input.closest('.payment-group');

		// ===== lvl 1 =====
		if ($option.parent('.payment-group').length) {

			// верхні
			$group.children('.payment__option')
				.removeClass('is-active');

			$option.addClass('is-active');
		}

		// ===== lvl 2 =====
		if ($option.closest('.payment-group__inner').length) {

			// внутрішні
			$option
				.siblings('.payment__option')
				.removeClass('is-active');

			$option.addClass('is-active');

			// + батьківський
			$option.closest('.payment-group > .payment__option')
				.addClass('is-active');
		}

	});

});

//? ||====== Липкий сайдбар ======||

if ($('.checkout-card').length && window.innerWidth > 992) {
	StickyMove($('.checkout-card'), $('.footer'));
}

//! sticky sidebar function

function StickyMove(StickyBlock, DownBlockMove) {

	const parent = StickyBlock.parent();
	const startTop = StickyBlock.offset().top;
	const parentTop = parent.offset().top;

	// 👉 фіксуємо мінімальну висоту
	parent.css('min-height', StickyBlock.outerHeight() + 'px');

	$(window).on('scroll', function () {
		const scrollTop = $(this).scrollTop();
		const footerTop = DownBlockMove.offset().top;
		const blockHeight = StickyBlock.outerHeight();

		const stopPoint = footerTop - blockHeight - parentTop - 55;

		if (scrollTop > startTop) {
			if (scrollTop < footerTop - blockHeight - 55) {
				StickyBlock
					.addClass('fixed')
					.css({ position: '', top: '' });
			} else {
				StickyBlock
					.removeClass('fixed')
					.css({
						position: 'absolute',
						top: stopPoint + 'px'
					});
			}
		} else {
			StickyBlock
				.removeClass('fixed')
				.css({ position: '', top: '' });
		}
	});
}