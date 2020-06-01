import React, { useEffect, useState } from "react";

import calculateShipCapacity from "../../utils/calculateShipCapacity";

import logo from "../../assets/logo.svg";

import "./style.css";

export default function Story({ history }) {
  const [shipCapacity, setShipCapacity] = useState(0); // gets calculated ship actual capacity

  // calls useEffect to load and calculate ship actual capacity
  useEffect(() => {
    // get the state from history.location.state
    let state = history.location.state;

    // calls the calculateShipCapacity function passing state as parameter
    setShipCapacity(calculateShipCapacity(state)); // set it to shipCapacity
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
            É um período de guerra civil. Espaçonaves rebeldes, vindos de uma
            base escondida, tiveram sua primeira vitória contra o Império
            Galático do mal.
          </p>
          <br />
          <p>
            Durante a batalha, rebeldes espiam controlados para roubar os planos
            secretos da arma suprema do Império, a ESTRELA DA MORTE, uma estação
            espacial blindada com poder suficiente para destruir um planeta
            inteiro....
          </p>
          <br />
          <p>
            Enquanto isso, {history.location.state.apiData.hanSolo.name} está
            pilotando a nave {history.location.state.apiData.millFalcon.name}{" "}
            com capacidade de carca de{" "}
            {history.location.state.apiData.millFalcon.cargo_capacity}
            kg. Sua capacidade atual está ocupada em 99%.
          </p>
          <br />
          <p>
            Em um certo momento, Han Solo percebe que está próximo de um planeta
            conhecido. Muda seu curso em direção ao mesmo. Ao pousar, decide
            embarcar {history.location.state.apiData.millFalcon.passengers}{" "}
            passageiros do filme Uma Nova Esperança. Este sexto passageiro é
            alguém especial.
          </p>
          <br />
          <p>
            Han Solo pergunta o nome do sexto passageiro que responde
            intitulando-se de {history.location.state.name}. Han Solo o convida
            à entrar.
          </p>
          <br />
          <p>
            Com o peso dos passageiros, a Millenium Falcon chegou a{" "}
            {shipCapacity}kg.
            {shipCapacity >
              history.location.state.apiData.millFalcon.cargo_capacity &&
              ` Infelizmente a nave chegou em sua capacidade máxima, e o sexto passageiro teve que sair....`}
            {shipCapacity <
              history.location.state.apiData.millFalcon.cargo_capacity &&
              ` Felizmente a capacidade atual da nave não excedeu o limite, permitindo que o sexto passageiro pudesse viajar tranquilamente....`}
          </p>
        </div>
      </section>

      <section
        className="ending"
        onAnimationEnd={() => {
          history.push("/");
        }}
      >
        <h2>Obrigado à equipe MERCADOU pela oportunidade.</h2>
        <p>Att. Marcello Carvalhal Santos</p>
      </section>
    </>
  );
}
