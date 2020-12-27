import './styles/styles.scss';
import fetchCountries from './js/fetchCountries';
import refs from './js/refs';
import multiplyRender from './templates/multiplyRender.hbs';
import singleRender from './templates/singleRender.hbs';
import debounce from 'lodash.debounce';
import toastr from 'toastr';
import toastrOptions from './js/toaster/options';

refs.input.addEventListener(
  'input',
  debounce(e => {
    inputHeandler(e.target.value);
  }, 500),
);

function inputHeandler(inputValue) {
  if (inputValue.length < 1) {
    clearUI();
    return;
  }
  fetchCountries(inputValue)
    .then(data => render(data))
    .catch(err => {
      warning(err);
      clearUI();
    });
}

function render(data) {
  clearUI();
  if (data.length === 1) {
    refs.container.insertAdjacentHTML('afterbegin', singleRender(data));
    toastr.clear();
    refs.container.classList.add('countries');
  } else if (data.length > 10) {
    warning('Too many results. Please specify your query');
  } else {
    refs.container.insertAdjacentHTML('afterbegin', multiplyRender(data));
    toastr.clear();
    refs.container.classList.add('countries');
  }
}

function warning(message) {
  toastr.warning(message);
  toastr.options = toastrOptions;
}

function clearUI() {
  refs.container.innerHTML = '';
  refs.container.classList.remove('countries');
}
