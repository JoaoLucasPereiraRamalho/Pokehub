import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

interface Pokemon {
  name: string;
  url: string;
}

export type PokemonDetail = {
  id: number;
  height: number;
  weight: number;
  is_default: boolean;
};

export const getPokemons = async (limite: number): Promise<Pokemon[]> => {
  const response = await api.get(`pokemon?limit=${limite}`);
  return response.data.results;
};

export const getPokemonPorNome = async (
  name: string
): Promise<PokemonDetail> => {
  const response = await api.get(`pokemon/${name}`);
  const d = response.data;

  const detail: PokemonDetail = {
    id: Number(d.id),
    height: Number(d.height),
    weight: Number(d.weight),
    is_default: Boolean(d.is_default),
  };

  return detail;
};
