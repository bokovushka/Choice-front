import $ from 'jquery';
import '../../../../node_modules/readmore-js/readmore.min.js';

$(document).ready(function () {
	function initializeReadmore() {
		$('.spoiler-seo').readmore({
			speed: 75,
			collapsedHeight: false,
			moreLink: '<button class="btn-read-more btn rounded-0 mt-3 p-0">Показати більше</button>',
			lessLink: '<button class="btn-read-more btn rounded-0 mt-3 p-0">Показати менше</button>'
		});
	}

	// Initialize on document ready
	initializeReadmore();

	// Reinitialize on window resize
	$(window).resize(function () {
		initializeReadmore();
	});


});

$(document).ready(function () {
	function initializeReadmore() {
		$('.spoiler-spec-group').readmore({
			speed: 75,
			collapsedHeight: false,
			moreLink: '<div class="text-center"><button class="btn-spec-more btn rounded-0 mt-6 p-0"><span>Більше характеристик</span><svg class="icon i-arrow-down"><use xlink:href="img/icons/icons.svg#i-arrow-down"></use></svg></button></div>',
			lessLink: '<div class="text-center"><button class="btn-spec-less btn rounded-0 mt-6 p-0"><span>Сховати</span><svg class="icon i-arrow-down"><use xlink:href="img/icons/icons.svg#i-arrow-down"></use></svg></button></div>',
		});
	}

	// Initialize on document ready
	initializeReadmore();

	// Reinitialize on window resize
	$(window).resize(function () {
		initializeReadmore();
	});


});

