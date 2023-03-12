import {footerForm, footerFormInput, footerFormTitle, footerText,
	reservationData, reservationForm, reservationPrice, URL} from './const.js';

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

// export const fetchRequest = async (url, {
// 	method = 'get',
// 	callback,
// 	body = {},
// 	headers,
// }) => {
// 	try {
// 		const options = {
// 			method,
// 		};

// 		if (body) options.body = JSON.stringify(body);
// 		if (headers) options.headers = headers;

// 		const response = await fetch(url, options);
// 		if (response.ok) {
// 			const data = await response.json();
// 			if (callback) callback(null, data);
// 			return;
// 		}
// 		throw new Error(`Ошибка: ${response.statusText}`);
// 	} catch (err) {
// 		callback(err);
// 	}
// };

// fetchRequest(URL, {
// 	metod: 'get',
// 	callback: renderDates,
// });

reservationForm.addEventListener('submit', e => {
	e.preventDefault();

	httpRequest(URL, {
		method: 'POST',
		body: {
			date: reservationForm.dates.value,
			qty: reservationForm.people.value,
			name: reservationForm.reservation__name.value,
			phone: reservationForm.reservation__phone.value,
		},
		callback(err, data) {
			if (err) {
				console.warn(err, data);
				reservationData.textContent = `Что-то пошло не так`;
				reservationData.style.color = `red`;
				reservationPrice.textContent = '';
			} else {
				reservationData.textContent =
				`Заявка отправлена, номер заявки ${data.id}`;
				reservationPrice.textContent = '';
			}
		},
		headers: {
			'Content-Type': 'application/json',
		},
	});
});

footerForm.addEventListener('submit', e => {
	e.preventDefault();

	httpRequest(URL, {
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
