import $ from 'jquery';

function initDropdown(containerSelector) {
	const container = $(containerSelector);

	container.find(".menu-list").each(function () {
		const item = $(this);
		const link = item.find('.current-list');
		const arrow = item.find('.i-arrow-down');
		const menu = item.find('.submenu');

		// клік по стрілці
		arrow.on("click", function (e) {
			e.preventDefault();
			e.stopPropagation();

			if (!menu.hasClass("active")) {
				// закриваємо всі інші в цьому контейнері
				container.find(".submenu").removeClass("active");
				container.find(".current-list").removeClass("active");
				container.find(".i-arrow-down").removeClass("rotated");

				// відкриваємо тільки це
				menu.addClass("active");
				link.addClass("active");
				arrow.addClass("rotated");
			} else {
				menu.removeClass("active");
				link.removeClass("active");
				arrow.removeClass("rotated");
			}
		});

		// клік поза меню → закрити
		$(document).on("click", function (e) {
			if (!item.is(e.target) && item.has(e.target).length === 0) {
				menu.removeClass("active");
				link.removeClass("active");
				arrow.removeClass("rotated");
			}
		});
	});
}

// Виклик для хедера
initDropdown(".header");