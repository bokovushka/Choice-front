import $ from 'jquery';
import "../../../../node_modules/select2/dist/js/select2.js";

//? select
$(document).ready(function () {
	$('.field .select-wrap select').select2({
		minimumResultsForSearch: -1,
	});
});

$(document).ready(function () {
	$('.select-city-value').select2({
		minimumResultsForSearch: -1,
		placeholder: "Ваше місто",
		dropdownParent: $('.select-city__wrap')
	});
});

$('.select-city-value').on('select2:select', function (e) {
	$('.choose-delivery-wrap').addClass('is-open');
});

$(document).ready(function () {

	// init select2 для всіх
	$('.select-post-office').each(function () {
		const $select = $(this);
		const $wrap = $select.closest('.select-post-office__wrap');

		$select.select2({
			minimumResultsForSearch: -1,
			placeholder: "Вибрати поштове відділення",
			dropdownParent: $wrap
		});
	});

	$('input[name="checkbox-group-1"]').on('change', function () {

		const $option = $(this).closest('.delivery-option');

		// зняти активність з усіх
		$('.delivery-option').removeClass('is-active');

		// активувати тільки цей
		$option.addClass('is-active');
	});

});

$(document).ready(function () {

	$('.payment__option').each(function () {

		const $option = $(this);
		const $select = $option.find('.select-payment-method-value');

		if (!$select.length) return;

		const $wrap = $select.closest('.select-payment-method__wrap');

		$select.select2({
			minimumResultsForSearch: -1,
			placeholder: "Ваше місто",
			dropdownParent: $wrap
		});

	});

});
