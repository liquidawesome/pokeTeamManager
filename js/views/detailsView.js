export const renderDetails = (data) => {
	const markup = `
	<div class="details-data">
		<p class="details-data_name">Name: ${data.name}</p>
		<p class="details-data_type">Types: ${getTypes(data.types)}</p>
	</div>
	`;
	document.querySelector('.details').insertAdjacentHTML('beforeend', markup);
};

export const clearDetails = () => {
	document.querySelector('.details').innerHTML = '';
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