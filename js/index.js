import Find from './models/Find';
import * as findView from './views/findView';

/**
 * Global State
 * - Current Team object
 * - Selected Pokemon
 */
const state = {
	team: [],
	current: 0
};

/* POKEMON CONTROLLER */


/* FIND CONTROLLER */
const findControl = async () => {
	const query = findView.getInput();

	if (query) {
		state.find = new Find(query, state.current);
		await state.find.getPokemon();

		// Find if there is a team element that already has the current ID
		const teamIndex = state.team.findIndex(el => el.id == state.current);
		if (teamIndex >= 0) {
			state.team.splice(teamIndex);
		}
		state.team.push({ id: state.current, data: state.find.pokemon });
		findView.setImage(state.current, state.team);
	}
};

/* DETAIL CONTROLLER */


/* EVENT HANDLERS */
document.querySelector('.team').addEventListener('click', e => {
	if (e.target.matches('.team-item')) {
		findView.toggleSearch(e.target.id);
	}
	state.current = e.target.id.substring(1);
});

document.querySelector('.search_form').addEventListener('submit', e => {
	e.preventDefault();
	findControl();
	findView.clearInput();
});

window.state = state;