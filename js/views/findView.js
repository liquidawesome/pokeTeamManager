export const toggleSearch = (id) => {
	const search = document.querySelector('.search');
	const overlay = document.querySelector('.team_overlay');
	const items = document.querySelectorAll('.team-item');
	if (search.style.display !== 'none') {
		search.style.display = 'none';
		overlay.style.display = 'none';
		items.forEach(el => {
			el.style.zIndex = 5;
		});
	} else {
		search.style.display = 'block';
		overlay.style.display = 'block';
		items.forEach(el => {
			if (el.id === id)
				el.style.zIndex = 25;
		});
	}
}