import axios from 'axios';

export default class Team {
	constructor(query, id) {
		this.query = query;
		this.id = id;
		this.pokemon = [];
	}

	async getPokemon() {
		try {
			const result = await axios(`https://pokeapi.co/api/v2/pokemon/${this.query.toLowerCase()}`);
			document.querySelector('.search_error').style.display = 'none';
			return { id: this.id, data: { id: result.data.id, name: result.data.name, sprites: result.data.sprites } };
		} catch (err) {
			document.querySelector('.search_error').style.display = 'block';
			console.error(`Error getting pokemon: ${err}`);
			return false;
		}
	}
}