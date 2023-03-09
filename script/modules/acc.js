import {accButtons, accItems, accTextWrapper} from './const.js';

let heightWrapper = 0;

accTextWrapper.forEach(elem => {
	if (heightWrapper < elem.scrollHeight) {
		heightWrapper = elem.scrollHeight;
	}
});

accButtons.forEach((btn, index) => {
	btn.addEventListener('click', () => {
		for (let i = 0; i < accItems.length; i += 1) {
			if (index === i) {
				accTextWrapper[i].style.height =
					accItems[i].classList.contains('travel__item_active') ? '' :
					`${heightWrapper}px`;
				accItems[i].classList.toggle('travel__item_active');
			} else {
				accTextWrapper[i].style.height = '';
				accItems[i].classList.remove('travel__item_active');
			}
		}
	});
});
