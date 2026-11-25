import statesData from '~/data/geo/states.json';

export interface CityInfo {
  name: string;
  slug: string;
}

export interface StateInfo {
  name: string;
  slug: string;
  code: string;
  type: 'State' | 'Union Territory';
  cities: CityInfo[];
}

export const allStates: StateInfo[] = statesData as StateInfo[];

export function getAllStates(): StateInfo[] {
  return allStates;
}

export function getStateBySlug(slug: string): StateInfo | undefined {
  return allStates.find((s) => s.slug === slug || s.slug === slug.toLowerCase());
}

export function getStateByCode(code: string): StateInfo | undefined {
  return allStates.find((s) => s.code.toLowerCase() === code.toLowerCase());
}

export function getCityBySlug(citySlug: string): { city: CityInfo; state: StateInfo } | undefined {
  const normalized = citySlug.toLowerCase();
  for (const state of allStates) {
    const foundCity = state.cities.find((c) => c.slug === normalized);
    if (foundCity) {
      return { city: foundCity, state };
    }
  }
  return undefined;
}

export type LocationResolution =
  | { type: 'state'; state: StateInfo; title: string; subtitle: string; cities: CityInfo[] }
  | { type: 'city'; city: CityInfo; state: StateInfo; title: string; subtitle: string; nearbyCities: CityInfo[] }
  | undefined;

export function resolveLocationSlug(slug: string): LocationResolution {
  const normalized = slug.toLowerCase();
  // 1. Check if it's a state
  const stateMatch = getStateBySlug(normalized);
  if (stateMatch) {
    return {
      type: 'state',
      state: stateMatch,
      title: `Colleges in ${stateMatch.name}`,
      subtitle: `Explore premier universities, medical colleges, and engineering institutions across ${stateMatch.name}.`,
      cities: stateMatch.cities,
    };
  }

  // 2. Check if it's a city
  const cityMatch = getCityBySlug(normalized);
  if (cityMatch) {
    const nearby = cityMatch.state.cities.filter((c) => c.slug !== normalized);
    return {
      type: 'city',
      city: cityMatch.city,
      state: cityMatch.state,
      title: `Colleges in ${cityMatch.city.name}, ${cityMatch.state.name}`,
      subtitle: `Top accredited higher education institutions, fee structures, cutoffs, and admissions in ${cityMatch.city.name}.`,
      nearbyCities: nearby,
    };
  }

  return undefined;
}
