import {timer} from './modules/timer.js';
import './modules/acc.js';
import './modules/burger.js';
import './modules/fly.js';
import './modules/ajax.js';
import {loadDates, renderDates} from './modules/api.js';

window.addEventListener('DOMContentLoaded', () => {
	const init = () => {
		timer();
		loadDates(renderDates);
	};
	init();
});
