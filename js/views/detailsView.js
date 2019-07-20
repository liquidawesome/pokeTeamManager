export const renderDetails = (details) => {
	let evoChain = [];
	getEvolutions(details.evolution.chain, evoChain);
	const markup = `
	<h2>Details</h2>
	<img class="details_img" src="${details.data.sprites.front_default}" style="background-color:${getColor(details.species.color.name)}"/>
	<div class="details-data">
		<p class="details-data_name">Name: ${details.data.name.charAt(0).toUpperCase() + details.data.name.slice(1)}</p>
		<p class="details-data_type">Types: ${getTypes(details.data.types)}</p>
		<div class="details-data_evolution">
			<p>Evolution Chain:</p>
			${renderEvolutions(evoChain)}
		</div>
	</div>
	`;
	document.querySelector('.details').innerHTML = markup;
};

export const clearDetails = () => {
	document.querySelector('.details').innerHTML = '<h2>Details</h2>';
};

const getTypes = (typeArray) => {
	let typeString = '';
	typeArray.forEach((el, index) => {
		typeString += el.type.name;
		if (index !== typeArray.length - 1)
			typeString += ', ';
	});
	return typeString;
};

const getEvolutions = (evo, outputArray, iter = 1) => {
	let reason;
	if (evo.evolution_details.length > 0) {
		evo.evolution_details.forEach(el => {
			// Evolution Reasons
			if (el.trigger.name === 'level-up' && el.min_level && el.relative_physical_stats) {
				switch (el.relative_physical_stats) {
					case 1:
						reason = `Evolves at level ${el.min_level} when Attack > Defense`;
						break;
					case 0:
						reason = `Evolves at level ${el.min_level} when Attack = Defense`;
						break;
					case -1:
						reason = `Evolves at level ${el.min_level} when Attack < Defense`;
						break;
					default:
						reason = `Evolves at level ${el.min_level} with special stats.`;
				}
			} else if (el.trigger.name === 'level-up' && el.min_level && el.gender) {
				switch (el.gender) {
					case 1:
						reason = `Evolves at level ${el.min_level} if female`;
						break;
					case 2:
						reason = `Evolves at level ${el.min_level} if male`;
						break;
					default:
						reason = `Evolves at level ${el.min_level}`;
				}
			} else if (el.trigger.name === 'level-up' && el.min_level) {
				reason = `Evolves at level ${el.min_level}`;
			} else if (el.trigger.name === 'level-up' && el.location) {
				reason = `Evolves after levelling up at ${el.location.name}`;
			} else if (el.trigger.name === 'use-item' && el.item) {
				reason = `Evolves after using a ${el.item.name}`;
			} else {
				reason = `Evolves using some method I have not bothered to factor into my code`;
			}
			console.log(reason);
		});
	}
	outputArray.push({ name: evo.species.name, stage: iter, reason: reason });
	if (evo.evolves_to.length > 0) {
		iter++;
		evo.evolves_to.forEach(el => {
			getEvolutions(el, outputArray, iter);
		});
	}
};

const renderEvolutions = (evoChain) => {
	let stage = 1;
	let markup = `<div data-stage="${stage}">`;
	if (evoChain.length === 1) {
		return 'This pokemon is not known to evolve.';
	}
	evoChain.forEach(el => {
		if (el.stage > stage) {
			stage = el.stage;
			markup += `</div><div data-stage="${stage}">`;
		}
		markup += `<div>${el.name}<br>`;
		if (el.reason) {
			markup += `<p>${el.reason}</p>`;
		}
		markup += `</div>`;
	});
	markup += '</div>';
	return markup;
};

const getColor = (color) => {
	const goodColors = {
		'black': '#00000082',
		'blue': '#4969e1',
		'brown': '#885612',
		'gray': '#6d6d6d',
		'green': '#408f40',
		'pink': '#ffb5c2',
		'purple': '#935b93',
		'red': '#b93737',
		'white': '#dbdbdb8a',
		'yellow': '#f5f547'
	};
	return goodColors[color];
};