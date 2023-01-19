import { MAIN_PART_URL,
    MOVIE_BY_ID_PART,
    API_KEY
 } from "./vars";
import { id } from "./makeRenderFilms";
import { requestGet } from "./requestGet";
import axios from "axios";
import { BasicLightBox } from "basiclightbox";
import 'basiclightbox/dist/basicLightbox.min.css';


// const response = requestGet(MAIN_PART_URL, MOVIE_BY_ID_PART, id, API_KEY);
// const objData = response.data;

const refs = {
    cardCollection: document.querySelector('.movie__collection'),
    closeModalBtn: document.querySelector('.modal__close-btn'),
    backdrop: document.querySelector('.js-backdrop'),
};

refs.cardCollection.addEventListener('click', onImgClick);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function onImgClick (evt) {
    if(evt.target.nodeName !== 'IMG'){
      return;
    } 
    onOpenModal(evt);
  }

// Fetch movie by id
async function getOneMovieData(mov_id) {
    
    // const url = `https://api.themoviedb.org/3/movie/${mov_id}${API_KEY}`;
    // return fetch(url)
    const response = await requestGet( MAIN_PART_URL, MOVIE_BY_ID_PART, '12', API_KEY);
    console.log(response.data);
    console.log(mov_id);
    const obj = response.data;
    const genresString = obj.genres.map(el => el.name).join(', '); 
    // obj.popularity.toFixed(1);
    return renderFilmOnModal(obj, genresString);
}

async function onOpenModal(evt) {
    document.body.classList.add('show-modal');
    console.log(evt.target.dataset.id);

    const data = await getOneMovieData(evt.target.dataset.id);
    console.log(data);

    // renderFilmOnModal
    
        // if (evt.target.nodeName !== 'IMG') {
        //     evt.preventDefault();
        //     console.log(5);
        //     return;
        // }
        // const markup = modalFilmData(data);
        //     const modal = BasicLightBox.create(markup);

        //     modal.show();
}

function onCloseModal() {
    document.body.classList.remove('show-modal');
}
function onBackdropClick(e) {
    if (e.currentTarget === e.target) {
        onCloseModal();
    }
}

function onEsc(evt) {
    if (evt.code === 'Escape') {
        onCloseModal();
    }
}


function renderFilmOnModal({ title, vote_average, popularity, original_title, overview }, str) {
     refs.backdrop.innerHTML = '';
     const markupModal =
     `
    <div class="modal">
<button type="button" class="modal__close-btn" data-action="close-modal">
<svg class="modal__icon" width="14" height="14">
<use href="./images/icons/icons.svg#icon-close"></use>
</svg>
</button>

<div class="modal__content">
<img
        class="modal-img"
        src="./images/no-Film-Img.jpg"
        alt="картинка фільму"/>

<div class="modal__group">
<h2 class="modal__title">${title}</h2>
<div class="modal__list-container">
  <ul class="modal__list">
    <li class="modal__item">Vote / Votes</li>
    <li class="modal__item">Popularity</li>
    <li class="modal__item">Origin Title</li>
    <li class="modal__item">Genre</li>
  </ul>
  <ul class="modal__list">
    <li class="modal__item-list" id="vote">${vote_average}</li>
    <li class="modal__item-list" id="popularity">${popularity}</li>
    <li class="modal__item-list" id="origin-title">${original_title}</li>
    <li class="modal__item-list" id="genre">/${str}</li>
  </ul>
</div>
<h3 class="modal__subtitle">ABOUT</h3>
<p class="modal__text">${overview}</p>
<div class="btn-container">
  <button class="modal__btn" id="btn-watched" type="button">ADD TO WATCHED</button>
  <button class="modal__btn" id="btn-queue" type="button">ADD TO QUEUE</button>
</div>
</div>
</div>
</div>
`;

// const modalMarkup = basicLightbox.create(markup);
refs.backdrop.insertAdjacentHTML('beforeend', markupModal);

}


// var buttons = document.querySelectorAll("selector-for-the-buttons");
// Array.prototype.forEach.call(buttons, function(btn) {
//     btn.addEventListener("click", handler, false);
// });




// function onGetData() {
//     let objFilms;
//     requestGet(TRENDS_REQUEST_PART, API_KEY)
//     .then((res) => {

//         objFilms = res.data.results;
//         getOneMovieData(objFilms);

//     })
// }

// function onGetData(base_url, path, key, ...parameters) {
//     let requestURL = `${base_url}${path}${key}${parameters.join('')}`;
//     const response = await axios.get(requestURL);
//     return response;
// }
