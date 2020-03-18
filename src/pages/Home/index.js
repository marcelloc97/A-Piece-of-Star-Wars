import React, { useEffect, useState } from "react";
import api from "../../services/api";

import logo from "../../assets/logo.svg";

import "./style.css";

export default function Home() {
  // create states to store data
  const [hanSolo, setHanSolo] = useState({}); // this for Han Solo
  const [millFalcon, setMillFalcon] = useState({}); // this for Millenium Falcon
  const [film, setFilm] = useState({}); // this for the movie
  const [weight, setWeight] = useState(0); // this for the user's weight
  const [name, setName] = useState(""); // this for the user's name
  const [randomChars, setRandomChars] = useState([]); // this for the five random characters
  const [shipCapacity, setShipCapacity] = useState(0); // and this to store calculated capacity

  // calls useEffect to fetch data when page loads
  useEffect(() => {
    // create a simple function to get data from api
    async function fetchData() {
      // get Han Solo data and store do state hanSolo
      const hansolo = await api.get("people/14/");
      setHanSolo(hansolo.data);

      // get the ship data and store to it
      const ship = await api.get("starships/10/");
      setMillFalcon(ship.data);

      // get the movie data and stores too
      const films = await api.get("films/1/");
      setFilm(films.data);
    }
    // call the function
    fetchData();
  }, []); // warning, useEffect don't allow async direct, you must create a function to do it.

  // this function handles weight data and store to localStorage
  async function handleWeightData(e) {
    // prevent the default action of button
    e.preventDefault();
    // and run the function
    getRandomChars();
  }

  // this function get random chars id from api
  async function getRandomChars() {
    // check if variable film isn't empty
    if (film !== {}) {
      // if not, create a new Array
      const result = [];

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

        // then push it to array
        result.push(value);

        // check if the value is repeated
        do {
          // re-roll
          value = film.characters[
            Math.floor(Math.random() * film.characters.length)
          ]
            .slice(28, 30)
            .replace("/", "");

          // check again if value isn't equal to previous value
          if (value !== result[i]) {
            // if not, then push it
            result.push(value);

            // and exit the loop
            value = null;
          }
          // else, check again if value is equal to 14 (Han Solo)
          else if (value === 14) {
            // re-roll again
            value = film.characters[
              Math.floor(Math.random() * film.characters.length)
            ]
              .slice(28, 30)
              .replace("/", "");

            // check if value is equal to the current result position
            if (value === result[i]) {
              // if it is, then re-roll again
              value = film.characters[
                Math.floor(Math.random() * film.characters.length)
              ]
                .slice(28, 30)
                .replace("/", "");

              // delete the last value and push the new
              result.pop();
              result.push(value);

              // exit the loop
              value = null;
            }
          }
        } while (value === result[i]); // it happens every time while the value is equal to current result position
      }

      // store the information from api
      setRandomChars(await fetchPeople(result));
    }
  }

  // this function gets the characters from api by route "/people/:id"
  async function fetchPeople(result) {
    // create a new Array
    const response = [];

    // loop through response and get data from api
    for (let i = 0; i < 4; i++) {
      // push that data
      response.push(await api.get(`people/${result[i]}`));
    }
    calculateShipCapacity(response);
    return response;
  }

  // this function will calculate the ship capacity and the weight
  async function calculateShipCapacity(response) {
    // gets the cargo capacity from ship
    const maxCapacity = millFalcon.cargo_capacity;
    // defines the percent to calculate
    const percent = 99;

    // get the result of 99% of cargo
    let maxPercentualCapacity = maxCapacity * (percent / 100);
    // set it to capacity
    let capacity = maxPercentualCapacity;

    // loop through response
    for (let i = 0; i < response.length; i++) {
      // and add to capacity all five random characters mass
      capacity += parseFloat(response[i].data.mass);
    }

    // add your weight to capacity
    capacity += weight;

    // store the value to shipCapacity
    setShipCapacity(capacity);
  }

  return (
    <>
      <audio autoPlay={true}>
        <source
          src="https://s.cdpn.io/1202/Star_Wars_original_opening_crawl_1977.ogg"
          type="audio/ogg"
        />
        <source
          src="https://s.cdpn.io/1202/Star_Wars_original_opening_crawl_1977.mp3"
          type="audio/mpeg"
        />
      </audio>

      <div className="fade"></div>

      <section className="intro">
        Há muito tempo, em uma galaxia distante, bem distante....
      </section>
      <section className="logo">
        <img src={logo} alt="star wars logo yellow" />
      </section>

      <section className="star-wars">
        <div className="crawl">
          <div className="title">
            <p>EPISÓDIO EXTRA</p>
            <h1>DESAFIO MERCADOU</h1>
          </div>

          <p>
            {hanSolo.name} está pilotando a nave {millFalcon.name} com
            capacidade de carca de {millFalcon.cargo_capacity}kg. Neste momento,
            sua capacidade está ocupada em 99%. Sua necessidade em passar nos
            planetas, torna a viagem mais cansativa.
          </p>
          <p>
            Em um certo momento, {hanSolo.name} percebe que está próximo de um
            planeta conhecido. Lá {hanSolo.name} pousará.
          </p>
          <p>
            Ao pousar, ele decide embarcar {millFalcon.passengers} passageiros
            do filme {film.title} (Uma Nova Esperança). Este 6º passageiro é
            alguém que é especial e que nunca viajou em uma {millFalcon.name}.
          </p>
          <p>
            {hanSolo.name} pergunta o nome do 6º passageiro, e ele responde ""
            {name}. Neste momento, {hanSolo.name} fica intrigado, porém o chama
            para o embarque junto com os outros 5 passageiros.
          </p>

          <form>
            <input
              type="number"
              placeholder="Ex.: 70"
              onChange={e => {
                setWeight(parseFloat(e.target.value));
              }}
            />
            <button onClick={handleWeightData}>Salvar</button>
          </form>
          {randomChars !== null && (
            <div>
              {randomChars.map(chars => {
                return (
                  <p>
                    {chars.data.name}: {chars.data.mass}kg
                  </p>
                );
              })}
            </div>
          )}

          {shipCapacity !== 0 && (
            <p>
              Contando com os passageiros, a nave {millFalcon.name} ficou com{" "}
              {shipCapacity}kg de carga.
            </p>
          )}
          {(shipCapacity > millFalcon.cargo_capacity && (
            <p>A nave excedeu seu limite de capacidade</p>
          )) ||
            (shipCapacity < millFalcon.cargo_capacity && shipCapacity !== 0 && (
              <p>A nave não excedeu seu limite! Ufa, que bom.</p>
            ))}
        </div>
      </section>
    </>
  );
}
