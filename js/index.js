import Team from './models/Team';
import Details from './models/Details';
import * as teamView from './views/teamView';
import * as detailsView from './views/detailsView';

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
		if (item) {
			state.team.push(item);
			teamView.setImage(state.current, state.team);
		}
	}
};

/* DETAIL CONTROLLER */
const detailControl = async () => {
	const pokeID = state.team.find(el => el.id === state.current).data.id;
	state.details = new Details(pokeID);
	await state.details.getDetails();
	detailsView.clearDetails();
	detailsView.renderDetails(state.details.data);
};

/* EVENT HANDLERS */
document.querySelector('.team').addEventListener('click', e => {
	state.current = e.target.id.substring(1);
	if (e.target.matches('.team-item')) {
		teamView.toggleSearch(e.target.id);
		// Seems kinda messy. Wrap more of this is spotUsed() ?
		teamView.toggleOptions(state.current, state.team);
		if (teamView.spotUsed(state.current, state.team)) {
			detailControl();
		}
	}
});

document.querySelector('.search_form').addEventListener('submit', e => {
	e.preventDefault();
	teamControl();
	teamView.clearInput();
	if (state.current > 0) {
		teamView.toggleSearch(state.current);
	}
});

window.state = state;