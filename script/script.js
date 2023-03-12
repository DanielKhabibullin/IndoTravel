import {timer} from './modules/timer.js';
import './modules/acc.js';
import './modules/burger.js';
import './modules/fly.js';
import './modules/sendForms.js';
import {loadDates, renderDates} from './modules/render.js';

window.addEventListener('DOMContentLoaded', () => {
	const init = () => {
		timer();
		loadDates(renderDates);
	};
	init();
});
