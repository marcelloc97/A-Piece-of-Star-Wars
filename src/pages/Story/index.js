import React, { useEffect } from "react";

import calculateShipCapacity from "../../utils/calculateShipCapacity";

import logo from "../../assets/logo.svg";

import "./style.css";

export default function Story({ history }) {
  // calls useEffect to load and calculate ship actual capacity
  useEffect(() => {
    // get the state from history.location.state
    let state = history.location.state;

    // calls the calculateShipCapacity function passing state as parameter
    calculateShipCapacity(state);
  }, [history.location.state]); // here, the useEffect Hook updates everytime history.location.state is changed

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
            {history.location.state.apiData.hanSolo.name} está pilotando a nave{" "}
            {history.location.state.apiData.millFalcon.name} com capacidade de
            carca de {history.location.state.apiData.millFalcon.cargo_capacity}
            kg. Neste momento, sua capacidade está ocupada em 99%. Sua
            necessidade em passar nos planetas, torna a viagem mais cansativa.
          </p>
          <p>
            Em um certo momento, {history.location.state.apiData.hanSolo.name}{" "}
            percebe que está próximo de um planeta conhecido. Lá pousará.
          </p>
          <p>
            Ao pousar, ele decide embarcar{" "}
            {history.location.state.apiData.millFalcon.passengers} passageiros
            do filme {history.location.state.apiData.film.title} (Uma Nova
            Esperança). Este 6º passageiro é alguém que é especial e que nunca
            viajou em uma {history.location.state.apiData.millFalcon.name}.
          </p>
          <p>
            {history.location.state.apiData.hanSolo.name} pergunta o nome do 6º
            passageiro, e ele responde "{history.location.state.name}". Neste
            momento, {history.location.state.apiData.hanSolo.name} fica
            intrigado, porém o chama para o embarque junto com os outros 5
            passageiros.
          </p>
        </div>
      </section>
    </>
  );
}
