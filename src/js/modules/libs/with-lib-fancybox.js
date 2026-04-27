import { Fancybox } from "@fancyapps/ui";

//? Загальні налаштування для Fancybox
const fancyboxSettings = {
	Toolbar: {
		items: {
			carName: {
				tpl: `<div class="h4 font-m mb-0 font-weight-bolder text-white">Porsche Macan 2026</div>`,
			}
		},
		display: {
			left: ["carName"],
			right: ["close"],
		},
	},
	Carousel: {
		Navigation: {
			nextTpl: `<svg><use xlink:href="img/icons/icons.svg#i-arrow-down"></use></svg>`,
			prevTpl: `<svg><use xlink:href="img/icons/icons.svg#i-arrow-down"></use></svg>`,
		},
	},
	contentClick: "iterateZoom",
	Images: {
		Panzoom: {
			maxScale: 3,
		},
	},
	Thumbs: false,
	caption: (fancybox, slide) => {
		const caption = slide.caption || "";
		return `${slide.index + 1} / ${fancybox.carousel?.slides.length} <br /> ${caption}`;
	},
};

Fancybox.bind('[data-fancybox="gallery-item"]', fancyboxSettings);





// //? gallery-car
// Fancybox.bind('[data-fancybox="gallery"]', {
// 	on: {
// 		// Обробник події, коли відкривається FancyBox
// 		reveal: function (instance, slide) {
// 			console.log("FancyBox відкрито");
// 			// Зупиняємо всі відео
// 			pauseAllVideos();
// 		},

// 		// Обробник події, коли закривається FancyBox
// 		close: function (instance, slide) {
// 			console.log("FancyBox закрито");
// 			// Зупиняємо всі відео
// 			pauseAllVideos();
// 		},

// 		// Обробник події, коли перегортаються слайди
// 		slideChange: function (instance, current) {
// 			console.log("Змінено слайд");
// 			// Якщо тип слайду - відео
// 			if (current.type === 'video') {
// 				// Зупиняємо всі відео
// 				pauseAllVideos();
// 			}
// 		}
// 	},
// 	Toolbar: {
// 		items: {
// 			carName: {
// 				tpl: `<div class="h4 font-m mb-0 font-weight-bolder text-white">Hyundai Tucson</div>`,
// 			}
// 		},
// 		display: {
// 			left: ["carName"],
// 			right: ["close"],
// 		},
// 	},
// 	Carousel: {
// 		Navigation: {
// 			nextTpl: `<svg><use xlink:href="img/icons/icons.svg#i-arrow-right"></use></svg>`,
// 			prevTpl: `<svg><use xlink:href="img/icons/icons.svg#i-arrow-right"></use></svg>`,
// 		},
// 	},
// 	contentClick: "iterateZoom",
// 	Images: {
// 		Panzoom: {
// 			maxScale: 3,
// 		},
// 	},
// 	Thumbs: false,
// 	caption: (fancybox, slide) => {
// 		const caption = slide.caption || "";

// 		return `${slide.index + 1} / ${fancybox.carousel?.slides.length
// 			} <br /> ${caption}`;
// 	},
// });