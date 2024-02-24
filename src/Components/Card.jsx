/* eslint-disable react/prop-types */
import "./Card.css";
import { motion } from "framer-motion";

let formatter = Intl.NumberFormat("en", { notation: "compact" });

function Card({ name, climate, terrain, population, img }) {
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        amount="some"
        className="card"
      >
        <h1 className="card-heading">{name.toUpperCase()}</h1>
        <div className="card-details">
          <div className="climate-terrain-wrapper">
            <div className="climate-wrapper">
              <span>{capitalize(climate)}</span>
              <span>Climate</span>
            </div>

            <div className="terrain-wrapper">
              <span>{capitalize(terrain)}</span>
              <span>Terrain</span>
            </div>
          </div>

          <div className="population-wrapper">
            <span>{formatter.format(population)}</span>
            <span>Population</span>
          </div>
        </div>
        <div className="img-container">
          <img className="planet-image" src={img} alt="planet" />
        </div>
      </motion.div>
    </>
  );
}

export default Card;
