import Team from './models/Team';
import * as teamView from './views/teamView';

/**
 * Global State
 * - Current Team object
 * - Selected Pokemon
 */
const state = {
	team: [],
	current: 0
};

/* TEAM CONTROLLER */
const teamControl = async () => {
	const query = teamView.getInput();

	if (query) {
		const teamObject = new Team(query, state.current);
		const item = await teamObject.getPokemon();

		// Find if there is a team element that already has the current ID
		const teamIndex = teamObject.pokemon.findIndex(el => el.id == state.current);
		if (teamIndex >= 0) {
			teamObject.pokemon.splice(teamIndex);
		}

		state.team.push(item);
		teamView.setImage(state.current, state.team);
	}
};

/* DETAIL CONTROLLER */


/* EVENT HANDLERS */
document.querySelector('.team').addEventListener('click', e => {
	if (e.target.matches('.team-item')) {
		teamView.toggleSearch(e.target.id);
	}
	state.current = e.target.id.substring(1);
});

document.querySelector('.search_form').addEventListener('submit', e => {
	e.preventDefault();
	teamControl();
	teamView.clearInput();
});

window.state = state;