import './styles/styles.scss';
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
    clearUI();
    return;
  }
  fetchCountries(value)
    .then(data => render(data))
    .catch(err => {
      warning(err);
      clearUI();
    });
}

function render(data) {
  clearUI();
  if (data.length === 1) {
    refs.container.insertAdjacentHTML('afterbegin', country(data));
    toastr.clear();
  } else if (data.length > 10) {
    warning('Too many results. Please specify your query');
  } else {
    refs.container.insertAdjacentHTML('afterbegin', countries(data));
    toastr.clear();
  }
}

function warning(message) {
  toastr.warning(message);
  toastr.options = toastrOptions;
}

function clearUI() {
  refs.container.innerHTML = '';
}
