import RangeSlider from "../../../../node_modules/svelte-range-slider-pips/dist/svelte-range-slider-pips.mjs";

document.addEventListener("DOMContentLoaded", () => {
	if (!window.location.pathname.includes("checkout")) return;

	function initPriceSlider({
		sliderId,
		outputSelector,
		min = 0,
		max = 10000,
		start = 5000,
		suffix = " грн",
		format = (v) => v
	}) {
		const sliderEl = document.getElementById(sliderId);
		const output = document.querySelector(outputSelector);

		if (!sliderEl || !output) return;

		const slider = new RangeSlider({
			target: sliderEl,
			props: {
				min,
				max,
				value: start,
				step: 1,

				range: "min",
				float: true,
			}
		});

		function update(value) {
			output.innerHTML = `
				<span class="slider-value__number">${format(value)}</span>
			`;
		}

		// стартове значення
		update(start);

		// slider → custom output
		slider.$on("change", (e) => {
			update(e.detail.value);
		});
	}

	// === INIT ===
	initPriceSlider({
		sliderId: "price-slider-full",
		outputSelector: ".slider-value",
		min: 0,
		max: 682,
		start: 206
	});
});