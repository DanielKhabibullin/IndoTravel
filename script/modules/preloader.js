let startTime = NaN;
const durationFly = 1000;
const durationOpacity = 300;

let left = 0;

const overlayFly = document.createElement('div');

overlayFly.style.cssText = `
	position: fixed;
	z-index = 999;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #000;
	opacity: 1;
`;

const fly = document.createElement('div');
fly.style.cssText = `
position: fixed;
width: 50px;
height: 50px;
left: ${left};
top: calc(50% - 25px);
pointer-events: none;
background: url('../img/airplane90deg.svg') center/contain no-repeat;
`;

overlayFly.append(fly);
document.body.append(overlayFly);

const hideOverlay = (timestamp) => {
	startTime ||= timestamp;
	const progress = (timestamp - startTime) / durationOpacity;

	overlayFly.style.opacity = 1 - progress;

	if (progress < 1) {
		requestAnimationFrame(hideOverlay);
	} else {
		overlayFly.remove();
	}
};

const stepFly = (timestamp) => {
	startTime ||= timestamp;
	const progress = (timestamp - startTime) / durationFly;
	left = document.documentElement.scrollWidth * progress;
	fly.style.transform = `translateX(${left}px)`;
	if (progress < 1) {
		requestAnimationFrame(stepFly);
	} else {
		startTime = NaN;
		requestAnimationFrame(hideOverlay);
	}
};
requestAnimationFrame(stepFly);
