import $ from 'jquery';
import { throttle } from 'lodash';

let lastScrollTop = 0;
let headerTopHeight = 0;
let headerMainHeight = 0;
let mainThreshold = 0;

function updateThresholds() {
	headerTopHeight = $(".header-top").outerHeight() || 0;
	headerMainHeight = $(".header-main").outerHeight() || 0;
	mainThreshold = headerTopHeight + headerMainHeight;

	if ($(window).width() >= 1024) {
		$("main").css("margin-top", mainThreshold + "px");
	} else {
		$("main").css("margin-top", "");
	}

	updateHeroHeight();
}

function updateHeroHeight() {
	if ($(".section-hero.vh-max").length) {
		if ($(window).width() >= 1024) {
			let headerTotalHeight = $(".header-top").outerHeight() + $(".header-main").outerHeight();
			$(".section-hero.vh-max").css("height", `calc(100vh - ${headerTotalHeight}px)`);
		} else {
			$(".section-hero.vh-max").css("height", "");
		}
	}
}

$(document).ready(function () {
	updateThresholds();

	$(window).on("resize", updateThresholds);

	$(window).on(
		"scroll",
		throttle(function () {
			let st = $(this).scrollTop();

			if ($(window).width() >= 1024) {
				if (st > lastScrollTop) {
					$(".header-top").removeClass("header--show").addClass("header--hide");
					$(".header-main").removeClass("header--show").addClass("header--hide");
					// <- margin-top видалено
				} else {
					$(".header-top").removeClass("header--hide").addClass("header--show");
					$(".header-main").removeClass("header--hide").addClass("header--show");
					// <- margin-top видалено
				}

				if (st > headerTopHeight) {
					$(".header-top").css("top", `-${headerTopHeight}px`);
					$(".header-main").css("top", "0");
				}

				if (st <= headerTopHeight || st < lastScrollTop) {
					$(".header-top").css("top", "0");
					$(".header-main").css("top", `${headerTopHeight}px`);
				}
			} else {
				$(".header-top, .header-main").css("top", "");
			}

			lastScrollTop = st;
			updateHeroHeight();
		}, 100)
	);
});
