import axios from 'axios';

export default class Details {
	constructor(id) {
		this.id = id;
	}

	async getDetails() {
		try {
			const result = await axios(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
			this.data = result.data;
		} catch (err) {
			console.error(`Error getting details: ${err}`);
			return false;
		}
	}

	async getSpecies() {
		try {
			const result = await axios(`https://pokeapi.co/api/v2/pokemon-species/${this.id}`);
			this.species = result.data;
		} catch (err) {
			console.error(`Error getting species: ${err}`);
			return false;
		}
	}
}