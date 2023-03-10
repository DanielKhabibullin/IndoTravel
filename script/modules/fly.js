import {debounce} from './debounce.js';

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
	transform: translateY(0);
	transition: transform 0.5s ease-out;
	`;
	document.body.append(fly);

	let lastScrollPos = window.pageYOffset;

	const calcPositionFly = () => {
		const maxTop = docEl.clientHeight - fly.clientHeight;
		const maxScroll = docEl.scrollHeight - docEl.clientHeight;
		const percentScroll = (window.pageYOffset * 100) / maxScroll;
		const top = maxTop * (percentScroll / 100);
		fly.style.transform = `translateY(${-top}px)`;

		fly.style.transform = `translateY(${-top}px)${window.pageYOffset <
			lastScrollPos ? ' rotate(180deg)' : ''}`;
		lastScrollPos = window.pageYOffset;
	};

	const handleScroll = () => {
		debounce(calcPositionFly)();
	};
	window.addEventListener('scroll', handleScroll);

	calcPositionFly();
}
