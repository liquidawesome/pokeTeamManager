import Find from './models/Find';
import * as findView from './views/findView';

const state = {};

/* POKEMON CONTROLLER */


/* FIND CONTROLLER */


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
	console.log(document.querySelector('.search_input').value);
});