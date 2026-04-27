import AirDatepicker from 'air-datepicker';
import { createPopper } from '@popperjs/core';

const datepicker = new AirDatepicker('#test-drive-date', {
	locale: {
		days: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П’ятниця', 'Субота'],
		daysShort: ['Нед', 'Пнд', 'Вів', 'Срд', 'Чтв', 'Птн', 'Сбт'],
		daysMin: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		months: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
		monthsShort: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'],
		today: 'Сьогодні',
		clear: 'Очистити',
		dateFormat: 'dd.MM.yyyy',
		firstDay: 1
	},

	navTitles: {
		days: '<span class="datepicker-days-month">MMMM</span><span class="datepicker-year-choose">yyyy</span>',
		months: '<span class="datepicker-year-choose">yyyy</span>',
		years: '<span class="datepicker-year-choose">Оберіть рік</span>'
	},

	minDate: new Date(),

	isMobile: true,
	autoClose: false,

	// кнопки внизу календаря
	buttons: [
		{
			content: 'Скинути',
			className: 'datepicker-btn-clear',
			onClick: (dp) => {
				dp.clear();
			}
		},
		{
			content: 'Готово',
			className: 'datepicker-btn-done',
			onClick: (dp) => {
				dp.hide();
			}
		}
	]
});


new AirDatepicker("#graduation-year-first", {
	container: '.datepicker',
	view: 'years',
	minView: 'years',
	dateFormat: 'yyyy',
	minDate: '1970',
	maxDate: [new Date()],
	position({ $datepicker, $target, $pointer, done }) {
		let popper = createPopper($target, $datepicker, {
			placement: 'top',
			modifiers: [
				{
					name: 'flip',
					options: {
						padding: {
							top: 64
						}
					}
				},
				{
					name: 'offset',
					options: {
						offset: [0, 20]
					}
				},
				{
					name: 'arrow',
					options: {
						element: $pointer
					}
				}
			]
		})

		/*
	  Возвращаем функцию, которая вызывается при срабатывании `hide()`,
	  она обязательно должна вызвать функцию `done()`
			для завершения процесса скрытия календаря 
	 */
		return function completeHide() {
			popper.destroy();
			done();
		}
	}
});

new AirDatepicker("#graduation-year-last", {
	container: '.datepicker',
	view: 'years',
	minView: 'years',
	dateFormat: 'yyyy',
	minDate: '1970',
	maxDate: [new Date()],
	position({ $datepicker, $target, $pointer, done }) {
		let popper = createPopper($target, $datepicker, {
			placement: 'top',
			modifiers: [
				{
					name: 'flip',
					options: {
						padding: {
							top: 64
						}
					}
				},
				{
					name: 'offset',
					options: {
						offset: [0, 20]
					}
				},
				{
					name: 'arrow',
					options: {
						element: $pointer
					}
				}
			]
		})

		/*
	  Возвращаем функцию, которая вызывается при срабатывании `hide()`,
	  она обязательно должна вызвать функцию `done()`
			для завершения процесса скрытия календаря 
	 */
		return function completeHide() {
			popper.destroy();
			done();
		}
	}
});



const input = document.querySelector('#test-drive-time');
const modal = document.querySelector('#popup-test-drive-time');

const hoursEl = modal.querySelector('#hours');
const minutesEl = modal.querySelector('#minutes');
const doneBtn = modal.querySelector('.time-popup__done');

let hours = 10;
let minutes = 0;
let mode = 'hours';
const STEP = 5;

function render() {
	hoursEl.textContent = String(hours).padStart(2, '0');
	minutesEl.textContent = String(minutes).padStart(2, '0');
}

function setMode(newMode) {
	mode = newMode;
	hoursEl.classList.toggle('active', mode === 'hours');
	minutesEl.classList.toggle('active', mode === 'minutes');
}

$('#popup-test-drive-time').on('show.bs.modal', () => {
	if (input.value) {
		const [h, m] = input.value.split(':');
		hours = +h;
		minutes = +m;
	}
	render();
	setMode('hours');
});

// вибір режиму
hoursEl.addEventListener('click', () => setMode('hours'));
minutesEl.addEventListener('click', () => setMode('minutes'));

// стрілки
modal.querySelectorAll('[data-dir]').forEach(btn => {
	btn.addEventListener('click', () => {
		const dir = btn.dataset.dir === 'up' ? 1 : -1;

		if (mode === 'hours') {
			hours = (hours + dir + 24) % 24;
		} else {
			minutes += dir * STEP;
			if (minutes >= 60) minutes = 0;
			if (minutes < 0) minutes = 60 - STEP;
		}
		render();
	});
});

doneBtn.addEventListener('click', () => {
	input.value = `${hoursEl.textContent}:${minutesEl.textContent}`;
});
