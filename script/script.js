import {timer} from './modules/timer.js';
import './modules/acc.js';
import './modules/burger.js';
import './modules/fly.js';

const loadDates = async (cb) => {
	const result = await fetch('date.json');

	const data = await result.json();
	cb(data);
};

const renderDates = (data => {
	const dateSelects = document.querySelectorAll('[name="dates"]');
	const peopleSelects = document.querySelectorAll('[name="people"]');
	dateSelects[0].innerHTML = `
	<option value="" class="tour__option">Выбери дату</option>
	`;
	dateSelects[1].innerHTML = `
	<option value="" class="tour__option">Дата путешествия</option>
	`;

	peopleSelects.forEach(peopleSelect => {
		peopleSelect.innerHTML = `
		<option value="" class="tour__option">Количество человек</option>
		`;
	});

	data.map(item => {
		const dateOption = document.createElement('option');
		dateOption.value = item.date;
		dateOption.textContent = item.date;
		dateOption.classList.add('tour__option');

		dateSelects.forEach(dateSelect => {
			dateSelect.appendChild(dateOption.cloneNode(true));
		});

		dateSelects.forEach(dateSelect => {
			dateSelect.addEventListener('change', function() {
				const selectedDate = this.value;
				const selectedDateItem = data.find(item => item.date === selectedDate);
				const minPeople = selectedDateItem['min-people'];
				const maxPeople = selectedDateItem['max-people'];
				peopleSelects.forEach(peopleSelect => {
					peopleSelect.innerHTML = `
					<option value="" class="tour__option">Количество человек</option>
					`;
					for (let i = minPeople; i <= maxPeople; i++) {
						const peopleOption = document.createElement('option');
						peopleOption.value = i;
						peopleOption.textContent = i;
						peopleOption.classList.add('tour__option');
						peopleSelect.appendChild(peopleOption);
					}
					peopleSelect.addEventListener('change', function() {
						const selectedPeople = this.value;
						const reservationData = document.
							querySelector('.reservation__data');
						const [startDate, endDate] = selectedDate.split(' - ');
						const startParts = startDate.split('.');
						const endParts = endDate.split('.');
						const options = {day: 'numeric', month: 'long'};
						const startYear = new Date().getFullYear();
						const startDateObj = new Date(startYear,
							startParts[1] - 1, startParts[0]);
						const endDateObj = new Date(startYear,
							endParts[1] - 1, endParts[0]);
						const startFormatted = startDateObj.
							toLocaleDateString('ru-RU', options);
						const endFormatted = endDateObj.
							toLocaleDateString('ru-RU', options);
						if (selectedPeople === '2' || selectedPeople === '3' ||
							selectedPeople === '4') {
							reservationData.textContent =
							`${startFormatted} - ${endFormatted}, ${selectedPeople} человека`;
						} else {
							reservationData.textContent =
							`${startFormatted} - ${endFormatted}, ${selectedPeople} человек`;
						}
						let selectedPrice;
						data.forEach(item => {
							if (item.date === selectedDate) {
								selectedPrice = item.price;
							}
						});
						const reservationPrice = document.
							querySelector('.reservation__price');
						const totalPrice = selectedPeople * selectedPrice;
						reservationPrice.textContent = `${totalPrice}₽`;
					});
				});
			});
		});
	});
});

loadDates(renderDates);

window.addEventListener('DOMContentLoaded', () => {
	const init = () => {
		timer();
	};
	init();
});
