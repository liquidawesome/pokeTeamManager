export const renderDetails = (details) => {
	const markup = `
	<h2>Details</h2>
	<img class="details_img" src="${details.data.sprites.front_default}" style="background-color:${getColor(details.species.color.name)}"/>
	<div class="details-data">
		<p class="details-data_name">Name: ${details.data.name.charAt(0).toUpperCase() + details.data.name.slice(1)}</p>
		<p class="details-data_type">Types: ${getTypes(details.data.types)}</p>
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

const getColor = (color) => {
	const goodColors = {
		'black': '#00000082',
		'blue': '#6483f9',
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