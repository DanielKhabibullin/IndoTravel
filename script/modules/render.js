import {dateSelects, peopleSelects, reservationButton, reservationData,
	reservationPrice} from './const.js';
import {formatDate, formatPeople} from './utils.js';


export const renderDates = (err, data) => {
	const allOptionsSelected = () => {
		for (const dateSelect of dateSelects) {
			if (!dateSelect.selectedOptions[0]) {
				return false;
			}
		}
		for (const peopleSelect of peopleSelects) {
			if (!peopleSelect.selectedOptions[0]) {
				return false;
			}
		}
		return true;
	};
	const updateReservationButton = () => {
		if (allOptionsSelected()) {
			reservationButton.disabled = false;
		} else {
			reservationButton.disabled = true;
		}
	};

	if (err) {
		console.warn(err, data);
		reservationData.textContent = `Что-то пошло не так`;
		reservationPrice.textContent = '';
		return;
	}
	dateSelects[0].innerHTML = `
	<option value="" class="tour__option">Выбери дату</option>
	`;
	dateSelects[1].innerHTML = `
	<option value="" class="tour__option">Дата путешествия</option>
	`;
	dateSelects[0].options[0].disabled = true;
	dateSelects[1].options[0].disabled = true;

	peopleSelects.forEach(peopleSelect => {
		peopleSelect.innerHTML = `
		<option value="" class="tour__option">Количество человек</option>
		`;
	});
	if (data && data.length > 0) {
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
					reservationButton.disabled = true;
					const selectedDate = this.value;
					const selectedDateItem = data.find(item => item.date ===
						selectedDate);
					const minPeople = selectedDateItem['min-people'];
					const maxPeople = selectedDateItem['max-people'];
					peopleSelects.forEach(peopleSelect => {
						peopleSelect.innerHTML = `
						<option value="" class="tour__option">Количество человек</option>
						`;
						peopleSelects[0].options[0].disabled = true;
						peopleSelects[1].options[0].disabled = true;
						for (let i = minPeople; i <= maxPeople; i++) {
							const peopleOption = document.createElement('option');
							peopleOption.value = i;
							peopleOption.textContent = i;
							peopleOption.classList.add('tour__option');
							peopleSelect.appendChild(peopleOption);
						}
						peopleSelect.addEventListener('change', function() {
							updateReservationButton();
							const selectedPeople = this.value;
							const formatedDate = formatDate(selectedDate);
							reservationData.textContent =
							`${formatedDate}, ${
								formatPeople(selectedPeople)}`;

							let selectedPrice;
							data.forEach(item => {
								if (item.date === selectedDate) {
									selectedPrice = item.price;
								}
							});
							let totalPrice = 0;
							totalPrice = selectedPeople * selectedPrice;
							reservationPrice.textContent = `${totalPrice}₽`;
						});
					});
				});
			});
		});
	}
	return true;
};

