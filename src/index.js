import './styles.css';
import fetchCountries from './js/fetchCountries';
import refs from './js/refs';
import countries from './templates/countries.hbs';
import country from './templates/country.hbs';
import debounce from 'lodash.debounce';
import toastr from 'toastr';
import toastrOptions from './js/toaster/options';

refs.input.addEventListener(
  'input',
  debounce(e => {
    inputHeandler(e.target.value);
  }, 500),
);

function inputHeandler(value) {
  if (value.length < 1) {
    refs.container.innerHTML = '';
    return;
  }
  fetchCountries(value).then(data => render(data));
}

function render(data) {
  refs.container.innerHTML = '';
  if (data.length === 1) {
    refs.container.insertAdjacentHTML('afterbegin', country(data));
  } else if (data.length > 10) {
    toastr.warning('Too many results. Please specify your query');
    toastr.options = toastrOptions;
  } else {
    refs.container.insertAdjacentHTML('afterbegin', countries(data));
  }
}
