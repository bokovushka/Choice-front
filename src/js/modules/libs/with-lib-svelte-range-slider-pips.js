import RangeSlider from "../../../../node_modules/svelte-range-slider-pips/dist/svelte-range-slider-pips.mjs";

document.addEventListener("DOMContentLoaded", () => {
	if (!window.location.pathname.includes("catalog")) return;

	function initPriceSlider({
		sliderId,
		inputMin,
		inputMax,
		min = 0,
		max = 10000
	}) {
		const sliderEl = document.getElementById(sliderId);
		const inputFrom = document.querySelector(inputMin);
		const inputTo = document.querySelector(inputMax);

		if (!sliderEl || !inputFrom || !inputTo) return;

		const slider = new RangeSlider({
			target: sliderEl,
			props: {
				min,
				max,
				values: [min, max],
				step: 1,
				range: true,
				float: true,
				suffix: " грн",
			}
		});

		// slider → inputs
		slider.$on("change", (e) => {
			inputFrom.value = e.detail.values[0];
			inputTo.value = e.detail.values[1];
		});

		// inputs → slider
		function updateFromInputs() {
			let from = Number(inputFrom.value);
			let to = Number(inputTo.value);

			// захист від кривих значень
			if (from < min) from = min;
			if (to > max) to = max;
			if (from > to) from = to;

			slider.$set({ values: [from, to] });
		}

		inputFrom.addEventListener("change", updateFromInputs);
		inputTo.addEventListener("change", updateFromInputs);
	}

	// === INIT ===

	initPriceSlider({
		sliderId: "price-slider-full",
		inputMin: ".currency-first-full",
		inputMax: ".currency-last-full"
	});

	initPriceSlider({
		sliderId: "price-slider-full--popup",
		inputMin: ".currency-first-full--popup",
		inputMax: ".currency-last-full--popup"
	});
});