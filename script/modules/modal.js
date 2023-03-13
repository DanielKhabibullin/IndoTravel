import {dateSelects, peopleSelects, reservationForm, reservationInputName,
	reservationInputPhone} from './const.js';
import {loadStyle} from './loadStyle.js';

export const modalShow = async (err, {date, price}) => {
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
	const [dates, qty] = date.split(', ');

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
		`Бронирование путешествия в Индонезию на ${qty}`;
	modalText2.textContent = `В даты: ${dates}`;
	modalText3.textContent = `Стоимость тура ${price}`;
	modalButtonConfirm.textContent = 'Подтверждаю';
	modalButtonEdit.textContent = 'Изменить данные';

	modalButtons.append(modalButtonConfirm, modalButtonEdit);
	modal.append(modalTitle, modalText1, modalText2,
		modalText3, modalButtons);
	document.body.append(overlay);
	return new Promise(resolve => {
		modalButtonConfirm.addEventListener('click', () => {
			overlay.remove();
			document.body.style.overflow = 'auto';
			resolve(true);
			reservationForm.reset();
			reservationInputName.disabled = true;
			reservationInputPhone.disabled = true;
			dateSelects[1].disabled = true;
			peopleSelects[1].disabled = true;
		});

		modalButtonEdit.addEventListener('click', () => {
			overlay.remove();
			document.body.style.overflow = 'auto';
			resolve(false);
		});
	});
};
