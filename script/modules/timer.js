import {countDays, countHours, countMinutes,
	countSeconds, heroText, heroTimer, itemDays,
	itemSeconds, unitsDays, unitsHours,
	unitsMinutes, unitsSeconds} from './const.js';
import {addZero} from './utils.js';

// возвращает число и слово
const declOfNum = (n, titles) => titles[n % 10 === 1 &&
	n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 ||
		n % 100 >= 20) ? 1 : 2];
	// выше второй вариант из https://codepen.io/Quper/pen/zYGxbJm

export const timer = () => {
	const getTimeRemaining = () => {
		const deadline = heroTimer.getAttribute('data-timer-deadline');
		// const dateStopLocal = new Date(deadline).getTime();
		const gmt3 = (new Date().getTimezoneOffset() + 180) * 60 * 1000;
		const dateStop = new Date(deadline).getTime() + gmt3;

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

		countDays.textContent = timer.days;
		countHours.textContent = addZero(timer.hours);
		countMinutes.textContent = addZero(timer.minutes);
		countSeconds.textContent = addZero(timer.seconds);
		itemSeconds.style.display = 'none';

		const s = declOfNum(timer.seconds, ['секунда', 'секунды', 'секунд']);
		const m = declOfNum(timer.minutes, ['минута', 'минуты', 'минут']);
		const h = declOfNum(timer.hours, ['час', 'часа', 'часов']);
		const d = declOfNum(timer.days, ['день', 'дня', 'дней']);

		unitsSeconds.textContent = `${s}`;
		unitsMinutes.textContent = `${m}`;
		unitsHours.textContent = `${h}`;
		unitsDays.textContent = `${d}`;

		// if (timer.timeRemaining > 0) {
		// setTimeout(start, 60000);
		// } else {
		// heroTimer.remove();
		// heroText.remove();
		// }

		const timerId = setTimeout(start, 60000);

		if (timer.timeRemaining < 1000 * 60 * 60 * 24) {
			clearTimeout(timerId);
			setTimeout(start, 1000);
			itemDays.style.display = 'none';
			itemSeconds.style.display = 'flex';
		}
		if (timer.timeRemaining <= 0) {
			clearTimeout();
			heroTimer.remove();
			heroText.remove();
		}
	};
	start();
};

