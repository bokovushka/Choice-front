import { gsap } from "gsap";

/*----  Functions  ----*/
// ** Hover Image Effect ** \\
function pbmit_hover_img() {
	const pbmitHoverImg = gsap.utils.toArray(".pbmit-element-service-style-2 article,.subject-leasing .subject-leasing-list--item");
	pbmitHoverImg.forEach((target) => {
		const pbmitImg = target.querySelector('.pbmit-hover-img,.subject-leasing-list--transport');
		const t1 = gsap.timeline();
		t1.to(pbmitImg, {
			opacity: 1,
			duration: 0.4,
			scale: 1,
			ease: "Power2.easeOut"
		})
		target.pbmitHoverAnim = t1.play().reversed(true);
		target.addEventListener("mouseenter", pbmithoverimg);
		target.addEventListener("mouseleave", pbmithoverimg);
		target.addEventListener("mousemove", (e) => {
			let xpos = e.offsetX;
			let ypos = e.offsetY;
			const t1 = gsap.timeline();
			t1.to(pbmitImg, { x: xpos, y: ypos });
		});
	});

	function pbmithoverimg() {
		this.pbmitHoverAnim.reversed(!this.pbmitHoverAnim.reversed());
	}
}

// on load
$(window).on('load', function () {

	pbmit_hover_img();
});

