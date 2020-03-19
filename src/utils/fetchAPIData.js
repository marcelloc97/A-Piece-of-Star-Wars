import api from "../services/api";

export default async function fetchData() {
  // create vars to store api information
  let hanSolo, millFalcon, film, chars, randomChars;

  // try geting all required data
  try {
    // get the Han Solo data and store to it
    const han = await api.get("people/14/");
    hanSolo = han.data;

    // get the ship data and store to it
    const ship = await api.get("starships/10/");
    millFalcon = ship.data;

    // get the movie data and stores too
    const films = await api.get("films/1/");
    film = films.data;

    // create a new Array on chars
    chars = [];

    // then loop 5 times to get random chars from the film
    for (let i = 0; i <= 4; i++) {
      // set a value looping through film.characters, randomizing the value and getting just the id
      let value = film.characters[
        Math.floor(Math.random() * film.characters.length)
      ]
        .slice(28, 30)
        .replace("/", "");

      // if the value is the same of Han Solo, roll again
      if (value === 14)
        value = film.characters[
          Math.floor(Math.random() * film.characters.length)
        ]
          .slice(28, 30)
          .replace("/", "");
      // else if value for some case got undefined, re-roll to fix it
      if (value === undefined)
        value = film.characters[
          Math.floor(Math.random() * film.characters.length)
        ]
          .slice(28, 30)
          .replace("/", "");

      // then push it to array
      chars.push(value);
    }

    //// Random People Data ////

    // create a new Array to get the response from api
    const response = [];

    // loop response and get data from api
    for (let i = 0; i < 4; i++) {
      // push that data
      response.push(await api.get(`people/${chars[i]}`));
    }

    // convert AxiosResponse into an Array and store to previous defined randomChars variable
    randomChars = response.map(r => r.data);

    // return all data
    return {
      hanSolo,
      millFalcon,
      film,
      randomChars
    };
  } catch (e) {
    // else an error occurs, log it
    console.log(e);
  }
}
