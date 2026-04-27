// if (window.location.pathname === '/' || window.location.pathname === '') {

const btnAccessability = document.querySelector('.btn-accessability--mob');
const headerMainMob = document.querySelector('.header-main');
// const btnBack = document.querySelector('.accessability-menu--back');


// const sizeButtons = document.querySelectorAll('.settings-size .settings-option');
const colorSchemeButtons = document.querySelectorAll('.color-scheme .settings-option');
const picButtons = document.querySelectorAll('.settings-pic .settings-option');


btnAccessability.addEventListener('click', () => {
	headerMainMob.classList.toggle('accessability-mob-menu--active');
});

// btnBack.addEventListener('click', () => {
// 	// Якщо меню відкрите, ховаємо його
// 	if (headerMainMob.classList.contains('accessability-mob-menu--active')) {
// 		headerMainMob.classList.remove('accessability-mob-menu--active');
// 	}
// });

// Знаходимо всі групи з кнопками для налаштувань
const settingsGroups = document.querySelectorAll('.settings-visual--item');

// Для кожної групи налаштувань додаємо обробник події
settingsGroups.forEach(group => {
	const buttons = group.querySelectorAll('.settings-option'); // Знаходимо всі кнопки в межах однієї групи

	buttons.forEach(button => {
		button.addEventListener('click', () => {
			// Видаляємо клас 'active' тільки з кнопок цієї групи
			buttons.forEach(btn => btn.classList.remove('active'));
			// Додаємо клас 'active' тільки до натиснутої кнопки
			button.classList.add('active');
		});
	});
});



colorSchemeButtons.forEach(button => {
	button.addEventListener('click', () => {
		// Знімаємо класи кольорової схеми тільки з body та html
		document.body.classList.remove('scheme-default', 'scheme-white-black', 'scheme-black-white', 'scheme-blue');
		document.documentElement.classList.remove('scheme-default', 'scheme-white-black', 'scheme-black-white', 'scheme-blue');

		if (button.classList.contains('scheme-default-button')) {
			document.body.classList.add('scheme-default');
			document.documentElement.classList.add('scheme-default');
		} else if (button.classList.contains('scheme-white-black-button')) {
			document.body.classList.add('scheme-white-black');
			document.documentElement.classList.add('scheme-white-black');
		} else if (button.classList.contains('scheme-black-white-button')) {
			document.body.classList.add('scheme-black-white');
			document.documentElement.classList.add('scheme-black-white');
		} else if (button.classList.contains('scheme-blue-button')) {
			document.body.classList.add('scheme-blue');
			document.documentElement.classList.add('scheme-blue');
		}

		// Видаляємо 'active' тільки з кнопок цієї групи
		colorSchemeButtons.forEach(btn => btn.classList.remove('active'));
		button.classList.add('active');

		// Зберігаємо налаштування після зміни
		saveSettings();
	});
});


// Оновлений код для кнопок зображень:
picButtons.forEach(button => {
	button.addEventListener('click', () => {
		// Знімаємо класи з body та html для зображень
		document.body.classList.remove('images-normal', 'images-black-white', 'images-hide');
		document.documentElement.classList.remove('images-normal', 'images-black-white', 'images-hide');

		if (button.classList.contains('images-normal-button')) {
			document.body.classList.add('images-normal');
			document.documentElement.classList.add('images-normal');
			localStorage.setItem('imageSettings', 'images-normal');
		} else if (button.classList.contains('images-black-white-button')) {
			document.body.classList.add('images-black-white');
			document.documentElement.classList.add('images-black-white');
			localStorage.setItem('imageSettings', 'images-black-white');
		} else if (button.classList.contains('images-hide-button')) {
			document.body.classList.add('images-hide');
			document.documentElement.classList.add('images-hide');
			localStorage.setItem('imageSettings', 'images-hide');
		}

		// Встановлюємо 'active' для відповідної кнопки
		picButtons.forEach(btn => btn.classList.remove('active'));
		button.classList.add('active');
	});
});






// Зберігаємо початкові розміри шрифтів для кожного елемента
const initialFontSizes = new Map();

// Функція для збереження початкового розміру шрифта елементів
function saveInitialFontSizes() {
	const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6, p, span, .btn, a, li, label, input, textarea, .card-title, .selected-option, .modal, .footer-bottom .copyright');
	elements.forEach(element => {
		if (!initialFontSizes.has(element)) {
			initialFontSizes.set(element, parseFloat(getComputedStyle(element).fontSize));
		}
	});
}

// Функція для скидання всіх змін шрифтів до початкових значень
function resetFontSizes() {
	const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6, p, span, .btn, a, li, label, input, textarea, .card-title, .selected-option, .modal, .footer-bottom .copyright');
	elements.forEach(element => {
		const initialSize = initialFontSizes.get(element);
		if (initialSize) {
			element.style.fontSize = `${initialSize}px`;
		}
	});

	// Скидаємо розмір шрифта для placeholder з !important
	const placeholderStyle = document.createElement('style');
	document.head.appendChild(placeholderStyle);
	placeholderStyle.sheet.insertRule(
		`input::placeholder, textarea::placeholder { font-size: 16px !important; }`, 0
	);

	// Скидаємо масштаб
	currentScale = 1;
}


// Функція для зміни шрифтів пропорційно
function changeFontSize(factor) {
	const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6, p, span, .btn, a, li, label, input, textarea, .card-title, .selected-option, .modal, .footer-bottom .copyright');
	elements.forEach(element => {
		const initialSize = initialFontSizes.get(element);
		if (initialSize) {
			const newSize = initialSize * factor;
			element.style.setProperty('font-size', `${newSize}px`, 'important');
		}
	});

	// Зміна розміру шрифта для `placeholder`
	const newPlaceholderSize = 16 * factor;
	const placeholderStyle = document.createElement('style');
	placeholderStyle.textContent = `
		input::placeholder, textarea::placeholder {
			font-size: ${newPlaceholderSize}px !important;
		}
	`;
	document.head.appendChild(placeholderStyle);
}

//::placeholder
function changePlaceholderFontSizeForAll(factor) {
	const newSize = 16 * factor; // Початковий розмір шрифта

	const style = document.createElement('style');
	document.head.appendChild(style);

	style.sheet.insertRule(
		`input::placeholder, textarea::placeholder, select::placeholder { font-size: ${newSize}px !important; }`,
		0
	);
}



let currentScale = 1;

const sizeButtons = document.querySelectorAll('.settings-size .settings-option');
const sizeButtonGroups = document.querySelectorAll('.settings-size .settings-options');

sizeButtons.forEach(button => {
	button.addEventListener('click', () => {
		// Видаляємо всі активні стани у кнопок розміру шрифту
		sizeButtons.forEach(btn => btn.classList.remove('active'));

		// Видаляємо всі класи розміру шрифту з body
		document.body.classList.remove('font-small', 'font-normal', 'font-big');

		// Додаємо новий клас до body відповідно до натиснутої кнопки
		if (button.classList.contains('font-small-button')) {
			document.body.classList.add('font-small');
			changeFontSize(0.95);
		} else if (button.classList.contains('font-normal-button')) {
			document.body.classList.add('font-normal');
			resetFontSizes();
		} else if (button.classList.contains('font-big-button')) {
			document.body.classList.add('font-big');
			changeFontSize(1.05);
		}

		// Встановлення активного класу на основі класу в body
		updateActiveButtons();
		saveSettings();
	});
});

function updateActiveButtons() {
	sizeButtons.forEach(button => {
		if (
			(document.body.classList.contains('font-small') && button.classList.contains('font-small-button')) ||
			(document.body.classList.contains('font-normal') && button.classList.contains('font-normal-button')) ||
			(document.body.classList.contains('font-big') && button.classList.contains('font-big-button'))
		) {
			button.classList.add('active');
		} else {
			button.classList.remove('active');
		}
	});
}

// Зберігаємо початкові розміри шрифтів при завантаженні сторінки
window.addEventListener('load', saveInitialFontSizes);
// Оновлення стану кнопок при завантаженні сторінки
window.addEventListener('load', updateActiveButtons);



//settings-cancel
const cancelButtons = document.querySelectorAll('.settings-cancel');

cancelButtons.forEach(cancelButton => {
	cancelButton.addEventListener('click', () => {
		// Очищаємо localStorage
		localStorage.removeItem('accessibilitySettings');

		// Скидаємо всі класи з body та html
		document.body.classList.remove(
			'scheme-default', 'scheme-white-black', 'scheme-black-white', 'scheme-blue',
			'images-normal', 'images-black-white', 'images-hide',
			'font-small', 'font-normal', 'font-big'
		);
		document.documentElement.classList.remove(
			'scheme-default', 'scheme-white-black', 'scheme-black-white', 'scheme-blue'
		);

		// Встановлюємо класи за замовчуванням для body та html
		document.body.classList.add('scheme-default', 'images-normal', 'font-normal');
		document.documentElement.classList.add('scheme-default');

		// Скидаємо шрифти
		resetFontSizes();

		// Видаляємо всі активні стани кнопок
		document.querySelectorAll('.settings-option').forEach(button => button.classList.remove('active'));

		// Активуємо кнопки за замовчуванням
		document.querySelectorAll('.font-normal-button').forEach(button => button.classList.add('active'));
		document.querySelectorAll('.scheme-default-button').forEach(button => button.classList.add('active'));
		document.querySelectorAll('.images-normal-button').forEach(button => button.classList.add('active'));

		// **Зберігаємо стандартні налаштування в localStorage**
		const defaultSettings = {
			colorScheme: 'scheme-default',
			imageSettings: 'images-normal',
			fontSize: 'font-normal',
			activeButtons: ['font-normal', 'scheme-default', 'images-normal'] // Відповідні data-setting значення
		};

		localStorage.setItem('accessibilitySettings', JSON.stringify(defaultSettings));
	});
});



// }



// Функція для збереження поточного стану в localStorage з активними кнопками
function saveSettings() {
	const settings = {
		colorScheme: document.body.classList.contains('scheme-white-black') ? 'scheme-white-black' :
			document.body.classList.contains('scheme-black-white') ? 'scheme-black-white' :
				document.body.classList.contains('scheme-blue') ? 'scheme-blue' : 'scheme-default',

		imageSettings: document.body.classList.contains('images-black-white') ? 'images-black-white' :
			document.body.classList.contains('images-hide') ? 'images-hide' : 'images-normal',

		fontSize: document.body.classList.contains('font-small') ? 'font-small' :
			document.body.classList.contains('font-big') ? 'font-big' : 'font-normal',

		activeButtons: []
	};

	// Зберігаємо активні кнопки
	document.querySelectorAll('.settings-option.active').forEach(button => {
		settings.activeButtons.push(button.dataset.setting); // Використовуємо data-setting для унікального збереження
	});

	// Збереження налаштувань у localStorage
	localStorage.setItem('accessibilitySettings', JSON.stringify(settings));

	// Збереження налаштувань зображень для HTML
	localStorage.setItem('imageSettings', settings.imageSettings);
}



// Функція для відновлення налаштувань при завантаженні сторінки

function loadSettings() {
	const settings = JSON.parse(localStorage.getItem('accessibilitySettings'));

	if (settings) {
		// Відновлюємо кольорову схему для body та html
		document.body.classList.remove('scheme-default', 'scheme-white-black', 'scheme-black-white', 'scheme-blue');
		document.body.classList.add(settings.colorScheme);
		document.documentElement.classList.remove('scheme-default', 'scheme-white-black', 'scheme-black-white', 'scheme-blue');
		document.documentElement.classList.add(settings.colorScheme);

		// Відновлюємо налаштування зображень для body та html
		document.body.classList.remove('images-normal', 'images-black-white', 'images-hide');
		document.body.classList.add(settings.imageSettings);
		document.documentElement.classList.remove('images-normal', 'images-black-white', 'images-hide');
		document.documentElement.classList.add(settings.imageSettings);

		// Відновлюємо розмір шрифтів
		document.body.classList.remove('font-small', 'font-normal', 'font-big');
		document.body.classList.add(settings.fontSize);

		if (settings.fontSize === 'font-small') {
			changeFontSize(0.95);
		} else if (settings.fontSize === 'font-big') {
			changeFontSize(1.05);
		} else {
			resetFontSizes();
		}

		// Встановлюємо активні кнопки
		document.querySelectorAll('.settings-option').forEach(button => button.classList.remove('active'));

		settings.activeButtons.forEach(setting => {
			const buttons = document.querySelectorAll(`.settings-option[data-setting="${setting}"]`);
			buttons.forEach(button => button.classList.add('active'));
		});
	}
}


// Додаємо події на кнопки для збереження налаштувань

document.querySelectorAll('.settings-option').forEach(button => {
	button.addEventListener('click', () => {
		saveSettings();
	});
});

// Завантажуємо налаштування при відкритті сторінки
window.addEventListener('load', loadSettings);

// Кнопка скасування скидає налаштування в localStorage
cancelButtons.forEach(cancelButton => {
	cancelButton.addEventListener('click', () => {
		// Очищаємо localStorage
		localStorage.removeItem('accessibilitySettings');
		localStorage.removeItem('imageSettings');  // Очищення налаштувань зображень

		// Скидаємо всі класи з body та html
		document.body.classList.remove(
			'scheme-default', 'scheme-white-black', 'scheme-black-white', 'scheme-blue',
			'images-normal', 'images-black-white', 'images-hide',
			'font-small', 'font-normal', 'font-big'
		);
		document.documentElement.classList.remove(
			'scheme-default', 'scheme-white-black', 'scheme-black-white', 'scheme-blue',
			'images-normal', 'images-black-white', 'images-hide'
		);

		// Встановлюємо класи за замовчуванням для body та html
		document.body.classList.add('scheme-default', 'images-normal', 'font-normal');
		document.documentElement.classList.add('scheme-default', 'images-normal'); // Додаємо класи і до html

		// Скидаємо шрифти
		resetFontSizes();

		// Видаляємо всі активні стани кнопок
		document.querySelectorAll('.settings-option').forEach(button => button.classList.remove('active'));

		// Активуємо кнопки за замовчуванням
		document.querySelectorAll('.font-normal-button').forEach(button => button.classList.add('active'));
		document.querySelectorAll('.scheme-default-button').forEach(button => button.classList.add('active'));
		document.querySelectorAll('.images-normal-button').forEach(button => button.classList.add('active'));

		// Зберігаємо стандартні налаштування в localStorage
		const defaultSettings = {
			colorScheme: 'scheme-default',
			imageSettings: 'images-normal',  // Збереження налаштувань для зображень
			fontSize: 'font-normal',
			activeButtons: ['font-normal', 'scheme-default', 'images-normal'] // Відповідні data-setting значення
		};

		localStorage.setItem('accessibilitySettings', JSON.stringify(defaultSettings));
		localStorage.setItem('imageSettings', 'images-normal');  // Збереження налаштувань зображень
	});
});

