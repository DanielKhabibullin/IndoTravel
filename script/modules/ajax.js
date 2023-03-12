// import {renderDates} from './api.js';
import {reservationData, reservationForm,
	reservationPrice, URL} from './const.js';

export const httpRequest = (url, {
	method = 'get',
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
	body = {},
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
			if (callback) callback(null, data);
			return;
		}
		throw new Error(`Ошибка: ${response.statusText}`);
	} catch (err) {
		callback(err);
	}
};

// fetchRequest(URL, {
// 	metod: 'get',
// 	callback: renderDates,
// });

reservationForm.addEventListener('submit', e => {
	e.preventDefault();

	fetchRequest('https://jsonplaceholder.typicode.com/posts', {
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
				reservationPrice.textContent = '';
			}
			reservationData.textContent = `Поздравляем с бронированием тура. Менеджер Вам перезвонит в ближайшее время. Номер заявки ${data.id}.`;
			reservationPrice.textContent = '';
		},
		headers: {
			'Content-Type': 'application/json',
		},
	});
});
