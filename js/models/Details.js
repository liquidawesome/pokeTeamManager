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

	// TODO: Refactor these function into a single one w/ a parameter for what data you're getting?
	async getSpecies(url) {
		try {
			const result = await axios(url);
			this.species = result.data;
		} catch (err) {
			console.error(`Error getting species: ${err}`);
			return false;
		}
	}

	async getEvolutionChain(url) {
		try {
			const result = await axios(url);
			this.evolution = result.data;
		} catch (err) {
			console.error(`Error getting evolution: ${err}`);
			return false;
		}
	}
}