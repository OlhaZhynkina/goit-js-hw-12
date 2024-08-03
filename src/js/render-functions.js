function imageMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<li class="gallery">
            <a class="list" href="${largeImageURL}">
              <img class="photo" src="${webformatURL}" alt="${tags}" />
              <ul class="properties-list">
                <li>
                  <p class="prop">Likes</p>
                  <p class="prop-value">${likes}</p>
                </li>
                <li>
                  <p class="prop">Views</p>
                  <p class="prop-value">${views}</p>
                </li>
                <li>
                  <p class="prop">Comments</p>
                  <p class="prop-value">${comments}</p>
                </li>
                <li>
                  <p class="prop">Downloads</p>
                  <p class="prop-value">${downloads}</p>
                </li>
              </ul>
            </a>
          </li>`;
}

export function imagesMarkup(array) {
  return array.map(imageMarkup).join('');
}
