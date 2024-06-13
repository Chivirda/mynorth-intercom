const button = document.querySelector('.intercom-promo__button');
const modal = document.querySelector('.intercom-modal');
const overlay = document.querySelector('.overlay');
const cards = document.querySelectorAll('.intercom-modal__card');
const form = document.querySelector('.intercom-modal__form');

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
  document.body.classList.remove('modal-open');
  modal.classList.remove('active');
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
