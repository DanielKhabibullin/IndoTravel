import {footerForm, footerFormInput, footerFormTitle, footerText,
	reservationButton, reservationForm, reservationInputName,
	reservationInputPhone, URL} from './const.js';
import {modalShow} from './modal.js';
import {renderDates} from './render.js';

const httpRequest = (url, {
	method = 'GET',
	callback,
	body = {},
	headers,
}) => {
	try {
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		if (headers) {
			for (const [key, value] of Object.entries(headers)) {
				xhr.setRequestHeader(key, value);
			}
		}

		xhr.addEventListener('load', () => {
			if (xhr.status < 200 || xhr.status >= 300) {
				callback(new Error(xhr.status), xhr.response);
				return;
			}
			const data = JSON.parse(xhr.response);
			if (callback) callback(null, data);
		});

		xhr.addEventListener('error', () => {
			callback(new Error(xhr.status), xhr.response);
		});

		xhr.send(JSON.stringify(body));
	} catch (err) {
		callback(new Error(err));
	}
};

export const fetchRequest = async (url, {
	method = 'get',
	callback,
	body,
	headers,
}) => {
	try {
		const options = {
			method,
		};

		if (body) options.body = JSON.stringify(body);
		if (headers) options.headers = headers;

		const response = await fetch(url, options);
		if (response.ok) {
			const data = await response.json();
			if (callback) return callback(null, data);
			return;
		}
		throw new Error(`Ошибка: ${response.statusText}`);
	} catch (err) {
		return callback(err);
	}
};

export const getDates = async () => {
	const result = await fetchRequest('./date.json', {
		metod: 'get',
		callback: renderDates,
	});
	if (result) {
		reservationButton.disabled = true;
	}
};

reservationForm.addEventListener('submit', async (e) => {
	e.preventDefault();

	const formData = new FormData(reservationForm);
	const reservation = Object.fromEntries(formData);
	const wordsCount = reservationInputName.value.trim().split(/\s+/).length;

	// const phone = reservationInputPhone.inputmask.unmaskedvalue();
	// if (!phone || phone.length !== 10) {
	// 	alert('Пожалуйста, введите корректный номер телефона');
	// 	return;
	// }

	if (wordsCount >= 3) {
		modalShow(null, reservation);
	} else {
		alert('Поле ФИО должно содержать по меньшей мере 3 слова');
	}
});

footerForm.addEventListener('submit', e => {
	e.preventDefault();

	fetchRequest(URL, {
		method: 'POST',
		body: {
			email: footerForm.email.value,
		},
		callback(err, data) {
			if (err) {
				console.warn(err, data);
				footerFormTitle.style.color = `red`;
				footerFormTitle.textContent = `Что-то пошло не так`;
				footerText.textContent = 'Попробуйте еще раз';
				footerForm.reset();
			} else {
				footerFormTitle.textContent = `Ваша заявка успешно отправлена`;
				footerFormTitle.style.color = `#fff`;
				footerText.textContent =
				'Наши менеджеры свяжутся с Вами в течение 3-х рабочих дней';
				footerFormInput.remove();
			}
		},
		headers: {
			'Content-Type': 'application/json',
		},
	});
});

reservationInputName.addEventListener('input', () => {
	reservationInputName.value = reservationInputName.
		value.replace(/[^А-Яа-яЁё\s]/, '');
});

const telMask = new Inputmask('+7 (999) 999-99-99');
telMask.mask(reservationInputPhone);

reservationInputPhone.addEventListener('input', () => {
	reservationInputPhone.value = reservationInputPhone.
		value.replace(/[^0-9+]/, '');
});

const justValidate = new JustValidate('.reservation__form');
justValidate
	.addField('.reservation__input_name', [
		{
			rule: 'required',
			errorMessage: 'Введите ваше ФИО',
		},
	])
	.addField('.reservation__input_phone', [
		{
			rule: 'required',
			errorMessage: 'Введите ваш телефон',
		},
		{
			validator(value) {
				const phone = reservationInputPhone.inputmask.unmaskedvalue();
				console.log('phone: ', phone);
				return !!(Number(phone) && phone.length === 10);
			},
			errorMessage: 'Телефон некорректный',
		},
	]);
