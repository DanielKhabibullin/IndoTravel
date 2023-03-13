import {timer} from './modules/timer.js';
import './modules/acc.js';
import './modules/burger.js';
import './modules/fly.js';
import './modules/sendForms.js';
import {getDates} from './modules/sendForms.js';


window.addEventListener('DOMContentLoaded', () => {
	const init = () => {
		timer();
		getDates();
	};
	init();
});
