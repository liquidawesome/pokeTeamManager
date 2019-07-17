import axios from 'axios';

export default class Find {
	constructor(query, id) {
		this.query = query;
		this.id = id;
	}

	async getPokemon() {
		try {
			const result = await axios(`https://pokeapi.co/api/v2/pokemon/${this.query.toLowerCase()}`);
			this.pokemon = result.data;
			document.querySelector('.search_error').style.display = 'none';
		} catch (err) {
			document.querySelector('.search_error').style.display = 'block';
			console.error(err);
		}
	}
}