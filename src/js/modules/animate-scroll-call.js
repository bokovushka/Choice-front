import jQuery from 'jquery';

jQuery(function ($) {
	const btn = $('#btnCall');
	const footer = $('footer');
	const section2 = $('.section-2');
	const offset = 30;

	if (!btn.length || !footer.length || !section2.length) return;

	function updateBtn() {
		const scrollTop = $(window).scrollTop();
		const winBottom = scrollTop + $(window).height();

		const section2Top = section2.offset().top;
		const footerTop = footer.offset().top;

		const showBtn = scrollTop >= section2Top - 50;
		btn.toggleClass('is-visible', showBtn);

		const atFooter = winBottom >= footerTop + offset;
		btn.toggleClass('at-footer', atFooter);
	}

	updateBtn();
	$(window).on('scroll resize', updateBtn);
});