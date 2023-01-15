//import { API_KEY } from './vars';
import { API_KEY, MAIN_PART_URL, BASE_URL } from './vars';
//import './css/styles.css';

var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

import axiosFilm from './axiosFilm.js';
import axiosAllGenres from './axiosAllGenres';
let allGenres = [];

const formEl = document.querySelector('#search-form');
const inputEl = document.querySelector('.header__search-input');
const buttonEl = document.querySelector('.header__search-button');
const pEl = document.querySelector('.header__error-text');
const spanEl = document.querySelector('#visually-hidden');
const ulEl = document.querySelector('.movie__collection');

buttonEl.classList.add('disebl_button_form');

let valuesString = '';
const DEBOUNCE_DELAY = 300;
let namberPer_page = 40;
let namberPage = 1;
let datatotalHits = 0;
let pageTotal = 0;

//'w300', 'w780', 'w1280', 'original';
//-------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------
axiosAllGenres(API_KEY, MAIN_PART_URL)
  .then(res => res)
  .then(resl => resl.data)
  .then(resalts => {
    allGenres = resalts.genres;
  })
  .catch(err => {
    console.log(err);
  });
//-----------------------------------------------------------------------------------------------------------------------------------------
function searchGenres(arrays, lengthArr) {
  let count = lengthArr;
  if (lengthArr > 3) {
    lengthArr = 3;
  }
  let strRes = '';
  if (lengthArr === 0) return 'n/a';
  else {
    arrays.forEach(array => {
      count = count - 1;
      allGenres.map(allGenre => {
        if (array === allGenre.id) {
          if (count === 0) {
            strRes += allGenre.name;
          } else {
            strRes += allGenre.name + ', ';
          }
        } else {
          strRes += '';
        }
      });
    });
  }
  return strRes;
}
//---------------------------------------------------------------------------------------------------------------------------
function notFotoMob(stringURL, BASE_URL) {
  let str = '';
  if (stringURL === null) {
    str = `./images/no-Film-Img.jpg`;
    console.log(str);
    return str;
  } else {
    str = `${BASE_URL}w300${stringURL}`;
    return str;
  }
}
//-----------------------------------------------------------------------------------------------------------------------------
function notFotoTab(stringURL, BASE_URL) {
  let str = '';
  if (stringURL === null) {
    str = `./images/no-Film-Img.jpg`;
    console.log(str);
    return str;
  } else {
    str = `${BASE_URL}w780${stringURL}`;
    return str;
  }
}
//----------------------------------------------------------------------------------------------------------------------------
function notFotoDesktop(stringURL, BASE_URL) {
  let str = '';
  if (stringURL === null) {
    str = './images/no-Film-Img.jpg';
    console.log(str);
    return str;
  } else {
    str = `${BASE_URL}w1280${stringURL}`;
    return str;
  }
}

//----------------------------------------------------------------------------------------------------------------------------
const articleElement = articls => {
  return articls
    .map(
      ({
        id,
        original_language,
        original_title,
        overview,
        poster_path,
        popularity,
        backdrop_path,
        release_date,
        title,
        vote_average,
        vote_count,
        genre_ids,
      }) => {
        return ` 
            
     <li class="movie__card">
        <a class="movie__link open__modal--js link" id="${id}" href="">
          <div class="movie__img__box">


          <picture class="film-list__img">
                    <source
                      srcset="
                      ${notFotoDesktop(poster_path, BASE_URL)}
                        
                      "
                      media="screen and (min-width:1200px)"
                    />
                    <source
                      srcset="
                      ${notFotoTab(poster_path, BASE_URL)}
                        
                      "
                      media="(min-width:768px)"
                    />
                    <source
                      srcset="
                      ${notFotoMob(poster_path, BASE_URL)}
                        
                      "
                      media="(max-width:767px)"
                    />
                    <img
              class="movie__img"
              src="./images/no-Film-Img.jpg"
              alt="картинка фільму"
              width="450"
              height="294"
              name="Poster"
            />
                  </picture>           
          </div>
        </a>
        <div class="movie__card__textbox">
          <a class="movie__link open__modal--js link" href="">
            <h3 class="movie__title">${original_title}</h3>
            <span class="movie__details">${searchGenres(
              Object.values(genre_ids),
              genre_ids.length
            )} | </span
            ><span class="movie__details">${release_date.slice(0, 4)}</span>
          </a>
        </div>
      </li> `;
      }
    )
    .join('');
};

//------------------------------------------------------------------------------------------------------------------------------------------------------------
const onInput = event => {
  event.preventDefault();
  pEl.classList.add('header__error-text--hidden');
  const valuelongth = event.target.value.length;
  valuesString = event.target.value;
  let element = '';
  for (let index = 0; index < valuelongth; index++) {
    element = element + ' ';
  }
  if (valuesString === element) return (valuesString = '');
  else {
    buttonEl.classList.remove('disebl_button_form');
    valuesString = valuesString.trim();
    namberPage = 1;
  }
};

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

//------------------------------------------------------------------------------------------------------------------------------------
const searchFilm = async event => {
  try {
    event.preventDefault();
    if (valuesString === '') {
      return alert(
        '"Sorry, there are no films matching your search query. Please try again."'
      );
    }
    // spanEl.classList.add('visually-hidden');
    const res = await axiosFilm(
      API_KEY,
      MAIN_PART_URL,
      valuesString,
      namberPage,
      namberPer_page
    );
    const articls = res.data.results;
    console.log(articls);
    datatotalHits = res.data.total_results;
    pageTotal = res.data.total_pages;

    if (datatotalHits === 0) {
      //spanEl.classList.add('visually-hidden');
      pEl.classList.remove('header__error-text--hidden');
      Notiflix.Notify.failure(
        'Search result not successful. Enter the correct movie name.'
      );

      return;
    } else {
      ulEl.innerHTML = articleElement(articls);
      if (pageTotal === namberPage) {
        buttonEl.classList.add('disebl_button_form');
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      } else {
        let resM = pageTotal - namberPage;
        Notiflix.Notify.info(`You can also view ${resM} pages`);
        namberPage = namberPage + 1;
      }
    }
  } catch (error) {
    console.log(error.message);
    ulEl.innerHTML = '';
  }
};

formEl.addEventListener('submit', searchFilm);
