//?tabs
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

//?step
document.addEventListener('DOMContentLoaded', () => {
	const parts = document.querySelectorAll('.checkout-part');
	let currentStep = 0;

	function initStepper() {
		parts.forEach((part, index) => {
			part.classList.toggle('active', index === currentStep);
			part.classList.toggle('hide', index !== currentStep);
			part.classList.toggle('is-done', index < currentStep);
		});
	}

	function goToStep(step) {
		if (step < 0 || step >= parts.length) return;

		currentStep = step;
		initStepper();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	document.addEventListener('click', (e) => {

		// NEXT
		if (e.target.closest('.btn-checkout__next')) {
			goToStep(currentStep + 1);
		}

		// PREV (просто назад на 1 крок)
		if (e.target.closest('.btn-checkout__prev')) {
			goToStep(currentStep - 1);
		}

		// EDIT (перехід до конкретного кроку)
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

$(document).ready(function () {

	$('.payment-group').on('change', 'input[type="radio"]', function () {

		const $group = $(this).closest('.payment-group');
		const $option = $(this).closest('.payment__option');

		// прибрати активність тільки в цій групі
		$group.find('.payment__option').removeClass('is-active');

		// активувати поточну
		$option.addClass('is-active');

	});

});