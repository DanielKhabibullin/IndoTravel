export const addZero = n => (n < 10 ? '0' + n : n);

export const formatPeople = num => {
	let word = '';
	if (num >= 2 && num <= 4) {
		word = 'человека';
	} else {
		word = 'человек';
	}
	return `${num} ${word}`;
};

export const formatPeople1 = num => {
	let word = '';
	if (num >= 1 && num <= 4) {
		word = 'человека';
	} else {
		word = 'человек';
	}
	return `${num} ${word}`;
};

export const formatDate = (date) => {
	const [startDate, endDate] = date.split(' - ');
	const startParts = startDate.split('.');
	const endParts = endDate.split('.');
	const options = {day: 'numeric', month: 'long'};
	const startYear = new Date().getFullYear();
	const startDateObj = new Date(startYear, startParts[1] - 1, startParts[0]);
	const endDateObj = new Date(startYear, endParts[1] - 1, endParts[0]);
	const startFormatted = startDateObj.toLocaleDateString('ru-RU', options);
	const endFormatted = endDateObj.toLocaleDateString('ru-RU', options);
	const formatedDate = `${startFormatted} - ${endFormatted}`;
	return formatedDate;
};
