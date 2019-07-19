export const renderDetails = (data) => {
	const markup = `
	<h2>Details</h2>
	<div class="details-data">
		<p class="details-data_name">Name: ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</p>
		<p class="details-data_type">Types: ${getTypes(data.types)}</p>
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