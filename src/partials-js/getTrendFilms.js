import { API_KEY } from './vars';
import { makerender } from '../index';
import axios from 'axios';
import { pagination } from './tuiPagination';
export async function getFilms() {
  const urlApi = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

  await axios
    .get(urlApi)
    .then(function (response) {
      if (response.status !== 200) {
        return alert('Sorry, there are no films for you');
      }
      // console.log(response);
      return response.data;
    })
    .then(results => {
      makerender(results.results);
      // console.log(results);
      pagination(results.total_pages, results.page);
    })
    .catch(function (error) {
      console.log(error);
    });
}