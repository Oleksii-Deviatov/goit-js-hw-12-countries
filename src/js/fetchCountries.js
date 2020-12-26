export default function fetchCountries(searchQuery) {
  return fetch(
    `https://restcountries.eu/rest/v2/name/${searchQuery}`,
  ).then(resp => (resp.ok ? resp.json() : Promise.reject('Not found')));
}
