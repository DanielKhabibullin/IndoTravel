/* eslint-disable require-jsdoc */
import {burgerButton, burgerMenu, menuItems} from './const.js';

const openMenuOpacity = () => {
	const duration = 500;
	const startTime = Date.now();
	let opacity = 0;

	const animateMenu = () => {
		const now = Date.now();
		const progress = (now - startTime) / duration;
		opacity = progress;

		burgerMenu.style.opacity = opacity;

		if (opacity < 1) {
			requestAnimationFrame(animateMenu);
		} else {
			burgerMenu.style.opacity = 1;
		}
	};

	requestAnimationFrame(animateMenu);
};

const openMenuScale = () => {
	const duration = 500;
	const startTime = Date.now();
	let scale = 0;

	const animateMenu = () => {
		const now = Date.now();
		const progress = (now - startTime) / duration;
		scale = progress;

		burgerMenu.style.transform = `scale(${scale})`;

		if (scale < 1) {
			requestAnimationFrame(animateMenu);
		} else {
			burgerMenu.style.transform = '';
		}
	};

	requestAnimationFrame(animateMenu);
};

const openMenuTranslate = () => {
	const menuHeight = burgerMenu.clientHeight;
	let menuOffset = -menuHeight;
	const duration = 300;
	const startTime = Date.now();

	const animateMenu = () => {
		const now = Date.now();
		const progress = (now - startTime) / duration;
		menuOffset = -menuHeight + (menuHeight * progress);

		burgerMenu.style.transform = `translateY(${menuOffset}px)`;

		if (menuOffset < 0) {
			requestAnimationFrame(animateMenu);
		} else {
			burgerMenu.style.transform = '';
		}
	};

	requestAnimationFrame(animateMenu);
};

const openMenuScaleRotate = () => {
	const duration = 300;
	const startTime = Date.now();
	let scale = 0;
	let rotation = 0;

	const animateMenu = () => {
		const now = Date.now();
		const progress = (now - startTime) / duration;
		scale = progress;
		rotation = 270 * progress;

		burgerMenu.style.transform = `scale(${scale}) rotate(${rotation}deg)`;

		if (scale < 1) {
			requestAnimationFrame(animateMenu);
		} else {
			burgerMenu.style.transform = '';
		}
	};

	requestAnimationFrame(animateMenu);
};


burgerButton.addEventListener('click', () => {
	burgerMenu.classList.toggle('header__menu_active');
	if (burgerMenu.classList.contains('header__menu_active')) {
		openMenuTranslate();
	}
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
