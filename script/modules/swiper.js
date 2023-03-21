new Swiper('.swiper', {
	loop: true,
	// autoplay: {
	// 	delay: 3000,
	// },

	pagination: {
		el: '.swiper-pagination',
	},

	navigation: {
		nextEl: '.album__right',
		prevEl: '.album__left',
	},
	mousewheel: true,
	keyboard: true,
});
