import React, { useState, useEffect } from "react";

import ReactLoading from "react-loading";
import Anime from "react-anime";

import fetchAPIData from "../../utils/fetchAPIData";

import logo from "../../assets/logo.svg";

import "./style.css";

export default function Home({ history }) {
  // create states to store data
  const [name, setName] = useState(""); // this for the user's name
  const [weight, setWeight] = useState(""); // this for the user's weight
  const [apiData, setApiData] = useState({}); // this for api data

  const [loading, setLoading] = useState(true); // this for loading data
  const [canAnimate, setCanAnimate] = useState(true); // this to limit animation repeating
  const [hasData, setHasData] = useState(false); // this to limit animation repeating

  // call a useEffect to load data from API through fetchAPIData
  useEffect(() => {
    // create the function load
    async function load() {
      // try doing the fetch and store
      try {
        setApiData(await fetchAPIData());
        setLoading(false);

        let nameData = localStorage.getItem("name"),
          weightData = localStorage.getItem("weight");

        if (nameData && weightData) {
          setHasData(true);
          setName(nameData);
          setWeight(parseFloat(weightData));
        }
      } catch (e) {
        // if somehow occurs an error, print on console
        console.log(e);
      }
    }
    load(); // call the function
  }, []);

  // create a handling function to form
  function handleData(e) {
    e.preventDefault(); // prevent its default

    // get name and weight from localStorage
    let nameData = localStorage.getItem("name"),
      weightData = localStorage.getItem("weight");

    // if they are empty, store the input data
    if (!weightData && !nameData) {
      localStorage.setItem("name", name);
      localStorage.setItem("weight", weight);
    }

    try {
      // try creating a new object
      const newData = {
        apiData,
        name,
        weight
      };

      // then navigating to /story page passing newData as state
      if (name !== "" && weight !== 0) history.push("/story", newData);
    } catch (e) {
      // else, shows the error on console
      console.log(e);
    }
  }

  function handleLoadData(e) {
    e.preventDefault(); // prevent its default

    // get name and weight from localStorage
    setName(localStorage.getItem("name"));
    setWeight(localStorage.getItem("weight"));

    // if they aren't empty, store the input data
    if (name !== "" && weight !== 0) {
      try {
        // try creating a new object
        const newData = {
          apiData,
          name,
          weight: parseFloat(weight)
        };

        // then navigating to /story page passing newData as state
        history.push("/story", newData);
      } catch (e) {
        // else, shows the error on console
        console.log(e);
      }
    }
  }

  function handleWipeData(e) {
    e.preventDefault(); // prevent its default

    // clear all data in your localStorage
    localStorage.clear();
    setName("");
    setWeight(0);
  }

  // just the React JSX code
  return (
    <section className="container">
      {loading && (
        <>
          <Anime
            autoplay={true}
            opacity={[0, 1]}
            translateY={[-50, 0]}
            duration={500}
            easing={"easeInOutSine"}
          >
            <h2
              style={{
                marginBottom: "30px"
              }}
            >
              BUSCANDO INFORMAÇÕES...
            </h2>
            <ReactLoading color="yellow" type="spin" />
          </Anime>
        </>
      )}
      {!loading && (
        <>
          <Anime
            opacity={canAnimate ? [0, 1] : 1}
            translateY={canAnimate ? [-50, 0] : 0}
            duration={500}
            easing={"easeInOutSine"}
            complete={() => {
              setCanAnimate(false);
            }}
          >
            <img src={logo} alt="star wars logo" />
            {hasData && (
              <h5 style={{ textAlign: "center", marginBottom: "10px" }}>
                Existe informação salva em seu computador, pressione{" "}
                <em>Carregar</em> para carregá-las
              </h5>
            )}
            <form onSubmit={handleData}>
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                datatype="name"
                onChange={e => setName(e.target.value)}
                value={name}
                placeholder="Ex: Marcello"
                required
              />
              <label htmlFor="weight">Peso</label>
              <input
                type="number"
                datatype="weight"
                onChange={e => setWeight(e.target.valueAsNumber)}
                value={weight}
                placeholder="Ex: 72"
                required
              />
              <div className="buttonGroup">
                <button type="submit">Salvar</button>
                <button onClick={handleLoadData}>Carregar</button>
              </div>
              <button onClick={handleWipeData} name="wipe">
                Limpar dados
              </button>
            </form>
          </Anime>
        </>
      )}
    </section>
  );
}
