const button = document.querySelector('.intercom-promo__button');
const modal = document.querySelector('.intercom-modal');
const overlay = document.querySelector('.overlay');
const cards = document.querySelectorAll('.intercom-modal__card');
const form = document.querySelector('.intercom-modal__form');
const phoneInput = document.querySelector('#phoneNumber');
const emailInput = document.querySelector('#userEmail');
const phoneRadio = document.querySelector('#phone');
const emailRadio = document.querySelector('#email');
const radioButtons = document.querySelector('.radio-buttons');
const errorMessage = document.querySelector('.error-message');

button.addEventListener('click', () => {
  modal.setAttribute('style', 'display: flex');
  overlay.setAttribute('style', 'display: block');
  document.body.classList.add('modal-open');
});

overlay.addEventListener('click', () => {
  modal.setAttribute('style', 'display: none');
  overlay.setAttribute('style', 'display: none');
  cards.forEach(c => c.classList.remove('active'));
  form.classList.remove('active');
  form.reset();
  if (emailInput) emailInput.removeAttribute('required');
  if (phoneInput) phoneInput.removeAttribute('required');
  document.body.classList.remove('modal-open');
  modal.classList.remove('active');
  errorMessage.setAttribute('style', 'display: none');
  radioButtons.classList.remove('error');
  emailInput.classList.remove('error');
  phoneInput.classList.remove('error');
});

modal.addEventListener('click', e => e.stopPropagation());

cards.forEach(card => {
  card.addEventListener('click', () => {
    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    modal.classList.add('active');
    form.classList.add('active');
  });
});

window.addEventListener('load', () => {
  form.addEventListener('submit', e => {
    if (!phoneRadio.checked && !emailRadio.checked) {
      e.preventDefault();
      radioButtons.classList.add('error');
      errorMessage.setAttribute('style', 'display: block');
    }
    if (emailRadio.checked && !validateEmail(emailInput.value)) {
      e.preventDefault();
      emailInput.classList.add('error');
      phoneInput.classList.remove('error');
    }
    if (phoneRadio.checked && !validatePhone(phoneInput.value)) {
      e.preventDefault();
      phoneInput.classList.add('error');
      emailInput.classList.remove('error');
    }
  });
});

if (phoneRadio) {
  phoneRadio.addEventListener('click', () => {
    if (phoneInput) phoneInput.setAttribute('required', 'required');
    if (emailInput) emailInput.removeAttribute('required');
    radioButtons.classList.remove('error');
    errorMessage.setAttribute('style', 'display: none');
    emailInput.classList.remove('error');
  });
}
if (emailRadio) {
  emailRadio.addEventListener('click', () => {
    if (phoneInput) phoneInput.removeAttribute('required');
    if (emailInput) emailInput.setAttribute('required', 'required');
    radioButtons.classList.remove('error');
    errorMessage.setAttribute('style', 'display: none');
    phoneInput.classList.remove('error');
  });
}


function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

document.querySelector('#userEmail').addEventListener('blur', () => {
  const email = document.querySelector('#userEmail').value;
  if (!validateEmail(email)) {
    emailInput.classList.add('error');
  } else {
    emailInput.classList.remove('error');
  }
});

function validatePhone (phone) {
  const re = /^(\+?7|8)\s?(\d{3})?\s?(\d{3})?\s?(\d{2})?\s?(\d{2})?\s?(\d{2})?[-]?(\d{2})?[-]?(\d{2})$/;
  return re.test(phone);
}

document.querySelector('#phoneNumber').addEventListener('blur', () => {
  const phone = document.querySelector('#phoneNumber').value;
  if (!validatePhone(phone)) {
    phoneInput.classList.add('error');
  } else {
    phoneInput.classList.remove('error');
  }
});

function setRadioButtons() {
  if (phoneInput.value) {
    phoneRadio.checked = true;
  } else if (emailInput.value) {
    emailRadio.checked = true;
  }
}

phoneInput.addEventListener('input', setRadioButtons);
emailInput.addEventListener('input', setRadioButtons);
