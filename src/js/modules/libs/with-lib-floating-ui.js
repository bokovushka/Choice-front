import {
	computePosition,
	autoPlacement,
	offset,
	shift,
	autoUpdate
} from '@floating-ui/dom';

document.querySelectorAll('.i-info').forEach(info => {
	let tooltip;
	let cleanup;

	function buildTooltipContent(el) {
		const tplId = el.dataset.tooltipTemplate;
		if (!tplId) return '';

		const tpl = document.getElementById(tplId);
		return tpl ? tpl.innerHTML : '';
	}

	function showTooltip() {
		if (tooltip) return;

		tooltip = document.createElement('div');
		tooltip.className = 'tooltip';
		tooltip.innerHTML = buildTooltipContent(info);

		document.body.appendChild(tooltip);

		cleanup = autoUpdate(info, tooltip, () => {
			computePosition(info, tooltip, {
				middleware: [
					offset(10),
					autoPlacement({
						allowedPlacements: ['top', 'bottom'],
					}),
					shift({ padding: 8 })
				],
			}).then(({ x, y }) => {
				Object.assign(tooltip.style, {
					left: `${x}px`,
					top: `${y}px`,
				});
			});
		});
	}

	function hideTooltip() {
		if (!tooltip) return;

		cleanup?.();
		tooltip.remove();
		tooltip = null;
	}

	info.addEventListener('mouseenter', showTooltip);
	info.addEventListener('mouseleave', hideTooltip);
	info.addEventListener('focus', showTooltip);
	info.addEventListener('blur', hideTooltip);
});