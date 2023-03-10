import {timer} from './modules/timer.js';
import './modules/acc.js';
import './modules/burger.js';
import './modules/fly.js';

window.addEventListener('DOMContentLoaded', () => {
	const init = () => {
		timer();
	};
	init();
});
