import Find from './models/Find';
import * as findView from './views/findView';

/* POKEMON CONTROLLER */


/* FIND CONTROLLER */
const findControl = async () => {
	const query = findView.getInput();

	if (query) {
		const search = new Find(query);
	}
};

/* DETAIL CONTROLLER */


/* EVENT HANDLERS */
document.querySelector('.team').addEventListener('click', e => {
	if (e.target.matches('.team-item')) {
		if (e.target.textContent === '?') {
			findView.toggleSearch(e.target.id);
		}
	}
});

document.querySelector('.search_form').addEventListener('submit', e => {
	e.preventDefault();
	findControl();
});