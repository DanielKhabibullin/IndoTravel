import {burgerButton, burgerMenu} from './const.js';

burgerButton.addEventListener('click', () => {
	burgerButton.classList.toggle('header__menu_active');
	burgerMenu.classList.toggle('header__menu_active');
});
