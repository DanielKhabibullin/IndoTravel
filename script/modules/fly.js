if (window.innerWidth >= 758) {
	const fly = document.createElement('div');
	const docEl = document.documentElement;

	fly.style.cssText = `
	position: fixed;
	z-index: 5;
	width: 50px;
	height: 50px;
	right: 0;
	bottom: 0;
	pointer-events: none;
	background: url('../img/airplane.svg') center/contain no-repeat;
	`;
	document.body.append(fly);

	const calcPositionFly = () => {
		const maxTop = docEl.clientHeight - fly.clientHeight;
		const maxScroll = docEl.scrollHeight - docEl.clientHeight;
		const percentScroll = (window.pageYOffset * 100) / maxScroll;

		const top = maxTop * (percentScroll / 100);
		fly.style.transform = `translateY(${-top}px)`;
	};

	window.addEventListener('scroll', () => {
		requestAnimationFrame(calcPositionFly);
	});

	calcPositionFly();
}
