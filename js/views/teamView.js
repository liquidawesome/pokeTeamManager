export const toggleSearch = (id) => {
	const search = document.querySelector('.search');
	const input = document.querySelector('.search .search_input');
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
		input.focus();
		items.forEach(el => {
			if (el.id === id)
				el.style.zIndex = 25;
		});
	}
};

export const spotUsed = (id, team) => {
	const find = team.findIndex(el => el.id == id);
	return (find >= 0) ? true : false;
};

export const toggleOptions = (id, team) => {
	const remove = document.querySelector('.search .search_remove');
	const rename = document.querySelector('.search .rename_form');
	if (spotUsed(id, team) && (remove.style.display === 'none' && remove.style.display === 'none')) {
		remove.style.display = 'block';
		rename.style.display = 'block';
	} else {
		remove.style.display = 'none';
		rename.style.display = 'none';
	}
};

export const getInput = () => document.querySelector('.search_input').value;

export const clearInput = () => document.querySelector('.search_input').value = '';

export const setImage = (id, team) => {
	const item = document.querySelector(`#t${id}.team-item`);
	let img;
	team.forEach(el => {
		if (el.id == id) {
			img = el.data.sprites.front_default;
		}
	});
	item.innerHTML = '&nbsp;';
	item.style.backgroundImage = `url('${img}')`;

};