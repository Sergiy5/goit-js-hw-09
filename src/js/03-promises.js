import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formSub = document.querySelector('.form');

formSub.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
};

function onSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);
  const subFormData = {};
  for (const [key, value] of formData.entries()) {
    subFormData[key] = Number(value);
  };

  for (let position = 1; position <= subFormData.amount; position += 1) {

    createPromise(position, subFormData.delay).then(notyFulfild).catch(notyRejact);
// Оновлюємо subFormData.delay на кожному циклі
    subFormData.delay = subFormData.delay + subFormData.step;
  };
  
  // form.reset();
};

function notyRejact({ position, delay }) {
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}

function notyFulfild({ position, delay }) {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}



