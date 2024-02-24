import "./Home.css";
import Card from "./Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import planet1 from "../assets/planet1.png";
import planet2 from "../assets/planet2.png";
import planet3 from "../assets/planet3.png";
import planet4 from "../assets/planet4.png";
import planet5 from "../assets/planet5.png";
import planet6 from "../assets/planet6.png";
import planet7 from "../assets/planet7.png";
import planet8 from "../assets/planet8.png";
import Loading from "./Loading";

function Home() {
  const [planets, setPlanets] = useState();
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  function createPlanetsCard(planet, index) {
    const random = Math.floor(Math.random() * 9);
    let image;
    switch (random) {
      case 1:
        image = planet1;
        break;
      case 2:
        image = planet2;
        break;
      case 3:
        image = planet3;
        break;
      case 4:
        image = planet4;
        break;
      case 5:
        image = planet5;
        break;
      case 6:
        image = planet6;
        break;
      case 7:
        image = planet7;
        break;
      case 8:
        image = planet8;
        break;
      default:
        image = planet1;
    }
    return (
      <Link
        key={index}
        to="/Planet Details"
        state={{ planet: planet, img: random }}
      >
        <Card
          name={planet.name}
          climate={planet.climate}
          terrain={planet.terrain}
          population={planet.population}
          img={image}
        />
      </Link>
    );
  }

  async function nextPageHandler() {
    try {
      setLoading(true);

      const res = await axios.get(next);
      setPlanets(res.data.results);
      setNext(res.data.next);
      setPrev(res.data.previous);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.error(err.message);
    }
  }

  async function previousPageHandler() {
    try {
      setLoading(true);
      const res = await axios.get(prev);

      setPlanets(res.data.results);
      setNext(res.data.next);
      setPrev(res.data.previous);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);

      console.error(err.message);
    }
  }

  useEffect(() => {
    async function fetchPlanets() {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://swapi.dev/api/planets/?format=json"
        );

        setPlanets(res.data.results);
        if (res.data.next) {
          setNext(res.data.next);
        }
        if (res.data.prev) {
          setPrev(res.data.previous);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(true);
        console.error(err.message);
      }
    }
    fetchPlanets();
  }, []);

  return (
    <>
      {loading && <Loading />}
      {error && "Error"}
      {!loading && !error && (
        <div className="home">
          <h1 className="home-heading">Starwars</h1>
          <h3>Planets</h3>
          <div className="planets-card-wrapper">
            {planets && planets.map(createPlanetsCard)}
          </div>
          <div className="btn-container">
            {planets && prev && (
              <button
                type="submit"
                onClick={previousPageHandler}
                className="previous-btn"
              >
                Previous Page
              </button>
            )}

            {planets && next && (
              <button
                type="submit"
                onClick={nextPageHandler}
                className="next-btn"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
