import { useLocation } from "react-router-dom";
import planet1 from "../assets/planet1.png";
import planet2 from "../assets/planet2.png";
import planet3 from "../assets/planet3.png";
import planet4 from "../assets/planet4.png";
import planet5 from "../assets/planet5.png";
import planet6 from "../assets/planet6.png";
import planet7 from "../assets/planet7.png";
import planet8 from "../assets/planet8.png";
import "./PlanetDetails.css";
import { useEffect, useState } from "react";
import ResidentCard from "./ResidentCard";
import ReactLoading from "react-loading";
import Loading from "./Loading";

let formatter = Intl.NumberFormat("en", { notation: "compact" });

function PlanetDetails() {
  const location = useLocation();
  const { planet, img } = location.state;
  // eslint-disable-next-line no-unused-vars
  const [residentlink, setResidentlink] = useState(planet.residents);
  const [residents, setResidents] = useState();
  const [image, setImage] = useState(() => {});
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    let temp;
    switch (img) {
      case 1:
        temp = planet1;
        break;
      case 2:
        temp = planet2;
        break;
      case 3:
        temp = planet3;
        break;
      case 4:
        temp = planet4;
        break;
      case 5:
        temp = planet5;
        break;
      case 6:
        temp = planet6;
        break;
      case 7:
        temp = planet7;
        break;
      case 8:
        temp = planet8;
        break;
      default:
        temp = planet1;
    }
    setImage(temp);
  }, []);

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function createResidentCard(resident, index) {
    return (
      <ResidentCard
        key={index}
        name={resident.value.name}
        gender={resident.value.gender}
        height={resident.value.height}
        mass={resident.value.mass}
      />
    );
  }

  useEffect(() => {
    async function fetchResidents() {
      try {
        setLoading(true);
        const res = await Promise.allSettled(
          residentlink.map((resident) => fetch(resident))
        );

        const successArray = [];
        res.map((response) => {
          if (response.status === "fulfilled") {
            successArray.push(response);
          }
        });

        const data = await Promise.allSettled(
          successArray.map((response) => response.value.json())
        );
        setResidents(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(true);
        console.error(err.message);
      }
    }
    fetchResidents();
  }, []);

  return (
    <>
      {loading && <Loading />}
      {error && "Error"}
      {!loading && !error && (
        <div className="planet-details-wrapper">
          <div className="details-planet-image-container">
            <img className="details-planet-image" src={image} alt="planet" />
          </div>
          <div className={`planet-details`}>
            <h1 className="planet-name">{planet.name.toUpperCase()}</h1>
            <div className="planet-primary-details">
              <div className="details-population-wrapper">
                <div>Population </div>
                <div> {formatter.format(planet.population)}</div>
              </div>
              <div className="details-climate-terrain-wrapper">
                <div className="details-climate-wrapper">
                  <div>{capitalize(planet.climate)}</div>
                  <div>Climate</div>
                </div>

                <div className="details-terrain-wrapper">
                  <div>{capitalize(planet.terrain)}</div>
                  <div>Terrain</div>
                </div>
              </div>
            </div>
            <div className="planet-resident-details">
              <h1 className="planet-residents-heading">
                {residents && residents.length
                  ? "Residents"
                  : "No Residents Found"}
              </h1>
              {loading && (
                <ReactLoading
                  type="spin"
                  color="#fbeb04"
                  height={50}
                  width={50}
                />
              )}

              {!loading &&
                (residents && residents.length !== 0 ? (
                  <div className="planet-resident-list">
                    {residents && residents.map(createResidentCard)}
                  </div>
                ) : (
                  <></>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PlanetDetails;
