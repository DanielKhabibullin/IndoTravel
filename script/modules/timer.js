import {heroText, heroTimer} from './const.js';
import {addZero} from './utils.js';

// возвращает число и слово
const declOfNum = (n, titles) => titles[n % 10 === 1 &&
	n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 ||
		n % 100 >= 20) ? 1 : 2];
	// выше второй вариант из https://codepen.io/Quper/pen/zYGxbJm

export const timer = () => {
	const timerElements = document.querySelectorAll('[data-timer-deadline]');
	timerElements.forEach((timerElement) => {
		const deadline = timerElement.getAttribute('data-timer-deadline');
		if (deadline) {
			timerElement.innerHTML = `
			<p class="timer__title">До конца акции осталось:</p>
			<p class="timer__item timer__item_days">
				<span class="timer__count timer__count_days">00</span>
				<span class="timer__units timer__units_days">день</span>
			</p>
			<p class="timer__item timer__item_hours">
				<span class="timer__count timer__count_hours">00</span>
				<span class="timer__units timer__units_hours">часов</span>
			</p>
			<p class="timer__item timer__item_minutes">
				<span class="timer__count timer__count_minutes">00</span>
				<span class="timer__units timer__units_minutes">минут</span>
			</p>
			<p class="timer__item timer__item_seconds">
				<span class="timer__count timer__count_seconds">00</span>
				<span class="timer__units timer__units_seconds">секунд</span>
			</p>
			`;

			const getTimeRemaining = () => {
				const dateNowLocal = new Date();
				const hoursNow = dateNowLocal.getHours();
				const hoursNowUTC = dateNowLocal.getUTCHours();
				const GMT3 = (hoursNow - (hoursNowUTC + 3)) * 60 * 60 * 1000;

				const dateStop = new Date(deadline).getTime() + GMT3;
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
				const countDays = timerElement.querySelector('.timer__count_days');
				const countHours = timerElement.querySelector('.timer__count_hours');
				const countMinutes = timerElement
					.querySelector('.timer__count_minutes');
				const countSeconds = timerElement
					.querySelector('.timer__count_seconds');
				const itemSeconds = timerElement.querySelector('.timer__item_seconds');
				const itemDays = timerElement.querySelector('.timer__item_days');

				countDays.innerHTML = timer.days;
				countHours.innerHTML = addZero(timer.hours);
				countMinutes.innerHTML = addZero(timer.minutes);
				countSeconds.innerHTML = addZero(timer.seconds);
				itemSeconds.style.display = 'none';

				const s = declOfNum(timer.seconds, ['секунда', 'секунды', 'секунд']);
				const m = declOfNum(timer.minutes, ['минута', 'минуты', 'минут']);
				const h = declOfNum(timer.hours, ['час', 'часа', 'часов']);
				const d = declOfNum(timer.days, ['день', 'дня', 'дней']);
				const unitsDays = timerElement.querySelector('.timer__units_days');
				const unitsHours = timerElement.querySelector('.timer__units_hours');
				const unitsMinutes = timerElement
					.querySelector('.timer__units_minutes');
				const unitsSeconds = timerElement
					.querySelector('.timer__units_seconds');

				unitsSeconds.textContent = `${s}`;
				unitsMinutes.textContent = `${m}`;
				unitsHours.textContent = `${h}`;
				unitsDays.textContent = `${d}`;

				let timerId = setTimeout(start, 60000);

				if (timer.timeRemaining < 1000 * 60 * 60 * 24) {
					clearTimeout(timerId);
					timerId = setTimeout(start, 1000);
					itemDays.style.display = 'none';
					itemSeconds.style.display = 'flex';
				}
				if (timer.timeRemaining <= 0) {
					clearTimeout(timerId);
					heroTimer.remove();
					heroText.remove();
				}
			};
			start();
		}
	});
};
