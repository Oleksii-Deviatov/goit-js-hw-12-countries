export default function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(resp => (resp.ok ? resp.json() : Promise.reject('Not found')))
    .then(data => {
      return data.filter(country => {
        if (country.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return country;
        }
      });
    });
}
