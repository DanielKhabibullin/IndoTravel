import {reservationForm, URL} from './const.js';
import {loadStyle} from './loadStyle.js';
import {fetchRequest} from './sendForms.js';
import { formatDate, formatPeople } from './utils.js';

const reservationPrice = document.querySelector('.reservation__price');

export const modalShow = async (err, data) => {
	await loadStyle('css/modal.css');
	const overlay = document.createElement('div');
	const modal = document.createElement('div');
	const modalTitle = document.createElement('h2');
	const modalText1 = document.createElement('p');
	const modalText2 = document.createElement('p');
	const modalText3 = document.createElement('p');
	const modalButtons = document.createElement('div');
	const modalButtonConfirm = document.createElement('button');
	const modalButtonEdit = document.createElement('button');
	// const [dates, qty] = date.split(', ');

	overlay.append(modal);
	overlay.classList.add('overlay');
	modal.classList.add('modal');
	modalTitle.classList.add('modal__title');
	modalText1.classList.add('modal__text');
	modalText2.classList.add('modal__text');
	modalText3.classList.add('modal__text');
	modalButtons.classList.add('modal__button');
	modalButtonConfirm.classList.add('modal__btn', 'modal__btn_confirm');
	modalButtonEdit.classList.add('modal__btn', 'modal__btn_edit');
	modalText1.textContent =
		`Бронирование путешествия в Индонезию на ${
			formatPeople(data.people)}`;
	modalText2.textContent = `В даты: ${formatDate(data.dates)}`;
	modalText3.textContent = `Стоимость тура ${reservationPrice.textContent}`;
	modalButtonConfirm.textContent = 'Подтверждаю';
	modalButtonEdit.textContent = 'Изменить данные';

	modalButtons.append(modalButtonConfirm, modalButtonEdit);
	modal.append(modalTitle, modalText1, modalText2,
		modalText3, modalButtons);
	document.body.append(overlay);
	return new Promise(resolve => {
		modalButtonConfirm.addEventListener('click', () => {
			fetchRequest(URL, {
				method: 'POST',
				body: {
					dates: reservationForm.dates.value,
					people: reservationForm.people.value,
					name: reservationForm.reservation__name.value,
					phone: reservationForm.reservation__phone.value,
				},
				headers: {
					'Content-Type': 'application/json',
				},
				callback(err, data) {
					if (err) {
						console.warn(err, data);
					} else {
						overlay.remove();
						reservationForm.reset();
						document.body.style.overflow = 'auto';
						reservationForm.querySelectorAll('input').forEach(item => {
							item.disabled = true;
						});
						reservationForm.querySelectorAll('select').forEach(item => {
							item.setAttribute('disabled', 'disabled');
						});
					}
				},
			});
		});

		modalButtonEdit.addEventListener('click', () => {
			overlay.remove();
			document.body.style.overflow = 'auto';
			resolve();
		});
	});
};
