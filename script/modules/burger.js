import {burgerButton, burgerMenu, menuItems} from './const.js';

burgerButton.addEventListener('click', () => {
	burgerMenu.classList.toggle('header__menu_active');
});

document.addEventListener('click', e => {
	const target = e.target;
	const isClickInsideNav = burgerMenu.contains(target);
	const isClickOnBurgerButton = target === burgerButton;
	if (!isClickInsideNav && !isClickOnBurgerButton) {
		burgerMenu.classList.remove('header__menu_active');
	}
});

menuItems.forEach(item => {
	item.addEventListener('click', () => {
		burgerMenu.classList.remove('header__menu_active');
	});
});
