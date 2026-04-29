import Inputmask from 'inputmask';

const onReady = (fn) =>
(document.readyState === 'loading'
	? document.addEventListener('DOMContentLoaded', fn, { once: true })
	: fn());


onReady(() => {

	document.querySelectorAll('.product__mobile-payments--side').forEach(block => {

		const payments = block.querySelectorAll('.product__mobile-payment');
		const popups = block.querySelectorAll('.payments-popups .hidden-menu');

		payments.forEach((payment, index) => {
			payment.addEventListener('click', (e) => {
				e.stopPropagation();

				const isActive = popups[index].classList.contains('active');

				payments.forEach(p => p.classList.remove('active'));
				popups.forEach(p => p.classList.remove('active'));

				if (isActive) return;

				payment.classList.add('active');
				popups[index].classList.add('active');
			});
		});

		popups.forEach(popup => {
			popup.addEventListener('click', e => e.stopPropagation());
		});

	});

	document.addEventListener('click', () => {
		document.querySelectorAll('.product__mobile-payment.active')
			.forEach(el => el.classList.remove('active'));

		document.querySelectorAll('.payments-popups .hidden-menu.active')
			.forEach(el => el.classList.remove('active'));
	});

});

// onReady(() => {
// 	const VISIBLE = 3;
// 	const SHOW_ALL_TEXT = translations.show_all;
// 	const SHOW_LESS_TEXT = translations.hide;

// 	function initFilterGroup($group) {
// 		const $content = $group.find('.product-sidebar-group-content').first();
// 		if (!$content.length) return;

// 		const $items = $content.find('.general-filter-item').filter(function () {
// 			return $(this).find('input[type="checkbox"]').length > 0;
// 		});

// 		if ($content.data('collapsed-init') === true) return;

// 		if ($items.length > VISIBLE) {
// 			$items.slice(VISIBLE).addClass('is-extra').hide();

// 			const $btn = $('<button/>', {
// 				type: 'button',
// 				class: 'filter-toggle-btn',
// 				text: SHOW_ALL_TEXT,
// 				'aria-expanded': 'false'
// 			});

// 			$content.append($btn);
// 			$content.data('collapsed-init', true);
// 		}
// 	}

// 	function initAll() {
// 		$('.product-sidebar-group.checkboxes-group-filter').each(function () {
// 			initFilterGroup($(this));
// 		});
// 	}

// 	initAll();

// 	$(document).on('click', '.filter-toggle-btn', function () {
// 		const $btn = $(this);
// 		const expanded = $btn.attr('aria-expanded') === 'true';
// 		const $group = $btn.closest('.product-sidebar-group');
// 		const $extras = $group.find('.general-filter-item.is-extra');

// 		if (expanded) {
// 			$extras.slideUp(150);
// 			$btn.attr('aria-expanded', 'false').text(SHOW_ALL_TEXT);
// 		} else {
// 			$extras.slideDown(150);
// 			$btn.attr('aria-expanded', 'true').text(SHOW_LESS_TEXT);
// 		}
// 	});

// });

// function initPhoneMasks(root = document) {
// 	const els = root.querySelectorAll(`
//     input[type="tel"],
//     input[name="phone"],
//     input.phone-field
//   `);
// 	if (!els.length) return;

// 	// Фільтруємо поля, виключаючи ті що мають клас 'no-phone-mask'
// 	const filteredEls = Array.from(els).filter(el => !el.classList.contains('no-phone-mask'));
// 	if (!filteredEls.length) return;

// 	const im = new Inputmask({
// 		mask: '+380 (99) 999-99-99',
// 		placeholder: ' ',
// 		clearIncomplete: true,
// 		showMaskOnHover: false,
// 		removeMaskOnSubmit: true,
// 	});

// 	im.mask(filteredEls);
// }
// onReady(() => initPhoneMasks());
onReady(() => {
	const scrollBlocks = document.querySelectorAll('.custom-scroll');

	scrollBlocks.forEach(block => {
		const track = document.createElement('div');
		const thumb = document.createElement('div');
		track.className = 'js-scroll-track';
		thumb.className = 'js-scroll-thumb';
		track.appendChild(thumb);
		block.appendChild(track);

		const updateThumb = () => {
			const scrollHeight = block.scrollHeight;
			const clientHeight = block.clientHeight;
			const scrollTop = block.scrollTop;
			const thumbHeight = (clientHeight / scrollHeight) * clientHeight;
			const thumbTop = (scrollTop / scrollHeight) * clientHeight;
			thumb.style.height = `${thumbHeight}px`;
			thumb.style.transform = `translateY(${thumbTop}px)`;
		};

		block.addEventListener('scroll', updateThumb);
		window.addEventListener('resize', updateThumb);
		updateThumb(); // при загрузке

		// перетаскивание пальцем
		let isDragging = false;
		let startY, startScrollTop;
		thumb.addEventListener('mousedown', e => {
			isDragging = true;
			startY = e.clientY;
			startScrollTop = block.scrollTop;
			document.body.classList.add('no-select');
		});
		document.addEventListener('mousemove', e => {
			if (!isDragging) return;
			const dy = e.clientY - startY;
			const ratio = block.scrollHeight / block.clientHeight;
			block.scrollTop = startScrollTop + dy * ratio;
		});
		document.addEventListener('mouseup', () => {
			isDragging = false;
			document.body.classList.remove('no-select');
		});

		// для iOS: тач-движения
		thumb.addEventListener('touchstart', e => {
			isDragging = true;
			startY = e.touches[0].clientY;
			startScrollTop = block.scrollTop;
		});
		document.addEventListener('touchmove', e => {
			if (!isDragging) return;
			const dy = e.touches[0].clientY - startY;
			const ratio = block.scrollHeight / block.clientHeight;
			block.scrollTop = startScrollTop + dy * ratio;
		});
		document.addEventListener('touchend', () => {
			isDragging = false;
		});
	});
});
// Точки между обьектами
onReady(() => {
	document.querySelectorAll('.promo-item_hidden-menu ul li').forEach(li => {
		const hasDotted = li.querySelector('.dotted');
		const span = li.querySelector('span');
		const link = li.querySelector('a');

		if (!hasDotted && span && link) {
			const dotted = document.createElement('div');
			dotted.className = 'dotted';
			li.insertBefore(dotted, link);
		}
	});
});



// Скролбар
onReady(() => {
	document.querySelectorAll('body *').forEach(block => {
		const style = window.getComputedStyle(block);
		if (
			style.overflowY === 'auto' ||
			style.overflowY === 'scroll' ||
			block.classList.contains('force-scroll')
		) {
			if (block.scrollHeight > block.clientHeight + 5) {
				initCustomScroll(block);
			}
		}
	});
});

function initCustomScroll(block) {
	if (block.querySelector('.js-scroll-track')) return;

	const track = document.createElement('div');
	const thumb = document.createElement('div');
	track.className = 'js-scroll-track';
	thumb.className = 'js-scroll-thumb';
	track.appendChild(thumb);
	block.appendChild(track);

	block.classList.add('has-custom-scroll');
	block.style.scrollbarWidth = 'none';
	block.style.msOverflowStyle = 'none';
	block.style.position = 'relative';

	const getChildrenHeight = () => {
		const children = Array.from(block.children).filter(el => !el.classList.contains('js-scroll-track'));
		const total = children.reduce((sum, el) => sum + el.offsetHeight, 0);
		return total;
	};

	const updateThumb = () => {
		const contentHeight = getChildrenHeight();
		const clientHeight = block.clientHeight;
		const scrollTop = block.scrollTop;

		block.style.maxHeight = `${contentHeight}px`;

		const thumbHeight = Math.max((clientHeight / contentHeight) * clientHeight, 20);
		const maxThumbTop = contentHeight - thumbHeight;
		const maxScrollTop = contentHeight - clientHeight;

		const thumbTop = maxScrollTop > 0
			? (scrollTop / maxScrollTop) * maxThumbTop
			: 0;

		thumb.style.height = `${thumbHeight}px`;
		thumb.style.transform = `translateY(${thumbTop - 20}px)`;

		thumb._contentHeight = contentHeight;
		thumb._clientHeight = clientHeight;
		thumb._maxThumbTop = maxThumbTop;
		thumb._maxScrollTop = maxScrollTop;
	};

	// наблюдение за изменениями
	block.addEventListener('scroll', updateThumb);
	window.addEventListener('resize', updateThumb);
	new MutationObserver(updateThumb).observe(block, { childList: true, subtree: true });
	updateThumb();

	let isDragging = false;
	let startY, startThumbTop;

	thumb.addEventListener('mousedown', e => {
		isDragging = true;
		startY = e.clientY;
		const matrix = new DOMMatrix(getComputedStyle(thumb).transform);
		startThumbTop = matrix.m42 || 0;
		document.body.classList.add('no-select');
	});

	document.addEventListener('mousemove', e => {
		if (!isDragging) return;
		const dy = e.clientY - startY;
		let newThumbTop = startThumbTop + dy;
		newThumbTop = Math.max(0, Math.min(newThumbTop, thumb._maxThumbTop));

		const scrollTop = (newThumbTop / thumb._maxThumbTop) * thumb._maxScrollTop;
		block.scrollTop = scrollTop;
		thumb.style.transform = `translateY(${newThumbTop}px)`;
	});

	document.addEventListener('mouseup', () => {
		isDragging = false;
		document.body.classList.remove('no-select');
	});

	thumb.addEventListener('touchstart', e => {
		isDragging = true;
		startY = e.touches[0].clientY;
		const matrix = new DOMMatrix(getComputedStyle(thumb).transform);
		startThumbTop = matrix.m42 || 0;
	});

	document.addEventListener('touchmove', e => {
		if (!isDragging) return;
		const dy = e.touches[0].clientY - startY;
		let newThumbTop = startThumbTop + dy;
		newThumbTop = Math.max(0, Math.min(newThumbTop, thumb._maxThumbTop));

		const scrollTop = (newThumbTop / thumb._maxThumbTop) * thumb._maxScrollTop;
		block.scrollTop = scrollTop;
		thumb.style.transform = `translateY(${newThumbTop - 200}px)`;
	});

	document.addEventListener('touchend', () => {
		isDragging = false;
	});
}






// ===== Каталог (кнопка/меню)
onReady(() => {
	const catalogBtn = document.querySelector('.catalog-btn');
	const catalogMenu = document.querySelector('.catalog-menu');
	const catalogOverlay = document.querySelector('.catalog-overlay');

	if (!catalogBtn || !catalogMenu || !catalogOverlay) return;

	catalogBtn.addEventListener('click', () => {
		const isActive = catalogMenu.classList.contains('active');

		if (!isActive) {
			catalogMenu.style.display = 'block';
			setTimeout(() => catalogMenu.classList.add('active'), 10);
			catalogOverlay.classList.add('active');
		} else {
			catalogMenu.classList.remove('active');
			catalogOverlay.classList.remove('active');
			setTimeout(() => (catalogMenu.style.display = 'none'), 300); // плавное скрытие
		}
	});
	catalogOverlay.addEventListener('click', () => {
		catalogMenu.classList.remove('active');
		catalogOverlay.classList.remove('active');
		setTimeout(() => (catalogMenu.style.display = 'none'), 300);
	});
});




// ===== Рейтинг звёздами
onReady(() => {
	// const starsButtons = document.querySelectorAll('.product-main__star');
	// let selectedRatingButtons = 0;
	//
	// function highlightStarsButtons(rating) {
	//   starsButtons.forEach(star => {
	//     const starValue = parseInt(star.dataset.star || '0', 10);
	//     star.classList.toggle('hovered', starValue <= rating);
	//   });
	// }
	//
	// function selectStarsButtons(rating) {
	//   selectedRatingButtons = rating;
	//   starsButtons.forEach(star => {
	//     const starValue = parseInt(star.dataset.star || '0', 10);
	//     star.classList.toggle('selected', starValue <= rating);
	//   });
	// }
	//
	// if (starsButtons.length) {
	//   starsButtons.forEach(star => {
	//     const starValue = parseInt(star.dataset.star || '0', 10);
	//
	//     star.addEventListener('mouseenter', () => highlightStarsButtons(starValue));
	//     star.addEventListener('mouseleave', () => highlightStarsButtons(0));
	//     star.addEventListener('click', () => selectStarsButtons(starValue));
	//   });
	//
	//   document.querySelector('.product-main__stars')?.addEventListener('mouseleave', () => highlightStarsButtons(0));
	// }

	const starsLabels = document.querySelectorAll('.stars label');
	let selectedRatingRadio = 0;

	function highlightStarsRadio(rating) {
		starsLabels.forEach(label => {
			const input = label.querySelector('input[type="radio"]');
			const starValue = parseInt(input.value, 10);
			label.classList.toggle('hovered', starValue <= rating);
		});
	}

	function selectStarsRadio(rating) {
		selectedRatingRadio = rating;
		starsLabels.forEach(label => {
			const input = label.querySelector('input[type="radio"]');
			const starValue = parseInt(input.value, 10);
			label.classList.toggle('selected', starValue <= rating);
			input.checked = (starValue === rating);
		});
	}

	if (starsLabels.length) {
		starsLabels.forEach(label => {
			const input = label.querySelector('input[type="radio"]');
			const starValue = parseInt(input.value, 10);

			label.addEventListener('mouseenter', () => highlightStarsRadio(starValue));
			label.addEventListener('mouseleave', () => highlightStarsRadio(0));

			label.addEventListener('click', (e) => {
				e.preventDefault(); // убираем стандартное поведение radio
				selectStarsRadio(starValue);
			});
		});

		document.querySelector('.stars')?.addEventListener('mouseleave', () => highlightStarsRadio(0));
	}
});

// Ховер на каталоге
onReady(() => {
	const categoriesMenu = document.querySelector('.categories-menu');
	const catalogOverlay = document.querySelector('.catalog-overlay');

	if (!categoriesMenu || !catalogOverlay) return;

	categoriesMenu.addEventListener('mouseenter', () => {
		catalogOverlay.classList.add('active');
	});

	categoriesMenu.addEventListener('mouseleave', () => {
		catalogOverlay.classList.remove('active');
	});
});

// Открытие хлебных крошек на мобилке
onReady(() => {
	const mobileBreadcrumbsMenu = document.getElementById('mobileBreadcrumbsMenu');
	const breadcrumbsOverlay = document.getElementById('breadcrumbsOverlay');

	if (mobileBreadcrumbsMenu && breadcrumbsOverlay) {

		mobileBreadcrumbsMenu.addEventListener('click', () => {
			breadcrumbsOverlay.classList.add('active');
		});
		breadcrumbsOverlay.addEventListener('click', (e) => {
			if (e.target === breadcrumbsOverlay) {
				breadcrumbsOverlay.classList.remove('active');
			}
		});
	}
});

// Кнопка Pageup
onReady(() => {
	const pageUp = document.querySelector('.page-up');
	if (!pageUp) return;

	pageUp.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
});


// ===== Мобильный фильтр сортировки
onReady(() => {
	const openBtn = document.getElementById('mobile_sub-filter');
	const overlay = document.querySelector('.mobile_sub-filter-overlay');
	const popup = document.querySelector('.mobile_sub-filter-popup');

	if (!openBtn || !overlay || !popup) return;

	// открыть
	openBtn.addEventListener('click', (e) => {
		e.preventDefault();
		overlay.classList.add('active');
	});

	overlay.addEventListener('click', (e) => {
		if (
			e.target === overlay ||
			e.target.closest('.close-mobile_sub-filter-popup')
		) {
			overlay.classList.remove('active');
		}
	});

	overlay.addEventListener('click', (e) => {
		const li = e.target.closest('.mobile_sub-filter-popup ul li');
		if (!li) return;

		li.closest('ul').querySelectorAll('li.active')
			.forEach((n) => n.classList.remove('active'));
		li.classList.add('active');
		overlay.classList.remove('active');
	});
});

onReady(() => {
	const expandableSections = document.querySelectorAll('.menu-section--expandable');

	expandableSections.forEach(section => {
		const trigger = section.querySelector('[data-toggle="submenu"]');
		if (!trigger) return;

		trigger.addEventListener('click', () => {
			section.classList.toggle('menu-section--expanded');
		});
	});
});


// ===== Кнопка помощи на страницы доставки
onReady(() => {
	const btn = document.getElementById("help-btn");
	const dropdown = document.getElementById("help-dropdown");

	if (!btn || !dropdown) return;

	// Клик по кнопке
	btn.addEventListener("click", () => {
		dropdown.classList.toggle("active");
		btn.classList.toggle("open");
	});

	// Клик вне меню — закрываем
	document.addEventListener("click", (e) => {
		if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
			dropdown.classList.remove("active");
			btn.classList.remove("open");
		}
	});
});



// ===== Управление мобильными меню, попапами и выпадающими списками =====
onReady(() => {
	const leftHeader = document.querySelector('.left-side__header');
	if (!leftHeader) return;

	const popups = {
		more: {
			trigger: document.querySelector('#mobileNavMore'),
			menu: document.querySelector('.mobile-menu-navigation'),
		},
		catalog: {
			trigger: document.getElementById('mobile-menu-toggle'),
			triggerTwo: document.getElementById('mobile-menu-toggle-catalog-btn'),
			menu: document.querySelector('.mobile-categories'),
		},
	};

	let activePopup = null;
	const hadHideInitially = leftHeader.classList.contains('hide');

	const closeAllPopups = () => {
		Object.values(popups).forEach(({ menu }) => menu?.classList.remove('active'));
		document.body.classList.remove('no-scroll');
		if (!hadHideInitially) leftHeader.classList.remove('hide');
		activePopup = null;
	};

	const togglePopup = (popupName) => {
		const popup = popups[popupName];
		if (!popup?.menu) return;

		const isActive = popup.menu.classList.contains('active');
		if (isActive) {
			closeAllPopups();
			return;
		}

		closeAllPopups();
		popup.menu.classList.add('active');
		leftHeader.classList.add('hide');
		activePopup = popupName;
	};

	const attach = (el, name) => {
		if (!el) return;
		el.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			togglePopup(name);
		});
		el.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				togglePopup(name);
			}
		});
	};

	Object.entries(popups).forEach(([name, cfg]) => {
		attach(cfg.trigger, name);
		attach(cfg.triggerTwo, name);
	});

	const hideOutMenu = document.querySelector('.hide-out-menu');
	if (hideOutMenu) {
		hideOutMenu.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			togglePopup('catalog');
		});
	}

	window.addEventListener('scroll', () => {
		if (activePopup) return;
		if (window.scrollY > 250) {
			leftHeader.classList.add('hide');
		} else if (window.scrollY < 50 && !hadHideInitially) {
			leftHeader.classList.remove('hide');
		}
	});

	const dropdownTriggers = document.querySelectorAll('.mobile-menu-navigation__dropdown');

	dropdownTriggers.forEach((trigger) => {
		const parentLi = trigger.closest('li');
		trigger.addEventListener('click', (e) => {
			e.preventDefault();

			if (parentLi.classList.contains('active')) {
				parentLi.classList.remove('active');
				return;
			}

			const allLis = parentLi.parentElement.querySelectorAll('li.active');
			allLis.forEach((li) => li.classList.remove('active'));

			parentLi.classList.add('active');
		});
	});

	document.addEventListener('click', (e) => {
		const isInsideMenu = e.target.closest('.mobile-menu-navigation, .mobile-categories, #mobileNavMore, #mobile-menu-toggle, .hide-out-menu');
		if (!isInsideMenu) {
			closeAllPopups();
		}
	});
});





// ===== Sort select
onReady(() => {
	const customSelect = document.querySelector(".custom-select");
	const hiddenSelect = document.querySelector("#sort-select");

	if (!customSelect || !hiddenSelect) return;

	const trigger = customSelect.querySelector(".custom-select__trigger");
	const options = customSelect.querySelectorAll(".custom-select__options li");

	if (!trigger || options.length === 0) return;

	trigger.addEventListener("click", () => {
		customSelect.classList.toggle("open");
	});

	options.forEach(option => {
		option.addEventListener("click", () => {
			trigger.textContent = option.textContent;

			options.forEach(opt => opt.classList.remove("selected"));
			option.classList.add("selected");

			hiddenSelect.value = option.dataset.value;

			hiddenSelect.dispatchEvent(new Event("change"));

			customSelect.classList.remove("open");
		});
	});

	document.addEventListener("click", (e) => {
		if (!customSelect.contains(e.target)) {
			customSelect.classList.remove("open");
		}
	});

});


// ===== Mobile sort
onReady(() => {
	const hiddenSelect = document.querySelector('#sort-select');
	const mobileSort = document.querySelector('.mobile-sort');

	if (!hiddenSelect || !mobileSort) return;

	mobileSort.addEventListener('click', (e) => {
		const link = e.target.closest('a[data-sort]');
		if (!link) return;

		e.preventDefault();

		const value = link.dataset.sort;

		hiddenSelect.value = value;
		hiddenSelect.dispatchEvent(new Event('change'));

		mobileSort.querySelectorAll('li').forEach(li => li.classList.remove('active'));
		link.closest('li').classList.add('active');

		const customSelect = document.querySelector('.custom-select');
		if (customSelect) {
			const trigger = customSelect.querySelector('.custom-select__trigger');
			const options = customSelect.querySelectorAll('.custom-select__options li');

			options.forEach(opt => {
				const isCurrent = opt.dataset.value === value;
				opt.classList.toggle('selected', isCurrent);

				if (isCurrent && trigger) {
					trigger.textContent = opt.textContent;
				}
			});
		}
	});
});



// ===== Подменю каталога (ховер)
onReady(() => {
	document.querySelectorAll(".catalog-menu-category li").forEach(li => {
		li.addEventListener("mouseenter", () => {
			const sub = li.dataset.sub;
			document.querySelectorAll(".catalog-menu-subcategory-row")
				.forEach(item => item.classList.remove("active"));
			const target = document.querySelector(`.catalog-menu-subcategory-row[data-sub="${sub}"]`);
			if (target) target.classList.add("active");
		});
	});
});

document.addEventListener("DOMContentLoaded", () => {
	const slider = document.querySelector(".photos-slider");

	if (!slider) return;

	slider.addEventListener("click", (e) => {
		const img = e.target.closest("img");
		if (!img) return;

		// создаём контейнер попапа
		const popup = document.createElement("div");
		popup.classList.add("image-popup");

		// создаём копию картинки
		const bigImg = document.createElement("img");
		bigImg.src = img.getAttribute("src"); // если нужны большие фото – можно хранить в data-big-src

		popup.appendChild(bigImg);
		document.body.appendChild(popup);

		// закрытие при клике
		popup.addEventListener("click", () => {
			popup.remove();
		});
	});
});


// ===== В сингле товара липкий баннер
(function () {
	const TOP_OFFSET = 20;

	function initSticky() {
		const container = document.querySelector('.about-product-info');
		if (!container) return;

		const rightSide = container.querySelector('.about-product-info__right-side');
		if (!rightSide) return;

		const sticky = rightSide.querySelector('.sticky-wrapper');
		if (!sticky) return;

		let parentTop = 0;
		let parentHeight = 0;
		let stickyHeight = 0;
		let ticking = false;

		function recalc() {
			const rect = rightSide.getBoundingClientRect();
			parentTop = rect.top + window.scrollY;
			parentHeight = rightSide.offsetHeight;
			stickyHeight = sticky.offsetHeight;

			sticky.style.position = '';
			sticky.style.top = '';
			sticky.style.left = '';
			sticky.style.width = '';
		}

		function update() {
			const scrollY = window.scrollY || document.documentElement.scrollTop;
			const parentBottom = parentTop + parentHeight;

			if (stickyHeight >= parentHeight) {
				sticky.style.position = 'absolute';
				sticky.style.top = '0px';
				return;
			}

			if (scrollY + TOP_OFFSET >= parentTop) {
				const maxScroll = parentBottom - stickyHeight - TOP_OFFSET;

				if (scrollY >= maxScroll) {
					sticky.style.position = 'absolute';
					sticky.style.top = (parentHeight - 5 - stickyHeight) + 'px';
					sticky.style.left = '';
					sticky.style.width = '';
				} else {
					sticky.style.position = 'fixed';
					sticky.style.top = TOP_OFFSET + 'px';

					const rightRect = rightSide.getBoundingClientRect();
					sticky.style.left = rightRect.left + 'px';
					sticky.style.width = rightRect.width + 'px';
					sticky.style.zIndex = 1000;
				}
			} else {
				sticky.style.position = '';
				sticky.style.top = '';
				sticky.style.left = '';
				sticky.style.width = '';
				sticky.style.zIndex = '';
			}
		}

		function onScroll() {
			if (!ticking) {
				requestAnimationFrame(() => {
					update();
					ticking = false;
				});
				ticking = true;
			}
		}

		function init() {
			recalc();
			update();

			window.addEventListener('scroll', onScroll, { passive: true });
			window.addEventListener('resize', () => {
				recalc();
				update();
			});

			window.addEventListener('load', () => {
				recalc();
				update();
			});

			setTimeout(() => {
				recalc();
				update();
			}, 300);

			setTimeout(() => {
				recalc();
				update();
			}, 1000);
		}

		init();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initSticky);
	} else {
		initSticky();
	}
})();



// ===== Кредитный калькулятор
document.addEventListener('DOMContentLoaded', () => {
	const calculator = document.querySelector('.credit-calculator');
	const overlay = document.querySelector('.credit-overlay');
	const openBtn = document.querySelector('.credit-block__btn');
	const closeBtn = document.querySelector('.credit-calculator__close');
	if (!calculator || !overlay) return;

	const toggleCalculator = (show) => {
		calculator.classList.toggle('active', show);
		overlay.classList.toggle('active', show);
	};
	openBtn?.addEventListener('click', () => toggleCalculator(true));
	closeBtn?.addEventListener('click', () => toggleCalculator(false));
	overlay?.addEventListener('click', () => toggleCalculator(false));
});

// ===== Пересчёт цен/платежей
document.addEventListener("DOMContentLoaded", function () {
	const totalPriceElem = document.getElementById('totalPrice');
	if (!totalPriceElem) return;

	let basePrice = parseInt(totalPriceElem.textContent || '0', 10) || 0;
	const checkboxes = document.querySelectorAll('.addon');

	const firstPaymentElem = document.querySelector('.first-payment');
	const staticPaymentElem = document.querySelector('.static-payment');
	const totalSumElem = document.querySelector('.total-sum');

	function updatePrice() {
		let total = basePrice;

		checkboxes.forEach(cb => {
			if (cb.checked) total += parseInt(cb.dataset.price || '0', 10) || 0;
		});

		totalPriceElem.textContent = total;

		const firstPayment = Math.ceil(total * 0.1);
		if (firstPaymentElem) firstPaymentElem.textContent = firstPayment + '₴';

		const regularPayments = [];
		document.querySelectorAll('.credit-variation-list__item').forEach(item => {
			const activeBtn = item.querySelector('.payment-option.active');
			const monthlyElem = item.querySelector('.monthlyPaymentSum');
			if (monthlyElem) {
				if (activeBtn) {
					const months = parseInt(activeBtn.dataset.months || '1', 10) || 1;
					const monthlyPayment = Math.ceil(total / months);
					monthlyElem.textContent = monthlyPayment + '₴';
					regularPayments.push(monthlyPayment + '₴');
				} else {
					monthlyElem.textContent = '—';
				}
			}
		});

		if (staticPaymentElem) {
			staticPaymentElem.textContent = regularPayments.length ? regularPayments.join(' / ') : '—';
		}

		if (totalSumElem) totalSumElem.textContent = total + '₴';
	}

	checkboxes.forEach(box => box.addEventListener('change', updatePrice));

	document.querySelectorAll('.credit-variation-list__item').forEach(item => {
		const paymentButtons = item.querySelectorAll('.payment-option');
		paymentButtons.forEach(button => {
			button.addEventListener('click', () => {
				if (button.classList.contains('active')) {
					button.classList.remove('active');
				} else {
					paymentButtons.forEach(btn => btn.classList.remove('active'));
					button.classList.add('active');
				}
				updatePrice();
			});
		});
	});

	updatePrice();
});

// ===== Бонусы
// const bonusAvailableEl = document.getElementById("bonus-available");
// const bonusRange = document.getElementById("bonus-range");
// const bonusInput = document.getElementById("bonus-input");
// if (bonusAvailableEl && bonusRange && bonusInput) {
//     const m = bonusAvailableEl.textContent?.match(/\d+/);
//     const maxBonus = parseInt(m ? m[0] : '0', 10) || 0;

//     bonusRange.max = maxBonus;
//     bonusInput.max = maxBonus;
//     bonusRange.value = 0;
//     bonusInput.value = 0;

//     bonusRange.addEventListener("input", () => { bonusInput.value = bonusRange.value; });
//     bonusInput.addEventListener("input", () => {
//         let v = parseInt(bonusInput.value || '0', 10) || 0;
//         if (v > maxBonus) v = maxBonus;
//         if (v < 0) v = 0;
//         bonusInput.value = v;
//         bonusRange.value  = v;
//     });
// }

// ===== Слайдеры best-set (через jQuery ready, чтобы всё уже было)
$(function () {
	if ($.fn.slick) {
		$('.best-set-slider').slick({
			slidesToShow: 4, slidesToScroll: 1, infinite: true, arrows: true, dots: false,
			prevArrow: false, nextArrow: $('.best-set__arrow--next'),
			responsive: [
				{ breakpoint: 1425, settings: { slidesToShow: 3 } },
				{ breakpoint: 992, settings: { slidesToShow: 2 } },
			]
		});

		$('.best-set-service-slider').slick({
			slidesToShow: 3, slidesToScroll: 1, infinite: true, arrows: true,
			prevArrow: false, nextArrow: $('.best-set-service__arrow--next'),
			dots: false,
			responsive: [
				{ breakpoint: 1425, settings: { slidesToShow: 2 } },
				{ breakpoint: 992, settings: { slidesToShow: 1.5, infinite: false, arrows: false, }, }
			]
		});
	}
});

// ===== Смена города (оверлей)
document.addEventListener("DOMContentLoaded", () => {
	// Управління модалкою міста перенесено в select-city.js
});

// ===== Селектор языка
(() => {
	const langSelector = document.querySelector('.lang-selector');
	if (!langSelector) return;
	const currentLang = langSelector.querySelector('.current-lang');
	const langDropdown = langSelector.querySelector('.lang-dropdown');
	if (!currentLang || !langDropdown) return;

	langDropdown.querySelectorAll('li').forEach(langItem => {
		langItem.addEventListener('click', () => { currentLang.textContent = langItem.textContent; });
	});
})();

// ===== Change-owner overlay (делегирование)
(() => {
	const overlay = document.querySelector('.change-owner-overlay');
	const content = overlay?.querySelector('.change-owner-content');
	if (!overlay || !content) return;

	function openOverlay() {
		overlay.classList.add('is-open');
		overlay.setAttribute('aria-hidden', 'false');
		overlay.querySelector('.change-owner-row.is-active input')?.focus();
	}
	function closeOverlay() {
		overlay.classList.add('is-closing');
		overlay.addEventListener('animationend', function handler() {
			overlay.classList.remove('is-open', 'is-closing');
			overlay.setAttribute('aria-hidden', 'true');
			overlay.removeEventListener('animationend', handler);
		});
	}

	document.addEventListener('click', (e) => {
		if (e.target.closest('.change-owner-open')) { e.preventDefault(); openOverlay(); return; }
		if (e.target.closest('.change-owner-close')) { e.preventDefault(); closeOverlay(); return; }
		if (e.target === overlay) { closeOverlay(); return; }

		const tab = e.target.closest('.change-owner-tab');
		if (tab) {
			const targetId = tab.dataset.target;
			const allTabs = overlay.querySelectorAll('.change-owner-tab');
			const allRows = overlay.querySelectorAll('.change-owner-row');
			allTabs.forEach(t => t.classList.remove('is-active'));
			tab.classList.add('is-active');
			allRows.forEach(r => r.classList.toggle('is-active', r.id === targetId));
			overlay.querySelector(`#${targetId} input`)?.focus();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeOverlay();
	});
})();

// ===== Change-owner overlay (вёрсточный дубль)
document.addEventListener("DOMContentLoaded", () => {
	const overlay = document.querySelector(".change-owner-overlay");
	if (!overlay) return;
	const openBtn = document.querySelector(".change-owner-open");
	const closeBtn = document.querySelector(".change-owner-close");
	const saveBtn = document.querySelector(".chane-owner-save-btn");
	const tabs = document.querySelectorAll(".change-owner-tabs .owner-tab");
	const sections = document.querySelectorAll(".change-owner-section");

	const showOverlay = () => { overlay.style.display = "block"; overlay.classList.remove("changeOwnerFadeOut"); overlay.classList.add("changeOwnerFadeIn"); };
	const hideOverlay = () => { overlay.classList.remove("changeOwnerFadeIn"); overlay.classList.add("changeOwnerFadeOut"); setTimeout(() => { overlay.style.display = "none"; }, 300); };

	openBtn?.addEventListener("click", showOverlay);
	closeBtn?.addEventListener("click", hideOverlay);
	// saveBtn?.addEventListener("click", hideOverlay);

	tabs.forEach(tab => {
		tab.addEventListener("click", () => {
			tabs.forEach(t => t.classList.remove("active"));
			tab.classList.add("active");
			const targetId = tab.dataset.target;
			sections.forEach(section => { section.style.display = (section.id === targetId ? "block" : "none"); });
		});
	});
});

// ===== Разные мелкие блоки
document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll(".hidden-row").forEach(row => {
		const items = row.querySelectorAll(".delivery-row-item[data-delivery-type]");
		items.forEach(item => {
			item.addEventListener("click", () => {
				items.forEach(el => el.classList.remove("active"));
				item.classList.add("active");
			});
		});
	});
});

document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll(".delivery-row-item-hidden-sub-content").forEach(block => {
		const buttons = block.querySelectorAll(".delivery-row-item-hidden-sub-content-left-item button");
		buttons.forEach(button => {
			button.addEventListener("click", () => {
				buttons.forEach(btn => btn.classList.remove("active"));
				button.classList.add("active");
			});
		});
	});
});

document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".credit-popup-tab").forEach(tab => {
		tab.addEventListener("click", () => {
			document.querySelectorAll(".credit-popup-tab").forEach(t => t.classList.remove("active"));
			tab.classList.add("active");
		});
	});
});

// ===== Универсальный popup
function initPopup(openSelector, popupSelector, closeSelector, overlaySelector) {
	const openBtns = document.querySelectorAll(openSelector);
	const popup = document.querySelector(popupSelector);
	if (!popup) return;

	const closeBtn = popup.querySelector(closeSelector);
	const overlay = popup.querySelector(overlaySelector);

	const showPopup = () => {
		popup.style.display = "block";

		if (popupSelector === "#courierOverlay") {
			const cityElement = document.querySelector('[data-order-ref] .delivery-row-item-title');
			const cityText = cityElement?.textContent?.trim();

			if (!cityText || cityText === 'Оберіть місто чи населений пункт') {
				alert('Спочатку оберіть місто доставки!');
				popup.style.display = "none";
				return false;
			}
		}
	};
	const hidePopup = () => {
		popup.style.display = "none";
	};

	openBtns.forEach(btn => btn.addEventListener("click", showPopup));
	closeBtn?.addEventListener("click", hidePopup);
	overlay?.addEventListener("click", hidePopup);
}
initPopup(".choice-shop", "#shopPopup", ".shop-popup-close", ".shop-popup-overlay");
initPopup(".choice-mail-box", "#mailboxPopup", ".mailbox-popup-close", ".mailbox-popup-overlay");
initPopup(".courier-choice", "#courierOverlay", ".courier-choice-popup-close", ".courier-choice-popup-overlay");
initPopup(".choice-credit", "#creditPopup", ".credit-popup-close", ".credit-popup-overlay");

// ===== Табы в попапах магазина/почты
document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll('.shop-popup-tab, .mailbox-popup-tab').forEach(tab => {
		tab.addEventListener('click', function () {
			const type = this.classList.contains('shop-popup-tab') ? 'shop' : 'mailbox';
			document.querySelectorAll(`.${type}-popup-tab`).forEach(t => t.classList.remove('active'));
			this.classList.add('active');

			const listBlock = document.querySelector(`.${type}-popup-list`);
			const mapBlock = document.querySelector(`.${type}-popup-map`);
			listBlock?.classList.remove('active-tab');
			mapBlock?.classList.remove('active-tab');

			if (this.dataset.tab === 'map') { mapBlock?.classList.add('active-tab'); }
			else { listBlock?.classList.add('active-tab'); }
		});
	});
	if (window.innerWidth <= 768) document.querySelector('.shop-popup-list')?.classList.add('active-tab');
});

// ==== Accardeon Delivery
document.querySelectorAll('.help-item').forEach(item => {
	item.addEventListener('click', () => {
		item.classList.toggle('active');
	});
});


// ===== City selector
(() => {
	const citySelector = document.querySelector('.city-selector');
	if (!citySelector) return;
	const citySpan = citySelector.querySelector('span');
	const items = citySelector.querySelectorAll('.city-dropdown li');
	if (!citySpan || !items.length) return;
	items.forEach(item => item.addEventListener('click', (e) => {
		e.stopPropagation();
		citySpan.textContent = item.textContent;
	}));
})();

// ===== Tabs / delivery rows
document.addEventListener("DOMContentLoaded", () => {
	const tabs = document.querySelectorAll(".tab");
	const deliveryRows = document.querySelectorAll(".delivery-row");
	if (!tabs.length) return;

	tabs.forEach(tab => {
		tab.addEventListener("click", () => {
			const targetId = tab.dataset.target;
			tabs.forEach(t => t.classList.remove("active"));
			tab.classList.add("active");
			deliveryRows.forEach(row => row.classList.remove("active"));
			const targetEl = document.getElementById(targetId || '');
			targetEl?.classList.add("active");
		});
	});
});

// ===== Аккаунт — отзывы (безопасно)
document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll(".account-reviews-item").forEach(function (item) {
		const toggleBtn = item.querySelector(".account-reviews-item__header");
		if (!toggleBtn) return;
		const detailsBtnText = item.querySelector(".account-reviews-item__details-btn");
		toggleBtn.addEventListener("click", function () {
			const content = item.querySelector(".account-reviews-item__content");
			content?.classList.toggle("active");
			item.classList.toggle("active");
			if (detailsBtnText) {
				detailsBtnText.textContent = item.classList.contains("active") ? "Сховати деталі" : "Деталі відгуку";
			}
		});
	});
});

// ===== Профиль — переключение режимов
document.addEventListener("DOMContentLoaded", function () {
	const editBtns = document.querySelectorAll(".personal-info-edit-btn, .personal-info-edit-btn-2, .personal-info-cancel-btn , .personal-info-save-btn");
	const editBlock = document.querySelector(".personal-info-edit");
	const displayBlock = document.querySelector(".personal-info-display");
	if (!editBtns.length || !editBlock || !displayBlock) return;

	editBtns.forEach(btn => {
		btn.addEventListener("click", function () {
			const isEdit = editBlock.style.display === "block";
			editBlock.style.display = isEdit ? "none" : "block";
			displayBlock.style.display = isEdit ? "block" : "none";
		});
	});
});



// ===== Тогглер бонус-блоков
document.querySelectorAll('.account-bonus-item').forEach(button => {
	button.addEventListener('click', () => { button.closest('.account-bonus-item')?.classList.toggle('active'); });
});

// ===== Service slider (адаптивная инициализация)
$(function () {
	function initSlider() {
		if (!$.fn.slick) return;
		if ($(window).width() > 768) {
			if (!$('.service-slider').hasClass('slick-initialized')) {
				$('.service-slider').slick({
					slidesToShow: 1, slidesToScroll: 1,
					prevArrow: $('.service-slider__arrow--prev'),
					nextArrow: $('.service-slider__arrow--next'),
					infinite: true
				});
			}
		} else if ($('.service-slider').hasClass('slick-initialized')) {
			$('.service-slider').slick('unslick');
		}
	}
	initSlider();
	$(window).on('resize', initSlider);
});

// ===== Ещё информация (кредит)
document.querySelectorAll('.more-credit-info').forEach(btn => {
	btn.addEventListener('click', () => { btn.closest('.credit-variation-list__item')?.classList.toggle('show-details'); });
});

// ===== Пагинация
document.addEventListener("DOMContentLoaded", () => {
	const pagination = document.querySelector(".pagination");
	if (!pagination) return;

	const prevBtn = pagination.querySelector(".pagination__prev");
	const nextBtn = pagination.querySelector(".pagination__next");
	if (!prevBtn || !nextBtn) return;

	const totalPages = 38;
	let currentPage = 1;
	const maxPageButtons = 8;

	function renderPagination() {
		[...pagination.querySelectorAll(".page-number")].forEach(el => el.remove());
		const pages = [];

		if (totalPages <= maxPageButtons) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else {
			const sideCount = maxPageButtons - 2;
			let left = currentPage - Math.floor(sideCount / 2);
			let right = currentPage + Math.floor(sideCount / 2);
			if (left < 2) { left = 2; right = left + sideCount - 1; }
			if (right > totalPages - 1) { right = totalPages - 1; left = right - sideCount + 1; }
			pages.push(1);
			if (left > 2) pages.push("...");
			for (let i = left; i <= right; i++) pages.push(i);
			if (right < totalPages - 1) pages.push("...");
			pages.push(totalPages);
			while (pages.length > maxPageButtons) pages.splice(pages.length - 2, 1);
		}

		pages.forEach(page => {
			const el = document.createElement("div");
			el.classList.add("pagination__item", "page-number");
			if (page === "...") {
				el.textContent = "..."; el.classList.add("dots");
			} else {
				el.textContent = page;
				if (page === currentPage) el.classList.add("active", "disabled");
				el.addEventListener("click", () => {
					if (page !== currentPage) { currentPage = page; renderPagination(); }
				});
			}
			pagination.insertBefore(el, nextBtn);
		});

		prevBtn.classList.toggle("disabled", currentPage === 1);
		nextBtn.classList.toggle("disabled", currentPage === totalPages);
	}

	prevBtn.addEventListener("click", () => { if (currentPage > 1) { currentPage--; renderPagination(); } });
	nextBtn.addEventListener("click", () => { if (currentPage < totalPages) { currentPage++; renderPagination(); } });
	renderPagination();
});

// ===== Моб. гриды категорий
document.addEventListener("DOMContentLoaded", () => {
	const tabs = document.querySelectorAll(".categories-grid-mobile-nav__item");
	const grids = document.querySelectorAll(".categories-grid");
	if (!tabs.length || !grids.length) return;

	tabs.forEach(tab => {
		tab.addEventListener("click", () => {
			const target = tab.getAttribute("data-target");
			tabs.forEach(t => t.classList.remove("active"));
			tab.classList.add("active");
			grids.forEach(grid => {
				grid.classList.toggle('active', grid.getAttribute("data-grid") === target);
			});
		});
	});
});

// ===== Прочие слайдеры и UI (всё внутри jQuery ready)
$(function () {
	if ($.fn.slick) {
		// Слайдер комплектов: показываем окно из 5 точек, сдвигаем при переключении
		$('.complectation-slider').on('init reInit afterChange', function (event, slick, currentSlide) {
			var $dotsUl = $(this).closest('.section-complectation').find('.slick-dots');
			var $dots = $dotsUl.find('li');
			var total = $dots.length;
			var maxVisible = 5;

			if (total <= maxVisible) {
				$dotsUl.css('transform', 'translateX(0)');
				return;
			}

			var current = currentSlide || 0;
			// li width (10px) + gap (4px) = 14px per dot
			var dotWidth = 14;
			var start = Math.max(0, Math.min(current - 1, total - maxVisible));
			var offset = start * dotWidth;

			$dotsUl.css('transform', 'translateX(-' + offset + 'px)');
		}).slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			arrows: true,
			dots: true,
			appendDots: $('.complectation-slider-dots'),
			prevArrow: $('.complectation-prev'),
			nextArrow: $('.complectation-next')
		});

		$('.promo-item-slider').slick({
			slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: true,
			accessibility: true, adaptiveHeight: true, infinite: true
		});

		const $mainSlider = $('.single-product-slider');
		const $thumbSlider = $('.single-product-thumbs');
		$mainSlider.slick({
			slidesToShow: 1, slidesToScroll: 1, arrows: true, infinite: true,
			prevArrow: $('.prev-arrow-main'), nextArrow: $('.next-arrow-main'),
			asNavFor: '.single-product-thumbs'
		});
		$thumbSlider.slick({
			slidesToShow: 6, slidesToScroll: 1, arrows: true, infinite: true,
			focusOnSelect: true, prevArrow: $('.prev-arrow-thumb'), nextArrow: $('.next-arrow-thumb'),
			asNavFor: '.single-product-slider'
		});

		$('.photos-slider').slick({
			slidesToShow: 5, slidesToScroll: 1, arrows: true, autoplay: false, infinite: false,
			prevArrow: $('.photos-slider__arrow--prev'), nextArrow: $('.photos-slider__arrow--next'),
			responsive: [
				{ breakpoint: 1024, settings: { slidesToShow: 3 } },
				{ breakpoint: 768, settings: { slidesToShow: 2 } },
				{ breakpoint: 480, settings: { slidesToShow: 1 } },
			]
		});

		$('.viewed-products__slider').slick({
			slidesToShow: 5, slidesToScroll: 1, infinite: true, arrows: true, dots: true,
			appendArrows: $('.viewed-products__controls'),
			prevArrow: $('.viewed-products__arrow--prev'),
			nextArrow: $('.viewed-products__arrow--next'),
			appendDots: $('.viewed-products__dots'),
			responsive: [
				{ breakpoint: 1400, settings: { slidesToShow: 4 } },
				{ breakpoint: 1199, settings: { slidesToShow: 3 } },
				{ breakpoint: 991, settings: { slidesToShow: 2 } },
				{
					breakpoint: 600, settings: {
						slidesToShow: 1.5,
						infinite: false,
						centerMode: false,
					}
				},
			]
		});

		$('.wishlist-slider').slick({
			slidesToShow: 1, slidesToScroll: 1, arrows: true,
			prevArrow: $('.wishlist-slider__arrow--prev'), nextArrow: $('.wishlist-slider__arrow--next'),
			dots: true, appendDots: $('.wishlist-slider__dots'),
			customPaging: function (slider, i) {
				return '<button type="button" class="dot" aria-label="Перейти до слайду ' + (i + 1) + '"></button>';
			},
			accessibility: true, adaptiveHeight: false, infinite: true,
			responsive: [
				{ breakpoint: 1199, settings: { slidesToShow: 3 } },
				{ breakpoint: 767, settings: { slidesToShow: 1.5, infinite: false, centerMode: true } },
			]
		});

		// Promo banners slider (only if more than 3 banners)
		var $promoBannersSlider = $('.promo-banners-slider');
		if ($promoBannersSlider.length && $promoBannersSlider.children().length > 3) {
			function getSliderWidth() {
				var $container = $promoBannersSlider.closest('.container');
				var containerWidth = $container.width();

				// On mobile (768px and below), use full container width
				if (window.innerWidth <= 768) {
					return containerWidth;
				}

				// On desktop: calculate width based on grid proportions
				// Grid is: 1fr 2.6fr 1fr = 4.6fr total, middle column is 2.6/4.6
				var gap = 12; // gap from CSS
				var middleColumnWidth = (containerWidth - 2 * gap) * (2.6 / 4.6);
				return Math.floor(middleColumnWidth);
			}

			function initPromoBannersSlider() {
				if ($promoBannersSlider.hasClass('slick-initialized')) return;

				var sliderWidth = getSliderWidth();
				if (sliderWidth > 0) {
					// Set width on all containers
					$promoBannersSlider.closest('.promo-banners').css('width', sliderWidth + 'px');
					$promoBannersSlider.closest('.promo-banners-slider-wrapper').css('width', sliderWidth + 'px');
					$promoBannersSlider.css('width', sliderWidth + 'px');
				}

				$promoBannersSlider.slick({
					slidesToShow: 3, slidesToScroll: 1, arrows: true, infinite: true,
					prevArrow: $('.promo-banners__arrow--prev'),
					nextArrow: $('.promo-banners__arrow--next'),
					dots: false,
					accessibility: true, adaptiveHeight: false
				});

				// Force arrows to be visible on mobile (slick may hide them)
				if (window.innerWidth <= 768) {
					$('.promo-banners__arrow').css('display', 'flex');
				}
			}

			// Initialize on window load to ensure layout is ready
			if (document.readyState === 'complete') {
				initPromoBannersSlider();
			} else {
				$(window).on('load', initPromoBannersSlider);
			}

			// Recalculate on resize
			var resizeTimer;
			$(window).on('resize', function () {
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(function () {
					if ($promoBannersSlider.hasClass('slick-initialized')) {
						var sliderWidth = getSliderWidth();
						$promoBannersSlider.closest('.promo-banners').css('width', sliderWidth + 'px');
						$promoBannersSlider.closest('.promo-banners-slider-wrapper').css('width', sliderWidth + 'px');
						$promoBannersSlider.slick('setPosition');

						// Force arrows to be visible on mobile
						if (window.innerWidth <= 768) {
							$('.promo-banners__arrow').css('display', 'flex');
						}
					}
				}, 100);
			});
		}

		// Reviews slider
		$('.reviews-slider').slick({
			slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: true,
			appendDots: $('.reviews-dots'),
			customPaging: (slider, i) => '<button type="button" class="dot" aria-label="Перейти до слайду ' + (i + 1) + '"></button>',
			accessibility: true, adaptiveHeight: false, infinite: true
		});
		// ARIA для reviews
		$('.reviews-dots').attr('role', 'tablist');
		$('.reviews-dots .dot').each(function (i) {
			$(this).attr({ 'role': 'tab', 'tabindex': i === 0 ? 0 : -1, 'aria-selected': i === 0 ? 'true' : 'false', 'id': 'reviews-dot-' + i });
		});
		$('.reviews-slider').on('afterChange', function (event, slick, currentSlide) {
			$('.reviews-dots .dot').each(function (i) {
				$(this).attr({ 'tabindex': i === currentSlide ? 0 : -1, 'aria-selected': i === currentSlide ? 'true' : 'false' });
			});
		});
	}

	// Простые табы/клики
	$('.complectation-tab').on('click', function () {
		$('.complectation-tab').removeClass('active');
		$(this).addClass('active');
	});

	// Мобильный футер — временно отключен (меню всегда открыты)
	// const navButton = document.getElementById('mobile-footer-nav__button');
	// const navMenu   = document.getElementById('mobile-footer-nav__menu');
	// navButton?.addEventListener('click', () => { navMenu?.classList.toggle('open'); navButton.classList.toggle('open'); });

	// const bestCategoriesBtn  = document.getElementById('mobile-footer-best-categories__button');
	// const bestCategoriesMenu = document.getElementById('mobile-footer-best-categories__menu');
	// bestCategoriesBtn?.addEventListener('click', () => { bestCategoriesMenu?.classList.toggle('open'); bestCategoriesBtn.classList.toggle('open'); });

	// const bestCategoriesTwoBtn  = document.getElementById('mobile-footer-best-categories-two__button');
	// const bestCategoriesTwoMenu = document.getElementById('mobile-footer-best-categories-two__menu');
	// bestCategoriesTwoBtn?.addEventListener('click', () => { bestCategoriesTwoMenu?.classList.toggle('open'); bestCategoriesTwoBtn.classList.toggle('open'); });


	// Auth modal
	$('.auth-modal__tab').on('click', function (e) {
		e.preventDefault();
		var tabType = $(this).data('tab');
		$('.auth-modal__tab').removeClass('auth-modal__tab--active');
		$(this).addClass('auth-modal__tab--active');
		$('.auth-modal__form').removeClass('auth-modal__form--active');
		if (tabType === 'login') {
			$('#loginEmailBlock').addClass('auth-modal__form--active');
		} else {
			$('.auth-modal__form--' + tabType).addClass('auth-modal__form--active');
		}
	});

	$('#loginForm').on('submit', function (e) { e.preventDefault(); console.log('Login form submitted'); });
	$('#registerForm').on('submit', function (e) { e.preventDefault(); console.log('Registration form submitted'); });
	$('.auth-modal__overlay').on('click', function (e) { if (e.target === this) $('.auth-modal').hide(); });

	// Заказы — аккордеон
	$('.account-orders-item__header').on('click', function () {
		const $item = $(this).closest('.account-orders-item');
		const $content = $item.find('.account-orders-item__content');
		const $arrow = $item.find('.account-orders-item__arrow');
		$item.toggleClass('active');
		if ($item.hasClass('active')) {
			$content.slideDown(300).addClass('active');
			$arrow.css('transform', 'rotate(180deg)');
		} else {
			$content.slideUp(300).removeClass('active');
			$arrow.css('transform', 'rotate(0deg)');
		}
	});

	// Доставка — выбор способа/типа
	$('.order-delivery__method').on('click', function () {
		$('.order-delivery__method').removeClass('order-delivery__method--active');
		$(this).addClass('order-delivery__method--active');
	});
	$('.order-continue__btn').on('click', function () {
		if ($('.order-delivery__method--active').length === 0) { alert('Будь ласка, оберіть спосіб доставки'); return; }
		console.log('Proceeding to next step...');
	});
	$('.order-delivery__city').on('click', function (e) {
		e.preventDefault(); $('#cityModal').fadeIn(300).css('display', 'flex'); $('body').css('overflow', 'hidden');
	});
	$('.city-modal__close, .city-modal__overlay').on('click', function () {
		$('#cityModal').fadeOut(300); $('body').css('overflow', 'auto');
	});
	$(document).on('keydown', function (e) {
		if (e.key === 'Escape' && $('#cityModal').is(':visible')) { $('#cityModal').fadeOut(300); $('body').css('overflow', 'auto'); }
	});
	$('.order-delivery__store').on('click', function (e) {
		e.preventDefault(); e.stopPropagation();
		$('#storeModal').fadeIn(300).css('display', 'flex'); $('body').css('overflow', 'hidden');
	});
	$('.store-modal__close, .store-modal__overlay').on('click', function () {
		$('#storeModal').fadeOut(300); $('body').css('overflow', 'auto');
	});
	$('.order-delivery__type-item').on('click', function () {
		const deliveryType = $(this).data('type');
		$('.order-delivery__type-item').removeClass('order-delivery__type-item--active');
		$(this).addClass('order-delivery__type-item--active');
		$('.order-delivery__methods').hide();
		$(`[data-delivery-type="${deliveryType}"]`).show();
	});
	$(document).on('click', '.order-delivery__method', function (e) {
		if ($(this).hasClass('order-delivery__postomat-np')) return;
		$('.order-delivery__method').removeClass('order-delivery__method--active');
		$(this).addClass('order-delivery__method--active');
	});
	$(document).on('click', '.order-delivery__method-header', function (e) {
		e.preventDefault(); e.stopPropagation();
		const $method = $(this).closest('.order-delivery__method');
		const $content = $method.find('.order-delivery__accordion-content');
		$('.order-delivery__method.expanded').not($method).each(function () {
			$(this).removeClass('expanded');
			$(this).find('.order-delivery__accordion-content').removeClass('expanded');
		});
		$method.toggleClass('expanded');
		$content.toggleClass('expanded');
		$('.order-delivery__method').removeClass('order-delivery__method--active');
		if ($method.hasClass('expanded')) $method.addClass('order-delivery__method--active');
	});
	$(document).on('click', '.order-delivery__store-btn', function (e) {
		e.preventDefault(); e.stopPropagation();
		$('#storeModal').fadeIn(300).css('display', 'flex'); $('body').css('overflow', 'hidden');
	});
	$(document).on('click', '.order-delivery__client', function (e) {
		e.preventDefault();
		$('.recieve-modal__form-first').show(); $('.recieve-modal__form-another').hide();
		$('.recieve-modal__tab').removeClass('recieve-modal__tab--active').first().addClass('recieve-modal__tab--active');
		$('#recieveModal').fadeIn(300).css('display', 'flex'); $('body').css('overflow', 'hidden');
	});
	$(document).on('click', '.recieve-modal__close, .recieve-modal__overlay', function (e) {
		e.preventDefault(); $('#recieveModal').fadeOut(300); $('body').css('overflow', 'auto');
	});
	$(document).on('click', '.recieve-modal__tab', function (e) {
		e.preventDefault();
		$('.recieve-modal__tab').removeClass('recieve-modal__tab--active');
		$(this).addClass('recieve-modal__tab--active');
		const tabIndex = $(this).index();
		$('.recieve-modal__form-first, .recieve-modal__form-another').hide();
		(tabIndex === 0 ? $('.recieve-modal__form-first') : $('.recieve-modal__form-another')).css('display', 'flex');
	});
	$(document).on('submit', '.recieve-modal__form', function (e) {
		e.preventDefault();
		const phone = $(this).find('input[type="tel"]').val();
		const firstName = $(this).find('input[type="text"]').first().val();
		const lastName = $(this).find('input[type="text"]').eq(1).val();
		$('.order-delivery__client .order-delivery__desc').html(`${lastName} ${firstName} <br>${phone}`);
		$('#recieveModal').fadeOut(300); $('body').css('overflow', 'auto');
	});
	$(document).on('click', '.order-delivery__day-choose-item-button', function (e) {
		e.preventDefault(); e.stopPropagation();
		$('.order-delivery__day-choose-item-button').removeClass('active');
		$(this).addClass('active');
	});
	$(document).on('click', '.order-delivery__day-choose-calendar-btn', function (e) {
		e.preventDefault(); e.stopPropagation();
		$(this).css('border-color', '#2EA4FF');
		setTimeout(() => { $(this).css('border-color', '#D9D9D9'); }, 300);
	});
	$(document).on('click', '#open-choose-date-modal', function (e) {
		e.preventDefault(); e.stopPropagation();
		$('#chooseDateModal').fadeIn(300).css('display', 'flex'); $('body').css('overflow', 'hidden');
	});
	$(document).on('click', '.choose-date-modal__close, .choose-date-modal__overlay', function (e) {
		e.preventDefault(); $('#chooseDateModal').fadeOut(300); $('body').css('overflow', 'auto');
	});
	$(document).on('click', '.choose-date-modal__content', function (e) { e.stopPropagation(); });
});




/* ===== Countdown timer (robust against re-render) ===== */
(() => {
	function initAllTimers() {
		document.querySelectorAll('.countdown-timer').forEach(initCountdownTimer);
	}

	function initCountdownTimer(root) {
		if (!root || root.__countdownInited) return;
		root.__countdownInited = true;

		// --- определить целевое время
		let deadlineMs = null;
		if (root.dataset.deadline) {
			const t = new Date(root.dataset.deadline).getTime();
			if (!Number.isNaN(t)) deadlineMs = t;
		}

		let remainingMs;
		if (deadlineMs !== null) {
			remainingMs = Math.max(0, deadlineMs - Date.now());
		} else if (root.dataset.seconds) {
			const sec = parseInt(root.dataset.seconds, 10);
			remainingMs = (Number.isFinite(sec) ? sec : 0) * 1000;
		} else {
			// старт из вёрстки
			const vals = root.querySelectorAll('.time-block .time-value');
			const d = parseInt(vals[0]?.textContent || '0', 10) || 0;
			const h = parseInt(vals[1]?.textContent || '0', 10) || 0;
			const m = parseInt(vals[2]?.textContent || '0', 10) || 0;
			const s = parseInt(vals[3]?.textContent || '0', 10) || 0;
			remainingMs = (((d * 24 + h) * 60 + m) * 60 + s) * 1000;
		}

		function render(ms) {
			// ВСЕГДА берем актуальные узлы — вдруг блок перерисовали
			const values = root.querySelectorAll('.time-block .time-value');
			if (values.length < 4) return;

			const totalSec = Math.max(0, Math.floor(ms / 1000));
			const d = Math.floor(totalSec / 86400);
			const h = Math.floor((totalSec % 86400) / 3600);
			const m = Math.floor((totalSec % 3600) / 60);
			const s = totalSec % 60;

			values[0].textContent = String(d).padStart(2, '0');
			values[1].textContent = String(h).padStart(2, '0');
			values[2].textContent = String(m).padStart(2, '0');
			values[3].textContent = String(s).padStart(2, '0');
		}

		render(remainingMs);
		const id = setInterval(() => {
			remainingMs = deadlineMs !== null ? Math.max(0, deadlineMs - Date.now()) : remainingMs - 1000;
			render(remainingMs);
			if (remainingMs <= 0) {
				clearInterval(id);
				root.dispatchEvent(new CustomEvent('countdown:done'));
			}
		}, 1000);
	}

	// запустить сейчас или после DOMContentLoaded
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initAllTimers);
	} else {
		initAllTimers();
	}

	// подхватываем таймеры, добавленные динамически
	const mo = new MutationObserver(muts => {
		muts.forEach(m => m.addedNodes.forEach(node => {
			if (!(node instanceof Element)) return;
			if (node.matches?.('.countdown-timer')) initCountdownTimer(node);
			node.querySelectorAll?.('.countdown-timer').forEach(initCountdownTimer);
		}));
	});
	mo.observe(document.documentElement, { childList: true, subtree: true });
})();