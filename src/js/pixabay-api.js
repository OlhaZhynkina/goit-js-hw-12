import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const perPage = 15;

export async function getPhotos(q, currentPage) {
  const options = {
    params: {
      key: '45170057-222a781b727842b81c5ded16b',
      q,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: currentPage,
      per_page: perPage,
    },
  };

  const { data } = await axios.get('', options);

  return data;
}
