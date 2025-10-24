import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonInfoCard = {
  name: string;
  id: number;
  type: string; // Assumindo que você quer o type1
  img: string; // Imagem animada (GIF)
};

export type DescricaoPokemon = {
  flavor_text: string;
};

export type PokemonDetail = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;

  type1: string;
  type2?: string;

  abilitie1: string;
  abilitie2?: string;

  name: string;
  id: number;
  height: number;
  weight: number;
  is_default: boolean;

  img: string;
  imgAnimada: string;
};

export const getPokemons = async (limite: number): Promise<Pokemon[]> => {
  const response = await api.get(`pokemon?limit=${limite}`);
  return response.data.results;
};

export const getPokemonInfoCards = async (
  pokemonList: Pokemon[]
): Promise<PokemonInfoCard[]> => {
  // 1. Cria um array de Promises, onde cada Promise é uma chamada 'api.get(url)'
  const detailPromises = pokemonList.map((pokemon) => {
    // A URL completa para os detalhes já está em pokemon.url
    return api.get(pokemon.url).then((response) => response.data);
  });

  // 2. Executa todas as Promises (requisições de detalhe) em paralelo
  const allDetails = await Promise.all(detailPromises);

  // 3. Mapeia os dados detalhados para o formato PokemonInfoCard
  const infoCards: PokemonInfoCard[] = allDetails.map((d: any) => ({
    name: String(d.name),
    id: Number(d.id),
    // Tipo: Pega o primeiro tipo (type1)
    type: String(d.types[0].type.name),
    // Imagem: Pega o sprite animado (Showdown)
    img: String(d.sprites.other["showdown"].front_default),
  }));

  return infoCards;
};

export const getDescricaoPokemonPorNome = async (
  name: string
): Promise<DescricaoPokemon> => {
  const response = await api.get(`pokemon-species/${name}`);
  const d = response.data;

  const descricao: DescricaoPokemon = {
    flavor_text: String(d.flavor_text_entries[0].flavor_text),
  };

  return descricao;
};

export const getPokemonPorNome = async (
  name: string
): Promise<PokemonDetail> => {
  const response = await api.get(`pokemon/${name}`);
  const d = response.data;

  const detail: PokemonDetail = {
    hp: Number(d.stats[0].base_stat),
    attack: Number(d.stats[1].base_stat),
    defense: Number(d.stats[2].base_stat),
    specialAttack: Number(d.stats[3].base_stat),
    specialDefense: Number(d.stats[4].base_stat),
    speed: Number(d.stats[5].base_stat),

    type1: String(d.types[0].type.name),
    type2: d.types[1] ? String(d.types[1].type.name) : undefined,

    abilitie1: String(d.abilities[0].ability.name),
    abilitie2: d.abilities[1] ? String(d.abilities[1].ability.name) : undefined,

    name: String(d.name),
    id: Number(d.id),
    height: Number(d.height),
    weight: Number(d.weight),
    is_default: Boolean(d.is_default),

    img: String(d.sprites.other["official-artwork"].front_default),
    imgAnimada: String(d.sprites.other["showdown"].front_default),
  };

  return detail;
};
