var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},i=e.parcelRequire8995;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in t){var i=t[e];delete t[e];var a={id:e,exports:{}};return n[e]=a,i.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){t[e]=n},e.parcelRequire8995=i),i("6ctyQ"),i("4zEvq"),i("bEJKq"),i("bucL7"),i("3JgmR"),i("esxDb"),i("c9nxu");var a=i("4zEvq"),o=i("eFZ6H"),s=i("7Y9D8");const r={movieList:document.querySelector(".movie__collection"),watchedBtn:document.querySelector('input[value="Watched"]'),queueBtn:document.querySelector('input[value="Queue"]')};async function c(){r.queueBtn.removeEventListener("click",c),r.movieList.innerHTML="";const e=JSON.parse(localStorage.getItem("queue"));if(null===e||0===e.length)return s.Notify.info("You don't have any movies in the queue yet"),void r.watchedBtn.addEventListener("click",l);const n=e.map((async e=>{const n=await(0,o.requestGet)(a.MAIN_PART_URL,a.MOVIE_BY_ID_PART,e,a.API_KEY),t=await n.data,i=t.genres.map((e=>e.name)).join(", ");return u(t,i)})),t=await Promise.all(n);r.movieList.insertAdjacentHTML("beforeend",t.join("")),r.watchedBtn.addEventListener("click",l)}async function l(){r.watchedBtn.removeEventListener("click",l),r.movieList.innerHTML="";const e=JSON.parse(localStorage.getItem("watched"));if(null===e||0===e.length)return s.Notify.info("You have no watched movies yet"),void r.queueBtn.addEventListener("click",c);const n=e.map((async e=>{const n=await(0,o.requestGet)(a.MAIN_PART_URL,a.MOVIE_BY_ID_PART,e,a.API_KEY),t=await n.data,i=t.genres.map((e=>e.name)).join(", ");return u(t,i)})),t=await Promise.all(n);r.movieList.insertAdjacentHTML("beforeend",t.join("")),r.queueBtn.addEventListener("click",c)}function d(e,n,t,i){let a="";return a=null===t?i:`${e}${n}${t}`,a}function u(e,n){return`\n        <li class="movie__card">\n            <div class="movie__img__box">\n                <picture class="film-list__img">\n                    <source\n                        srcset="${d(a.BASE_IMG_URL,a.DESKTOP_SIZES,e.poster_path,a.DESKTOP_STUB)}"\n                        media="screen and (min-width:1200px)"\n                    />\n                    <source\n                        srcset="${d(a.BASE_IMG_URL,a.TABLET_SIZES,e.poster_path,a.TABLET_STUB)}"\n                        media="(min-width:768px)"\n                    />\n                    <source\n                        srcset="${d(a.BASE_IMG_URL,a.MOBILE_SIZES,e.poster_path,a.MOBILE_STUB)}"\n                        media="(max-width:767px)"\n                    />\n                    <img\n                        class="movie__img"\n                        src="./images/no-Film-Img.jpg"\n                        alt="${e.original_title}"\n                        width="450"\n                        height="294"\n                        name="Poster"\n                        data-id="${e.id}"\n                    />\n                </picture>           \n            </div>\n            <div class="movie__card__textbox">\n                <h3 class="movie__title">${e.original_title}</h3>\n                <span class="movie__details">${n} | </span>\n                <span class="movie__details">${e.release_date.slice(0,4)}</span>\n            </div>\n        </li>`}document.addEventListener("DOMContentLoaded",l),r.queueBtn.addEventListener("click",c),r.watchedBtn.addEventListener("click",l),i("auoJF"),i("cHVi1"),i("aaDYB");
//# sourceMappingURL=my-library.8b8c54c7.js.map