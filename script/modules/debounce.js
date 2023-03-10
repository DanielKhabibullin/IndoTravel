const debounce = (fn, raf = NaN) => (...args) => {
	if (raf) return;
	raf = requestAnimationFrame(() => {
		fn(...args);
		raf = NaN;
	});
};

const debounceTimer = (fn, msec) => {
	let lastCall = 0;
	let lastCallTimer = NaN;

	return (...args) => {
		const previousCall = lastCall;
		lastCall = Date.now();

		if (previousCall && ((lastCall - previousCall) <= msec)) {
			clearTimeout(lastCallTimer);
		}
		lastCallTimer = setTimeout(() => fn(...args), msec);
	};
};
