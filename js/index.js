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
		const teamIndex = state.team.findIndex(el => el.id == state.current);
		if (teamIndex >= 0) {
			state.team.splice(teamIndex);
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
	detailsView.renderDetails(state.details.data);
};

/* EVENT HANDLERS */
document.querySelector('.team').addEventListener('click', e => {
	state.current = e.target.id.substring(1);
	if (e.target.matches('.team-item')) {
		teamView.toggleSearch(e.target.id);
		teamView.toggleOptions(state.current, state.team);
		const team = document.querySelector('.team');

		// If selection is closed, open it
		if (team.classList.contains('closed')) {
			team.classList.replace('closed', 'open');
			if (teamView.spotUsed(state.current, state.team)) {
				detailControl();
			}
		}
		// If selection is open, close it
		else if (team.classList.contains('open')) {
			team.classList.replace('open', 'closed');
			detailsView.clearDetails();
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
	document.querySelector('.team').classList.replace('open', 'closed');
	teamView.toggleOptions(state.current, state.team);
});

window.state = state;