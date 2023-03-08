import {countDays, countHours, countMinutes,
	heroText, heroTimer, unitsDays, unitsHours, unitsMinutes} from './const.js';
import {addZero} from './utils.js';

// возвращает число и слово
const declOfNum = (n, titles) => titles[n % 10 === 1 &&
	n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 ||
		n % 100 >= 20) ? 1 : 2];
	// выше второй вариант из https://codepen.io/Quper/pen/zYGxbJm

export const timer = () => {
	const getTimeRemaining = () => {
		const deadline = heroTimer.getAttribute('data-timer-deadline');
		const dateStop = new Date(deadline).getTime();
		const dateNow = Date.now();
		const timeRemaining = dateStop - dateNow;

		const seconds = Math.floor(timeRemaining / 1000 % 60);
		const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
		const hours = Math.floor(timeRemaining / 1000 / 3600 % 24);
		const days = Math.floor(timeRemaining / 1000 / 3600 / 24);

		return {timeRemaining, seconds, minutes, hours, days};
	};

	const start = () => {
		const timer = getTimeRemaining();
		// timer.timeRemaining = 0;
		countDays.textContent = timer.days;
		countHours.textContent = addZero(timer.hours);
		countMinutes.textContent = addZero(timer.minutes);
		// countSeconds.textContent = addZero(timer.seconds);

		// const s = declOfNum(timer.seconds, ['секунда', 'секунды', 'секунд']);
		const m = declOfNum(timer.minutes, ['минута', 'минуты', 'минут']);
		const h = declOfNum(timer.hours, ['час', 'часа', 'часов']);
		const d = declOfNum(timer.days, ['день', 'дня', 'дней']);

		// unitsSeconds.textContent = `${s}`;
		unitsMinutes.textContent = ` ${m}`;
		unitsHours.textContent = ` ${h}`;
		unitsDays.textContent = ` ${d}`;

		// if (timer.timeRemaining > 0) {
		// setTimeout(start, 60000);
		// } else {
		// heroTimer.remove();
		// heroText.remove();
		// }

		const intervalId = setTimeout(start, 60000);
		if (timer.timeRemaining <= 0) {
			clearTimeout(intervalId);
			heroTimer.remove();
			heroText.remove();
		}
	};
	start();
};

