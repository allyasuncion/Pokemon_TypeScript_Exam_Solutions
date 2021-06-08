import { pokemon_list } from './pokemon_list.js';

interface Pokemon {
    code: number;
    name: string;
    weight: number;
    color: string;
    ability2: string;
    hp: number;
    sp_def: number;
    number: number;
    spd: number;
    height: number;
    atk: number;
    generation: number;
    mega_evolution: boolean;
    sp_atk: number;
    legendary: boolean;
    hidden_ability: string;
    serial: number;
    total: number;
    type: any;
    def: number;
    ability1: string;
}

function QuestionOne() {
    const legendaries: Pokemon[] = pokemon_list.filter(p => p.legendary);

    console.log(`\n1. There are ${legendaries.length} legendary Pokemon:`);

    const legendaryNames: string[] = legendaries.map(legendary => legendary.name);
    
    console.log(legendaryNames);
}

function QuestionTwo() {
    console.log(`\n2. These are the Pokemon with the highest defense stat:`);
    pokemon_list.sort((pokemonA, pokemonB) => pokemonB.def - pokemonA.def);
    const maxDef = pokemon_list[0].def
    const pokemonArrayWithHighestDef = pokemon_list.filter(p => p.def == maxDef);
    for (let p of pokemonArrayWithHighestDef) {
        console.log({name: p.name, def: p.def});
    }
    
}

function QuestionThree() {
    const overweightPokemon: Pokemon[] = pokemon_list.filter(p => p.weight > p.height * 60);
    // overweight_pokemon_list = [ p for p in pokemon_list if p.weight > p.height * 60 ]

    console.log(`\n3. There are ${overweightPokemon.length} overweight Pokemon and their names are:`);

    const overweightList: string[] = overweightPokemon.map(p => p.name);
    console.log(overweightList);
}


function QuestionFour() {
    function Occurence(array: number[], value: any) {
        var count = 0;
        array.forEach( v => v === value && count++);
        return count;
    }

    const pokeNumber: number[] = pokemon_list.map(p => p.number);

    const variedPokemon: any[] = pokemon_list.filter(p => {
        let frequency: number = Occurence(pokeNumber, p.number);
        return frequency > 1;
    }).map(p => ({
        number: p.number,
        name: p.name,
        ability: [p.ability1, p.ability2],
        hidden_ability: p.hidden_ability,
    });
    let pokeNum = variedPokemon.map(p => p.number);

    let newPokemonNum = [... new Set(pokeNum)];

    console.log(
        `\n4. ${newPokemonNum.length} Pokemon have two or more variations and there are ${pokeNum.length} Pokemon if the variants are included:`
    );

    let pokemonNames: string[] = [];
    for (let n of newPokemonNum){ // newPokemonNum.length == 100
        for (let p of pokemon_list) { // newPokemonNum.length == 200
            // 100 * 200 = 20,000
            if (n == p.number) {
                pokemonNames.push(p.name);
            }
        }
    }
    console.log(pokemonNames);
}

function QuestionFive() {
    console.log(
        `\n5. Here are the list of Pokemon types and the amount of Pokemon having that type from the the most common to the least:`
      );

    const pokemonTypes: string[] = [];

    for (let p of pokemon_list) {
        let pokemon: Pokemon;
        pokemon = p;
        if (typeof pokemon.type === "string") {
            pokemonTypes.push(pokemon.type);
        } else {
            for (let t of pokemon.type) {
                pokemonTypes.push(t);
            }
        }
    }

    function Occurence(array: string[], value: any) {
        var count = 0;
        array.forEach( v => v === value && count ++);
        return count;
    }

    let pokemonTypesNoDuplicates: string[] = [...new Set(pokemonTypes)];
    let pokemonTypesNoDuplicatePlus = [];

    for (let t of pokemonTypesNoDuplicates) {
        let frequency: number = Occurence(pokemonTypes, t);
        pokemonTypesNoDuplicatePlus.push({type: t, frequency: frequency});
    }

    pokemonTypesNoDuplicatePlus.sort(function(pokemonA, pokemonB) {
        return pokemonB.frequency - pokemonA.frequency;
    });

    for (let t of pokemonTypesNoDuplicatePlus) {
        console.log(t);
    }
}

QuestionOne();
QuestionTwo();
QuestionThree();
QuestionFour();
QuestionFive();
