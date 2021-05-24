const API_TOKEN = "f40133ccb2f26d0a701ebebed02dc447";

export const getFilmsFromApiWithSearchText = (text, page) => {
  const url =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_TOKEN +
    "&language=fr&query=" +
    text +
    "&page=" +
    page;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getImageFromApi = (name) => {
  return "https://image.tmdb.org/t/p/w300" + name;
};
