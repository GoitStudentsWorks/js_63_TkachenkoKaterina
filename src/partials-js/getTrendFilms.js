import axios from 'axios';

export async function getFilms(url) {
  try
  {
    const rez = await axios.get(url)
    return rez
   
  }
    catch (err) {
    console.log(err);
  } 
  

}


// import { pagination } from './tuiPagination';


// export async function getFilms() {
//   const urlApi = `${MAIN_PART_URL}trending/movie/week${API_KEY}`;
//   const galleryRef = document.querySelector('.movie__collection');
//   await axios
//     .get(urlApi)
//     .then(function (response) {
//       if (response.status !== 200) {
//         return alert('Sorry, there are no films for you');
//       }
//       // console.log(response);
//       return response.data;
//     })
//     .then(results => {
//       galleryRef.innerHTML = makerender(results.results);
//       // console.log(results);
//       // pagination(results.total_pages, results.page);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }