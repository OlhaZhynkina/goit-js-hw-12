import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getPhotos } from './js/pixabay-api';
import { imagesMarkup } from './js/render-functions';
import iconError from './img/error.svg';

const formElement = document.querySelector('.js-form');
const ulElement = document.querySelector('.js-gallery-list');
const loader = document.querySelector('.loader');

formElement.addEventListener('submit', onSearchPhotos);
//функція, яка потрібна, щоб при натисканні людиною кнопки:

function onSearchPhotos(event) {
  event.preventDefault();
  ulElement.innerHTML = ''; // Очищує розмітку бо потім я використаю замість innerHTML на 55 рядку insertAdjacentHTML() і через в мене перестане очищуватись розмітка
  // 1) Отримати дані з форми, які ввела людина (введене значення)
  const formData = new FormData(formElement); // Отримуємо екземпляр класу форми new FormData (це потрібно для того, щоб використати метод get)
  const searchQuery = formData.get('search').trim(); // Дістаємо дані, які ввела людина, щоб це зробити потрібно діставати їх по атрибуту name інпуту. А потім методом trim прибираємо пробіли
  // роблю перевірку, чи не відправили мені пусте поле
  if (searchQuery === '') {
    return iziToast.error({
      iconUrl: iconError,
      title: 'Error',
      titleColor: '#fff',
      messageColor: '#fff',
      backgroundColor: '#ef4040',
      position: 'topRight',
      message: 'The field cannot be empty!',
    });
  }
  // Перед запитом на сервер, якщо я виуористовую лоадер його потрібно показати. Це робиться за допомогою видалення класу
  loader.classList.remove('hidden');
  // Викликаємо функцію запиту на сервер, яка була написана у pixabay-api і передаємо пошуковий запит (те, що ввела людина, дані, що ми раніше дістали)
  getPhotos(searchQuery)
    // Оброблюємо успішну відповідь, яка приходить з серверу (тобто мається на увазі, що все ок і в нас на сторінці показуються картинки)
    .then(response => {
      // перевіряємо чи нам не прийшла з серверу пуста відповідь і чи є дані за таким пошуком
      if (response.hits.length === 0) {
        return iziToast.error({
          iconUrl: iconError,
          title: 'Error',
          titleColor: '#fff',
          messageColor: '#fff',
          backgroundColor: '#ef4040',
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }

      // Це функці рендеру. Ми відмальовуємо отримані дані з серверу на сторінці (тобто картинки та дані під ними)
      ulElement.innerHTML = imagesMarkup(response.hits); // hits - я дивлюсь на вкладці networks в інструментах розробника (може бути різні слово в залежності від бібіліотеки)
      // Використовуємо бібліотеку, щоб натискати на зображення та відкривати модальне вікно
      const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
      lightbox.refresh(); // Нам завантажується по 20 зображень. Коли ми відкриваємо модалку, то вона запам'ятовує та в куточку пише, що зображень лише 20. А припустимо, що в нас є кнопка завантажити більше. Без цього тетому в модалці так і лишиться лише 20 зображень, а наступні не відкриватимуться у модальному вікні. Цей метод бібліотеки для того, щоб оновлювати інформацію і в модалці завантажувалось більше зображень
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      loader.classList.add('hidden');
      event.target.reset();
    });
} // очищаємо поля та приховуємо лоадер (цей блок виконається в будь-якому випадку і при помилці і при успішному)
